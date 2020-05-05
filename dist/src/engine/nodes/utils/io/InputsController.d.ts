import { CoreGraphNode } from '../../../../core/graph/CoreGraphNode';
import { NodeContext } from '../../../poly/NodeContext';
import { ConnectionPointTypeMap } from './connections/ConnectionMap';
import { TypedNode } from '../../_Base';
import { ContainerMap, NodeTypeMap } from '../../../containers/utils/ContainerMap';
import { InputCloneMode } from '../../../poly/InputCloneMode';
declare type OnUpdateHook = () => void;
export declare class InputsController<NC extends NodeContext> {
    node: TypedNode<NC, any>;
    private _graph_node;
    private _graph_node_inputs;
    private _inputs;
    private _has_named_inputs;
    private _named_input_connection_points;
    private _min_inputs_count;
    private _max_inputs_count;
    private _depends_on_inputs;
    private _on_update_hooks;
    private _on_update_hook_names;
    constructor(node: TypedNode<NC, any>);
    set_depends_on_inputs(depends_on_inputs: boolean): void;
    private set_min_inputs_count;
    private set_max_inputs_count;
    named_input_connection_points_by_name(name: string): ConnectionPointTypeMap[NC] | undefined;
    set_named_input_connection_points(connection_points: ConnectionPointTypeMap[NC][]): void;
    get has_named_inputs(): boolean;
    get named_input_connection_points(): ConnectionPointTypeMap[NC][];
    private init_graph_node_inputs;
    private _create_graph_node_input;
    get max_inputs_count(): number;
    input_graph_node(input_index: number): CoreGraphNode;
    set_count(min: number, max?: number): void;
    private init_connections_controller_inputs;
    is_any_input_dirty(): boolean;
    containers_without_evaluation(): (ContainerMap[NC] | null | undefined)[];
    existing_input_indices(): number[];
    eval_required_inputs(): Promise<(ContainerMap[NC] | null | undefined)[]>;
    eval_required_input(input_index: number): Promise<ContainerMap[NC] | null>;
    get_named_input_index(name: string): number;
    get_input_index(input_index_or_name: number | string): number;
    set_input(input_index_or_name: number | string, node: NodeTypeMap[NC] | null, output_index_or_name?: number | string): void;
    remove_input(node: NodeTypeMap[NC]): void;
    input(input_index: number): NodeTypeMap[NC] | null;
    named_input(input_name: string): NodeTypeMap[NC] | null;
    named_input_connection_point(input_name: string): ConnectionPointTypeMap[NC] | undefined;
    has_named_input(name: string): boolean;
    has_input(input_index: number): boolean;
    inputs(): (NodeTypeMap[NC] | null)[];
    private _cloned_states_controller;
    init_inputs_cloned_state(states: InputCloneMode | InputCloneMode[]): void;
    override_cloned_state_allowed(): boolean;
    override_cloned_state(state: boolean): void;
    cloned_state_overriden(): boolean;
    clone_required(index: number): boolean;
    clone_required_states(): boolean | boolean[];
    add_on_set_input_hook(name: string, hook: OnUpdateHook): void;
    private _run_on_set_input_hooks;
}
export {};
