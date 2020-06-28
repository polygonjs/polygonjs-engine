import { TypedSopNode } from './_Base';
import { NodeContext } from '../../poly/NodeContext';
import { CoreGroup } from '../../../core/geometry/Group';
import { GlNodeChildrenMap } from '../../poly/registers/nodes/Gl';
import { BaseGlNodeType } from '../gl/_Base';
import { ParticlesSystemGpuRenderController } from './utils/ParticlesSystemGPU/RenderController';
import { ParticlesSystemGpuComputeController } from './utils/ParticlesSystemGPU/GPUComputeController';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
import { ShaderName } from '../utils/shaders/ShaderName';
import { AssemblerName } from '../../poly/registers/assemblers/_BaseRegister';
import { ParticlesPersistedConfig } from '../gl/code/assemblers/particles/PersistedConfig';
import { ParamInitValueSerialized } from '../../params/types/ParamInitValueSerialized';
declare class ParticlesSystemGpuSopParamsConfig extends NodeParamsConfig {
    start_frame: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    auto_textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    max_textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    reset: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
}
export declare class ParticlesSystemGpuSopNode extends TypedSopNode<ParticlesSystemGpuSopParamsConfig> {
    params_config: ParticlesSystemGpuSopParamsConfig;
    static type(): string;
    get assembler_controller(): import("../gl/code/Controller").GlAssemblerController<import("../gl/code/assemblers/particles/Particles").ShaderAssemblerParticles> | undefined;
    used_assembler(): Readonly<AssemblerName.GL_PARTICLES>;
    protected _assembler_controller: import("../gl/code/Controller").GlAssemblerController<import("../gl/code/assemblers/particles/Particles").ShaderAssemblerParticles> | undefined;
    private _create_assembler_controller;
    readonly persisted_config: ParticlesPersistedConfig;
    private globals_handler;
    private _shaders_by_name;
    shaders_by_name(): Map<ShaderName, string>;
    readonly gpu_controller: ParticlesSystemGpuComputeController;
    readonly render_controller: ParticlesSystemGpuRenderController;
    static require_webgl2(): boolean;
    static PARAM_CALLBACK_reset(node: ParticlesSystemGpuSopNode): void;
    PARAM_CALLBACK_reset(): void;
    static displayed_input_names(): string[];
    private _reset_material_if_dirty_bound;
    protected _children_controller_context: NodeContext;
    private _on_create_prepare_material_bound;
    initialize_node(): void;
    create_node<K extends keyof GlNodeChildrenMap>(type: K, params_init_value_overrides?: Dictionary<ParamInitValueSerialized>): GlNodeChildrenMap[K];
    children(): BaseGlNodeType[];
    nodes_by_type<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][];
    children_allowed(): boolean;
    _reset_material_if_dirty(): Promise<void>;
    is_on_frame_start(): boolean;
    cook(input_contents: CoreGroup[]): Promise<void>;
    compile_if_required(): Promise<void>;
    run_assembler(): Promise<void>;
    private _set_shader_names;
    init_with_persisted_config(): void;
    private _find_export_nodes;
    private _on_create_prepare_material;
}
export {};
