import {CATEGORY_COP} from './Category';

import {BuilderCopNode} from '../../../nodes/cop/Builder';
import {EnvMapCopNode} from '../../../nodes/cop/EnvMap';
import {FileCopNode} from '../../../nodes/cop/File';
import {NullCopNode} from '../../../nodes/cop/Null';
import {SwitchCopNode} from '../../../nodes/cop/Switch';

export interface CopNodeChildrenMap {
	builder: BuilderCopNode;
	env_map: EnvMapCopNode;
	file: FileCopNode;
	null: NullCopNode;
	switch: SwitchCopNode;
}

import {Poly} from '../../../Poly';
export class CopRegister {
	static run(poly: Poly) {
		poly.register_node(BuilderCopNode, CATEGORY_COP.ADVANCED);
		poly.register_node(EnvMapCopNode, CATEGORY_COP.INPUT);
		poly.register_node(FileCopNode, CATEGORY_COP.INPUT);
		poly.register_node(NullCopNode, CATEGORY_COP.MISC);
		poly.register_node(SwitchCopNode, CATEGORY_COP.MISC);
	}
}