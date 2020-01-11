import {BaseSopNode} from '../_Base';
import {CoreConstant} from 'src/core/geometry/Constant';

export class AttribTypeController {
	static add_attrib_class_param(node: BaseSopNode, attrib_name = 'attrib_class') {
		const keys = Object.keys(CoreConstant.ATTRIB_CLASS);

		node.add_param(ParamType.INTEGER, attrib_name, CoreConstant.ATTRIB_CLASS.VERTEX, {
			menu: {
				// type: 'radio',
				entries: keys.map((name) => {
					return {
						name: name,
						value: (CoreConstant.ATTRIB_CLASS as any)[name],
					};
				}),
			},
		});
	}
}