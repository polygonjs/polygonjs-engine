
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>



// /MAT/mesh_basic_builder1/globals1
varying vec3 v_POLY_globals1_position;




#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );



	// /MAT/mesh_basic_builder1/vec3_to_float1
	float v_POLY_vec3_to_float1_y = v_POLY_globals1_position.y;
	
	// /MAT/mesh_basic_builder1/compare1
	bool v_POLY_compare1_val = (v_POLY_vec3_to_float1_y < 0.0);
	
	// /MAT/mesh_basic_builder1/if_then1/subnet_input1
	vec3 v_POLY_if_then1_position = v_POLY_globals1_position;
	float v_POLY_if_then1_in2 = 0.0;
	if(v_POLY_compare1_val){;
		vec3 v_POLY_subnet_input1_position = v_POLY_globals1_position;
	
		// /MAT/mesh_basic_builder1/if_then1/mult_add1
		vec3 v_POLY_mult_add1_val = (vec3(2.0, 2.0, 2.0)*(v_POLY_subnet_input1_position + vec3(0.0, 0.0, 0.0))) + vec3(0.0, 0.0, 0.0);
	
		// /MAT/mesh_basic_builder1/if_then1/subnet_output1
		v_POLY_if_then1_position = v_POLY_mult_add1_val;
	};
	
	// /MAT/mesh_basic_builder1/output1
	diffuseColor.xyz = v_POLY_if_then1_position;




	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
