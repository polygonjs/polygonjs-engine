import {ParamsInitData} from '../../../engine/nodes/utils/io/IOController';
import {ParamType} from '../../../engine/poly/ParamType';
import {Color} from 'three/src/math/Color';
import {Vector2} from 'three/src/math/Vector2';
import {Vector3} from 'three/src/math/Vector3';
import {Vector4} from 'three/src/math/Vector4';
import {TypedNodePathParamValue, TypedParamPathParamValue} from '../../../core/Walker';
import {BaseNodeType} from '../../../engine/nodes/_Base';
import {BaseOperation, DefaultOperationParams, DefaultOperationParam} from '../_Base';
import {ParamInitValueSerializedTypeMap} from '../../../engine/params/types/ParamInitValueSerializedTypeMap';
import {InputsController} from './utils/InputsController';
import {CoreType} from '../../../core/Type';
import {NodeContext} from '../../poly/NodeContext';

type SimpleParamJsonExporterData<T extends ParamType> = ParamInitValueSerializedTypeMap[T];

export class BaseOperationContainer<NC extends NodeContext> {
	protected params: DefaultOperationParams = {};
	private _path_params: TypedNodePathParamValue[] | undefined;

	constructor(protected operation: BaseOperation<NC>, protected name: string, init_params: ParamsInitData) {
		this._apply_default_params();
		this._apply_init_params(init_params);
		this._init_cloned_states();
	}

	//
	//
	// PATH PARAMS
	//
	//
	path_param_resolve_required() {
		return this._path_params != null;
	}
	resolve_path_params(node_start: BaseNodeType) {
		if (!this._path_params) {
			return;
		}
		for (let path_param of this._path_params) {
			path_param.resolve(node_start);
		}
	}

	//
	//
	// PARAM VALUES CONVERSION
	//
	//
	private _apply_default_params() {
		const default_params = (this.operation.constructor as typeof BaseOperation).DEFAULT_PARAMS;
		const param_names = Object.keys(default_params);
		for (let param_name of param_names) {
			const param_data = default_params[param_name];
			const clone_param_data = this._convert_param_data(param_name, param_data);
			if (clone_param_data != undefined) {
				this.params[param_name] = clone_param_data;
			}
		}
	}

	private _apply_init_params(init_params: ParamsInitData) {
		const param_names = Object.keys(init_params);
		for (let param_name of param_names) {
			const param_data = init_params[param_name];
			if (param_data.simple_data != null) {
				const simple_data = param_data.simple_data;
				const clone_param_data = this._convert_export_param_data(param_name, simple_data);
				if (clone_param_data != undefined) {
					this.params[param_name] = clone_param_data;
				}
			}
		}
	}

	private _convert_param_data(param_name: string, param_data: DefaultOperationParam<ParamType>) {
		if (CoreType.isNumber(param_data) || CoreType.isBoolean(param_data) || CoreType.isString(param_data)) {
			return param_data;
		}
		if (param_data instanceof TypedNodePathParamValue) {
			const cloned = param_data.clone();
			if (!this._path_params) {
				this._path_params = [];
			}
			this._path_params.push(cloned);
			return cloned;
		}
		if (
			param_data instanceof Color ||
			param_data instanceof Vector2 ||
			param_data instanceof Vector3 ||
			param_data instanceof Vector4
		) {
			return param_data.clone();
		}
	}

	private _convert_export_param_data(param_name: string, param_data: SimpleParamJsonExporterData<ParamType>) {
		const default_param = this.params[param_name];
		if (CoreType.isBoolean(param_data)) {
			return param_data;
		}
		if (CoreType.isNumber(param_data)) {
			if (CoreType.isBoolean(default_param)) {
				// if we receive 0, it may be for a boolean param,
				// so if the default is a boolean, we convert
				return param_data >= 1 ? true : false;
			} else {
				return param_data;
			}
		}
		if (CoreType.isString(param_data)) {
			if (default_param) {
				if (default_param instanceof TypedNodePathParamValue) {
					return default_param.set_path(param_data);
				}
				if (default_param instanceof TypedParamPathParamValue) {
					return default_param.set_path(param_data);
				}
			}
			return param_data;
		}
		if (CoreType.isArray(param_data)) {
			(this.params[param_name] as Vector3).fromArray(param_data as number[]);
		}
	}

	//
	//
	// INPUTS
	//
	//
	protected _inputs: BaseOperationContainer<NC>[] | undefined;
	setInput(index: number, input: BaseOperationContainer<NC>) {
		this._inputs = this._inputs || [];
		this._inputs[index] = input;
	}
	inputs_count() {
		if (this._inputs) {
			return this._inputs.length;
		} else {
			return 0;
		}
	}

	private _inputs_controller: InputsController<NC> | undefined;
	protected inputsController() {
		return (this._inputs_controller = this._inputs_controller || new InputsController<NC>(this));
	}
	private _init_cloned_states() {
		const default_cloned_states = (this.operation.constructor as typeof BaseOperation).INPUT_CLONED_STATE;
		this.inputsController().init_inputs_cloned_state(default_cloned_states);
	}
	input_clone_required(index: number): boolean {
		if (!this._inputs_controller) {
			return true;
		}
		return this._inputs_controller.clone_required(index);
	}
	override_input_clone_state(state: boolean) {
		this.inputsController().override_cloned_state(state);
	}

	//
	//
	// COOK
	//
	//
	cook(input_contents: any[]) {
		return this.operation.cook(input_contents, this.params);
	}
}
