(window.webpackJsonpPOLY=window.webpackJsonpPOLY||[]).push([[5],{516:function(e,t,r){"use strict";r.r(t),r.d(t,"BasisTextureLoader",(function(){return c}));var s=r(23);function a(e,t,r,a,o,i,n,c,T,d,h,_){s.a.call(this,null,i,n,c,T,d,a,o,h,_),this.image={width:t,height:r},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}a.prototype=Object.create(s.a.prototype),a.prototype.constructor=a,a.prototype.isCompressedTexture=!0;var o=r(69),i=r(0),n=r(25),c=function(e){n.a.call(this,e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.workerConfig={format:null,astcSupported:!1,bptcSupported:!1,etcSupported:!1,dxtSupported:!1,pvrtcSupported:!1}};c.prototype=Object.assign(Object.create(n.a.prototype),{constructor:c,setTranscoderPath:function(e){return this.transcoderPath=e,this},setWorkerLimit:function(e){return this.workerLimit=e,this},detectSupport:function(e){var t=this.workerConfig;if(t.astcSupported=!!e.extensions.get("WEBGL_compressed_texture_astc"),t.bptcSupported=!!e.extensions.get("EXT_texture_compression_bptc"),t.etcSupported=!!e.extensions.get("WEBGL_compressed_texture_etc1"),t.dxtSupported=!!e.extensions.get("WEBGL_compressed_texture_s3tc"),t.pvrtcSupported=!!e.extensions.get("WEBGL_compressed_texture_pvrtc")||!!e.extensions.get("WEBKIT_WEBGL_compressed_texture_pvrtc"),t.astcSupported)t.format=c.BASIS_FORMAT.cTFASTC_4x4;else if(t.bptcSupported)t.format=c.BASIS_FORMAT.cTFBC7_M5;else if(t.dxtSupported)t.format=c.BASIS_FORMAT.cTFBC3;else if(t.pvrtcSupported)t.format=c.BASIS_FORMAT.cTFPVRTC1_4_RGBA;else{if(!t.etcSupported)throw new Error("THREE.BasisTextureLoader: No suitable compressed texture format found.");t.format=c.BASIS_FORMAT.cTFETC1}return this},load:function(e,t,r,s){var a=new o.a(this.manager);a.setResponseType("arraybuffer"),a.load(e,e=>{this._createTexture(e).then(t).catch(s)},r,s)},_createTexture:function(e){var t,r,s=e.byteLength,o=this._allocateWorker(s).then(s=>(t=s,r=this.workerNextTaskID++,new Promise((s,a)=>{t._callbacks[r]={resolve:s,reject:a},t.postMessage({type:"transcode",id:r,buffer:e},[e])}))).then(e=>{var t,r=this.workerConfig,{width:s,height:o,mipmaps:n,format:T}=e;switch(T){case c.BASIS_FORMAT.cTFASTC_4x4:t=new a(n,s,o,i.Mb);break;case c.BASIS_FORMAT.cTFBC7_M5:t=new a(n,s,o,i.Ub);break;case c.BASIS_FORMAT.cTFBC1:case c.BASIS_FORMAT.cTFBC3:t=new a(n,s,o,c.DXT_FORMAT_MAP[r.format],i.Xc);break;case c.BASIS_FORMAT.cTFETC1:t=new a(n,s,o,i.ic);break;case c.BASIS_FORMAT.cTFPVRTC1_4_RGB:t=new a(n,s,o,i.lc);break;case c.BASIS_FORMAT.cTFPVRTC1_4_RGBA:t=new a(n,s,o,i.Xb);break;default:throw new Error("THREE.BasisTextureLoader: No supported format available.")}return t.minFilter=1===n.length?i.S:i.V,t.magFilter=i.S,t.generateMipmaps=!1,t.needsUpdate=!0,t});return o.finally(()=>{t&&r&&(t._taskLoad-=s,delete t._callbacks[r])}),o},_initTranscoder:function(){if(!this.transcoderPending){var e=new o.a(this.manager);e.setPath(this.transcoderPath);var t=new Promise((t,r)=>{e.load("basis_transcoder.js",t,void 0,r)}),r=new o.a(this.manager);r.setPath(this.transcoderPath),r.setResponseType("arraybuffer");var s=new Promise((e,t)=>{r.load("basis_transcoder.wasm",e,void 0,t)});this.transcoderPending=Promise.all([t,s]).then(([e,t])=>{var r=c.BasisWorker.toString(),s=["/* basis_transcoder.js */",e,"/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([s])),this.transcoderBinary=t})}return this.transcoderPending},_allocateWorker:function(e){return this._initTranscoder().then(()=>{var t;this.workerPool.length<this.workerLimit?((t=new Worker(this.workerSourceURL))._callbacks={},t._taskLoad=0,t.postMessage({type:"init",config:this.workerConfig,transcoderBinary:this.transcoderBinary}),t.onmessage=function(e){var r=e.data;switch(r.type){case"transcode":t._callbacks[r.id].resolve(r);break;case"error":t._callbacks[r.id].reject(r);break;default:console.error('THREE.BasisTextureLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(t)):this.workerPool.sort((function(e,t){return e._taskLoad>t._taskLoad?-1:1}));return(t=this.workerPool[this.workerPool.length-1])._taskLoad+=e,t})},dispose:function(){for(var e=0;e<this.workerPool.length;e++)this.workerPool[e].terminate();return this.workerPool.length=0,this}}),c.BASIS_FORMAT={cTFETC1:0,cTFETC2:1,cTFBC1:2,cTFBC3:3,cTFBC4:4,cTFBC5:5,cTFBC7_M6_OPAQUE_ONLY:6,cTFBC7_M5:7,cTFPVRTC1_4_RGB:8,cTFPVRTC1_4_RGBA:9,cTFASTC_4x4:10,cTFATC_RGB:11,cTFATC_RGBA_INTERPOLATED_ALPHA:12,cTFRGBA32:13,cTFRGB565:14,cTFBGR565:15,cTFRGBA4444:16},c.DXT_FORMAT={COMPRESSED_RGB_S3TC_DXT1_EXT:33776,COMPRESSED_RGBA_S3TC_DXT1_EXT:33777,COMPRESSED_RGBA_S3TC_DXT3_EXT:33778,COMPRESSED_RGBA_S3TC_DXT5_EXT:33779},c.DXT_FORMAT_MAP={},c.DXT_FORMAT_MAP[c.BASIS_FORMAT.cTFBC1]=c.DXT_FORMAT.COMPRESSED_RGB_S3TC_DXT1_EXT,c.DXT_FORMAT_MAP[c.BASIS_FORMAT.cTFBC3]=c.DXT_FORMAT.COMPRESSED_RGBA_S3TC_DXT5_EXT,c.BasisWorker=function(){var e,t,r;onmessage=function(s){var a,o,i=s.data;switch(i.type){case"init":e=i.config,a=i.transcoderBinary,t=new Promise(e=>{o={wasmBinary:a,onRuntimeInitialized:e},BASIS(o)}).then(()=>{var{BasisFile:e,initializeBasis:t}=o;r=e,t()});break;case"transcode":t.then(()=>{try{for(var{width:t,height:s,hasAlpha:a,mipmaps:o,format:n}=function(t){var s=new r(new Uint8Array(t)),a=s.getImageWidth(0,0),o=s.getImageHeight(0,0),i=s.getNumLevels(0),n=s.getHasAlpha();function c(){s.close(),s.delete()}if(!n)switch(e.format){case 9:e.format=8}if(!a||!o||!i)throw c(),new Error("THREE.BasisTextureLoader:  Invalid .basis file");if(!s.startTranscoding())throw c(),new Error("THREE.BasisTextureLoader: .startTranscoding failed");for(var T=[],d=0;d<i;d++){var h=s.getImageWidth(0,d),_=s.getImageHeight(0,d),p=new Uint8Array(s.getImageTranscodedSizeInBytes(0,d,e.format));if(!s.transcodeImage(p,0,d,e.format,0,n))throw c(),new Error("THREE.BasisTextureLoader: .transcodeImage failed.");T.push({data:p,width:h,height:_})}return c(),{width:a,height:o,hasAlpha:n,mipmaps:T,format:e.format}}(i.buffer),c=[],T=0;T<o.length;++T)c.push(o[T].data.buffer);self.postMessage({type:"transcode",id:i.id,width:t,height:s,hasAlpha:a,mipmaps:o,format:n},c)}catch(e){console.error(e),self.postMessage({type:"error",id:i.id,error:e.message})}})}}}}}]);
//# sourceMappingURL=5.bundle.js.map