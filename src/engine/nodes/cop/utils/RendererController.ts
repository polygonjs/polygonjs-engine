import {WebGLRenderer} from 'three/src/renderers/WebGLRenderer';
import {TypedCopNode} from '../_Base';
import {NodeParamsConfig} from '../../utils/params/ParamsConfig';
import {Poly} from '../../../Poly';
// import {LinearToneMapping} from 'three/src/constants';
// import {isBooleanTrue} from '../../../../core/BooleanValue';
class BaseCopRendererCopParamsConfig extends NodeParamsConfig {
	// useCameraRenderer = ParamConfig.BOOLEAN(0);
}
const ParamsConfig = new BaseCopRendererCopParamsConfig();
export class BaseCopRendererCopNode extends TypedCopNode<BaseCopRendererCopParamsConfig> {
	paramsConfig = ParamsConfig;
}

export class CopRendererController {
	private _renderer: WebGLRenderer | undefined;

	constructor(protected node: BaseCopRendererCopNode) {}

	async renderer() {
		// if a renderer is created when we do not need to check the current renderer limit,
		// this means that each texture node which has useCameraRenderer = false
		// will create one.
		// This will lead to a loss of WebGL Content on scene load
		// if (isBooleanTrue(this.node.pv.useCameraRenderer)) {
		return await this.cameraRenderer();
		// } else {
		// 	return (this._renderer = this._renderer || this._createRenderer());
		// }
	}
	reset() {
		this._renderer?.dispose();
		this._renderer = undefined;
	}

	async cameraRenderer() {
		let renderer = Poly.renderersController.firstRenderer();
		if (renderer) {
			return renderer;
		} else {
			return await Poly.renderersController.waitForRenderer();
		}
	}

	save_state() {
		// const prev_target = renderer.getRenderTarget();
		// renderer.getSize(this._prev_renderer_size);
		// console.log('texture', texture);
		// const prev_pixel_aspect_ratio = renderer.getPixelRatio();
		// const prev_auto_clear: boolean = renderer.autoClear;
		// renderer.toneMappingExposure = 1;
		// renderer.outputEncoding = sRGBEncoding; // should be linear

		this.make_linear();
	}

	make_linear() {
		// renderer.outputEncoding = LinearEncoding
	}

	restore_state() {
		// renderer.setRenderTarget(prev_target);
		// renderer.setSize(this._prev_renderer_size.x, this._prev_renderer_size.y);
		// renderer.setPixelRatio(prev_pixel_aspect_ratio);
		// renderer.autoClear = prev_auto_clear;
	}

	// private _createRenderer() {
	// 	const renderer = Poly.renderersController.createWebGLRenderer({});
	// 	renderer.toneMapping = LinearToneMapping;
	// 	renderer.setPixelRatio(1);
	// 	return renderer;
	// }
}
