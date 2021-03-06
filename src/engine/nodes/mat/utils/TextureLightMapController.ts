import {Constructor} from '../../../../types/GlobalTypes';
import {Material} from 'three/src/materials/Material';
import {Texture} from 'three/src/textures/Texture';
import {TypedMatNode} from '../_Base';
import {
	BaseTextureMapController,
	BooleanParamOptions,
	OperatorPathOptions,
	UpdateOptions,
} from './_BaseTextureController';
import {ShaderMaterial} from 'three/src/materials/ShaderMaterial';
import {NodeParamsConfig, ParamConfig} from '../../utils/params/ParamsConfig';
import {NODE_PATH_DEFAULT} from '../../../../core/Walker';
import {MeshStandardMaterial} from 'three/src/materials/MeshStandardMaterial';

export function LightMapParamConfig<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		/** @param toggle if you want to use a light map */
		useLightMap = ParamConfig.BOOLEAN(0, {
			separatorBefore: true,
			...BooleanParamOptions(TextureLightMapController),
		});
		/** @param specify the light map COP node */
		lightMap = ParamConfig.NODE_PATH(
			NODE_PATH_DEFAULT.NODE.EMPTY,
			OperatorPathOptions(TextureLightMapController, 'useLightMap')
		);
		/** @param light. When set to 0, reflections from environment maps will be very sharp, or blurred when 1. Any value between 0 and 1 can help modulate this. */
		lightMapIntensity = ParamConfig.FLOAT(1, {
			visibleIf: {useLightMap: 1},
		});
	};
}

class TextureLightMaterial extends Material {
	lightMap!: Texture | null;
	lightMapIntensity!: number;
}
type CurrentMaterial = TextureLightMaterial | ShaderMaterial;
class TextureLightMapParamsConfig extends LightMapParamConfig(NodeParamsConfig) {}
interface Controllers {
	lightMap: TextureLightMapController;
}
abstract class TextureLightMapMatNode extends TypedMatNode<CurrentMaterial, TextureLightMapParamsConfig> {
	controllers!: Controllers;
	abstract createMaterial(): CurrentMaterial;
}

export class TextureLightMapController extends BaseTextureMapController {
	constructor(protected node: TextureLightMapMatNode, _update_options: UpdateOptions) {
		super(node, _update_options);
	}
	initializeNode() {
		this.add_hooks(this.node.p.useLightMap, this.node.p.lightMap);
	}
	async update() {
		this._update(this.node.material, 'lightMap', this.node.p.useLightMap, this.node.p.lightMap);
		if (this._update_options.uniforms) {
			const mat = this.node.material as ShaderMaterial;
			mat.uniforms.lightMapIntensity.value = this.node.pv.lightMapIntensity;
		}
		if (this._update_options.directParams) {
			const mat = this.node.material as MeshStandardMaterial;
			mat.lightMapIntensity = this.node.pv.lightMapIntensity;
		}
	}
	static async update(node: TextureLightMapMatNode) {
		node.controllers.lightMap.update();
	}
}
