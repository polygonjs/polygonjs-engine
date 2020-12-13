import { ParamLessBaseNetworkSopNode } from './_Base';
import { NodeContext, NetworkNodeType } from '../../poly/NodeContext';
import { AnimNodeChildrenMap } from '../../poly/registers/nodes/Anim';
import { BaseAnimNodeType } from '../anim/_Base';
import { ParamsInitData } from '../utils/io/IOController';
export declare class AnimationsSopNode extends ParamLessBaseNetworkSopNode {
    static type(): NetworkNodeType;
    protected _children_controller_context: NodeContext;
    createNode<S extends keyof AnimNodeChildrenMap>(node_class: S, params_init_value_overrides?: ParamsInitData): AnimNodeChildrenMap[S];
    createNode<K extends valueof<AnimNodeChildrenMap>>(node_class: Constructor<K>, params_init_value_overrides?: ParamsInitData): K;
    children(): BaseAnimNodeType[];
    nodes_by_type<K extends keyof AnimNodeChildrenMap>(type: K): AnimNodeChildrenMap[K][];
}