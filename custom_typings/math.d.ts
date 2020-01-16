// math
// interface Vec2 {
// 	x: number;
// 	y: number;
// }
// interface Vec3 {
// 	x: number;
// 	y: number;
// 	z: number;
// }
// interface Vec4 {
// 	x: number;
// 	y: number;
// 	z: number;
// 	w: number;
// }
// interface Col {
// 	r: number;
// 	g: number;
// 	b: number;
// }
interface LngLatLike {
	lng: number;
	lat: number;
}

interface Vector2Like {
	x: number;
	y: number;
}
interface Vector3Like {
	x: number;
	y: number;
	z: number;
}
interface Vector4Like {
	x: number;
	y: number;
	z: number;
	w: number;
}
interface ColorLike {
	r: number;
	g: number;
	b: number;
}
// type BooleanAsNumber = 0 | 1;
type StringOrNumber = string | number;
type Number2 = [number, number];
type Number3 = [number, number, number];
type Number4 = [number, number, number, number];
type StringOrNumber2 = [StringOrNumber, StringOrNumber];
type StringOrNumber3 = [StringOrNumber, StringOrNumber, StringOrNumber];
type StringOrNumber4 = [StringOrNumber, StringOrNumber, StringOrNumber, StringOrNumber];