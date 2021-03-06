import {BaseSopOperation} from './_Base';
import {DefaultOperationParams} from '../_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {Mesh} from 'three/src/objects/Mesh';
import {BufferGeometry} from 'three/src/core/BufferGeometry';
import {Object3D} from 'three/src/core/Object3D';
import {CoreLoaderGeometry, GeometryFormat} from '../../../core/loader/Geometry';
import {ASSETS_ROOT} from '../../../core/loader/AssetsUtils';

interface FileSopParams extends DefaultOperationParams {
	url: string;
	format: string;
}

const DEFAULT_URL = `${ASSETS_ROOT}/models/wolf.obj`;
export class FileSopOperation extends BaseSopOperation {
	static readonly DEFAULT_PARAMS: FileSopParams = {
		url: DEFAULT_URL,
		format: GeometryFormat.AUTO,
	};
	static type(): Readonly<'file'> {
		return 'file';
	}

	cook(input_contents: CoreGroup[], params: FileSopParams): Promise<CoreGroup> {
		const loader = new CoreLoaderGeometry(
			{url: params.url, format: params.format as GeometryFormat},
			this.scene(),
			this._node
		);

		return new Promise((resolve) => {
			loader.load(
				(objects: Object3D[]) => {
					const new_objects = this._on_load(objects);
					resolve(this.createCoreGroupFromObjects(new_objects));
				},
				(message: string) => {
					this._on_error(message, params);
				}
			);
		});
	}

	private _on_load(objects: Object3D[]) {
		objects = objects.flat();

		for (let object of objects) {
			object.traverse((child) => {
				this._ensure_geometry_has_index(child);
				child.matrixAutoUpdate = false;
			});
		}
		return objects;
	}
	private _on_error(message: string, params: FileSopParams) {
		this.states?.error.set(`could not load geometry from ${params.url} (${message})`);
	}

	private _ensure_geometry_has_index(object: Object3D) {
		const mesh = object as Mesh;
		const geometry = mesh.geometry;
		if (geometry) {
			this.createIndexIfNone(geometry as BufferGeometry);
		}
	}
}
