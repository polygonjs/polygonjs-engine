import {BaseNodeType} from '../../nodes/_Base';
import {BaseParamType} from '../../params/_Base';
import {MissingExpressionReference} from '../../expressions/MissingReference';
import jsep from 'jsep';
import {MapUtils} from '../../../core/MapUtils';

// type MissingExpressionReferenceById = Map<number, MissingExpressionReference>;
// type MissingExpressionReferenceByIdByPath = Map<string, MissingExpressionReferenceById>;

export class MissingReferencesController {
	private references: Map<string, MissingExpressionReference[]> = new Map<string, MissingExpressionReference[]>();

	register(param: BaseParamType, jsep_node: jsep.Expression, path_argument: string): MissingExpressionReference {
		const missing_expression_reference = new MissingExpressionReference(param, path_argument);

		MapUtils.push_on_array_at_entry(this.references, param.graph_node_id, missing_expression_reference);

		return missing_expression_reference;
	}
	deregister_param(param: BaseParamType) {
		this.references.delete(param.graph_node_id);
	}

	//
	//
	// MISSING REFERENCES
	//
	//
	// call this from node.create and node.rename
	check_for_missing_references(node: BaseNodeType) {
		this._check_for_missing_references_for_node(node);
		for (let param of node.params.all) {
			this._check_for_missing_references_for_param(param);
		}
	}
	private _check_for_missing_references_for_node(node: BaseNodeType) {
		const id = node.graph_node_id;

		this.references.forEach((missing_references, node_id) => {
			let match_found = false;
			for (let ref of missing_references) {
				if (ref.matches_path(node.full_path())) {
					match_found = true;
					ref.resolve_missing_dependencies();
				}
			}
			if (match_found) {
				this.references.delete(id);
			}
		});
	}
	private _check_for_missing_references_for_param(param: BaseParamType) {
		const id = param.graph_node_id;

		this.references.forEach((missing_references, node_id) => {
			let match_found = false;
			for (let ref of missing_references) {
				if (ref.matches_path(param.full_path())) {
					match_found = true;
					ref.resolve_missing_dependencies();
				}
			}
			if (match_found) {
				this.references.delete(id);
			}
		});
	}
}