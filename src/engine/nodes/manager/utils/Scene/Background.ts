import {Constructor} from '../../../../../types/GlobalTypes';
import {BaseNodeType, TypedNode} from '../../../_Base';
import {NodeParamsConfig, ParamConfig} from '../../../utils/params/ParamsConfig';
import {NodeContext} from '../../../../poly/NodeContext';
import {Scene} from 'three/src/scenes/Scene';

export enum BackgroundMode {
	NONE = 'none',
	COLOR = 'color',
	TEXTURE = 'texture',
}
export const BACKGROUND_MODES: BackgroundMode[] = [BackgroundMode.NONE, BackgroundMode.COLOR, BackgroundMode.TEXTURE];

const CallbackOptions = {
	computeOnDirty: false,
	callback: (node: BaseNodeType) => {
		SceneBackgroundController.update(node as SceneBackgroundNode);
	},
};

export function SceneBackgroundParamConfig<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		// background
		/** @param set background mode (none, color or texture) */
		backgroundMode = ParamConfig.INTEGER(BACKGROUND_MODES.indexOf(BackgroundMode.NONE), {
			menu: {
				entries: BACKGROUND_MODES.map((mode, i) => {
					return {name: mode, value: i};
				}),
			},
			...CallbackOptions,
		});
		/** @param background color */
		bgColor = ParamConfig.COLOR([0, 0, 0], {
			visibleIf: {backgroundMode: BACKGROUND_MODES.indexOf(BackgroundMode.COLOR)},
			...CallbackOptions,
		});
		/** @param background texture */
		bgTexture = ParamConfig.NODE_PATH('', {
			visibleIf: {backgroundMode: BACKGROUND_MODES.indexOf(BackgroundMode.TEXTURE)},
			nodeSelection: {
				context: NodeContext.COP,
			},
			dependentOnFoundNode: false,
			...CallbackOptions,
		});
	};
}
class SceneBackgroundParamsConfig extends SceneBackgroundParamConfig(NodeParamsConfig) {}
abstract class SceneBackgroundNode extends TypedNode<any, SceneBackgroundParamsConfig> {
	readonly sceneBackgroundController = new SceneBackgroundController(this);
	protected _object = new Scene();
	get object() {
		return this._object;
	}
}

export class SceneBackgroundController {
	constructor(protected node: SceneBackgroundNode) {}

	update() {
		const scene = this.node.object;
		const pv = this.node.pv;

		if (pv.backgroundMode == BACKGROUND_MODES.indexOf(BackgroundMode.NONE)) {
			scene.background = null;
		} else {
			if (pv.backgroundMode == BACKGROUND_MODES.indexOf(BackgroundMode.COLOR)) {
				scene.background = pv.bgColor;
			} else {
				const node = pv.bgTexture.nodeWithContext(NodeContext.COP);
				if (node) {
					node.compute().then((container) => {
						scene.background = container.texture();
					});
				} else {
					this.node.states.error.set('bgTexture node not found');
				}
			}
		}
	}
	static update(node: SceneBackgroundNode) {
		node.sceneBackgroundController.update();
	}
}
