/**
 * Creates a spot light.
 *
 *
 */
import {SpotLight} from 'three/src/lights/SpotLight';
import {BaseLightTransformedObjNode} from './_BaseLightTransformed';
import {TransformedParamConfig} from './utils/TransformController';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {HelperController, HelperConstructor} from './utils/HelperController';
import {SpotLightHelper} from './utils/helpers/SpotLightHelper';
import {Object3D} from 'three/src/core/Object3D';
import {Mesh} from 'three/src/objects/Mesh';
import {ColorConversion} from '../../../core/Color';
class SpotLightObjParamsConfig extends TransformedParamConfig(NodeParamsConfig) {
	light = ParamConfig.FOLDER();
	/** @param light color */
	color = ParamConfig.COLOR([1, 1, 1], {
		conversion: ColorConversion.SRGB_TO_LINEAR,
	});
	/** @param light intensity */
	intensity = ParamConfig.FLOAT(1);
	/** @param angle */
	angle = ParamConfig.FLOAT(45, {range: [0, 180]});
	/** @param penumbra */
	penumbra = ParamConfig.FLOAT(0.1);
	/** @param decay */
	decay = ParamConfig.FLOAT(0.1, {range: [0, 1]});
	/** @param distance */
	distance = ParamConfig.FLOAT(100, {range: [0, 100]});
	// target = ParamConfig.OPERATOR_PATH('');

	// helper
	/** @param toggle on to show helper */
	showHelper = ParamConfig.BOOLEAN(0);
	/** @param helper size */
	helperSize = ParamConfig.FLOAT(1, {visibleIf: {showHelper: 1}});

	// shadows
	shadow = ParamConfig.FOLDER();
	/** @param toggle on to cast shadows */
	castShadow = ParamConfig.BOOLEAN(1);
	/** @param toggle off if the shadows do not need to be regenerated */
	shadowAutoUpdate = ParamConfig.BOOLEAN(1, {
		visibleIf: {castShadow: 1},
	});
	/** @param press button to update the shadows on next render */
	shadowUpdateOnNextRender = ParamConfig.BOOLEAN(0, {
		visibleIf: {castShadow: 1, shadowAutoUpdate: 0},
	});
	/** @param shadows res */
	shadowRes = ParamConfig.VECTOR2([256, 256], {
		visibleIf: {castShadow: 1},
	});
	/** @param shadows bias */
	shadowBias = ParamConfig.FLOAT(0.001, {
		visibleIf: {castShadow: 1},
		range: [-0.01, 0.01],
		rangeLocked: [false, false],
	});
	shadowNear = ParamConfig.FLOAT(0.1, {
		visibleIf: {castShadow: 1},
		range: [0, 100],
		rangeLocked: [true, false],
	});
	shadowFar = ParamConfig.FLOAT(100, {
		visibleIf: {castShadow: 1},
		range: [0, 100],
		rangeLocked: [true, false],
	});
}
const ParamsConfig = new SpotLightObjParamsConfig();

export class SpotLightObjNode extends BaseLightTransformedObjNode<SpotLight, SpotLightObjParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'spotLight';
	}
	private _target_target!: Object3D;
	private _helper_controller = new HelperController<Mesh, SpotLight>(
		this,
		(<unknown>SpotLightHelper) as HelperConstructor<Mesh, SpotLight>,
		'SpotLightHelper'
	);
	initialize_node() {
		// this.io.inputs.set_count(0, 1);
		this._helper_controller.initialize_node();
	}

	create_light() {
		const light = new SpotLight();
		light.matrixAutoUpdate = false;

		light.castShadow = true;
		// light.shadow.focus = 1;
		light.shadow.bias = -0.001;
		light.shadow.mapSize.x = 256;
		light.shadow.mapSize.y = 256;
		light.shadow.camera.near = 0.1;

		this._target_target = light.target;
		this._target_target.name = 'SpotLight Default Target';
		this._target_target.matrixAutoUpdate = false;
		this.object.add(this._target_target);

		return light;
	}

	update_light_params() {
		this.light.color = this.pv.color;
		this.light.intensity = this.pv.intensity;
		this.light.angle = this.pv.angle * (Math.PI / 180);
		this.light.penumbra = this.pv.penumbra;
		this.light.decay = this.pv.decay;
		this.light.distance = this.pv.distance;
		// TODO: consider allow power to be edited
		// (maybe it will need a setting to toggle physicallyCorrect, which would then show the power param)
		// this.light.power = 1;

		this._helper_controller.update();
	}
	update_shadow_params() {
		this.light.castShadow = this.pv.castShadow;
		this.light.shadow.autoUpdate = this.pv.shadowAutoUpdate;
		this.light.shadow.needsUpdate = this.pv.shadowUpdateOnNextRender;

		this.light.shadow.mapSize.copy(this.pv.shadowRes);
		// near/far don't seem to have any effect
		this.light.shadow.camera.near = this.pv.shadowNear;
		this.light.shadow.camera.far = this.pv.shadowFar;
		this.light.shadow.bias = this.pv.shadowBias;
	}
}
