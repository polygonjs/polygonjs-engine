import {CATEGORY_EVENT} from './Category';

import {AnimationMultiCacheEventNode} from '../../../nodes/event/AnimationMultiCache';
import {AnyEventNode} from '../../../nodes/event/Any';
import {CameraMapControlsEventNode} from '../../../nodes/event/CameraMapControls';
import {CameraOrbitControlsEventNode} from '../../../nodes/event/CameraOrbitControls';
import {CodeEventNode} from '../../../nodes/event/Code';
import {KeyboardEventNode} from '../../../nodes/event/Keyboard';
import {MouseEventNode} from '../../../nodes/event/Mouse';
import {NodeCookEventNode} from '../../../nodes/event/NodeCook';
import {RaycastEventNode} from '../../../nodes/event/Raycast';
import {SceneEventNode} from '../../../nodes/event/Scene';
import {SetParamEventNode} from '../../../nodes/event/SetParam';
import {SequenceEventNode} from '../../../nodes/event/Sequence';
import {TimerEventNode} from '../../../nodes/event/Timer';

export interface EventNodeChildrenMap {
	animation_multi_cache: AnimationMultiCacheEventNode;
	any: AnyEventNode;
	camera_orbit_controls: CameraMapControlsEventNode;
	camera_map_controls: CameraOrbitControlsEventNode;
	code: CodeEventNode;
	keyboard: KeyboardEventNode;
	mouse: MouseEventNode;
	node_cook: NodeCookEventNode;
	raycast: RaycastEventNode;
	scene: SceneEventNode;
	set_param: SetParamEventNode;
	sequence: SequenceEventNode;
	timer: TimerEventNode;
}

import {Poly} from '../../../Poly';
export class EventRegister {
	static run(poly: Poly) {
		poly.register_node(AnimationMultiCacheEventNode, CATEGORY_EVENT.ANIMATION);
		poly.register_node(AnyEventNode, CATEGORY_EVENT.MISC);
		poly.register_node(CameraMapControlsEventNode, CATEGORY_EVENT.CAMERA);
		poly.register_node(CameraOrbitControlsEventNode, CATEGORY_EVENT.CAMERA);
		poly.register_node(CodeEventNode, CATEGORY_EVENT.ADVANCED);
		poly.register_node(KeyboardEventNode, CATEGORY_EVENT.INPUT);
		poly.register_node(MouseEventNode, CATEGORY_EVENT.INPUT);
		poly.register_node(NodeCookEventNode, CATEGORY_EVENT.INPUT);
		poly.register_node(RaycastEventNode, CATEGORY_EVENT.MISC);
		poly.register_node(SceneEventNode, CATEGORY_EVENT.INPUT);
		poly.register_node(SetParamEventNode, CATEGORY_EVENT.MISC);
		poly.register_node(SequenceEventNode, CATEGORY_EVENT.MISC);
		poly.register_node(TimerEventNode, CATEGORY_EVENT.MISC);
	}
}
