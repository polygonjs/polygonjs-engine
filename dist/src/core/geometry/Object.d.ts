import { Object3D } from 'three/src/core/Object3D';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { CoreGeometry } from './Geometry';
import { GroupString } from './Group';
import { CorePoint } from './Point';
import { CoreEntity } from './Entity';
export declare class CoreObject extends CoreEntity {
    private _object;
    constructor(_object: Object3D, index: number);
    object(): Object3D;
    geometry(): BufferGeometry | null;
    core_geometry(): CoreGeometry | null;
    points(): CorePoint[];
    points_from_group(group: GroupString): CorePoint[];
    compute_vertex_normals(): void;
    add_attribute(name: string, value: AttribValue): void;
    add_numeric_attrib(name: string, value: NumericAttribValue): void;
    set_attrib_value(name: string, value: AttribValue): void;
    add_numeric_vertex_attrib(name: string, size: number, default_value: NumericAttribValue): void;
    attribute_names(): string[];
    attrib_names(): string[];
    has_attrib(name: string): boolean;
    rename_attribute(old_name: string, new_name: string): void;
    delete_attribute(name: string): void;
    attrib_value(name: string): AttribValue;
    name(): string;
    human_type(): string;
    attrib_type(name: string): number;
    attrib_size(name: string): 1 | 0 | 2 | 3;
    clone(): Object3D;
    static clone(src_object: Object3D): Object3D;
    static parallelTraverse(a: Object3D, b: Object3D, callback: (a: Object3D, b: Object3D) => void): void;
}