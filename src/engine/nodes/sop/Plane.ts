import {Vector3} from 'three/src/math/Vector3';
import {Vector2} from 'three/src/math/Vector2';
import {PlaneBufferGeometry} from 'three/src/geometries/PlaneGeometry';
import {TypedSopNode} from './_Base';
import {CoreTransform} from 'src/core/Transform';
import {CoreGroup} from 'src/core/geometry/Group';
import {InputCloneMode} from 'src/engine/poly/InputCloneMode';

const DEFAULT_UP = new Vector3(0, 0, 1);

import {NodeParamsConfig, ParamConfig} from 'src/engine/nodes/utils/params/ParamsConfig';
class PlaneSopParamsConfig extends NodeParamsConfig {
	size = ParamConfig.VECTOR2([1, 1]);
	use_segments_count = ParamConfig.BOOLEAN(0);
	step_size = ParamConfig.FLOAT(1, {visible_if: {use_segments_count: 0}});
	segments = ParamConfig.VECTOR2([1, 1], {visible_if: {use_segments_count: 1}});
	direction = ParamConfig.VECTOR3(DEFAULT_UP.toArray() as Number3);
	center = ParamConfig.VECTOR3([0, 0, 0]);
}
const ParamsConfig = new PlaneSopParamsConfig();

export class PlaneSopNode extends TypedSopNode<PlaneSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'plane';
	}

	static displayed_input_names(): string[] {
		return ['geometry to create plane from (optional)'];
	}

	initialize_node() {
		this.io.inputs.set_count_to_one_max();
		this.io.inputs.init_inputs_clonable_state([InputCloneMode.NEVER]);
	}

	cook(input_contents: CoreGroup[]) {
		const core_group = input_contents[0];
		if (core_group) {
			this._cook_with_input(core_group);
		} else {
			this._cook_without_input();
		}
	}
	_cook_without_input() {
		const geometry = this._create_plane(this.pv.size);

		// convert to buffer geo, as some render problems can occur otherwise
		// geometry = BufferGeometryUtils.mergeBufferGeometries([geometry])
		// console.log(geometry, geometry.isBufferGeometry)
		CoreTransform.rotate_geometry_by_vector_difference(geometry, DEFAULT_UP, this.pv.direction);

		const matrix = CoreTransform.translation_matrix(this.pv.center.x, this.pv.center.y, this.pv.center.z);
		geometry.applyMatrix(matrix);

		this.set_geometry(geometry);
	}
	_cook_with_input(core_group: CoreGroup) {
		const bbox = core_group.bounding_box();
		const size = new Vector3();
		bbox.getSize(size);
		const center = new Vector3();
		bbox.getCenter(center);

		// TODO: rotate the input geo to get the accurate bbox
		const size2d = new Vector2(size.x, size.z);
		const geometry = this._create_plane(size2d);

		CoreTransform.rotate_geometry_by_vector_difference(geometry, new Vector3(0, 0, 1), new Vector3(0, 1, 0));

		const matrix = CoreTransform.translation_matrix(center.x, center.y, center.z);
		geometry.applyMatrix(matrix);

		// const buffer_geometry = CoreGeometry.clone(geometry);
		this.set_geometry(geometry);
	}

	_create_plane(size: Vector2) {
		let segments_count;
		size = size.clone();
		if (this.pv.use_segments_count) {
			segments_count = {
				x: Math.floor(this.pv.segments.x),
				y: Math.floor(this.pv.segments.y),
			};
		} else {
			segments_count = {
				x: Math.floor(size.x / this.pv.step_size),
				y: Math.floor(size.y / this.pv.step_size),
			};
			size.x = segments_count.x * this.pv.step_size;
			size.y = segments_count.y * this.pv.step_size;
		}
		return new PlaneBufferGeometry(size.x, size.y, segments_count.x, segments_count.y);
	}
}