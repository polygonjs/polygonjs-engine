import {TypedLightObjNode} from './_BaseLight';
import {Light} from 'three/src/lights/Light';
// import {CoreTransform} from '../../../core/Transform';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {TransformController, TransformedParamConfig} from './utils/TransformController';
import {FlagsControllerD} from '../utils/FlagsController';
import {HierarchyController} from './utils/HierarchyController';

// import {Transformed} from './Concerns/Transformed';
class TransformedObjParamConfig extends TransformedParamConfig(NodeParamsConfig) {}

export abstract class BaseLightTransformedObjNode<
	L extends Light,
	K extends TransformedObjParamConfig
> extends TypedLightObjNode<L, K> {
	public readonly flags: FlagsControllerD = new FlagsControllerD(this);
	readonly hierarchyController: HierarchyController = new HierarchyController(this);
	readonly transformController: TransformController = new TransformController(this);

	initializeBaseNode() {
		super.initializeBaseNode();
		this.hierarchyController.initializeNode();
		this.transformController.initializeNode();
	}

	cook() {
		this.transformController.update();
		this.updateLightParams();
		this.updateShadowParams();
		this.cookController.endCook();
	}
}
