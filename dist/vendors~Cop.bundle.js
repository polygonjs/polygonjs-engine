(window.webpackJsonpPOLY=window.webpackJsonpPOLY||[]).push([["vendors~Cop"],{335:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var i=e(373);function r(t){this.manager=void 0!==t?t:i.a,this.crossOrigin="anonymous",this.path="",this.resourcePath=""}Object.assign(r.prototype,{load:function(){},parse:function(){},setCrossOrigin:function(t){return this.crossOrigin=t,this},setPath:function(t){return this.path=t,this},setResourcePath:function(t){return this.resourcePath=t,this}})},346:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var i=e(4),r=e(83);function o(t,n,e,o,a,u,s,c,l){r.a.call(this,t,n,e,o,a,u,s,c,l),this.format=void 0!==s?s:i.dc,this.minFilter=void 0!==u?u:i.R,this.magFilter=void 0!==a?a:i.R,this.generateMipmaps=!1}o.prototype=Object.assign(Object.create(r.a.prototype),{constructor:o,isVideoTexture:!0,update:function(){var t=this.image;t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}})},349:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var i={enabled:!1,files:{},add:function(t,n){!1!==this.enabled&&(this.files[t]=n)},get:function(t){if(!1!==this.enabled)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}}},369:function(t,n,e){var i=e(86),r=e(60);t.exports=function(t,n,e){(void 0===e||r(t[n],e))&&(void 0!==e||n in t)||i(t,n,e)}},370:function(t,n){t.exports=function(t,n){if(("constructor"!==n||"function"!=typeof t[n])&&"__proto__"!=n)return t[n]}},372:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var i=e(349),r=e(335);function o(t){r.a.call(this,t)}o.prototype=Object.assign(Object.create(r.a.prototype),{constructor:o,load:function(t,n,e,r){void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);var o=this,a=i.a.get(t);if(void 0!==a)return o.manager.itemStart(t),setTimeout((function(){n&&n(a),o.manager.itemEnd(t)}),0),a;var u=document.createElementNS("http://www.w3.org/1999/xhtml","img");function s(){u.removeEventListener("load",s,!1),u.removeEventListener("error",c,!1),i.a.add(t,this),n&&n(this),o.manager.itemEnd(t)}function c(n){u.removeEventListener("load",s,!1),u.removeEventListener("error",c,!1),r&&r(n),o.manager.itemError(t),o.manager.itemEnd(t)}return u.addEventListener("load",s,!1),u.addEventListener("error",c,!1),"data:"!==t.substr(0,5)&&void 0!==this.crossOrigin&&(u.crossOrigin=this.crossOrigin),o.manager.itemStart(t),u.src=t,u}})},373:function(t,n,e){"use strict";function i(t,n,e){var i=this,r=!1,o=0,a=0,u=void 0,s=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=e,this.itemStart=function(t){a++,!1===r&&void 0!==i.onStart&&i.onStart(t,o,a),r=!0},this.itemEnd=function(t){o++,void 0!==i.onProgress&&i.onProgress(t,o,a),o===a&&(r=!1,void 0!==i.onLoad&&i.onLoad())},this.itemError=function(t){void 0!==i.onError&&i.onError(t)},this.resolveURL=function(t){return u?u(t):t},this.setURLModifier=function(t){return u=t,this},this.addHandler=function(t,n){return s.push(t,n),this},this.removeHandler=function(t){var n=s.indexOf(t);return-1!==n&&s.splice(n,2),this},this.getHandler=function(t){for(var n=0,e=s.length;n<e;n+=2){var i=s[n],r=s[n+1];if(i.global&&(i.lastIndex=0),i.test(t))return r}return null}}e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return i}));var r=new i},379:function(t,n,e){"use strict";e.d(n,"a",(function(){return u}));var i=e(4),r=e(372),o=e(83),a=e(335);function u(t){a.a.call(this,t)}u.prototype=Object.assign(Object.create(a.a.prototype),{constructor:u,load:function(t,n,e,a){var u=new o.a,s=new r.a(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,(function(e){u.image=e;var r=t.search(/\.jpe?g($|\?)/i)>0||0===t.search(/^data\:image\/jpeg/);u.format=r?i.dc:i.Db,u.needsUpdate=!0,void 0!==n&&n(u)}),e,a),u}})},384:function(t,n,e){var i=e(46),r=e(403),o=e(84),a=e(404),u=o((function(t){var n=i(t,a);return n.length&&n[0]===t[0]?r(n):[]}));t.exports=u},397:function(t,n,e){var i=e(398),r=e(402)((function(t,n,e){i(t,n,e)}));t.exports=r},398:function(t,n,e){var i=e(85),r=e(369),o=e(187),a=e(399),u=e(17),s=e(123),c=e(370);t.exports=function t(n,e,l,v,p){n!==e&&o(e,(function(o,s){if(p||(p=new i),u(o))a(n,e,s,l,t,v,p);else{var d=v?v(c(n,s),o,s+"",n,e,p):void 0;void 0===d&&(d=o),r(n,s,d)}}),s)}},399:function(t,n,e){var i=e(369),r=e(184),o=e(185),a=e(131),u=e(186),s=e(63),c=e(3),l=e(124),v=e(48),p=e(61),d=e(17),f=e(400),g=e(64),h=e(370),m=e(401);t.exports=function(t,n,e,x,b,w,T){var E=h(t,e),M=h(n,e),C=T.get(M);if(C)i(t,e,C);else{var y=w?w(E,M,e+"",t,n,T):void 0,O=void 0===y;if(O){var L=c(M),_=!L&&v(M),R=!L&&!_&&g(M);y=M,L||_||R?c(E)?y=E:l(E)?y=a(E):_?(O=!1,y=r(M,!0)):R?(O=!1,y=o(M,!0)):y=[]:f(M)||s(M)?(y=E,s(E)?y=m(E):d(E)&&!p(E)||(y=u(M))):O=!1}O&&(T.set(M,y),b(y,M,x,w,T),T.delete(M)),i(t,e,y)}}},400:function(t,n,e){var i=e(26),r=e(87),o=e(18),a=Function.prototype,u=Object.prototype,s=a.toString,c=u.hasOwnProperty,l=s.call(Object);t.exports=function(t){if(!o(t)||"[object Object]"!=i(t))return!1;var n=r(t);if(null===n)return!0;var e=c.call(n,"constructor")&&n.constructor;return"function"==typeof e&&e instanceof e&&s.call(e)==l}},401:function(t,n,e){var i=e(62),r=e(123);t.exports=function(t){return i(t,r(t))}},402:function(t,n,e){var i=e(84),r=e(128);t.exports=function(t){return i((function(n,e){var i=-1,o=e.length,a=o>1?e[o-1]:void 0,u=o>2?e[2]:void 0;for(a=t.length>3&&"function"==typeof a?(o--,a):void 0,u&&r(e[0],e[1],u)&&(a=o<3?void 0:a,o=1),n=Object(n);++i<o;){var s=e[i];s&&t(n,s,i,a)}return n}))}},403:function(t,n,e){var i=e(88),r=e(132),o=e(133),a=e(46),u=e(49),s=e(89),c=Math.min;t.exports=function(t,n,e){for(var l=e?o:r,v=t[0].length,p=t.length,d=p,f=Array(p),g=1/0,h=[];d--;){var m=t[d];d&&n&&(m=a(m,u(n))),g=c(m.length,g),f[d]=!e&&(n||v>=120&&m.length>=120)?new i(d&&m):void 0}m=t[0];var x=-1,b=f[0];t:for(;++x<v&&h.length<g;){var w=m[x],T=n?n(w):w;if(w=e||0!==w?w:0,!(b?s(b,T):l(h,T,e))){for(d=p;--d;){var E=f[d];if(!(E?s(E,T):l(t[d],T,e)))continue t}b&&b.push(T),h.push(w)}}return h}},404:function(t,n,e){var i=e(124);t.exports=function(t){return i(t)?t:[]}},411:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));var i=e(336);function r(t){i.a.call(this,t),this.type="RawShaderMaterial"}r.prototype=Object.create(i.a.prototype),r.prototype.constructor=r,r.prototype.isRawShaderMaterial=!0},506:function(t,n,e){"use strict";e.d(n,"a",(function(){return A}));var i,r,o,a,u=e(4),s=e(328),c=e(329),l=e(340),v=e(378),p=e(368),d=e(411),f=e(126),g=e(12),h=e(2),m=e(396),x=Math.pow(2,8),b=[.125,.215,.35,.446,.526,.582],w=5+b.length,T={[u.Q]:0,[u.id]:1,[u.bc]:2,[u.gc]:3,[u.fc]:4,[u.ac]:5,[u.F]:6},E=new v.a,M=(i=20,r=new Float32Array(i),o=new h.a(0,1,0),(a=new d.a({defines:{n:i},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o},inputEncoding:{value:T[u.Q]},outputEncoding:{value:T[u.Q]}},vertexShader:W(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform int samples;\nuniform float weights[n];\nuniform bool latitudinal;\nuniform float dTheta;\nuniform float mipInt;\nuniform vec3 poleAxis;\n\n${H()}\n\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\n\nvec3 getSample(float theta, vec3 axis) {\n\tfloat cosTheta = cos(theta);\n\t// Rodrigues' axis-angle rotation\n\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t+ cross(axis, vOutputDirection) * sin(theta)\n\t\t+ axis * dot(axis, vOutputDirection) * (1.0 - cosTheta);\n\treturn bilinearCubeUV(envMap, sampleDirection, mipInt);\n}\n\nvoid main() {\n\tvec3 axis = latitudinal ? poleAxis : cross(poleAxis, vOutputDirection);\n\tif (all(equal(axis, vec3(0.0))))\n\t\taxis = vec3(vOutputDirection.z, 0.0, - vOutputDirection.x);\n\taxis = normalize(axis);\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb += weights[0] * getSample(0.0, axis);\n\tfor (int i = 1; i < n; i++) {\n\t\tif (i >= samples)\n\t\t\tbreak;\n\t\tfloat theta = dTheta * float(i);\n\t\tgl_FragColor.rgb += weights[i] * getSample(-1.0 * theta, axis);\n\t\tgl_FragColor.rgb += weights[i] * getSample(theta, axis);\n\t}\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:u.qb,depthTest:!1,depthWrite:!1})).type="SphericalGaussianBlur",a),C=null,y=null,{_lodPlanes:O,_sizeLods:L,_sigmas:_}=function(){for(var t=[],n=[],e=[],i=8,r=0;r<w;r++){var o=Math.pow(2,i);n.push(o);var a=1/o;r>4?a=b[r-8+4-1]:0==r&&(a=0),e.push(a);for(var u=1/(o-1),l=-u/2,v=1+u/2,p=[l,l,v,l,v,v,l,l,v,v,l,v],d=new Float32Array(108),f=new Float32Array(72),g=new Float32Array(36),h=0;h<6;h++){var m=h%3*2/3-1,x=h>2?0:-1,T=[m,x,0,m+2/3,x,0,m+2/3,x+1,0,m,x,0,m+2/3,x+1,0,m,x+1,0];d.set(T,18*h),f.set(p,12*h);var E=[h,h,h,h,h,h];g.set(E,6*h)}var M=new c.a;M.setAttribute("position",new s.a(d,3)),M.setAttribute("uv",new s.a(f,2)),M.setAttribute("faceIndex",new s.a(g,1)),t.push(M),i>4&&i--}return{_lodPlanes:t,_sizeLods:n,_sigmas:e}}(),R=null,S=null,D=null,F=(1+Math.sqrt(5))/2,P=1/F,z=[new h.a(1,1,1),new h.a(-1,1,1),new h.a(1,1,-1),new h.a(-1,1,-1),new h.a(0,F,P),new h.a(0,F,-P),new h.a(P,0,F),new h.a(-P,0,F),new h.a(F,P,0),new h.a(-F,P,0)];function A(t){S=t,j(M)}function I(t){var n={magFilter:u.kb,minFilter:u.kb,generateMipmaps:!1,type:t?t.type:u.Wc,format:t?t.format:u.cc,encoding:t?t.encoding:u.bc,depthBuffer:!1,stencilBuffer:!1},e=G(n);return e.depthBuffer=!t,R=G(n),e}function B(t){R.dispose(),S.setRenderTarget(D),t.scissorTest=!1,t.setSize(t.width,t.height)}function j(t){var n=new f.a;n.add(new l.a(O[0],t)),S.compile(n,E)}function G(t){var n=new m.a(3*x,3*x,t);return n.texture.mapping=u.o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function k(t,n,e,i,r){t.viewport.set(n,e,i,r),t.scissor.set(n,e,i,r)}function U(t){var n=S.autoClear;S.autoClear=!1;for(var e=1;e<w;e++){q(t,e-1,e,Math.sqrt(_[e]*_[e]-_[e-1]*_[e-1]),z[(e-1)%z.length])}S.autoClear=n}function q(t,n,e,i,r){Q(t,R,n,e,i,"latitudinal",r),Q(R,t,e,e,i,"longitudinal",r)}function Q(t,n,e,i,r,o,a){"latitudinal"!==o&&"longitudinal"!==o&&console.error("blur direction must be either latitudinal or longitudinal!");var u=new f.a;u.add(new l.a(O[i],M));var s=M.uniforms,c=L[e]-1,v=isFinite(r)?Math.PI/(2*c):2*Math.PI/39,p=r/v,d=isFinite(r)?1+Math.floor(3*p):20;d>20&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to 20`);for(var g=[],h=0,m=0;m<20;++m){var b=m/p,w=Math.exp(-b*b/2);g.push(w),0==m?h+=w:m<d&&(h+=2*w)}for(m=0;m<g.length;m++)g[m]=g[m]/h;s.envMap.value=t.texture,s.samples.value=d,s.weights.value=g,s.latitudinal.value="latitudinal"===o,a&&(s.poleAxis.value=a),s.dTheta.value=v,s.mipInt.value=8-e,s.inputEncoding.value=T[t.texture.encoding],s.outputEncoding.value=T[t.texture.encoding];var C=L[i];k(n,b=3*Math.max(0,x-2*C),(0===i?0:2*x)+2*C*(i>4?i-8+4:0),3*C,2*C),S.setRenderTarget(n),S.render(u,E)}function V(){var t=new g.a(1,1),n=new d.a({uniforms:{envMap:{value:null},texelSize:{value:t},inputEncoding:{value:T[u.Q]},outputEncoding:{value:T[u.Q]}},vertexShader:W(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform vec2 texelSize;\n\n${H()}\n\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tvec3 outputDirection = normalize(vOutputDirection);\n\tvec2 uv;\n\tuv.y = asin(clamp(outputDirection.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;\n\tuv.x = atan(outputDirection.z, outputDirection.x) * RECIPROCAL_PI2 + 0.5;\n\tvec2 f = fract(uv / texelSize - 0.5);\n\tuv -= f * texelSize;\n\tvec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x += texelSize.x;\n\tvec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.y += texelSize.y;\n\tvec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x -= texelSize.x;\n\tvec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tvec3 tm = mix(tl, tr, f.x);\n\tvec3 bm = mix(bl, br, f.x);\n\tgl_FragColor.rgb = mix(tm, bm, f.y);\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:u.qb,depthTest:!1,depthWrite:!1});return n.type="EquirectangularToCubeUV",n}function $(){var t=new d.a({uniforms:{envMap:{value:null},inputEncoding:{value:T[u.Q]},outputEncoding:{value:T[u.Q]}},vertexShader:W(),fragmentShader:`\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform samplerCube envMap;\n\n${H()}\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb = envMapTexelToLinear(textureCube(envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ))).rgb;\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t`,blending:u.qb,depthTest:!1,depthWrite:!1});return t.type="CubemapToCubeUV",t}function W(){return"\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t"}function H(){return"\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t"}A.prototype={constructor:A,fromScene:function(t,n=0,e=.1,i=100){D=S.getRenderTarget();var r=I();return function(t,n,e,i){var r=new p.a(90,1,n,e),o=[1,1,1,1,-1,1],a=[1,1,-1,-1,-1,1],s=S.outputEncoding,c=S.toneMapping,l=S.toneMappingExposure,v=S.getClearColor(),d=S.getClearAlpha();S.toneMapping=u.W,S.toneMappingExposure=1,S.outputEncoding=u.Q,t.scale.z*=-1;var f=t.background;if(f&&f.isColor){f.convertSRGBToLinear();var g=Math.max(f.r,f.g,f.b),h=Math.min(Math.max(Math.ceil(Math.log2(g)),-128),127);f=f.multiplyScalar(Math.pow(2,-h));var m=(h+128)/255;S.setClearColor(f,m),t.background=null}for(var b=0;b<6;b++){var w=b%3;0==w?(r.up.set(0,o[b],0),r.lookAt(a[b],0,0)):1==w?(r.up.set(0,0,o[b]),r.lookAt(0,a[b],0)):(r.up.set(0,o[b],0),r.lookAt(0,0,a[b])),k(i,w*x,b>2?x:0,x,x),S.setRenderTarget(i),S.render(t,r)}S.toneMapping=c,S.toneMappingExposure=l,S.outputEncoding=s,S.setClearColor(v,d),t.scale.z*=-1}(t,e,i,r),n>0&&q(r,0,0,n),U(r),B(r),r},fromEquirectangular:function(t){return t.magFilter=u.kb,t.minFilter=u.kb,t.generateMipmaps=!1,this.fromCubemap(t)},fromCubemap:function(t){D=S.getRenderTarget();var n=I(t);return function(t,n){var e=new f.a;t.isCubeTexture?null==y&&(y=$()):null==C&&(C=V());var i=t.isCubeTexture?y:C;e.add(new l.a(O[0],i));var r=i.uniforms;r.envMap.value=t,t.isCubeTexture||r.texelSize.value.set(1/t.image.width,1/t.image.height);r.inputEncoding.value=T[t.encoding],r.outputEncoding.value=T[t.encoding],k(n,0,0,3*x,2*x),S.setRenderTarget(n),S.render(e,E)}(t,n),U(n),B(n),n},compileCubemapShader:function(){null==y&&j(y=$())},compileEquirectangularShader:function(){null==C&&j(C=V())},dispose:function(){M.dispose(),null!=y&&y.dispose(),null!=C&&C.dispose();for(var t=0;t<O.length;t++)O[t].dispose()}}}}]);
//# sourceMappingURL=vendors~Cop.bundle.js.map