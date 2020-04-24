import {TypedSopNode} from './_Base';
import {CoreGroup, Object3DWithGeometry} from '../../../core/geometry/Group';
import {CoreTransform, ROTATION_ORDERS, RotationOrder} from '../../../core/Transform';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {Object3D} from 'three/src/core/Object3D';
import {Matrix4} from 'three/src/math/Matrix4';

export enum TransformSopTargetType {
	OBJECTS = 'objects',
	GEOMETRIES = 'geometries',
}
export const TRANSFORM_SOP_TARGET_TYPES: Array<TransformSopTargetType> = [
	TransformSopTargetType.GEOMETRIES,
	TransformSopTargetType.OBJECTS,
];

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
class TransformSopParamConfig extends NodeParamsConfig {
	apply_on = ParamConfig.INTEGER(TRANSFORM_SOP_TARGET_TYPES.indexOf(TransformSopTargetType.GEOMETRIES), {
		menu: {
			entries: TRANSFORM_SOP_TARGET_TYPES.map((target_type, i) => {
				return {name: target_type, value: i};
			}),
		},
	});
	group = ParamConfig.STRING('', {
		visible_if: {apply_on: TRANSFORM_SOP_TARGET_TYPES.indexOf(TransformSopTargetType.GEOMETRIES)},
	});

	// transform
	rotation_order = ParamConfig.INTEGER(ROTATION_ORDERS.indexOf(RotationOrder.XYZ), {
		menu: {
			entries: ROTATION_ORDERS.map((order, v) => {
				return {name: order, value: v};
			}),
		},
	});
	t = ParamConfig.VECTOR3([0, 0, 0]);
	r = ParamConfig.VECTOR3([0, 0, 0]);
	s = ParamConfig.VECTOR3([1, 1, 1]);
	scale = ParamConfig.FLOAT(1, {range: [0, 10]});
	look_at = ParamConfig.OPERATOR_PATH('');
	up = ParamConfig.VECTOR3([0, 1, 0]);
	pivot = ParamConfig.VECTOR3([0, 0, 0]);
}
const ParamsConfig = new TransformSopParamConfig();

export class TransformSopNode extends TypedSopNode<TransformSopParamConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'transform';
	}

	static displayed_input_names(): string[] {
		return ['geometry to transform'];
	}

	initialize_node() {
		// this.ui_data.set_param_label(this.p.apply_on, (v)=>TARGET_TYPES[v])
		this.io.inputs.set_count(1);
		this.io.inputs.init_inputs_clonable_state([InputCloneMode.FROM_NODE]);
	}

	private _core_transform = new CoreTransform();
	cook(input_contents: CoreGroup[]) {
		const objects = input_contents[0].objects();
		const matrix = this._core_transform.matrix(
			this.pv.t,
			this.pv.r,
			this.pv.s,
			this.pv.scale,
			ROTATION_ORDERS[this.pv.rotation_order]
		);

		switch (TRANSFORM_SOP_TARGET_TYPES[this.pv.apply_on]) {
			case TransformSopTargetType.GEOMETRIES: {
				this._apply_matrix_to_geometries(objects, matrix);
				break;
			}
			case TransformSopTargetType.OBJECTS: {
				this._apply_matrix_to_objects(objects, matrix);
				break;
			}
		}

		this.set_objects(objects);
	}

	private _apply_matrix_to_geometries(objects: Object3DWithGeometry[], matrix: Matrix4) {
		if (this.pv.group === '') {
			for (let object of objects) {
				let geometry;
				if ((geometry = object.geometry) != null) {
					geometry.translate(-this.pv.pivot.x, -this.pv.pivot.y, -this.pv.pivot.z);
					geometry.applyMatrix4(matrix);
					geometry.translate(this.pv.pivot.x, this.pv.pivot.y, this.pv.pivot.z);
				} else {
					object.applyMatrix4(matrix);
				}
			}
		} else {
			const core_group = CoreGroup.from_objects(objects);
			const points = core_group.points_from_group(this.pv.group);
			for (let point of points) {
				const position = point.position().sub(this.pv.pivot);
				position.applyMatrix4(matrix);
				point.set_position(position.add(this.pv.pivot));
			}
		}
	}
	private _apply_matrix_to_objects(objects: Object3D[], matrix: Matrix4) {
		for (let object of objects) {
			object.applyMatrix4(matrix);
		}
	}
}
