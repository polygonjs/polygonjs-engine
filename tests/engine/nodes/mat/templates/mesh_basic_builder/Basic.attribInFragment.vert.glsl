#define FPS 60.0
#define TIME_INCREMENT (1.0/60.0)
#define FRAME_RANGE_START 1.0
#define FRAME_RANGE_END 600.0

#include <common>



// /MAT/mesh_basic_builder1/attribute1
varying vec2 varying_v_POLY_attribute1_val;




#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>



	// /MAT/mesh_basic_builder1/attribute1
	vec2 v_POLY_attribute1_val = uv;
	varying_v_POLY_attribute1_val = vec2(uv);
	
	// /MAT/mesh_basic_builder1/vec2_to_float1
	float v_POLY_vec2_to_float1_x = v_POLY_attribute1_val.x;
	float v_POLY_vec2_to_float1_y = v_POLY_attribute1_val.y;
	
	// /MAT/mesh_basic_builder1/float_to_vec3_1
	vec3 v_POLY_float_to_vec3_1_vec3 = vec3(v_POLY_vec2_to_float1_x, 0.0, v_POLY_vec2_to_float1_y);
	
	// /MAT/mesh_basic_builder1/output1
	vec3 transformed = v_POLY_float_to_vec3_1_vec3;
	vec3 objectNormal = normal;



	#include <skinbase_vertex>

	#ifdef USE_ENVMAP

// removed:
//	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#endif

// removed:
//	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
