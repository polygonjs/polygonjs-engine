import { BaseGlNodeType } from '../../_Base';
import { BaseNodeType } from '../../../_Base';
import { BaseGlShaderAssembler } from '../assemblers/_Base';
import { ShaderName } from '../../../utils/shaders/ShaderName';
import { ParamConfigsController } from '../../../../nodes/utils/code/controllers/ParamConfigsController';
import { LineType } from './LineType';
export declare class CodeBuilder {
    private _assembler;
    private _gl_parent_node;
    _param_configs_controller: ParamConfigsController;
    _param_configs_set_allowed: boolean;
    private _shaders_collection_controller;
    _lines: Map<ShaderName, Map<LineType, string[]>>;
    _function_declared: Map<ShaderName, Map<string, boolean>>;
    constructor(_assembler: BaseGlShaderAssembler, _gl_parent_node: BaseNodeType);
    build_from_nodes(root_nodes: BaseGlNodeType[]): Promise<void>;
    disallow_new_param_configs(): void;
    allow_new_param_configs(): void;
    shader_names(): ShaderName[];
    private reset;
    param_configs(): readonly import("../../../utils/code/configs/ParamConfig").ParamConfig<import("../../../../poly/ParamType").ParamType>[];
    lines(shader_name: ShaderName, line_type: LineType): string[] | undefined;
    all_lines(): Map<ShaderName, Map<LineType, string[]>>;
    set_param_configs(nodes: BaseGlNodeType[]): void;
    set_code_lines(nodes: BaseGlNodeType[]): void;
    add_code_lines(nodes: BaseGlNodeType[], shader_name: ShaderName): void;
    private add_definitions;
    add_code_line_for_nodes_and_line_type(nodes: BaseGlNodeType[], shader_name: ShaderName, line_type: LineType): void;
    add_code_line_for_node_and_line_type(node: BaseGlNodeType, shader_name: ShaderName, line_type: LineType, is_last: boolean): void;
}