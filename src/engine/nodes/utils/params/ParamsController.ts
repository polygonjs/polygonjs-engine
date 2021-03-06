import {BaseNodeType} from '../../_Base';
import {BaseParamType} from '../../../params/_Base';
import {ParamOptions} from '../../../params/utils/OptionsController';
import {CoreGraphNode} from '../../../../core/graph/CoreGraphNode';

import {FloatParam} from '../../../params/Float';
import {OperatorPathParam} from '../../../params/OperatorPath';

import {ParamType} from '../../../poly/ParamType';
// import {ParamEvent} from '../../../poly/ParamEvent';
import {NodeParamsConfig} from './ParamsConfig';

import {ParamConstructorMap} from '../../../params/types/ParamConstructorMap';
import {ParamConstructorByType} from '../../../params/types/ParamConstructorByType';
import {ParamInitValuesTypeMap} from '../../../params/types/ParamInitValuesTypeMap';
import {ParamValuesTypeMap} from '../../../params/types/ParamValuesTypeMap';
import {NodeEvent} from '../../../poly/NodeEvent';
import {ParamInitValueSerializedTypeMap} from '../../../params/types/ParamInitValueSerializedTypeMap';
import {ParamsLabelController} from './ParamsLabelController';
import {Poly} from '../../../Poly';
import {ParamInitData} from '../io/IOController';
import {PolyDictionary} from '../../../../types/GlobalTypes';

const NODE_SIMPLE_NAME = 'params';

export type OnSceneLoadHook = () => void;
type PostCreateParamsHook = () => void;

export interface ParamOptionToAdd<T extends ParamType> {
	name: string;
	type: T;
	init_value: ParamInitValueSerializedTypeMap[T];
	raw_input: ParamInitValueSerializedTypeMap[T];
	options?: ParamOptions;
}
export interface ParamsUpdateOptions {
	namesToDelete?: string[];
	toAdd?: ParamOptionToAdd<ParamType>[];
}

export class ParamsController {
	private _param_create_mode: boolean = false;
	private _params_created: boolean = false;
	private _params_by_name: PolyDictionary<BaseParamType> = {};
	// caches
	private _params_list: BaseParamType[] = [];
	private _param_names: string[] = [];
	private _non_spare_params: BaseParamType[] = [];
	private _spare_params: BaseParamType[] = [];
	private _non_spare_param_names: string[] = [];
	private _spare_param_names: string[] = [];

	private _params_node: CoreGraphNode | undefined;
	// private _params_eval_key: string;
	private _params_added_since_last_params_eval: boolean = false;
	// private _current_param_folder_name: string | undefined;

	// hooks
	private _post_create_params_hook_names: string[] | undefined;
	private _post_create_params_hooks: PostCreateParamsHook[] | undefined;
	private _on_scene_load_hooks: OnSceneLoadHook[] | undefined;
	private _on_scene_load_hook_names: string[] | undefined;

	// labels
	private _label_controller: ParamsLabelController | undefined;
	get label(): ParamsLabelController {
		return (this._label_controller = this._label_controller || new ParamsLabelController());
	}
	hasLabelController(): boolean {
		return this._label_controller != null;
	}

	constructor(public readonly node: BaseNodeType) {}

	dispose() {
		if (this._params_node) {
			this._params_node.dispose();
		}

		// dispose params
		for (let param of this.all) {
			param.dispose();
		}

		// hooks
		this._post_create_params_hook_names = undefined;
		this._post_create_params_hooks = undefined;
		this._on_scene_load_hooks = undefined;
		this._on_scene_load_hook_names = undefined;

		//
		this._label_controller?.dispose();
	}

	private initDependencyNode() {
		if (!this._params_node) {
			// TODO: consider not having a params_node for nodes which have no parameters
			this._params_node = new CoreGraphNode(this.node.scene(), NODE_SIMPLE_NAME);
			// this._params_node.setScene(this.node.scene);
			this.node.addGraphInput(this._params_node, false);
		}
	}

	init() {
		this.initDependencyNode();
		// this.reset_params()
		this._param_create_mode = true;

		this._initFromParamsConfig();
		this.node.createParams();
		this._postCreateParams();
	}
	private _postCreateParams() {
		this._updateCaches();
		// this._create_params_ui_data_dependencies();
		this._initParamAccessors();
		this._param_create_mode = false;
		this._params_created = true;

		this._runPostCreateParamsHooks();

		// This was to debug a weird bug where I was adding nodes to the list
		// of params, from the DependenciesController
		// this._params_list.push = (...items: BaseParamType[]) => {
		// 	if (items[0] && !items[0].compute) {
		// 		Poly.warn('adding params', items);
		// 	}
		// 	for (let i of items) {
		// 		this._params_list[this._params_list.length] = i;
		// 	}
		// 	return 0;
		// };
	}
	postCreateSpareParams() {
		this._updateCaches();
		this._initParamAccessors();
		// param.emit(ParamEvent.DELETED);
		this.node.scene().referencesController.notify_params_updated(this.node);
		this.node.emit(NodeEvent.PARAMS_UPDATED);
	}
	updateParams(options: ParamsUpdateOptions) {
		let has_created_a_param = false;
		let has_deleted_a_param = false;
		if (options.namesToDelete) {
			for (let param_name of options.namesToDelete) {
				if (this.has(param_name)) {
					this._deleteParam(param_name);
					has_deleted_a_param = true;
				}
			}
		}
		if (options.toAdd) {
			for (let param_data of options.toAdd) {
				const param = this.addParam(
					param_data.type,
					param_data.name,
					param_data.init_value,
					param_data.options
				);
				if (param) {
					if (param_data.raw_input != null) {
						param.set(param_data.raw_input as never);
					}
					has_created_a_param = true;
				}
			}
		}

		if (has_deleted_a_param || has_created_a_param) {
			this.postCreateSpareParams();
		}
	}

	private _initFromParamsConfig() {
		const paramsConfig = this.node.paramsConfig as NodeParamsConfig;
		let init_values_used = false;
		if (paramsConfig) {
			for (let name of Object.keys(paramsConfig)) {
				const config = paramsConfig[name];
				let init_value: ParamInitData<ParamType> | undefined;
				if (this.node.params_init_value_overrides) {
					init_value = this.node.params_init_value_overrides[name];
					init_values_used = true;
				}
				this.addParam(config.type, name, config.init_value, config.options, init_value);
			}
		}
		// this set dirty may not be necessary, but when starting a scene with a spotlight
		// with a non default t (ie: [2,2,0]), it would not be positionned correctly and would require
		// a cook
		if (init_values_used) {
			this.node.setDirty();
		}
		this.node.params_init_value_overrides = undefined;
	}
	private _initParamAccessors() {
		let current_names_in_accessor = Object.getOwnPropertyNames(this.node.pv);
		this._removeUnneededAccessors(current_names_in_accessor);
		// update var after having removed accessors
		current_names_in_accessor = Object.getOwnPropertyNames(this.node.pv);

		for (let param of this.all) {
			const is_spare: boolean = param.options.isSpare();

			const param_not_yet_in_accessors = !current_names_in_accessor.includes(param.name());

			if (param_not_yet_in_accessors || is_spare) {
				Object.defineProperty(this.node.pv, param.name(), {
					get: () => {
						return param.value;
					},
					// only spare parameters can be removed
					configurable: is_spare,
				});
				Object.defineProperty(this.node.p, param.name(), {
					get: () => {
						return param;
					},
					configurable: is_spare,
				});
			}
		}
	}
	private _removeUnneededAccessors(current_names_in_accessor: string[]) {
		const current_param_names = this._param_names;
		const names_to_remove = [];
		for (let current_name_in_accessor of current_names_in_accessor) {
			if (!current_param_names.includes(current_name_in_accessor)) {
				names_to_remove.push(current_name_in_accessor);
			}
		}

		for (let name_to_remove of names_to_remove) {
			Object.defineProperty(this.node.pv, name_to_remove, {
				get: () => {
					return undefined;
				},
				configurable: true,
			});
			Object.defineProperty(this.node.p, name_to_remove, {
				get: () => {
					return undefined;
				},
				configurable: true,
			});
		}
	}

	get params_node() {
		return this._params_node;
	}
	get all() {
		return this._params_list;
	}
	get non_spare() {
		return this._non_spare_params;
	}
	get spare() {
		return this._spare_params;
	}
	get names(): string[] {
		return this._param_names;
	}
	get non_spare_names(): string[] {
		return this._non_spare_param_names;
	}
	get spare_names(): string[] {
		return this._spare_param_names;
	}

	private set_with_type<T extends ParamType>(param_name: string, value: ParamInitValuesTypeMap[T], type: T) {
		const param = this.param_with_type(param_name, type);
		if (param) {
			param.set(value as never);
		} else {
			Poly.warn(`param ${param_name} not found with type ${type}`);
		}
	}
	set_float(param_name: string, value: ParamInitValuesTypeMap[ParamType.FLOAT]) {
		this.set_with_type(param_name, value, ParamType.FLOAT);
	}
	set_vector3(param_name: string, value: ParamInitValuesTypeMap[ParamType.VECTOR3]) {
		this.set_with_type(param_name, value, ParamType.VECTOR3);
	}

	has_param(param_name: string) {
		return this._params_by_name[param_name] != null;
	}
	has(param_name: string) {
		return this.has_param(param_name);
	}
	get(param_name: string) {
		return this.param(param_name);
	}
	param_with_type<T extends ParamType>(param_name: string, type: T): ParamConstructorMap[T] | undefined {
		const param = this.param(param_name);
		if (param && param.type() == type) {
			return param as ParamConstructorMap[T];
		}
	}
	get_float(param_name: string): FloatParam {
		return this.param_with_type(param_name, ParamType.FLOAT) as FloatParam;
	}
	get_operator_path(param_name: string): OperatorPathParam {
		return this.param_with_type(param_name, ParamType.OPERATOR_PATH) as OperatorPathParam;
	}
	value(param_name: string) {
		return this.param(param_name)?.value;
	}
	value_with_type<T extends ParamType>(param_name: string, type: T): ParamValuesTypeMap[T] {
		return this.param_with_type(param_name, type)?.value as ParamValuesTypeMap[T];
		// const param = this.param(name);
		// if (param && param.type() == type) {
		// 	return param.value();
		// }
	}
	boolean(param_name: string) {
		return this.value_with_type(param_name, ParamType.BOOLEAN);
	}
	float(param_name: string) {
		return this.value_with_type(param_name, ParamType.FLOAT);
	}
	integer(param_name: string) {
		return this.value_with_type(param_name, ParamType.INTEGER);
	}
	string(param_name: string) {
		return this.value_with_type(param_name, ParamType.STRING);
	}
	vector2(param_name: string) {
		return this.value_with_type(param_name, ParamType.VECTOR2);
	}
	vector3(param_name: string) {
		return this.value_with_type(param_name, ParamType.VECTOR3);
	}
	color(param_name: string) {
		return this.value_with_type(param_name, ParamType.COLOR);
	}

	param(param_name: string) {
		const p = this._params_by_name[param_name];
		if (p != null) {
			return p;
		} else {
			Poly.warn(
				`tried to access param '${param_name}' in node ${this.node.path()}, but existing params are: ${
					this.names
				} on node ${this.node.path()}`
			);
			return null;
		}
	}
	// param_cache_name(param_name: string) {
	// 	return `_param_${param_name}`;
	// }

	// delete_params(param_names: string[]) {
	// 	for (let param_name of param_names) {
	// 		this.delete_param(param_name);
	// 	}

	// }
	// call update_params instead
	private _deleteParam(param_name: string) {
		const param = this._params_by_name[param_name];
		if (param) {
			if (this._params_node) {
				this._params_node.removeGraphInput(this._params_by_name[param_name]);
			}
			param._setupNodeDependencies(null);
			delete this._params_by_name[param_name];
			if (param.isMultiple() && param.components) {
				for (let component of param.components) {
					const child_name = component.name();
					delete this._params_by_name[child_name];
				}
			}

			// const name_index = this._param_names.indexOf(param_name)
			// if(name_index >= 0){
			// 	this._param_names.splice(name_index, 1)
			// }
			// param.emit(ParamEvent.DELETED);
		} else {
			throw new Error(`param '${param_name}' does not exist on node ${this.node.path()}`);
		}
	}

	addParam<T extends ParamType>(
		type: T,
		param_name: string,
		default_value: ParamInitValuesTypeMap[T],
		options: ParamOptions = {},
		init_data?: ParamInitData<T>
	): ParamConstructorMap[T] | undefined {
		const is_spare = options['spare'] || false;
		if (this._param_create_mode === false && !is_spare) {
			Poly.warn(
				`node ${this.node.path()} (${this.node.type()}) param '${param_name}' cannot be created outside of create_params`
			);
		}
		if (this.node.scene() == null) {
			Poly.warn(`node ${this.node.path()} (${this.node.type()}) has no scene assigned`);
		}

		const constructor = ParamConstructorByType[type];
		if (constructor != null) {
			const existing_param = this._params_by_name[param_name];
			if (existing_param) {
				if (is_spare) {
					// delete the old one, otherwise the gl nodes when saved will attempt to set the value
					// of a param with the potentially wrong type
					if (existing_param.type() != type) {
						this._deleteParam(existing_param.name());
					}
				} else {
					// check that the param is spare, so that the ones generated by gl nodes are not generating an exception
					Poly.warn(`a param named ${param_name} already exists`, this.node);
				}
			}
			const param: ParamConstructorMap[T] = new constructor(this.node.scene(), this.node);
			param.options.set(options);

			param.setName(param_name);
			param.setInitValue(default_value as never);
			param.initComponents();

			// set param value
			// and overriden options
			if (init_data == null) {
				param.set(default_value as never);
			} else {
				// If is_expression_for_entities is true, we need to call param.set with default_value first, such as for attrib_create.
				// Otherwise, as it would fail if the attribute was a vector
				// since that attribute would have .value equal to {x: undefined, y: undefined, z:undefined}
				if (param.options.isExpressionForEntities()) {
					param.set(default_value as never);
				}
				if (init_data.raw_input != null) {
					param.set(init_data.raw_input as never);
				} else {
					if (init_data.simple_data != null) {
						param.set(init_data.simple_data as never);
					} else {
						if (init_data.complex_data != null) {
							const raw_input = init_data.complex_data.raw_input;
							if (raw_input) {
								param.set(raw_input as never);
							} else {
								param.set(default_value as never);
							}
							const overriden_options = init_data.complex_data.overriden_options;
							if (overriden_options != null) {
								const keys = Object.keys(overriden_options);
								for (let key of keys) {
									param.options.setOption(key as keyof ParamOptions, overriden_options[key]);
								}
							}
						}
					}
				}
			}
			param._setupNodeDependencies(this.node);

			this._params_by_name[param.name()] = param as BaseParamType;

			// we add the components, so that we can access them with expressions like ch('ty')
			if (param.isMultiple() && param.components) {
				for (let component of param.components) {
					this._params_by_name[component.name()] = component as BaseParamType;
				}
			}

			this._params_added_since_last_params_eval = true;

			return param;
		}
	}

	private _updateCaches() {
		this._params_list = Object.values(this._params_by_name);
		this._param_names = Object.keys(this._params_by_name);
		this._non_spare_params = Object.values(this._params_by_name).filter((p) => !p.options.isSpare());
		this._spare_params = Object.values(this._params_by_name).filter((p) => p.options.isSpare());
		this._non_spare_param_names = Object.values(this._params_by_name)
			.filter((p) => !p.options.isSpare())
			.map((p) => p.name());
		this._spare_param_names = Object.values(this._params_by_name)
			.filter((p) => p.options.isSpare())
			.map((p) => p.name());
	}

	async _evalParam(param: BaseParamType) {
		// return new Promise((resolve, reject)=> {
		// const param_cache_name = this.param_cache_name(param.name());
		// const cached_value = this[param_cache_name] || null;
		if (/*cached_value == null ||*/ param.isDirty() /* || param.is_errored()*/) {
			/*const param_value =*/ await param.compute(); //.then(param_value=>{
			// this[param_cache_name] = param_value;
			if (param.states.error.active()) {
				this.node.states.error.set(`param '${param.name()}' error: ${param.states.error.message()}`);
			}
			// return param_value;
		} else {
			// return param.value;
		}
		// });
	}

	async evalParams(params: BaseParamType[]) {
		const promises = [];
		for (let param of params) {
			if (param.isDirty()) {
				promises.push(this._evalParam(param));
			}
		}
		await Promise.all(promises);

		if (this.node.states.error.active()) {
			this.node._setContainer(null);
		}
	}

	paramsEvalRequired(): boolean {
		return this._params_node != null && (this._params_node.isDirty() || this._params_added_since_last_params_eval);
	}
	async evalAll() {
		if (this.paramsEvalRequired()) {
			await this.evalParams(this._params_list);

			this._params_node?.removeDirtyState();
			this._params_added_since_last_params_eval = false;
		}
	}

	//
	//
	// HOOKS
	//
	//
	onParamsCreated(hook_name: string, hook: PostCreateParamsHook) {
		if (this._params_created) {
			hook();
		} else {
			if (this._post_create_params_hook_names && this._post_create_params_hook_names.includes(hook_name)) {
				Poly.error(`hook name ${hook_name} already exists`);
				return;
			}
			this._post_create_params_hook_names = this._post_create_params_hook_names || [];
			this._post_create_params_hook_names.push(hook_name);
			this._post_create_params_hooks = this._post_create_params_hooks || [];
			this._post_create_params_hooks.push(hook);
		}
	}
	addOnSceneLoadHook(param_name: string, method: OnSceneLoadHook) {
		this._on_scene_load_hook_names = this._on_scene_load_hook_names || [];
		this._on_scene_load_hooks = this._on_scene_load_hooks || [];

		if (!this._on_scene_load_hook_names.includes(param_name)) {
			this._on_scene_load_hook_names.push(param_name);
			this._on_scene_load_hooks.push(method);
		} else {
			Poly.warn(`hook with name ${param_name} already exists`, this.node);
		}
	}
	private _runPostCreateParamsHooks() {
		if (this._post_create_params_hooks) {
			for (let hook of this._post_create_params_hooks) {
				hook();
			}
		}
	}
	runOnSceneLoadHooks() {
		if (this._on_scene_load_hooks) {
			for (let hook of this._on_scene_load_hooks) {
				hook();
			}
		}
	}
}
