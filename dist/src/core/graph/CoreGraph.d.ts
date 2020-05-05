/// <reference path="../../../../src/core/graph/dagre.d.ts" />
import { Graph } from '@dagrejs/graphlib';
import { PolyScene } from '../../engine/scene/PolyScene';
export declare type CoreGraphNodeId = string;
import { CoreGraphNode } from './CoreGraphNode';
export declare class CoreGraph {
    _graph: Graph;
    _next_id: number;
    _scene: PolyScene | undefined;
    constructor();
    graph(): Graph;
    set_scene(scene: PolyScene): void;
    scene(): PolyScene | undefined;
    next_id(): CoreGraphNodeId;
    setNode(node: CoreGraphNode): void;
    removeNode(node: CoreGraphNode): void;
    nodes_from_ids(ids: string[]): CoreGraphNode[];
    node_from_id(id: string): CoreGraphNode;
    connect(src: CoreGraphNode, dest: CoreGraphNode): boolean;
    disconnect(src: CoreGraphNode, dest: CoreGraphNode): void;
    disconnect_predecessors(node: CoreGraphNode): void;
    disconnect_successors(node: CoreGraphNode): void;
    predecessor_ids(id: CoreGraphNodeId): string[];
    predecessors(node: CoreGraphNode): CoreGraphNode[];
    successor_ids(id: string): CoreGraphNodeId[];
    successors(node: CoreGraphNode): CoreGraphNode[];
    private all_next_ids;
    all_predecessor_ids(node: CoreGraphNode): CoreGraphNodeId[];
    all_successor_ids(node: CoreGraphNode): CoreGraphNodeId[];
    all_predecessors(node: CoreGraphNode): CoreGraphNode[];
    all_successors(node: CoreGraphNode): CoreGraphNode[];
}
