import { TypedSopNode } from './_Base';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
declare class FileSopParamsConfig extends NodeParamsConfig {
    url: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    reload: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
}
export declare class FileSopNode extends TypedSopNode<FileSopParamsConfig> {
    params_config: FileSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): void;
    private _on_load;
    private _on_error;
    static PARAM_CALLBACK_reload(node: FileSopNode): void;
    private param_callback_reload;
}
export {};