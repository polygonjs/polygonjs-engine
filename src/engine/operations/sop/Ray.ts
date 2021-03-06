import {BaseSopOperation} from './_Base';
import {DefaultOperationParams} from '../_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {InputCloneMode} from '../../../engine/poly/InputCloneMode';
import {Vector3} from 'three/src/math/Vector3';
import {Raycaster, Intersection} from 'three/src/core/Raycaster';
import {isBooleanTrue} from '../../../core/BooleanValue';
import {MatDoubleSideTmpSetter} from '../../../core/render/MatDoubleSideTmpSetter';

interface RaySopParams extends DefaultOperationParams {
	useNormals: boolean;
	direction: Vector3;
	transferFaceNormals: boolean;
	transformPoints: boolean;
	addDistAttribute: boolean;
}

const DIST_ATTRIB_NAME = 'dist';

export class RaySopOperation extends BaseSopOperation {
	static readonly DEFAULT_PARAMS: RaySopParams = {
		useNormals: true,
		direction: new Vector3(0, -1, 0),
		transformPoints: true,
		transferFaceNormals: true,
		addDistAttribute: false,
	};
	static readonly INPUT_CLONED_STATE = [InputCloneMode.FROM_NODE, InputCloneMode.ALWAYS];
	static type(): Readonly<'ray'> {
		return 'ray';
	}

	private _matDoubleSideTmpSetter = new MatDoubleSideTmpSetter();
	private _raycaster = new Raycaster();

	cook(input_contents: CoreGroup[], params: RaySopParams) {
		const coreGroupToRay = input_contents[0];
		const coreGroupToRayOnto = input_contents[1];

		const coreGroup = this._ray(coreGroupToRay, coreGroupToRayOnto, params);
		return coreGroup;
	}

	private _pointPos = new Vector3();
	private _pointNormal = new Vector3();
	private _ray(core_group: CoreGroup, core_group_collision: CoreGroup, params: RaySopParams) {
		this._matDoubleSideTmpSetter.setCoreGroupMaterialDoubleSided(core_group_collision);

		if (isBooleanTrue(params.addDistAttribute)) {
			if (!core_group.hasAttrib(DIST_ATTRIB_NAME)) {
				core_group.addNumericVertexAttrib(DIST_ATTRIB_NAME, 1, -1);
			}
		}

		let direction: Vector3, first_intersect: Intersection;
		const points = core_group.points();
		for (let point of points) {
			point.getPosition(this._pointPos);
			direction = params.direction;
			if (isBooleanTrue(params.useNormals)) {
				point.getNormal(this._pointNormal);
				direction = this._pointNormal;
			}
			this._raycaster.set(this._pointPos, direction);
			first_intersect = this._raycaster.intersectObjects(core_group_collision.objects(), true)[0];
			if (first_intersect) {
				if (isBooleanTrue(params.transformPoints)) {
					point.setPosition(first_intersect.point);
				}
				if (isBooleanTrue(params.addDistAttribute)) {
					const dist = this._pointPos.distanceTo(first_intersect.point);
					console.log(dist);
					point.setAttribValue(DIST_ATTRIB_NAME, dist);
				}
				if (isBooleanTrue(params.transferFaceNormals) && first_intersect.face) {
					point.setNormal(first_intersect.face.normal);
				}
			}
		}
		this._matDoubleSideTmpSetter.restoreMaterialSideProperty(core_group_collision);
		return core_group;
	}
}
