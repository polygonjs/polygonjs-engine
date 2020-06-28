import { Object3D } from 'three/src/core/Object3D';
import { ModuleName } from '../../engine/poly/registers/modules/_BaseRegister';
export declare class CoreLoaderGeometry {
    private url;
    private assets_root;
    readonly ext: string;
    private static _default_mat_mesh;
    private static _default_mat_point;
    private static _default_mat_line;
    constructor(url: string, assets_root: string | null);
    static get_extension(url: string): string;
    load(on_success: (objects: Object3D[]) => void, on_error: (error: string) => void): void;
    private load_auto;
    private on_load_success;
    private on_load_succes_drc;
    private on_load_succes_gltf;
    private on_load_succes_pdb;
    static module_names(ext: string): ModuleName[] | void;
    loader_for_ext(): Promise<import("../../../modules/three/examples/jsm/loaders/DRACOLoader").DRACOLoader | import("../../../modules/three/examples/jsm/loaders/FBXLoader").FBXLoader | import("../../../modules/three/examples/jsm/loaders/GLTFLoader").GLTFLoader | import("../../../modules/three/examples/jsm/loaders/OBJLoader2").OBJLoader2 | import("../../../modules/three/examples/jsm/loaders/PDBLoader").PDBLoader | import("../../../modules/three/examples/jsm/loaders/PLYLoader").PLYLoader | undefined>;
    loader_for_drc(): Promise<import("../../../modules/three/examples/jsm/loaders/DRACOLoader").DRACOLoader | undefined>;
    loader_for_fbx(): Promise<import("../../../modules/three/examples/jsm/loaders/FBXLoader").FBXLoader | undefined>;
    loader_for_gltf(): Promise<import("../../../modules/three/examples/jsm/loaders/GLTFLoader").GLTFLoader | undefined>;
    loader_for_glb(): Promise<import("../../../modules/three/examples/jsm/loaders/GLTFLoader").GLTFLoader | undefined>;
    loader_for_obj(): Promise<import("../../../modules/three/examples/jsm/loaders/OBJLoader2").OBJLoader2 | undefined>;
    loader_for_pdb(): Promise<import("../../../modules/three/examples/jsm/loaders/PDBLoader").PDBLoader | undefined>;
    loader_for_ply(): Promise<import("../../../modules/three/examples/jsm/loaders/PLYLoader").PLYLoader | undefined>;
}
