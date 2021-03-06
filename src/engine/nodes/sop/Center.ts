/**
 * Creates a point at the center of each input objects
 *
 *
 */

import {TypedSopNode} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';

import {CenterSopOperation} from '../../operations/sop/Center';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
class CenterSopParamsConfig extends NodeParamsConfig {}
const ParamsConfig = new CenterSopParamsConfig();

export class CenterSopNode extends TypedSopNode<CenterSopParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'center';
	}

	initializeNode() {
		this.io.inputs.setCount(1);
		this.io.inputs.initInputsClonedState(CenterSopOperation.INPUT_CLONED_STATE);
	}

	private _operation: CenterSopOperation | undefined;
	cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new CenterSopOperation(this.scene(), this.states);
		const core_group = this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}
}
