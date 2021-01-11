/**
 * Creates a torus.
 *
 *
 */

import {TypedSopNode} from './_Base';
import {TorusSopOperation} from '../../../core/operations/sop/Torus';
import {CoreGroup} from '../../../core/geometry/Group';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
const DEFAULT = TorusSopOperation.DEFAULT_PARAMS;
class TorusSopParamsConfig extends NodeParamsConfig {
	/** @param large radius */
	radius = ParamConfig.FLOAT(DEFAULT.radius, {range: [0, 1]});
	/** @param radius of the tube */
	radiusTube = ParamConfig.FLOAT(DEFAULT.radiusTube, {range: [0, 1]});
	/** @param number of segments along the length of the torus */
	segmentsRadial = ParamConfig.INTEGER(DEFAULT.segmentsRadial, {
		range: [1, 50],
		rangeLocked: [true, false],
	});
	/** @param number of segments along the tube */
	segmentsTube = ParamConfig.INTEGER(DEFAULT.segmentsTube, {
		range: [1, 50],
		rangeLocked: [true, false],
	});
	/** @param axis perpendicular to the torus */
	direction = ParamConfig.VECTOR3(DEFAULT.direction);
	/** @param center of the torus */
	center = ParamConfig.VECTOR3(DEFAULT.center);
}
const ParamsConfig = new TorusSopParamsConfig();

export class TorusSopNode extends TypedSopNode<TorusSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'torus';
	}

	private _operation: TorusSopOperation | undefined;
	cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new TorusSopOperation(this.scene, this.states);
		const core_group = this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}
}
