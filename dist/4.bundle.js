(window.webpackJsonpPOLY=window.webpackJsonpPOLY||[]).push([[4],{341:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r(349),s=r(335),o={};function n(e){s.a.call(this,e)}n.prototype=Object.assign(Object.create(s.a.prototype),{constructor:n,load:function(e,t,r,s){void 0===e&&(e=""),void 0!==this.path&&(e=this.path+e),e=this.manager.resolveURL(e);var n=this,i=a.a.get(e);if(void 0!==i)return n.manager.itemStart(e),setTimeout((function(){t&&t(i),n.manager.itemEnd(e)}),0),i;if(void 0===o[e]){var c=e.match(/^data:(.*?)(;base64)?,(.*)$/);if(c){var d=c[1],h=!!c[2],p=c[3];p=decodeURIComponent(p),h&&(p=atob(p));try{var T,u=(this.responseType||"").toLowerCase();switch(u){case"arraybuffer":case"blob":for(var l=new Uint8Array(p.length),m=0;m<p.length;m++)l[m]=p.charCodeAt(m);T="blob"===u?new Blob([l.buffer],{type:d}):l.buffer;break;case"document":var _=new DOMParser;T=_.parseFromString(p,d);break;case"json":T=JSON.parse(p);break;default:T=p}setTimeout((function(){t&&t(T),n.manager.itemEnd(e)}),0)}catch(t){setTimeout((function(){s&&s(t),n.manager.itemError(e),n.manager.itemEnd(e)}),0)}}else{o[e]=[],o[e].push({onLoad:t,onProgress:r,onError:s});var f=new XMLHttpRequest;for(var g in f.open("GET",e,!0),f.addEventListener("load",(function(t){var r=this.response,s=o[e];if(delete o[e],200===this.status||0===this.status){0===this.status&&console.warn("THREE.FileLoader: HTTP Status 0 received."),a.a.add(e,r);for(var i=0,c=s.length;i<c;i++){(d=s[i]).onLoad&&d.onLoad(r)}n.manager.itemEnd(e)}else{for(i=0,c=s.length;i<c;i++){var d;(d=s[i]).onError&&d.onError(t)}n.manager.itemError(e),n.manager.itemEnd(e)}}),!1),f.addEventListener("progress",(function(t){for(var r=o[e],a=0,s=r.length;a<s;a++){var n=r[a];n.onProgress&&n.onProgress(t)}}),!1),f.addEventListener("error",(function(t){var r=o[e];delete o[e];for(var a=0,s=r.length;a<s;a++){var i=r[a];i.onError&&i.onError(t)}n.manager.itemError(e),n.manager.itemEnd(e)}),!1),f.addEventListener("abort",(function(t){var r=o[e];delete o[e];for(var a=0,s=r.length;a<s;a++){var i=r[a];i.onError&&i.onError(t)}n.manager.itemError(e),n.manager.itemEnd(e)}),!1),void 0!==this.responseType&&(f.responseType=this.responseType),void 0!==this.withCredentials&&(f.withCredentials=this.withCredentials),f.overrideMimeType&&f.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain"),this.requestHeader)f.setRequestHeader(g,this.requestHeader[g]);f.send(null)}return n.manager.itemStart(e),f}o[e].push({onLoad:t,onProgress:r,onError:s})},setResponseType:function(e){return this.responseType=e,this},setWithCredentials:function(e){return this.withCredentials=e,this},setMimeType:function(e){return this.mimeType=e,this},setRequestHeader:function(e){return this.requestHeader=e,this}})},622:function(e,t,r){"use strict";r.r(t),r.d(t,"BasisTextureLoader",(function(){return c}));var a=r(83);function s(e,t,r,s,o,n,i,c,d,h,p,T){a.a.call(this,null,n,i,c,d,h,s,o,p,T),this.image={width:t,height:r},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}s.prototype=Object.create(a.a.prototype),s.prototype.constructor=s,s.prototype.isCompressedTexture=!0;var o=r(341),n=r(4),i=r(335),c=function(e){i.a.call(this,e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.workerConfig={format:null,astcSupported:!1,bptcSupported:!1,etcSupported:!1,dxtSupported:!1,pvrtcSupported:!1}};c.prototype=Object.assign(Object.create(i.a.prototype),{constructor:c,setTranscoderPath:function(e){return this.transcoderPath=e,this},setWorkerLimit:function(e){return this.workerLimit=e,this},detectSupport:function(e){var t=this.workerConfig;if(t.astcSupported=!!e.extensions.get("WEBGL_compressed_texture_astc"),t.bptcSupported=!!e.extensions.get("EXT_texture_compression_bptc"),t.etcSupported=!!e.extensions.get("WEBGL_compressed_texture_etc1"),t.dxtSupported=!!e.extensions.get("WEBGL_compressed_texture_s3tc"),t.pvrtcSupported=!!e.extensions.get("WEBGL_compressed_texture_pvrtc")||!!e.extensions.get("WEBKIT_WEBGL_compressed_texture_pvrtc"),t.astcSupported)t.format=c.BASIS_FORMAT.cTFASTC_4x4;else if(t.bptcSupported)t.format=c.BASIS_FORMAT.cTFBC7_M5;else if(t.dxtSupported)t.format=c.BASIS_FORMAT.cTFBC3;else if(t.pvrtcSupported)t.format=c.BASIS_FORMAT.cTFPVRTC1_4_RGBA;else{if(!t.etcSupported)throw new Error("THREE.BasisTextureLoader: No suitable compressed texture format found.");t.format=c.BASIS_FORMAT.cTFETC1}return this},load:function(e,t,r,a){var s=new o.a(this.manager);s.setResponseType("arraybuffer"),s.load(e,e=>{this._createTexture(e).then(t).catch(a)},r,a)},_createTexture:function(e){var t,r,a=e.byteLength,o=this._allocateWorker(a).then(a=>(t=a,r=this.workerNextTaskID++,new Promise((a,s)=>{t._callbacks[r]={resolve:a,reject:s},t.postMessage({type:"transcode",id:r,buffer:e},[e])}))).then(e=>{var t,r=this.workerConfig,{width:a,height:o,mipmaps:i,format:d}=e;switch(d){case c.BASIS_FORMAT.cTFASTC_4x4:t=new s(i,a,o,n.Lb);break;case c.BASIS_FORMAT.cTFBC7_M5:t=new s(i,a,o,n.Tb);break;case c.BASIS_FORMAT.cTFBC1:case c.BASIS_FORMAT.cTFBC3:t=new s(i,a,o,c.DXT_FORMAT_MAP[r.format],n.Wc);break;case c.BASIS_FORMAT.cTFETC1:t=new s(i,a,o,n.hc);break;case c.BASIS_FORMAT.cTFPVRTC1_4_RGB:t=new s(i,a,o,n.kc);break;case c.BASIS_FORMAT.cTFPVRTC1_4_RGBA:t=new s(i,a,o,n.Wb);break;default:throw new Error("THREE.BasisTextureLoader: No supported format available.")}return t.minFilter=1===i.length?n.R:n.U,t.magFilter=n.R,t.generateMipmaps=!1,t.needsUpdate=!0,t});return o.finally(()=>{t&&r&&(t._taskLoad-=a,delete t._callbacks[r])}),o},_initTranscoder:function(){if(!this.transcoderPending){var e=new o.a(this.manager);e.setPath(this.transcoderPath);var t=new Promise((t,r)=>{e.load("basis_transcoder.js",t,void 0,r)}),r=new o.a(this.manager);r.setPath(this.transcoderPath),r.setResponseType("arraybuffer");var a=new Promise((e,t)=>{r.load("basis_transcoder.wasm",e,void 0,t)});this.transcoderPending=Promise.all([t,a]).then(([e,t])=>{var r=c.BasisWorker.toString(),a=["/* basis_transcoder.js */",e,"/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([a])),this.transcoderBinary=t})}return this.transcoderPending},_allocateWorker:function(e){return this._initTranscoder().then(()=>{var t;this.workerPool.length<this.workerLimit?((t=new Worker(this.workerSourceURL))._callbacks={},t._taskLoad=0,t.postMessage({type:"init",config:this.workerConfig,transcoderBinary:this.transcoderBinary}),t.onmessage=function(e){var r=e.data;switch(r.type){case"transcode":t._callbacks[r.id].resolve(r);break;case"error":t._callbacks[r.id].reject(r);break;default:console.error('THREE.BasisTextureLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(t)):this.workerPool.sort((function(e,t){return e._taskLoad>t._taskLoad?-1:1}));return(t=this.workerPool[this.workerPool.length-1])._taskLoad+=e,t})},dispose:function(){for(var e=0;e<this.workerPool.length;e++)this.workerPool[e].terminate();return this.workerPool.length=0,this}}),c.BASIS_FORMAT={cTFETC1:0,cTFETC2:1,cTFBC1:2,cTFBC3:3,cTFBC4:4,cTFBC5:5,cTFBC7_M6_OPAQUE_ONLY:6,cTFBC7_M5:7,cTFPVRTC1_4_RGB:8,cTFPVRTC1_4_RGBA:9,cTFASTC_4x4:10,cTFATC_RGB:11,cTFATC_RGBA_INTERPOLATED_ALPHA:12,cTFRGBA32:13,cTFRGB565:14,cTFBGR565:15,cTFRGBA4444:16},c.DXT_FORMAT={COMPRESSED_RGB_S3TC_DXT1_EXT:33776,COMPRESSED_RGBA_S3TC_DXT1_EXT:33777,COMPRESSED_RGBA_S3TC_DXT3_EXT:33778,COMPRESSED_RGBA_S3TC_DXT5_EXT:33779},c.DXT_FORMAT_MAP={},c.DXT_FORMAT_MAP[c.BASIS_FORMAT.cTFBC1]=c.DXT_FORMAT.COMPRESSED_RGB_S3TC_DXT1_EXT,c.DXT_FORMAT_MAP[c.BASIS_FORMAT.cTFBC3]=c.DXT_FORMAT.COMPRESSED_RGBA_S3TC_DXT5_EXT,c.BasisWorker=function(){var e,t,r;onmessage=function(a){var s,o,n=a.data;switch(n.type){case"init":e=n.config,s=n.transcoderBinary,t=new Promise(e=>{o={wasmBinary:s,onRuntimeInitialized:e},BASIS(o)}).then(()=>{var{BasisFile:e,initializeBasis:t}=o;r=e,t()});break;case"transcode":t.then(()=>{try{for(var{width:t,height:a,hasAlpha:s,mipmaps:o,format:i}=function(t){var a=new r(new Uint8Array(t)),s=a.getImageWidth(0,0),o=a.getImageHeight(0,0),n=a.getNumLevels(0),i=a.getHasAlpha();function c(){a.close(),a.delete()}if(!i)switch(e.format){case 9:e.format=8}if(!s||!o||!n)throw c(),new Error("THREE.BasisTextureLoader:  Invalid .basis file");if(!a.startTranscoding())throw c(),new Error("THREE.BasisTextureLoader: .startTranscoding failed");for(var d=[],h=0;h<n;h++){var p=a.getImageWidth(0,h),T=a.getImageHeight(0,h),u=new Uint8Array(a.getImageTranscodedSizeInBytes(0,h,e.format));if(!a.transcodeImage(u,0,h,e.format,0,i))throw c(),new Error("THREE.BasisTextureLoader: .transcodeImage failed.");d.push({data:u,width:p,height:T})}return c(),{width:s,height:o,hasAlpha:i,mipmaps:d,format:e.format}}(n.buffer),c=[],d=0;d<o.length;++d)c.push(o[d].data.buffer);self.postMessage({type:"transcode",id:n.id,width:t,height:a,hasAlpha:s,mipmaps:o,format:i},c)}catch(e){console.error(e),self.postMessage({type:"error",id:n.id,error:e.message})}})}}}}}]);
//# sourceMappingURL=4.bundle.js.map