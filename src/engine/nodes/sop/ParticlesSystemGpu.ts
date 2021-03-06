/**
 * Allows to create particle systems that will run on the GPU using gl nodes.
 *
 * @remarks
 * TBD
 *
 *
 */

// SPECS:
// - simulation shaders should update the particles at any frame, and resimulate accordingly when at later frames
// - render material should update at any frame, without having to resimulate
// - changing the input will recompute, when on first frame only (otherwise an animated geo could make it recompute all the time)

import {Constructor, valueof} from '../../../types/GlobalTypes';
import {TypedSopNode} from './_Base';
import {GlobalsTextureHandler} from '../gl/code/globals/Texture';

import {InputCloneMode} from '../../poly/InputCloneMode';
import {BaseNodeType} from '../_Base';
import {BaseParamType} from '../../params/_Base';
import {NodeContext} from '../../poly/NodeContext';
import {CoreGroup} from '../../../core/geometry/Group';
import {GlNodeChildrenMap} from '../../poly/registers/nodes/Gl';
import {BaseGlNodeType} from '../gl/_Base';
import {ParticlesSystemGpuRenderController} from './utils/ParticlesSystemGPU/RenderController';
import {
	ParticlesSystemGpuComputeController,
	PARTICLE_DATA_TYPES,
} from './utils/ParticlesSystemGPU/GPUComputeController';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {ShaderName} from '../utils/shaders/ShaderName';
import {GlNodeFinder} from '../gl/code/utils/NodeFinder';
import {AssemblerName} from '../../poly/registers/assemblers/_BaseRegister';
import {Poly} from '../../Poly';
import {ParticlesPersistedConfig} from '../gl/code/assemblers/particles/PersistedConfig';
import {ParamsInitData} from '../utils/io/IOController';
import {TimeController} from '../../scene/utils/TimeController';

class ParticlesSystemGpuSopParamsConfig extends NodeParamsConfig {
	/** @param frame the particles simulation starts */
	startFrame = ParamConfig.FLOAT(TimeController.START_FRAME, {
		range: [0, 1000],
		rangeLocked: [true, false],
	});
	/** @param auto sets the resolution of the textures used by the GPU shaders */
	autoTexturesSize = ParamConfig.BOOLEAN(1);
	/** @param max texture size. This is important to set a limit, as some systems may not handle large textures for particle sims */
	maxTexturesSize = ParamConfig.VECTOR2([1024, 1024], {visibleIf: {autoTexturesSize: 1}});
	/** @param sets the texture size manually */
	texturesSize = ParamConfig.VECTOR2([64, 64], {visibleIf: {autoTexturesSize: 0}});
	/** @param data type used by the solver */
	dataType = ParamConfig.INTEGER(0, {
		menu: {
			entries: PARTICLE_DATA_TYPES.map((value, index) => {
				return {value: index, name: value};
			}),
		},
	});
	/** @param resets the sim */
	reset = ParamConfig.BUTTON(null, {
		callback: (node: BaseNodeType, param: BaseParamType) => {
			ParticlesSystemGpuSopNode.PARAM_CALLBACK_reset(node as ParticlesSystemGpuSopNode);
		},
	});

	/** @param material used to render the particles */
	material = ParamConfig.OPERATOR_PATH('', {
		nodeSelection: {
			context: NodeContext.MAT,
		},
		dependentOnFoundNode: false,
	});
}
const ParamsConfig = new ParticlesSystemGpuSopParamsConfig();
export class ParticlesSystemGpuSopNode extends TypedSopNode<ParticlesSystemGpuSopParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'particlesSystemGpu';
	}

	dispose() {
		super.dispose();
		this.gpuController.dispose();
	}

	get assemblerController() {
		return this._assembler_controller;
	}
	public usedAssembler(): Readonly<AssemblerName.GL_PARTICLES> {
		return AssemblerName.GL_PARTICLES;
	}
	protected _assembler_controller = this._create_assembler_controller();
	private _create_assembler_controller() {
		return Poly.assemblersRegister.assembler(this, this.usedAssembler());
	}
	public readonly persisted_config: ParticlesPersistedConfig = new ParticlesPersistedConfig(this);
	private globals_handler = new GlobalsTextureHandler(GlobalsTextureHandler.PARTICLE_SIM_UV);
	private _shaders_by_name: Map<ShaderName, string> = new Map();
	shaders_by_name() {
		return this._shaders_by_name;
	}

	public readonly gpuController = new ParticlesSystemGpuComputeController(this);
	public readonly renderController = new ParticlesSystemGpuRenderController(this);

	static require_webgl2() {
		return true;
	}
	static PARAM_CALLBACK_reset(node: ParticlesSystemGpuSopNode) {
		node.PARAM_CALLBACK_reset();
	}
	PARAM_CALLBACK_reset() {
		this.gpuController.reset_gpu_compute_and_set_dirty();
	}

	static displayedInputNames(): string[] {
		return ['points to emit particles from'];
	}

	private _reset_material_if_dirty_bound = this._reset_material_if_dirty.bind(this);
	protected _children_controller_context = NodeContext.GL;
	initializeNode() {
		this.io.inputs.setCount(1);
		// set to never at the moment
		// otherwise the input is cloned on every frame inside cook_main()
		this.io.inputs.initInputsClonedState(InputCloneMode.NEVER);

		this.addPostDirtyHook('_reset_material_if_dirty', this._reset_material_if_dirty_bound);
	}

	createNode<S extends keyof GlNodeChildrenMap>(
		node_class: S,
		params_init_value_overrides?: ParamsInitData
	): GlNodeChildrenMap[S];
	createNode<K extends valueof<GlNodeChildrenMap>>(
		node_class: Constructor<K>,
		params_init_value_overrides?: ParamsInitData
	): K;
	createNode<K extends valueof<GlNodeChildrenMap>>(
		node_class: Constructor<K>,
		params_init_value_overrides?: ParamsInitData
	): K {
		return super.createNode(node_class, params_init_value_overrides) as K;
	}
	children() {
		return super.children() as BaseGlNodeType[];
	}
	nodesByType<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][] {
		return super.nodesByType(type) as GlNodeChildrenMap[K][];
	}
	childrenAllowed() {
		if (this.assemblerController) {
			return super.childrenAllowed();
		}
		this.scene().markAsReadOnly(this);
		return false;
	}

	async _reset_material_if_dirty() {
		if (this.p.material.isDirty()) {
			this.renderController.reset_render_material();
			if (!this.is_on_frame_start()) {
				await this.renderController.init_render_material();
			}
		}
	}

	is_on_frame_start(): boolean {
		return this.scene().frame() == this.pv.startFrame;
	}

	async cook(input_contents: CoreGroup[]) {
		this.gpuController.set_restart_not_required();
		const core_group = input_contents[0];

		this.compileIfRequired();

		if (this.is_on_frame_start()) {
			this.gpuController.reset_particle_groups();
		}

		if (!this.gpuController.initialized()) {
			await this.gpuController.init(core_group);
		}

		if (!this.renderController.initialized()) {
			this.renderController.init_core_group(core_group);
			await this.renderController.init_render_material();
		}

		this.gpuController.restart_simulation_if_required();
		this.gpuController.compute_similation_if_required();

		if (this.is_on_frame_start()) {
			this.setCoreGroup(core_group);
		} else {
			this.cookController.endCook();
		}
	}
	async compileIfRequired() {
		if (this.assemblerController?.compileRequired()) {
			await this.run_assembler();
		}
	}
	async run_assembler() {
		const assemblerController = this.assemblerController;
		if (!assemblerController) {
			return;
		}
		const export_nodes = this._find_export_nodes();
		if (export_nodes.length > 0) {
			const root_nodes = export_nodes;
			assemblerController.set_assembler_globals_handler(this.globals_handler);
			assemblerController.assembler.set_root_nodes(root_nodes);

			assemblerController.assembler.compile();
			assemblerController.post_compile();
		}

		const shaders_by_name = assemblerController.assembler.shaders_by_name();
		this._setShaderNames(shaders_by_name);
	}

	private _setShaderNames(shaders_by_name: Map<ShaderName, string>) {
		this._shaders_by_name = shaders_by_name;

		this.gpuController.setShadersByName(this._shaders_by_name);
		this.renderController.setShadersByName(this._shaders_by_name);

		this.gpuController.reset_gpu_compute();
		this.gpuController.reset_particle_groups();
	}

	init_with_persisted_config() {
		const shaders_by_name = this.persisted_config.shaders_by_name();
		const texture_allocations_controller = this.persisted_config.texture_allocations_controller();
		if (shaders_by_name && texture_allocations_controller) {
			this._setShaderNames(shaders_by_name);
			this.gpuController.set_persisted_texture_allocation_controller(texture_allocations_controller);
		}
	}

	private _find_export_nodes() {
		const nodes: BaseGlNodeType[] = GlNodeFinder.findAttributeExportNodes(this);
		const output_nodes = GlNodeFinder.findOutputNodes(this);
		if (output_nodes.length > 1) {
			this.states.error.set('only one output node is allowed');
			return [];
		}
		const output_node = output_nodes[0];
		if (output_node) {
			nodes.push(output_node);
		}
		return nodes;
	}
}
