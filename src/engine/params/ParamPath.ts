import {BaseParamType} from './_Base';
import {TypedPathParam} from './_BasePath';
import {CoreWalker, TypedParamPathParamValue} from '../../core/Walker';
import {BaseNodeType} from '../nodes/_Base';
import {ParamType} from '../poly/ParamType';
import {ParamValuesTypeMap} from './types/ParamValuesTypeMap';
import {ParamEvent} from '../poly/ParamEvent';
import {ParamInitValuesTypeMap} from './types/ParamInitValuesTypeMap';

export class ParamPathParam extends TypedPathParam<ParamType.PARAM_PATH> {
	// private _found_param: BaseParamType | null = null;

	static type() {
		return ParamType.PARAM_PATH;
	}
	initialize_param() {
		this._value = new TypedParamPathParamValue();
	}

	defaultValueSerialized() {
		return this._default_value;
	}
	rawInputSerialized() {
		return `${this._raw_input}`;
	}
	valueSerialized() {
		return `${this.value}`;
	}
	protected _copy_value(param: ParamPathParam) {
		this.set(param.valueSerialized());
	}
	static are_raw_input_equal(
		raw_input1: ParamInitValuesTypeMap[ParamType.PARAM_PATH],
		raw_input2: ParamInitValuesTypeMap[ParamType.PARAM_PATH]
	) {
		return raw_input1 == raw_input2;
	}
	static are_values_equal(
		val1: ParamValuesTypeMap[ParamType.PARAM_PATH],
		val2: ParamValuesTypeMap[ParamType.PARAM_PATH]
	) {
		return val1 == val2;
	}
	isDefault(): boolean {
		return this._raw_input == this._default_value;
	}
	setParam(param: BaseParamType) {
		this.set(param.path());
	}
	protected processRawInput() {
		if (this._value.path() != this._raw_input) {
			this._value.set_path(this._raw_input);
			this.find_target();
			this.setDirty();
			this.emitController.emit(ParamEvent.VALUE_UPDATED);
		}
	}
	protected async processComputation() {
		this.find_target();
	}
	private find_target() {
		if (!this.node) {
			return;
		}
		const path = this._raw_input;
		let param: BaseParamType | null = null;
		const path_non_empty = path != null && path !== '';

		this.scene().referencesController.reset_reference_from_param(this); // must be before decomposed path is changed
		this.decomposed_path.reset();
		if (path_non_empty) {
			param = CoreWalker.findParam(this.node, path, this.decomposed_path);
		}

		const current_found_entity = this._value.param();
		const newly_found_entity = param;

		this.scene().referencesController.set_named_nodes_from_param(this);
		if (param) {
			this.scene().referencesController.set_reference_from_param(this, param);
		}

		if (current_found_entity?.graphNodeId() !== newly_found_entity?.graphNodeId()) {
			const dependent_on_found_node = this.options.dependentOnFoundNode();

			const previously_found_node = this._value.param();
			if (previously_found_node) {
				if (dependent_on_found_node) {
					this.removeGraphInput(previously_found_node);
				} else {
					// this._found_node.remove_param_referree(this) // TODO: typescript
				}
			}

			if (param) {
				this._assign_found_node(param);
			} else {
				this._value.set_param(null);
			}

			this.options.executeCallback();
		}
		this.removeDirtyState();
	}

	private _assign_found_node(param: BaseParamType) {
		const dependent_on_found_node = this.options.dependentOnFoundNode();
		// if (this._is_node_expected_context(node)) {
		// 	if (this._is_node_expected_type(node)) {
		this._value.set_param(param);
		if (dependent_on_found_node) {
			this.addGraphInput(param);
		}
		// 	} else {
		// 		this.states.error.set(
		// 			`node type is ${node.type} but the params expects one of ${(this._expected_node_types() || []).join(
		// 				', '
		// 			)}`
		// 		);
		// 	}
		// } else {
		// 	this.states.error.set(
		// 		`node context is ${node.node_context()} but the params expects a ${this._expected_context()}`
		// 	);
		// }
	}

	// private _expected_context() {
	// 	return this.options.node_selection_context;
	// }
	// private _is_node_expected_context(node: BaseNodeType) {
	// 	const expected_context = this._expected_context();
	// 	if (expected_context == null) {
	// 		return true;
	// 	}
	// 	const node_context = node.parent?.childrenController?.context;
	// 	return expected_context == node_context;
	// }
	// private _expected_node_types() {
	// 	return this.options.node_selection_types;
	// }

	// private _is_node_expected_type(node: BaseNodeType) {
	// 	const expected_types = this._expected_node_types();
	// 	if (expected_types == null) {
	// 		return true;
	// 	}
	// 	return expected_types?.includes(node.type);
	// }

	notify_path_rebuild_required(param: BaseParamType) {
		this.decomposed_path.update_from_name_change(param);
		const new_path = this.decomposed_path.to_path();
		this.set(new_path);
	}
	notify_target_param_owner_params_updated(node: BaseNodeType) {
		this.setDirty();
	}
}
