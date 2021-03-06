import {GlConnectionPointType} from '../../../../src/engine/nodes/utils/io/connections/Gl';
import {SceneJsonExporter} from '../../../../src/engine/io/json/export/Scene';
import {SceneJsonImporter} from '../../../../src/engine/io/json/import/Scene';
import {BaseBuilderMatNodeType} from '../../../../src/engine/nodes/mat/_BaseBuilder';
import {FloatParam} from '../../../../src/engine/params/Float';
import {Vector3Param} from '../../../../src/engine/params/Vector3';
import {AssemblersUtils} from '../../../helpers/AssemblersUtils';
import {MeshStandardBuilderMatNode} from '../../../../src/engine/nodes/mat/MeshStandardBuilder';
import {CoreSleep} from '../../../../src/core/Sleep';
import {Poly} from '../../../../src/engine/Poly';

QUnit.test('mesh standard builder persisted_config', async (assert) => {
	const MAT = window.MAT;
	const mesh_standard1 = MAT.createNode('meshStandardBuilder');
	mesh_standard1.createNode('output');
	mesh_standard1.createNode('globals');
	const output1 = mesh_standard1.nodesByType('output')[0];
	const globals1 = mesh_standard1.nodesByType('globals')[0];
	const param1 = mesh_standard1.createNode('param');
	param1.p.name.set('float_param');
	const param2 = mesh_standard1.createNode('param');
	param2.set_gl_type(GlConnectionPointType.VEC3);
	param2.p.name.set('vec3_param');
	const float_to_vec31 = mesh_standard1.createNode('floatToVec3');
	float_to_vec31.setInput(0, param1);
	float_to_vec31.setInput(1, globals1, 'time');
	output1.setInput('color', float_to_vec31);
	output1.setInput('position', param2);
	await mesh_standard1.compute();

	const scene = window.scene;
	const data = new SceneJsonExporter(scene).data();
	await AssemblersUtils.withUnregisteredAssembler(mesh_standard1.usedAssembler(), async () => {
		console.log('************ LOAD **************');
		const scene2 = await SceneJsonImporter.loadData(data);
		await scene2.waitForCooksCompleted();

		const new_mesh_standard1 = scene2.node('/MAT/meshStandardBuilder1') as BaseBuilderMatNodeType;
		assert.notOk(new_mesh_standard1.assemblerController);
		assert.ok(new_mesh_standard1.persisted_config);
		const float_param = new_mesh_standard1.params.get('float_param') as FloatParam;
		const vec3_param = new_mesh_standard1.params.get('vec3_param') as Vector3Param;
		assert.ok(float_param, 'float_param exists');
		assert.ok(vec3_param, 'vec3_param exists');
		const material = new_mesh_standard1.material;
		assert.equal(material.fragmentShader, mesh_standard1.material.fragmentShader, 'fragment shader is as expected');
		assert.equal(material.vertexShader, mesh_standard1.material.vertexShader, 'vertex shader is as expected');

		// float param callback
		assert.equal(material.uniforms.v_POLY_param1_val.value, 0);
		float_param.set(2);
		assert.equal(material.uniforms.v_POLY_param1_val.value, 2);
		float_param.set(4);
		assert.equal(material.uniforms.v_POLY_param1_val.value, 4);

		// vector3 param callback
		assert.deepEqual(material.uniforms.v_POLY_param2_val.value.toArray(), [0, 0, 0]);
		vec3_param.set([1, 2, 3]);
		assert.deepEqual(material.uniforms.v_POLY_param2_val.value.toArray(), [1, 2, 3]);
		vec3_param.set([5, 6, 7]);
		assert.deepEqual(material.uniforms.v_POLY_param2_val.value.toArray(), [5, 6, 7]);
	});
});

QUnit.test('mesh standard builder persisted_config with no node', async (assert) => {
	const MAT = window.MAT;
	const mesh_standard1 = MAT.createNode('meshStandardBuilder');
	mesh_standard1.createNode('output');
	mesh_standard1.createNode('globals');
	await mesh_standard1.compute();

	assert.ok(mesh_standard1.material.fragmentShader.includes('struct SSSModel {'));

	const scene = window.scene;
	const data = new SceneJsonExporter(scene).data();
	await AssemblersUtils.withUnregisteredAssembler(mesh_standard1.usedAssembler(), async () => {
		Poly.setPlayerMode(true);

		console.log('************ LOAD **************');
		const scene2 = await SceneJsonImporter.loadData(data);
		await scene2.waitForCooksCompleted();

		const new_mesh_standard1 = scene2.node('/MAT/meshStandardBuilder1') as MeshStandardBuilderMatNode;
		assert.notOk(new_mesh_standard1.assemblerController);
		assert.ok(new_mesh_standard1.persisted_config);
		const material = new_mesh_standard1.material;
		assert.equal(material.fragmentShader, mesh_standard1.material.fragmentShader, 'fragment shader is as expected');
		assert.equal(material.vertexShader, mesh_standard1.material.vertexShader, 'vertex shader is as expected');

		// let's ensure that a recompile is not required
		new_mesh_standard1.p.shadowPCSS.set(1);
		new_mesh_standard1.p.shadowPCSS.set(0);
		await CoreSleep.sleep(10);
		assert.notOk(new_mesh_standard1.assemblerController?.compileRequired());
		await new_mesh_standard1.compute();
		await CoreSleep.sleep(100);
		assert.equal(material.fragmentShader, mesh_standard1.material.fragmentShader, 'fragment shader is as expected');
		assert.equal(material.vertexShader, mesh_standard1.material.vertexShader, 'vertex shader is as expected');
		console.log('done');
	});
});

QUnit.test('mesh standard builder persisted_config with no node but with assembler in player mode', async (assert) => {
	const MAT = window.MAT;
	const mesh_standard1 = MAT.createNode('meshStandardBuilder');
	mesh_standard1.createNode('output');
	mesh_standard1.createNode('globals');
	await mesh_standard1.compute();

	assert.ok(mesh_standard1.material.fragmentShader.includes('struct SSSModel {'));

	const scene = window.scene;
	const data = new SceneJsonExporter(scene).data();
	Poly.setPlayerMode(true);

	console.log('************ LOAD **************');
	const scene2 = await SceneJsonImporter.loadData(data);
	await scene2.waitForCooksCompleted();

	const new_mesh_standard1 = scene2.node('/MAT/meshStandardBuilder1') as MeshStandardBuilderMatNode;
	assert.ok(new_mesh_standard1.assemblerController);
	assert.ok(new_mesh_standard1.persisted_config);
	const material = new_mesh_standard1.material;
	assert.equal(material.fragmentShader, mesh_standard1.material.fragmentShader, 'fragment shader is as expected');
	assert.equal(material.vertexShader, mesh_standard1.material.vertexShader, 'vertex shader is as expected');

	// let's ensure that a recompile is not required
	new_mesh_standard1.p.shadowPCSS.set(1);
	new_mesh_standard1.p.shadowPCSS.set(0);
	assert.ok(new_mesh_standard1.assemblerController?.compileRequired());
	await CoreSleep.sleep(10);
	await new_mesh_standard1.compute();
	await CoreSleep.sleep(100);
	assert.equal(material.fragmentShader, mesh_standard1.material.fragmentShader, 'fragment shader is as expected');
	assert.equal(material.vertexShader, mesh_standard1.material.vertexShader, 'vertex shader is as expected');
	console.log('done');
});
