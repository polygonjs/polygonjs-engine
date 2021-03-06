QUnit.test('cone simple', async (assert) => {
	const geo1 = window.geo1;
	geo1.flags.display.set(false); // cancels geo node displayNodeController

	const cone1 = geo1.createNode('cone');

	let container = await cone1.compute();
	const core_group = container.coreContent();
	const geometry = core_group?.objectsWithGeo()[0].geometry;
	assert.equal(geometry?.getAttribute('position').array.length, 153);
});
