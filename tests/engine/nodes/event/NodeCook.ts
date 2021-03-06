import {SceneJsonExporter} from '../../../../src/engine/io/json/export/Scene';
import {SceneJsonImporter} from '../../../../src/engine/io/json/import/Scene';
import {SwitchSopNode} from '../../../../src/engine/nodes/sop/Switch';
import {CoreSleep} from '../../../../src/core/Sleep';
import {NodeCookEventNode} from '../../../../src/engine/nodes/event/NodeCook';
import {ScatterSopNode} from '../../../../src/engine/nodes/sop/Scatter';
import {MergeSopNode} from '../../../../src/engine/nodes/sop/Merge';

QUnit.test('event nodeCook simple', async (assert) => {
	const geo1 = window.geo1;
	const scene = window.scene;
	const events = scene.root().createNode('eventsNetwork');

	const box1 = geo1.createNode('box');
	const scatter1 = geo1.createNode('scatter');
	const scatter2 = geo1.createNode('scatter');
	const scatter3 = geo1.createNode('scatter');
	const merge1 = geo1.createNode('merge');
	const switch1 = geo1.createNode('switch');
	const switch2 = geo1.createNode('switch');

	await scene.waitForCooksCompleted();

	const nodeCook1 = events.createNode('nodeCook');
	const set_param1 = events.createNode('setParam');
	const set_param2 = events.createNode('setParam');

	scatter1.setInput(0, box1);
	scatter2.setInput(0, box1);
	scatter3.setInput(0, box1);
	merge1.setInput(0, scatter1);
	merge1.setInput(1, scatter2);
	merge1.setInput(2, scatter3);

	assert.ok(scene.loadingController.loaded());
	nodeCook1.p.mask.set('*scatter*');
	set_param1.p.param.set(switch1.p.input.path());
	set_param1.p.number.set(1);
	set_param2.p.param.set(switch2.p.input.path());
	set_param2.p.number.set(1);
	set_param1.setInput(0, nodeCook1, NodeCookEventNode.OUTPUT_FIRST_NODE);
	set_param2.setInput(0, nodeCook1, NodeCookEventNode.OUTPUT_ALL_NODES);

	assert.equal(switch1.p.input.value, 0);
	await scatter1.compute();
	await CoreSleep.sleep(100);
	assert.equal(switch1.p.input.value, 1);

	assert.equal(switch2.p.input.value, 0);
	await merge1.compute();
	await CoreSleep.sleep(100);
	assert.equal(switch2.p.input.value, 1);

	switch1.p.input.set(0);
	switch2.p.input.set(0);
	const data = new SceneJsonExporter(scene).data();

	console.log('************ LOAD **************');
	const scene2 = await SceneJsonImporter.loadData(data);
	await scene2.waitForCooksCompleted();
	const scatter1_2 = scene2.node(scatter1.path()) as ScatterSopNode;
	const merge1_2 = scene2.node(merge1.path()) as MergeSopNode;
	const switch1_2 = scene2.node(switch1.path()) as SwitchSopNode;
	const switch2_2 = scene2.node(switch2.path()) as SwitchSopNode;

	assert.equal(switch1_2.p.input.value, 0);
	await scatter1_2.compute();
	await CoreSleep.sleep(100);
	assert.equal(switch1_2.p.input.value, 1);

	assert.equal(switch2_2.p.input.value, 0);
	await merge1_2.compute();
	await CoreSleep.sleep(100);
	assert.equal(switch2_2.p.input.value, 1);

	assert.equal(scatter1.cookController.onCookEndCallbackNames()?.length, 1, 'one callback');
	events.removeNode(nodeCook1);
	assert.equal(scatter1.cookController.onCookEndCallbackNames()?.length, 0, 'zero callback');
});
