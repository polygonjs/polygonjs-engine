/**
 * Imports a gif file.
 *
 */
import {Constructor} from '../../../types/GlobalTypes';
import {Texture} from 'three/src/textures/Texture';
import {TypedCopNode} from './_Base';
import {CoreLoaderTexture} from '../../../core/loader/Texture';
import {BaseNodeType} from '../_Base';
import {BaseParamType} from '../../params/_Base';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {FileType} from '../../params/utils/OptionsController';
import {TextureParamsController, TextureParamConfig} from './utils/TextureParamsController';
import {CoreBaseLoader} from '../../../core/loader/_Base';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {CanvasTexture} from 'three/src/textures/CanvasTexture';
import {parseGIF, decompressFrames, ParsedFrame} from 'gifuct-js';
import {isBooleanTrue} from '../../../core/BooleanValue';

export function GifCopParamConfig<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		/** @param url to fetch the gif from */
		url = ParamConfig.STRING(CoreLoaderTexture.PARAM_DEFAULT, {
			fileBrowse: {type: [FileType.TEXTURE_IMAGE]},
		});
		/** @param reload the image */
		reload = ParamConfig.BUTTON(null, {
			callback: (node: BaseNodeType, param: BaseParamType) => {
				GifCopNode.PARAM_CALLBACK_reload(node as GifCopNode);
			},
		});
		/** @param play the gif */
		play = ParamConfig.BOOLEAN(1, {
			cook: false,
			callback: (node: BaseNodeType) => {
				GifCopNode.PARAM_CALLBACK_gifUpdatePlay(node as GifCopNode);
			},
		});
		/** @param set the gif frame */
		gifFrame = ParamConfig.INTEGER(0, {
			cook: false,
			range: [0, 100],
			rangeLocked: [true, false],
			callback: (node: BaseNodeType) => {
				GifCopNode.PARAM_CALLBACK_gifUpdateFrameIndex(node as GifCopNode);
			},
		});
	};
}
class GifCopParamsConfig extends TextureParamConfig(GifCopParamConfig(NodeParamsConfig)) {}

const ParamsConfig = new GifCopParamsConfig();

export class GifCopNode extends TypedCopNode<GifCopParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'gif';
	}
	async requiredModules() {
		if (this.p.url.isDirty()) {
			await this.p.url.compute();
		}
		const ext = CoreBaseLoader.extension(this.pv.url || '');
		return CoreLoaderTexture.module_names(ext);
	}

	public readonly textureParamsController: TextureParamsController = new TextureParamsController(this);

	static displayedInputNames(): string[] {
		return ['optional texture to copy attributes from'];
	}

	initializeNode() {
		this.io.inputs.setCount(0, 1);
		this.io.inputs.initInputsClonedState(InputCloneMode.NEVER);
		this.scene().dispatchController.onAddListener(() => {
			this.params.onParamsCreated('params_label', () => {
				let params: BaseParamType[] = [this.p.url];
				params = params.concat(this.textureParamsController.paramLabelsParams());
				this.params.label.init(params, () => {
					const url = this.p.url.rawInput();
					if (url) {
						const elements = url.split('/');
						const urlLabel = elements[elements.length - 1];
						const textureLabels = this.textureParamsController.paramLabels();
						return [urlLabel].concat(textureLabels);
					} else {
						return '';
					}
				});
			});
		});
	}
	async cook(input_contents: Texture[]) {
		const response = await fetch(this.pv.url);
		const buffer = await response.arrayBuffer();
		const gif = await parseGIF(buffer);
		const buildImagePatches = true;
		this._parsedFrames = await decompressFrames(gif, buildImagePatches);
		const firstFrame = this._parsedFrames[0];
		this._frameDelay = firstFrame.delay;
		this._frameIndex = this.pv.gifFrame - 1;

		this._createCanvas();
		if (!this._gifCanvasElement) {
			this.states.error.set('failed to create canvas');
		} else {
			const texture = new CanvasTexture(this._gifCanvasElement);
			await this.textureParamsController.update(texture);
			this.setTexture(texture);
		}
	}
	private _gifCanvasElement: HTMLCanvasElement | undefined;
	private _gifCanvasContext: CanvasRenderingContext2D | null = null;
	private _tmpCanvasElement: HTMLCanvasElement | undefined;
	private _tmpCanvasContext: CanvasRenderingContext2D | null = null;
	private _parsedFrames: ParsedFrame[] = [];
	private _frameDelay = 100;
	private _frameIndex = 0;
	private _frameImageData: ImageData | undefined;
	private _createCanvas() {
		const gifFrame = this._parsedFrames[0];
		this._gifCanvasElement = document.createElement('canvas');
		this._tmpCanvasElement = document.createElement('canvas');
		this._gifCanvasElement.width = gifFrame.dims.width;
		this._gifCanvasElement.height = gifFrame.dims.height;
		this._tmpCanvasElement.width = gifFrame.dims.width;
		this._tmpCanvasElement.height = gifFrame.dims.height;
		this._gifCanvasContext = this._gifCanvasElement.getContext('2d');
		this._tmpCanvasContext = this._tmpCanvasElement.getContext('2d');
		this._drawNextFrame();
	}

	private _drawOnCanvas() {
		if (!(this._gifCanvasContext && this._tmpCanvasElement && this._tmpCanvasContext)) {
			return;
		}
		let gifFrame = this._parsedFrames[this._frameIndex];
		if (!gifFrame) {
			console.warn(`no frame at index ${this._frameIndex}, using last frame`);
			gifFrame = this._parsedFrames[this._parsedFrames.length - 1];
		}
		if (gifFrame) {
			const dims = gifFrame.dims;
			if (
				!this._frameImageData ||
				dims.width != this._frameImageData.width ||
				dims.height != this._frameImageData.height
			) {
				this._tmpCanvasElement.width = dims.width;
				this._tmpCanvasElement.height = dims.height;
				this._frameImageData = this._tmpCanvasContext.createImageData(dims.width, dims.height);
			}

			this._frameImageData.data.set(gifFrame.patch);
			this._tmpCanvasContext.putImageData(this._frameImageData, 0, 0);
			this._gifCanvasContext.drawImage(this._tmpCanvasElement, dims.left, dims.top);
			const texture = this.containerController.container().texture();
			if (!texture) {
				return;
			}
			texture.needsUpdate = true;
		}
	}
	private _drawNextFrame() {
		this._frameIndex++;
		if (this._frameIndex >= this._parsedFrames.length) {
			this._frameIndex = 0;
		}
		this._drawOnCanvas();
		if (isBooleanTrue(this.pv.play)) {
			setTimeout(() => {
				this._drawNextFrame();
			}, this._frameDelay);
		}
	}
	private gifUpdateFrameIndex() {
		this._frameIndex = this.pv.gifFrame;
		this._drawOnCanvas();
	}

	//
	//
	// UTILS
	//
	//
	static PARAM_CALLBACK_reload(node: GifCopNode) {
		node.paramCallbackReload();
	}
	private paramCallbackReload() {
		// set the param dirty is preferable to just the successors, in case the expression result needs to be updated
		// this.p.url.set_successors_dirty();
		this.p.url.setDirty();
	}
	static PARAM_CALLBACK_gifUpdatePlay(node: GifCopNode) {
		node.gifUpdatePlay();
	}
	private gifUpdatePlay() {
		if (isBooleanTrue(this.pv.play)) {
			this._drawNextFrame();
		}
	}
	static PARAM_CALLBACK_gifUpdateFrameIndex(node: GifCopNode) {
		node.gifUpdateFrameIndex();
	}
}
