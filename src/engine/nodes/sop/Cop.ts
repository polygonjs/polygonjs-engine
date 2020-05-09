import {BaseNetworkSopNode} from './_Base';
import {NodeContext, NetworkNodeType} from '../../poly/NodeContext';
import {CopNodeChildrenMap} from '../../poly/registers/nodes/Cop';
import {BaseCopNodeType} from '../cop/_Base';

export class CopSopNode extends BaseNetworkSopNode {
	static type() {
		return NetworkNodeType.COP;
	}

	protected _children_controller_context = NodeContext.COP;

	create_node<K extends keyof CopNodeChildrenMap>(type: K): CopNodeChildrenMap[K] {
		return super.create_node(type) as CopNodeChildrenMap[K];
	}
	children() {
		return super.children() as BaseCopNodeType[];
	}
	nodes_by_type<K extends keyof CopNodeChildrenMap>(type: K): CopNodeChildrenMap[K][] {
		return super.nodes_by_type(type) as CopNodeChildrenMap[K][];
	}
}