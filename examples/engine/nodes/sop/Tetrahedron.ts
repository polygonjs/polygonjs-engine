import {PolyScene} from '../../../../src/engine/scene/PolyScene';

export function SopTetrahedron() {
	// create a scene
	const scene = new PolyScene();

	// create a box
	const geo = scene.root.createNode('geo');
	const tetrahedron = geo.createNode('tetrahedron');
	tetrahedron.p.radius;
	tetrahedron.p.center;
	tetrahedron.p.detail;
	tetrahedron.p.points_only;

	// add a light
	scene.root.createNode('hemisphere_light');

	// create a camera
	const perspective_camera1 = scene.root.createNode('perspective_camera');
	perspective_camera1.p.t.set([5, 5, 5]);
	// add orbit_controls
	const events1 = perspective_camera1.createNode('events');
	const orbits_controls = events1.createNode('camera_orbit_controls');
	perspective_camera1.p.controls.set(orbits_controls.full_path());

	// EXPORT
	const nodes = [tetrahedron];
	const html_nodes = {tetrahedron};
	const camera = perspective_camera1;
	return {scene, camera, nodes, html_nodes};
}