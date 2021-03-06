import {BaseParamType} from '../_Base';
import {BaseNodeType} from '../../nodes/_Base';
import {ParamType} from '../../poly/ParamType';
import {ParamEvent} from '../../poly/ParamEvent';
import {NodeContext} from '../../poly/NodeContext';
import {CoreGraphNode} from '../../../core/graph/CoreGraphNode';
import {ColorConversion} from '../../../core/Color';
import {CoreType} from '../../../core/Type';
import {ArrayUtils} from '../../../core/ArrayUtils';
import {ObjectUtils} from '../../../core/ObjectUtils';
import {Boolean2, Number2, PolyDictionary} from '../../../types/GlobalTypes';

const CALLBACK_OPTION = 'callback';
const CALLBACK_STRING_OPTION = 'callbackString';
// const COLOR_OPTION = 'color';
const COMPUTE_ON_DIRTY = 'computeOnDirty';
const COOK_OPTION = 'cook';
const FILE_BROWSE_OPTION = 'fileBrowse';
const FILE_TYPE_OPTION = 'type';
// const EXPRESSION_ONLY_OPTION = 'expression_only';
const EXPRESSION = 'expression';
const FOR_ENTITIES = 'forEntities';
const LABEL = 'label';
const LEVEL = 'level';
const MENU = 'menu';
const MENU_STRING = 'menuString';
const ENTRIES = 'entries';
// const TYPE = 'type';
// const RADIO = 'radio';
const MULTILINE_OPTION = 'multiline';
const LANGUAGE_OPTION = 'language';
const NODE_SELECTION = 'nodeSelection';
const NODE_SELECTION_CONTEXT = 'context';
const NODE_SELECTION_TYPES = 'types';
const PARAM_SELECTION = 'paramSelection';
const DEPENDENT_ON_FOUND_NODE = 'dependentOnFoundNode';
const RANGE_OPTION = 'range';
const RANGE_LOCKED_OPTION = 'rangeLocked';
const STEP_OPTION = 'step';
const SPARE_OPTION = 'spare';
const TEXTURE_OPTION = 'texture';
const ENV_OPTION = 'env';
const HIDDEN_OPTION = 'hidden';
// const SHOW_LABEL_OPTION = 'show_label';
const FIELD_OPTION = 'field';
const VISIBLE_IF_OPTION = 'visibleIf';
const COLOR_CONVERSION = 'conversion';

const SEPARATOR_BEFORE_OPTION = 'separatorBefore';
const SEPARATOR_AFTER_OPTION = 'separatorAfter';

export interface NumericParamOptionsMenuEntry {
	name: string;
	value: number;
}
export interface StringParamOptionsMenuEntry {
	name: string;
	value: string;
}
export interface MenuNumericParamOptions {
	menu?: {
		entries: NumericParamOptionsMenuEntry[];
	};
}
export interface MenuStringParamOptions {
	menuString?: {
		entries: StringParamOptionsMenuEntry[];
	};
}
export enum StringParamLanguage {
	// JAVASCRIPT = 'javascript',
	TYPESCRIPT = 'typescript',
	// GLSL = 'glsl',
}

export enum FileType {
	AUDIO = 'audio',
	TEXTURE_IMAGE = 'texture_image',
	TEXTURE_VIDEO = 'texture_video',
	GEOMETRY = 'geometry',
	FONT = 'font',
	SVG = 'svg',
	JSON = 'json',
}

export type VisibleIfParamOptions = PolyDictionary<number | boolean>;
interface BaseParamOptions {
	// cook
	cook?: boolean;
	// spare
	spare?: boolean;
	// visible
	hidden?: boolean;
	// show_label?: boolean;
	field?: boolean;
	visibleIf?: VisibleIfParamOptions | VisibleIfParamOptions[];
	// separator
	separatorBefore?: boolean;
	separatorAfter?: boolean;
}

interface ExpressionParamOptions {
	expression?: {
		forEntities?: boolean;
	};
}

interface NumberParamOptions extends BaseParamOptions {
	range?: Number2;
	rangeLocked?: Boolean2;
	step?: number;
}

interface FileParamOptions {
	fileBrowse?: {
		type: FileType[];
	};
}
interface ComputeOnDirtyParamOptions {
	computeOnDirty?: boolean;
}
interface CallbackParamOptions {
	callback?: (node: BaseNodeType, param: BaseParamType) => any;
	callbackString?: string;
}
interface LabelParamOptions {
	label?: string;
}
interface ColorConversionOptions {
	conversion?: ColorConversion;
}

// actual param options
export interface BooleanParamOptions
	extends BaseParamOptions,
		ComputeOnDirtyParamOptions,
		MenuNumericParamOptions,
		ExpressionParamOptions,
		CallbackParamOptions {}
export interface ButtonParamOptions extends BaseParamOptions, CallbackParamOptions, LabelParamOptions {}
export interface ColorParamOptions
	extends BaseParamOptions,
		ColorConversionOptions,
		ExpressionParamOptions,
		CallbackParamOptions,
		ComputeOnDirtyParamOptions {}
export interface FloatParamOptions
	extends NumberParamOptions,
		MenuNumericParamOptions,
		ComputeOnDirtyParamOptions,
		ExpressionParamOptions,
		CallbackParamOptions {}
export interface FolderParamOptions extends BaseParamOptions {
	level?: number;
}
export interface IntegerParamOptions
	extends NumberParamOptions,
		MenuNumericParamOptions,
		CallbackParamOptions,
		ComputeOnDirtyParamOptions {}
export interface OperatorPathParamOptions
	extends BaseParamOptions,
		FileParamOptions,
		ComputeOnDirtyParamOptions,
		CallbackParamOptions {
	nodeSelection?: {
		context?: NodeContext;
		types?: Readonly<string[]>;
	};
	dependentOnFoundNode?: boolean;
	paramSelection?: ParamType | boolean;
}
export interface RampParamOptions extends BaseParamOptions {}
export interface SeparatorParamOptions extends BaseParamOptions {}
export interface StringParamOptions
	extends BaseParamOptions,
		MenuStringParamOptions,
		FileParamOptions,
		CallbackParamOptions,
		ExpressionParamOptions {
	multiline?: boolean;
	language?: StringParamLanguage;
}
interface VectorParamOptions
	extends BaseParamOptions,
		ExpressionParamOptions,
		CallbackParamOptions,
		ComputeOnDirtyParamOptions {}
export interface Vector2ParamOptions extends VectorParamOptions {}
export interface Vector3ParamOptions extends VectorParamOptions {}
export interface Vector4ParamOptions extends VectorParamOptions {}

export interface ParamOptions
	extends NumberParamOptions,
		ColorConversionOptions,
		ComputeOnDirtyParamOptions,
		FolderParamOptions,
		ExpressionParamOptions,
		ButtonParamOptions,
		FileParamOptions,
		MenuNumericParamOptions,
		StringParamOptions,
		OperatorPathParamOptions {
	texture?: {
		env?: boolean;
	};
}

export class OptionsController {
	private _programatic_visible_state: boolean = true;
	private _options!: ParamOptions;
	private _default_options!: ParamOptions;
	constructor(private _param: BaseParamType) {
		// this._options = lodash_cloneDeep(this._default_options);
	}
	dispose() {
		try {
			// there is a bug where the _options is just a string
			// for builder params. And accessing generates an error
			this._options[CALLBACK_OPTION] = undefined;
			this._options[CALLBACK_STRING_OPTION] = undefined;
		} catch (err) {}
		this._visibility_graph_node?.dispose();
	}

	set(options: ParamOptions) {
		this._default_options = options;
		this._options = ObjectUtils.cloneDeep(this._default_options);
		this.post_set_options();
	}
	copy(options_controller: OptionsController) {
		this._default_options = ObjectUtils.cloneDeep(options_controller.default());
		this._options = ObjectUtils.cloneDeep(options_controller.current());
		this.post_set_options();
	}
	setOption<K extends keyof ParamOptions>(name: K, value: ParamOptions[K]) {
		this._options[name] = value;
		if (this._param.components) {
			for (let component of this._param.components) {
				component.options.setOption(name, value);
			}
		}
	}
	private post_set_options() {
		this._handleComputeOnDirty();
	}
	param() {
		return this._param;
	}
	node(): BaseNodeType {
		return this._param.node;
	}
	default() {
		return this._default_options;
	}
	current() {
		return this._options;
	}

	// utils
	hasOptionsOverridden(): boolean {
		return !ObjectUtils.isEqual(this._options, this._default_options);
	}
	overriddenOptions(): ParamOptions {
		const overriden: ParamOptions = {};
		const option_names = Object.keys(this._options) as Array<keyof ParamOptions>;
		for (let option_name of option_names) {
			if (!ObjectUtils.isEqual(this._options[option_name], this._default_options[option_name])) {
				const cloned_option = ObjectUtils.cloneDeep(this._options[option_name]);
				Object.assign(overriden, {[option_name]: cloned_option});
			}
		}
		return overriden;
	}
	overriddenOptionNames(): Array<keyof ParamOptions> {
		return Object.keys(this.overriddenOptions()) as Array<keyof ParamOptions>;
	}

	// compute on dirty
	computeOnDirty(): boolean {
		return this._options[COMPUTE_ON_DIRTY] || false;
	}
	private _computeOnDirty_callback_added: boolean | undefined;
	private _handleComputeOnDirty() {
		if (this.computeOnDirty()) {
			if (!this._computeOnDirty_callback_added) {
				this.param().addPostDirtyHook('computeOnDirty', this._computeParam.bind(this));
				this._computeOnDirty_callback_added = true;
			}
		}
	}
	private async _computeParam() {
		await this.param().compute();
	}

	// callback
	hasCallback() {
		return this._options[CALLBACK_OPTION] != null || this._options[CALLBACK_STRING_OPTION] != null;
	}

	private _callbackAllowed = false;
	allowCallback() {
		this._callbackAllowed = true;
	}

	executeCallback() {
		if (!this._callbackAllowed) {
			return;
		}
		if (!this.node()) {
			return;
		}
		const callback = this.getCallback();
		if (!callback) {
			return;
		}
		// we only allow execution when scene is loaded
		// to avoid errors such as an operator_path param
		// executing its callback before the node it points to is created
		if (!this.node().scene().loadingController.loaded()) {
			return;
		}
		// not running the callback when a node is cooking prevents some event nodes from behaving as expected.
		// It may also prevent files such as the sop/file to reload correctly if its reload callback was called while it loads a file
		// if (!this.node.cookController.is_cooking) {
		const parent_param = this.param().parent_param;
		if (parent_param) {
			// if the param is a component of a MultipleParam,
			// we let the parent handle the callback.
			// The main reason is for material builder uniforms.
			// If the component executes the callback, the uniform that is expecting a vector
			// will be receiving a float. The reason is that the callback is created by the ParamConfig, and it is then passed down to the component unchanged.
			// I could maybe find a way so that the param config creates callback for the multiple param
			// and also for the components. But they would have to be assigned correctly by the multiple param
			parent_param.options.executeCallback();
		} else {
			callback(this.node(), this.param());
		}
	}
	private getCallback() {
		if (this.hasCallback()) {
			return (this._options[CALLBACK_OPTION] = this._options[CALLBACK_OPTION] || this.createCallbackFromString());
		}
	}
	private createCallbackFromString() {
		const callbackString = this._options[CALLBACK_STRING_OPTION];
		if (callbackString) {
			const callback_function = new Function('node', 'scene', 'window', 'location', callbackString);
			return () => {
				callback_function(this.node(), this.node().scene(), null, null);
			};
		}
	}

	// color
	colorConversion() {
		return this._options[COLOR_CONVERSION];
	}

	// cook
	makesNodeDirtyWhenDirty() {
		let cook_options;

		// false as the dirty state will go through the parent param
		if (this.param().parent_param != null) {
			return false;
		}

		let value = true;
		if ((cook_options = this._options[COOK_OPTION]) != null) {
			value = cook_options;
		}
		return value;
	}

	// desktop
	fileBrowseOption() {
		return this._options[FILE_BROWSE_OPTION];
	}
	fileBrowseAllowed(): boolean {
		return this.fileBrowseOption() != null;
	}
	fileBrowseType(): FileType[] | null {
		const option = this.fileBrowseOption();
		if (option) {
			return option[FILE_TYPE_OPTION];
		} else {
			return null;
		}
	}

	// separator
	separatorBefore() {
		return this._options[SEPARATOR_BEFORE_OPTION];
	}
	separatorAfter() {
		return this._options[SEPARATOR_AFTER_OPTION];
	}

	// expression
	// get displays_expression_only() {
	// 	return this._options[EXPRESSION_ONLY_OPTION] === true;
	// }
	isExpressionForEntities(): boolean {
		const expr_option = this._options[EXPRESSION];
		if (expr_option) {
			return expr_option[FOR_ENTITIES] || false;
		}
		return false;
	}

	// folder
	level() {
		return this._options[LEVEL] || 0;
	}

	// menu
	hasMenu() {
		return this.menuOptions() != null || this.menuStringOptions() != null;
	}

	private menuOptions() {
		return this._options[MENU];
	}
	private menuStringOptions() {
		return this._options[MENU_STRING];
	}
	menuEntries() {
		const options = this.menuOptions() || this.menuStringOptions();
		if (options) {
			return options[ENTRIES];
		} else {
			return [];
		}
	}

	// multiline
	isMultiline(): boolean {
		return this._options[MULTILINE_OPTION] === true;
	}
	language(): StringParamLanguage | undefined {
		return this._options[LANGUAGE_OPTION];
	}
	isCode(): boolean {
		return this.language() != null;
	}

	// node selection
	nodeSelectionOptions() {
		return this._options[NODE_SELECTION];
	}
	nodeSelectionContext() {
		const options = this.nodeSelectionOptions();
		if (options) {
			return options[NODE_SELECTION_CONTEXT];
		}
	}
	nodeSelectionTypes() {
		const options = this.nodeSelectionOptions();
		if (options) {
			return options[NODE_SELECTION_TYPES];
		}
	}

	dependentOnFoundNode() {
		if (DEPENDENT_ON_FOUND_NODE in this._options) {
			return this._options[DEPENDENT_ON_FOUND_NODE];
		} else {
			return true;
		}
	}

	// param selection
	isSelectingParam() {
		return this.paramSelectionOptions() != null;
	}
	paramSelectionOptions() {
		return this._options[PARAM_SELECTION];
	}
	paramSelectionType() {
		const options = this.paramSelectionOptions();
		if (options) {
			const type_or_boolean = options;
			if (!CoreType.isBoolean(type_or_boolean)) {
				return type_or_boolean;
			}
		}
	}

	// range
	range(): Number2 {
		// cannot force range easily, as values are not necessarily from 0 to N
		// if(this.self.has_menu() && this.self.menu_entries()){
		// 	return [0, this.self.menu_entries().length-1 ]
		// } else {
		return this._options[RANGE_OPTION] || [0, 1];
		// }
	}
	step(): number | undefined {
		return this._options[STEP_OPTION];
	}

	private rangeLocked(): Boolean2 {
		// if(this.self.has_menu() && this.self.menu_entries()){
		// 	return [true, true]
		// } else {
		return this._options[RANGE_LOCKED_OPTION] || [false, false];
		// }
	}

	ensureInRange(value: number): number {
		const range = this.range();

		if (value >= range[0] && value <= range[1]) {
			return value;
		} else {
			if (value < range[0]) {
				return this.rangeLocked()[0] === true ? range[0] : value;
			} else {
				return this.rangeLocked()[1] === true ? range[1] : value;
			}
		}
	}

	// spare
	isSpare(): boolean {
		return this._options[SPARE_OPTION] || false;
	}

	// texture
	textureOptions() {
		return this._options[TEXTURE_OPTION];
	}
	textureAsEnv(): boolean {
		const texture_options = this.textureOptions();
		if (texture_options != null) {
			return texture_options[ENV_OPTION] === true;
		}
		return false;
	}

	// visible
	isHidden(): boolean {
		return this._options[HIDDEN_OPTION] === true || this._programatic_visible_state === false;
	}
	isVisible(): boolean {
		return !this.isHidden();
	}
	setVisibleState(state: boolean) {
		this._options[HIDDEN_OPTION] = !state;
		this.param().emit(ParamEvent.VISIBLE_UPDATED);
	}
	// label
	label() {
		return this._options[LABEL];
	}
	isLabelHidden(): boolean {
		const type = this.param().type();
		return (
			// this._options[SHOW_LABEL_OPTION] === false ||
			type === ParamType.BUTTON || (type === ParamType.BOOLEAN && this.isFieldHidden())
		);
	}
	isFieldHidden(): boolean {
		return this._options[FIELD_OPTION] === false;
	}

	// programatic visibility
	uiDataDependsOnOtherParams(): boolean {
		return VISIBLE_IF_OPTION in this._options;
	}
	visibilityPredecessors() {
		const visibility_options = this._options[VISIBLE_IF_OPTION];
		if (!visibility_options) {
			return [];
		}
		let predecessor_names: string[] = [];
		if (CoreType.isArray(visibility_options)) {
			predecessor_names = ArrayUtils.uniq(visibility_options.map((options) => Object.keys(options)).flat());
		} else {
			predecessor_names = Object.keys(visibility_options);
		}
		const node = this.param().node;
		return ArrayUtils.compact(
			predecessor_names.map((name) => {
				const param = node.params.get(name);
				if (param) {
					return param;
				} else {
					console.error(
						`param ${name} not found as visibility condition for ${this.param().name()} in node ${this.param().node.type()}`
					);
				}
			})
		);
	}

	private _updateVisibilityAndRemoveDirtyBound = this.updateVisibilityAndRemoveDirty.bind(this);
	private _visibility_graph_node: CoreGraphNode | undefined;
	private _ui_data_dependency_set: boolean = false;
	setUiDataDependency() {
		// currently this is only called on request on a per-param and therefore per-node basis, not on scene load for the whole scene
		if (this._ui_data_dependency_set) {
			return;
		}
		this._ui_data_dependency_set = true;
		const predecessors = this.visibilityPredecessors();
		if (predecessors.length > 0) {
			this._visibility_graph_node = new CoreGraphNode(this.param().scene(), 'param_visibility');
			for (let predecessor of predecessors) {
				this._visibility_graph_node.addGraphInput(predecessor);
			}
			this._visibility_graph_node.addPostDirtyHook(
				'_update_visibility_and_remove_dirty',
				this._updateVisibilityAndRemoveDirtyBound
			);
		}
	}
	private updateVisibilityAndRemoveDirty() {
		this.updateVisibility();
		this.param().removeDirtyState();
	}

	async updateVisibility() {
		const options = this._options[VISIBLE_IF_OPTION];
		if (options) {
			const params = this.visibilityPredecessors();
			const promises = params.map((p) => {
				if (p.isDirty()) {
					return p.compute();
				}
			});
			this._programatic_visible_state = false;
			await Promise.all(promises);

			if (CoreType.isArray(options)) {
				for (let options_set of options) {
					const satisfied_values = params.filter((param) => param.value == options_set[param.name()]);
					if (satisfied_values.length == params.length) {
						this._programatic_visible_state = true;
					}
				}
			} else {
				const satisfied_values = params.filter((param) => param.value == options[param.name()]);
				this._programatic_visible_state = satisfied_values.length == params.length;
			}

			this.param().emit(ParamEvent.VISIBLE_UPDATED);
		}
	}
}
