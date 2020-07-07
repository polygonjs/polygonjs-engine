import { TypedSopNode } from './_Base';
import { CoreGroup } from '../../../core/geometry/Group';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
declare class Circle3PointsSopParamsConfig extends NodeParamsConfig {
    arc: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    points_count_mode: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    segments_length: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    full: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    join_mode: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    add_id_attribute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    add_idn_attribute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class Circle3PointsSopNode extends TypedSopNode<Circle3PointsSopParamsConfig> {
    params_config: Circle3PointsSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private a;
    private b;
    private c;
    private an;
    private bn;
    private cn;
    private ac;
    private ab;
    private ab_x_ac;
    private part0;
    private part1;
    private divider;
    private a_center;
    private center;
    private normal;
    private radius;
    private x;
    private y;
    private z;
    private angle_ab;
    private angle_ac;
    private angle_bc;
    private angle;
    private x_rotated;
    private _created_objects;
    private _create_circle;
    private _compute_axis;
    private _compute_angle;
    private _set_x_from_join_mode;
    private _set_angle_from_join_mode;
    private _create_arc;
    private _points_count;
    private _create_center;
}
export {};