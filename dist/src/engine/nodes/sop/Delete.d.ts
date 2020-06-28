import { TypedSopNode } from './_Base';
import { AttribClass } from '../../../core/geometry/Constant';
import { CoreGroup } from '../../../core/geometry/Group';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
import { EntitySelectionHelper } from './utils/delete/EntitySelectionHelper';
import { ByAttributeHelper } from './utils/delete/ByAttributeHelper';
import { ByExpressionHelper } from './utils/delete/ByExpressionHelper';
import { ByBboxHelper } from './utils/delete/ByBboxHelper';
import { ByObjectTypeHelper } from './utils/delete/ByObjectTypeHelper';
declare class DeleteSopParamsConfig extends NodeParamsConfig {
    class: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    invert: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    by_object_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    object_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    separator_object_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    by_expression: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    expression: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    separator_expression: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    by_attrib: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attrib_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    attrib_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    attrib_comparison_operator: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    attrib_value1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    attrib_value2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    attrib_value3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    attrib_value4: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR4>;
    attrib_string: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    separator_attrib: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    by_bbox: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    bbox_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    bbox_center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    separator_bbox: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    keep_points: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class DeleteSopNode extends TypedSopNode<DeleteSopParamsConfig> {
    params_config: DeleteSopParamsConfig;
    static type(): string;
    private _marked_for_deletion_per_object_index;
    readonly entity_selection_helper: EntitySelectionHelper;
    readonly by_bbox_helper: ByBboxHelper;
    readonly by_expression_helper: ByExpressionHelper;
    readonly by_attribute_helper: ByAttributeHelper;
    readonly by_object_type_helper: ByObjectTypeHelper;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    set_class(attrib_class: AttribClass): void;
    private _eval_for_objects;
    private _eval_for_points;
    private _point_object;
}
export {};
