(window.webpackJsonpPOLY=window.webpackJsonpPOLY||[]).push([["vendors~Obj~Sop"],{356:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(330),o=i(24);function n(t){r.a.call(this),this.type="LineBasicMaterial",this.color=new o.a(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.setValues(t)}n.prototype=Object.create(r.a.prototype),n.prototype.constructor=n,n.prototype.isLineBasicMaterial=!0,n.prototype.copy=function(t){return r.a.prototype.copy.call(this,t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this}},375:function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var r=i(405),o=i(2),n=i(328),a=new o.a,s=new o.a;function c(t,e){r.a.call(this,t,e),this.type="LineSegments"}c.prototype=Object.assign(Object.create(r.a.prototype),{constructor:c,isLineSegments:!0,computeLineDistances:function(){var t=this.geometry;if(t.isBufferGeometry)if(null===t.index){for(var e=t.attributes.position,i=[],r=0,o=e.count;r<o;r+=2)a.fromBufferAttribute(e,r),s.fromBufferAttribute(e,r+1),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+a.distanceTo(s);t.setAttribute("lineDistance",new n.b(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(t.isGeometry){var c=t.vertices;for(i=t.lineDistances,r=0,o=c.length;r<o;r+=2)a.copy(c[r]),s.copy(c[r+1]),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+a.distanceTo(s)}return this}})},381:function(t,e,i){"use strict";i.d(e,"b",(function(){return c})),i.d(e,"a",(function(){return h}));var r=i(337),o=i(329),n=i(328),a=i(2),s=i(12);function c(t,e,i,o){r.a.call(this),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:o},this.fromBufferGeometry(new h(t,e,i,o)),this.mergeVertices()}function h(t,e,i,r){o.a.call(this),this.type="PolyhedronBufferGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:r},i=i||1;var c=[],h=[];function u(t,e,i,r){var o,n,a=Math.pow(2,r),s=[];for(o=0;o<=a;o++){s[o]=[];var c=t.clone().lerp(i,o/a),h=e.clone().lerp(i,o/a),u=a-o;for(n=0;n<=u;n++)s[o][n]=0===n&&o===a?c:c.clone().lerp(h,n/u)}for(o=0;o<a;o++)for(n=0;n<2*(a-o)-1;n++){var l=Math.floor(n/2);n%2==0?(p(s[o][l+1]),p(s[o+1][l]),p(s[o][l])):(p(s[o][l+1]),p(s[o+1][l+1]),p(s[o+1][l]))}}function p(t){c.push(t.x,t.y,t.z)}function l(e,i){var r=3*e;i.x=t[r+0],i.y=t[r+1],i.z=t[r+2]}function f(t,e,i,r){r<0&&1===t.x&&(h[e]=t.x-1),0===i.x&&0===i.z&&(h[e]=r/2/Math.PI+.5)}function d(t){return Math.atan2(t.z,-t.x)}!function(t){for(var i=new a.a,r=new a.a,o=new a.a,n=0;n<e.length;n+=3)l(e[n+0],i),l(e[n+1],r),l(e[n+2],o),u(i,r,o,t)}(r=r||0),function(t){for(var e=new a.a,i=0;i<c.length;i+=3)e.x=c[i+0],e.y=c[i+1],e.z=c[i+2],e.normalize().multiplyScalar(t),c[i+0]=e.x,c[i+1]=e.y,c[i+2]=e.z}(i),function(){for(var t=new a.a,e=0;e<c.length;e+=3){t.x=c[e+0],t.y=c[e+1],t.z=c[e+2];var i=d(t)/2/Math.PI+.5,r=(o=t,Math.atan2(-o.y,Math.sqrt(o.x*o.x+o.z*o.z))/Math.PI+.5);h.push(i,1-r)}var o;(function(){for(var t=new a.a,e=new a.a,i=new a.a,r=new a.a,o=new s.a,n=new s.a,u=new s.a,p=0,l=0;p<c.length;p+=9,l+=6){t.set(c[p+0],c[p+1],c[p+2]),e.set(c[p+3],c[p+4],c[p+5]),i.set(c[p+6],c[p+7],c[p+8]),o.set(h[l+0],h[l+1]),n.set(h[l+2],h[l+3]),u.set(h[l+4],h[l+5]),r.copy(t).add(e).add(i).divideScalar(3);var y=d(r);f(o,l+0,t,y),f(n,l+2,e,y),f(u,l+4,i,y)}})(),function(){for(var t=0;t<h.length;t+=6){var e=h[t+0],i=h[t+2],r=h[t+4],o=Math.max(e,i,r),n=Math.min(e,i,r);o>.9&&n<.1&&(e<.2&&(h[t+0]+=1),i<.2&&(h[t+2]+=1),r<.2&&(h[t+4]+=1))}}()}(),this.setAttribute("position",new n.b(c,3)),this.setAttribute("normal",new n.b(c.slice(),3)),this.setAttribute("uv",new n.b(h,2)),0===r?this.computeVertexNormals():this.normalizeNormals()}c.prototype=Object.create(r.a.prototype),c.prototype.constructor=c,h.prototype=Object.create(o.a.prototype),h.prototype.constructor=h},393:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(25),o=i(24);function n(t,e){r.a.call(this),this.type="Light",this.color=new o.a(t),this.intensity=void 0!==e?e:1,this.receiveShadow=void 0}n.prototype=Object.assign(Object.create(r.a.prototype),{constructor:n,isLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.color.copy(t.color),this.intensity=t.intensity,this},toJSON:function(t){var e=r.a.prototype.toJSON.call(this,t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,void 0!==this.groundColor&&(e.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(e.object.distance=this.distance),void 0!==this.angle&&(e.object.angle=this.angle),void 0!==this.decay&&(e.object.decay=this.decay),void 0!==this.penumbra&&(e.object.penumbra=this.penumbra),void 0!==this.shadow&&(e.object.shadow=this.shadow.toJSON()),e}})},405:function(t,e,i){"use strict";i.d(e,"a",(function(){return m}));var r=i(358),o=i(383),n=i(29),a=i(25),s=i(2),c=i(356),h=i(329),u=i(328),p=new s.a,l=new s.a,f=new n.a,d=new o.a,y=new r.a;function m(t,e,i){1===i&&console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."),a.a.call(this),this.type="Line",this.geometry=void 0!==t?t:new h.a,this.material=void 0!==e?e:new c.a}m.prototype=Object.assign(Object.create(a.a.prototype),{constructor:m,isLine:!0,computeLineDistances:function(){var t=this.geometry;if(t.isBufferGeometry)if(null===t.index){for(var e=t.attributes.position,i=[0],r=1,o=e.count;r<o;r++)p.fromBufferAttribute(e,r-1),l.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=p.distanceTo(l);t.setAttribute("lineDistance",new u.b(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else if(t.isGeometry){var n=t.vertices;(i=t.lineDistances)[0]=0;for(r=1,o=n.length;r<o;r++)i[r]=i[r-1],i[r]+=n[r-1].distanceTo(n[r])}return this},raycast:function(t,e){var i=this.geometry,r=this.matrixWorld,o=t.params.Line.threshold;if(null===i.boundingSphere&&i.computeBoundingSphere(),y.copy(i.boundingSphere),y.applyMatrix4(r),y.radius+=o,!1!==t.ray.intersectsSphere(y)){f.getInverse(r),d.copy(t.ray).applyMatrix4(f);var n=o/((this.scale.x+this.scale.y+this.scale.z)/3),a=n*n,c=new s.a,h=new s.a,u=new s.a,p=new s.a,l=this&&this.isLineSegments?2:1;if(i.isBufferGeometry){var m=i.index,w=i.attributes.position.array;if(null!==m)for(var g=m.array,v=0,b=g.length-1;v<b;v+=l){var x=g[v],j=g[v+1];if(c.fromArray(w,3*x),h.fromArray(w,3*j),!(d.distanceSqToSegment(c,h,p,u)>a))p.applyMatrix4(this.matrixWorld),(O=t.ray.origin.distanceTo(p))<t.near||O>t.far||e.push({distance:O,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}else for(v=0,b=w.length/3-1;v<b;v+=l){if(c.fromArray(w,3*v),h.fromArray(w,3*v+3),!(d.distanceSqToSegment(c,h,p,u)>a))p.applyMatrix4(this.matrixWorld),(O=t.ray.origin.distanceTo(p))<t.near||O>t.far||e.push({distance:O,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else if(i.isGeometry){var M=i.vertices,S=M.length;for(v=0;v<S-1;v+=l){var O;if(!(d.distanceSqToSegment(M[v],M[v+1],p,u)>a))p.applyMatrix4(this.matrixWorld),(O=t.ray.origin.distanceTo(p))<t.near||O>t.far||e.push({distance:O,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}},clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}})},406:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return c}));var r=i(337),o=i(329),n=i(328),a=i(2);function s(t,e,i,o,n,a,s){r.a.call(this),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:o,phiLength:n,thetaStart:a,thetaLength:s},this.fromBufferGeometry(new c(t,e,i,o,n,a,s)),this.mergeVertices()}function c(t,e,i,r,s,c,h){o.a.call(this),this.type="SphereBufferGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:c,thetaLength:h},t=t||1,e=Math.max(3,Math.floor(e)||8),i=Math.max(2,Math.floor(i)||6),r=void 0!==r?r:0,s=void 0!==s?s:2*Math.PI,c=void 0!==c?c:0,h=void 0!==h?h:Math.PI;var u,p,l=Math.min(c+h,Math.PI),f=0,d=[],y=new a.a,m=new a.a,w=[],g=[],v=[],b=[];for(p=0;p<=i;p++){var x=[],j=p/i,M=0;for(0==p&&0==c?M=.5/e:p==i&&l==Math.PI&&(M=-.5/e),u=0;u<=e;u++){var S=u/e;y.x=-t*Math.cos(r+S*s)*Math.sin(c+j*h),y.y=t*Math.cos(c+j*h),y.z=t*Math.sin(r+S*s)*Math.sin(c+j*h),g.push(y.x,y.y,y.z),m.copy(y).normalize(),v.push(m.x,m.y,m.z),b.push(S+M,1-j),x.push(f++)}d.push(x)}for(p=0;p<i;p++)for(u=0;u<e;u++){var O=d[p][u+1],L=d[p][u],P=d[p+1][u],z=d[p+1][u+1];(0!==p||c>0)&&w.push(O,L,z),(p!==i-1||l<Math.PI)&&w.push(L,P,z)}this.setIndex(w),this.setAttribute("position",new n.b(g,3)),this.setAttribute("normal",new n.b(v,3)),this.setAttribute("uv",new n.b(b,2))}s.prototype=Object.create(r.a.prototype),s.prototype.constructor=s,c.prototype=Object.create(o.a.prototype),c.prototype.constructor=c},413:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(383),o=i(144);function n(t,e,i,n){this.ray=new r.a(t,e),this.near=i||0,this.far=n||1/0,this.camera=null,this.layers=new o.a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}},Object.defineProperties(this.params,{PointCloud:{get:function(){return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points}}})}function a(t,e){return t.distance-e.distance}function s(t,e,i,r){if(t.layers.test(e.layers)&&t.raycast(e,i),!0===r)for(var o=t.children,n=0,a=o.length;n<a;n++)s(o[n],e,i,!0)}Object.assign(n.prototype,{set:function(t,e){this.ray.set(t,e)},setFromCamera:function(t,e){e&&e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e&&e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type.")},intersectObject:function(t,e,i){var r=i||[];return s(t,this,r,e),r.sort(a),r},intersectObjects:function(t,e,i){var r=i||[];if(!1===Array.isArray(t))return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),r;for(var o=0,n=t.length;o<n;o++)s(t[o],this,r,e);return r.sort(a),r}})},415:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return a}));var r=i(337),o=i(381);function n(t,e){r.a.call(this),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e},this.fromBufferGeometry(new a(t,e)),this.mergeVertices()}function a(t,e){o.a.call(this,[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],t,e),this.type="OctahedronBufferGeometry",this.parameters={radius:t,detail:e}}n.prototype=Object.create(r.a.prototype),n.prototype.constructor=n,a.prototype=Object.create(o.a.prototype),a.prototype.constructor=a},416:function(t,e,i){var r=i(508),o=i(50);t.exports=function(t){return t&&t.length?r(t,o):0}},437:function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var r=i(29),o=i(12),n=i(2),a=i(36),s=i(430);function c(t){this.camera=t,this.bias=0,this.radius=1,this.mapSize=new o.a(512,512),this.map=null,this.mapPass=null,this.matrix=new r.a,this._frustum=new s.a,this._frameExtents=new o.a(1,1),this._viewportCount=1,this._viewports=[new a.a(0,0,1,1)]}Object.assign(c.prototype,{_projScreenMatrix:new r.a,_lightPositionWorld:new n.a,_lookTarget:new n.a,getViewportCount:function(){return this._viewportCount},getFrustum:function(){return this._frustum},updateMatrices:function(t){var e=this.camera,i=this.matrix,r=this._projScreenMatrix,o=this._lookTarget,n=this._lightPositionWorld;n.setFromMatrixPosition(t.matrixWorld),e.position.copy(n),o.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(o),e.updateMatrixWorld(),r.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(r),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(e.projectionMatrix),i.multiply(e.matrixWorldInverse)},getViewport:function(t){return this._viewports[t]},getFrameExtents:function(){return this._frameExtents},copy:function(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this},clone:function(){return(new this.constructor).copy(this)},toJSON:function(){var t={};return 0!==this.bias&&(t.bias=this.bias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}})},454:function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var r=i(393),o=i(437),n=i(378);function a(){o.a.call(this,new n.a(-5,5,5,-5,.5,500))}a.prototype=Object.assign(Object.create(o.a.prototype),{constructor:a,isDirectionalLightShadow:!0,updateMatrices:function(t){o.a.prototype.updateMatrices.call(this,t)}});var s=i(25);function c(t,e){r.a.call(this,t,e),this.type="DirectionalLight",this.position.copy(s.a.DefaultUp),this.updateMatrix(),this.target=new s.a,this.shadow=new a}c.prototype=Object.assign(Object.create(r.a.prototype),{constructor:c,isDirectionalLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}})},455:function(t,e,i){"use strict";i.d(e,"a",(function(){return u}));var r=i(393),o=i(437),n=i(368),a=i(12),s=i(2),c=i(36);function h(){o.a.call(this,new n.a(90,1,.5,500)),this._frameExtents=new a.a(4,2),this._viewportCount=6,this._viewports=[new c.a(2,1,1,1),new c.a(0,1,1,1),new c.a(3,1,1,1),new c.a(1,1,1,1),new c.a(3,0,1,1),new c.a(1,0,1,1)],this._cubeDirections=[new s.a(1,0,0),new s.a(-1,0,0),new s.a(0,0,1),new s.a(0,0,-1),new s.a(0,1,0),new s.a(0,-1,0)],this._cubeUps=[new s.a(0,1,0),new s.a(0,1,0),new s.a(0,1,0),new s.a(0,1,0),new s.a(0,0,1),new s.a(0,0,-1)]}function u(t,e,i,o){r.a.call(this,t,e),this.type="PointLight",Object.defineProperty(this,"power",{get:function(){return 4*this.intensity*Math.PI},set:function(t){this.intensity=t/(4*Math.PI)}}),this.distance=void 0!==i?i:0,this.decay=void 0!==o?o:1,this.shadow=new h}h.prototype=Object.assign(Object.create(o.a.prototype),{constructor:h,isPointLightShadow:!0,updateMatrices:function(t,e){void 0===e&&(e=0);var i=this.camera,r=this.matrix,o=this._lightPositionWorld,n=this._lookTarget,a=this._projScreenMatrix;o.setFromMatrixPosition(t.matrixWorld),i.position.copy(o),n.copy(i.position),n.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(n),i.updateMatrixWorld(),r.makeTranslation(-o.x,-o.y,-o.z),a.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(a)}}),u.prototype=Object.assign(Object.create(r.a.prototype),{constructor:u,isPointLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}})},456:function(t,e,i){"use strict";i.d(e,"a",(function(){return h}));var r=i(393),o=i(437),n=i(10),a=i(368);function s(){o.a.call(this,new a.a(50,1,.5,500))}s.prototype=Object.assign(Object.create(o.a.prototype),{constructor:s,isSpotLightShadow:!0,updateMatrices:function(t){var e=this.camera,i=2*n.a.RAD2DEG*t.angle,r=this.mapSize.width/this.mapSize.height,a=t.distance||e.far;i===e.fov&&r===e.aspect&&a===e.far||(e.fov=i,e.aspect=r,e.far=a,e.updateProjectionMatrix()),o.a.prototype.updateMatrices.call(this,t)}});var c=i(25);function h(t,e,i,o,n,a){r.a.call(this,t,e),this.type="SpotLight",this.position.copy(c.a.DefaultUp),this.updateMatrix(),this.target=new c.a,Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(t){this.intensity=t/Math.PI}}),this.distance=void 0!==i?i:0,this.angle=void 0!==o?o:Math.PI/3,this.penumbra=void 0!==n?n:0,this.decay=void 0!==a?a:1,this.shadow=new s}h.prototype=Object.assign(Object.create(r.a.prototype),{constructor:h,isSpotLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}})},462:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var r=i(393);function o(t,e){r.a.call(this,t,e),this.type="AmbientLight",this.castShadow=void 0}o.prototype=Object.assign(Object.create(r.a.prototype),{constructor:o,isAmbientLight:!0})},463:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var r=i(393);function o(t,e,i,o){r.a.call(this,t,e),this.type="RectAreaLight",this.width=void 0!==i?i:10,this.height=void 0!==o?o:10}o.prototype=Object.assign(Object.create(r.a.prototype),{constructor:o,isRectAreaLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.width=t.width,this.height=t.height,this},toJSON:function(t){var e=r.a.prototype.toJSON.call(this,t);return e.object.width=this.width,e.object.height=this.height,e}})},464:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var r=i(393),o=i(24),n=i(25);function a(t,e,i){r.a.call(this,t,i),this.type="HemisphereLight",this.castShadow=void 0,this.position.copy(n.a.DefaultUp),this.updateMatrix(),this.groundColor=new o.a(e)}a.prototype=Object.assign(Object.create(r.a.prototype),{constructor:a,isHemisphereLight:!0,copy:function(t){return r.a.prototype.copy.call(this,t),this.groundColor.copy(t.groundColor),this}})},465:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var r=i(24);function o(t,e){this.name="",this.color=new r.a(t),this.density=void 0!==e?e:25e-5}Object.assign(o.prototype,{isFogExp2:!0,clone:function(){return new o(this.color,this.density)},toJSON:function(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}})},466:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var r=i(24);function o(t,e,i){this.name="",this.color=new r.a(t),this.near=void 0!==e?e:1,this.far=void 0!==i?i:1e3}Object.assign(o.prototype,{isFog:!0,clone:function(){return new o(this.color,this.near,this.far)},toJSON:function(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}})},508:function(t,e){t.exports=function(t,e){for(var i,r=-1,o=t.length;++r<o;){var n=e(t[r]);void 0!==n&&(i=void 0===i?n:i+n)}return i}}}]);
//# sourceMappingURL=vendors~Obj~Sop.bundle.js.map