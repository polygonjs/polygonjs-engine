import {WebGLRenderer, WebGLRendererParameters} from 'three/src/renderers/WebGLRenderer';
import {WebGLRenderTarget, WebGLRenderTargetOptions} from 'three/src/renderers/WebGLRenderTarget';
import {WebGLMultisampleRenderTarget} from 'three/src/renderers/WebGLMultisampleRenderTarget';
import {PolyDictionary} from '../../types/GlobalTypes';

interface POLYWebGLRenderer extends WebGLRenderer {
	_polygon_id: number;
}

const CONTEXT_OPTIONS = {
	// antialias: false, // leave that to the renderer node
	// preserveDrawingBuffer: true, // this could only be useful to capture static images
};

type Callback = (value: WebGLRenderer) => void;

enum WebGLContext {
	WEBGL = 'webgl',
	WEBGL2 = 'webgl2',
	EXPERIMENTAL_WEBGL = 'experimental-webgl',
	EXPERIMENTAL_WEBGL2 = 'experimental-webgl2',
}

export class RenderersController {
	private _next_renderer_id: number = 0;
	private _renderers: PolyDictionary<WebGLRenderer> = {};
	private _printDebug = false;
	private _require_webgl2: boolean = false;
	private _resolves: Callback[] = [];
	private _webgl2_available: boolean | undefined;
	// private _env_maps: TextureByString = {};
	// private _next_env_map_id: number = 0;

	constructor() {}

	setPrintDebug(state: boolean = true) {
		this._printDebug = state;
	}
	printDebug() {
		return this._printDebug;
	}
	printDebugMessage(message: any) {
		if (!this._printDebug) {
			return;
		}
		console.warn('[Poly debug]', message);
	}

	setRequireWebGL2() {
		if (!this._require_webgl2) {
			this._require_webgl2 = true;
		}
	}
	webgl2Available() {
		if (this._webgl2_available === undefined) {
			this._webgl2_available = this._set_webgl2_available();
		}
		return this._webgl2_available;
	}
	private _set_webgl2_available() {
		const canvas = document.createElement('canvas');
		return (window.WebGL2RenderingContext && canvas.getContext(WebGLContext.WEBGL2)) != null;
	}

	createWebGLRenderer(params: WebGLRendererParameters) {
		const renderer = new WebGLRenderer(params);
		this.printDebugMessage([`create renderer:`, params]);
		return renderer;
	}

	createRenderingContext(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
		let gl: WebGLRenderingContext | null = null;
		if (this._require_webgl2) {
			gl = this._getRenderingContextWebgl(canvas, true);
			if (!gl) {
				console.warn('failed to create webgl2 context');
			}
		}
		if (!gl) {
			gl = this._getRenderingContextWebgl(canvas, false);
		}

		// gl.getExtension('OES_standard_derivatives') // for derivative normals, but it cannot work at the moment (see node Gl/DerivativeNormals)
		// to test data texture
		// gl.getExtension('OES_texture_float')
		// gl.getExtension('OES_texture_float_linear')

		return gl;
	}
	private _getRenderingContextWebgl(canvas: HTMLCanvasElement, webgl2: boolean): WebGLRenderingContext | null {
		let context_name: WebGLContext;
		if (this.webgl2Available()) {
			context_name = WebGLContext.WEBGL2;
		} else {
			context_name = webgl2 ? WebGLContext.WEBGL2 : WebGLContext.WEBGL;
		}
		let gl = canvas.getContext(context_name, CONTEXT_OPTIONS);
		if (gl) {
			this.printDebugMessage(`create gl context: ${context_name}.`);
		} else {
			context_name = webgl2 ? WebGLContext.EXPERIMENTAL_WEBGL2 : WebGLContext.EXPERIMENTAL_WEBGL;
			this.printDebugMessage(`create gl context: ${context_name}.`);
			gl = canvas.getContext(context_name, CONTEXT_OPTIONS);
		}
		return gl as WebGLRenderingContext | null;
	}

	registerRenderer(renderer: WebGLRenderer) {
		if ((renderer as POLYWebGLRenderer)._polygon_id) {
			throw new Error('render already registered');
		}
		(renderer as POLYWebGLRenderer)._polygon_id = this._next_renderer_id += 1;

		this._renderers[(renderer as POLYWebGLRenderer)._polygon_id] = renderer;

		if (Object.keys(this._renderers).length == 1) {
			this.flush_callbacks_with_renderer(renderer);
		}
	}
	deregisterRenderer(renderer: WebGLRenderer) {
		delete this._renderers[(renderer as POLYWebGLRenderer)._polygon_id];
		renderer.dispose();
	}
	firstRenderer(): WebGLRenderer | null {
		const first_id = Object.keys(this._renderers)[0];
		if (first_id) {
			return this._renderers[first_id];
		}
		return null;
	}
	renderers(): WebGLRenderer[] {
		return Object.values(this._renderers);
	}

	private flush_callbacks_with_renderer(renderer: WebGLRenderer) {
		let callback: Callback | undefined;
		while ((callback = this._resolves.pop())) {
			callback(renderer);
		}
	}

	async waitForRenderer(): Promise<WebGLRenderer> {
		const renderer = this.firstRenderer();
		if (renderer) {
			return renderer;
		} else {
			return new Promise((resolve, reject) => {
				this._resolves.push(resolve);
			});
		}
	}

	renderTarget(width: number, height: number, parameters: WebGLRenderTargetOptions) {
		if (this.webgl2Available()) {
			return new WebGLMultisampleRenderTarget(width, height, parameters);
		} else {
			return new WebGLRenderTarget(width, height, parameters);
		}
	}
}
