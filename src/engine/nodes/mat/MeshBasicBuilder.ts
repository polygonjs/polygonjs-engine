import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {ColorParamConfig, ColorsController} from './utils/UniformsColorsController';
import {SideParamConfig, SideController} from './utils/SideController';
import {SkinningParamConfig, SkinningController} from './utils/SkinningController';
import {TextureMapParamConfig, TextureMapController} from './utils/TextureMapController';
import {TextureAlphaMapParamConfig, TextureAlphaMapController} from './utils/TextureAlphaMapController';
import {ShaderAssemblerBasic} from '../gl/code/assemblers/materials/Basic';
import {TypedBuilderMatNode} from './_BaseBuilder';
import {GlAssemblerController} from '../gl/code/Controller';
import {NodeContext} from '../../poly/NodeContext';
class MeshBasicMatParamsConfig extends TextureAlphaMapParamConfig(
	TextureMapParamConfig(SkinningParamConfig(SideParamConfig(ColorParamConfig(NodeParamsConfig))))
) {}
const ParamsConfig = new MeshBasicMatParamsConfig();

export class MeshBasicBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerBasic, MeshBasicMatParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'mesh_basic_builder';
	}

	protected _children_controller_context = NodeContext.GL;
	readonly texture_map_controller: TextureMapController = new TextureMapController(this, {uniforms: true});
	readonly texture_alpha_map_controller: TextureAlphaMapController = new TextureAlphaMapController(this, {
		uniforms: true,
	});
	initialize_node() {
		this.params.set_post_create_params_hook(() => {
			this.texture_map_controller.initialize_node();
			this.texture_alpha_map_controller.initialize_node();
		});
		this.children_controller?.init();
	}

	protected _create_assembler_controller() {
		return new GlAssemblerController<ShaderAssemblerBasic>(this, ShaderAssemblerBasic);
	}

	async cook() {
		await this.compile_if_required();

		ColorsController.update(this);
		SideController.update(this);
		SkinningController.update(this);
		await TextureMapController.update(this);
		await TextureAlphaMapController.update(this);

		this.set_material(this.material);
	}

	protected async _compile() {
		if (this._material) {
			await this.assembler_controller.assembler.compile_material(this._material);
			await this.assembler_controller.post_compile();
		}
		// console.log(this._material.vertexShader);
		// console.log(this._material.fragmentShader);
	}
}