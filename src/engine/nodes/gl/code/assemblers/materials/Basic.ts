import {UniformsUtils} from 'three/src/renderers/shaders/UniformsUtils';
import {ShaderMaterial} from 'three/src/materials/ShaderMaterial';
import {ShaderLib} from 'three/src/renderers/shaders/ShaderLib';
import {ShaderAssemblerMesh} from './_BaseMesh';

export class ShaderAssemblerBasic extends ShaderAssemblerMesh {
	get _template_shader() {
		const template = ShaderLib.basic;
		return {
			vertexShader: template.vertexShader,
			fragmentShader: template.fragmentShader,
			uniforms: template.uniforms,
		};
	}
	createMaterial() {
		const template_shader = this._template_shader;

		const material = new ShaderMaterial({
			lights: false,
			uniforms: UniformsUtils.clone(template_shader.uniforms),
			vertexShader: template_shader.vertexShader,
			fragmentShader: template_shader.fragmentShader,
		});

		this._add_custom_materials(material);
		return material;
	}
}
