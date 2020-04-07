import { BuilderCopNode } from '../../nodes/cop/Builder';
import { EnvMapCopNode } from '../../nodes/cop/EnvMap';
import { FileCopNode } from '../../nodes/cop/File';
import { NullCopNode } from '../../nodes/cop/Null';
import { SwitchCopNode } from '../../nodes/cop/Switch';
export interface CopNodeChildrenMap {
    builder: BuilderCopNode;
    env_map: EnvMapCopNode;
    file: FileCopNode;
    null: NullCopNode;
    switch: SwitchCopNode;
}
import { Poly } from '../../Poly';
export declare class CopRegister {
    static run(poly: Poly): void;
}