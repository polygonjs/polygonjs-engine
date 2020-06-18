(window.webpackJsonpPOLY=window.webpackJsonpPOLY||[]).push([[9],{507:function(e,t,n){"use strict";n.r(t),n.d(t,"PLYLoader",(function(){return c}));var r=n(5),s=n(71),a=n(3),i=n(25),o=n(180),c=function(e){i.a.call(this,e),this.propertyNameMapping={}};c.prototype=Object.assign(Object.create(i.a.prototype),{constructor:c,load:function(e,t,n,r){var a=this,i=new s.a(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.load(e,(function(n){try{t(a.parse(n))}catch(t){r?r(t):console.error(t),a.manager.itemError(e)}}),n,r)},setPropertyNameMapping:function(e){this.propertyNameMapping=e},parse:function(e){function t(e){var t="",n=0,r=/ply([\s\S]*)end_header\r?\n/.exec(e);null!==r&&(t=r[1],n=r[0].length);var s,a,i,o,c,u,p={comments:[],elements:[],headerLength:n},l=t.split("\n");for(var h=0;h<l.length;h++){var m=l[h];if(""!==(m=m.trim()))switch(a=(i=m.split(/\s+/)).shift(),m=i.join(" "),a){case"format":p.format=i[0],p.version=i[1];break;case"comment":p.comments.push(m);break;case"element":void 0!==s&&p.elements.push(s),(s={}).name=i[0],s.count=parseInt(i[1]),s.properties=[];break;case"property":s.properties.push((o=i,c=f.propertyNameMapping,u=void 0,"list"===(u={type:o[0]}).type?(u.name=o[3],u.countType=o[1],u.itemType=o[2]):u.name=o[1],u.name in c&&(u.name=c[u.name]),u));break;default:console.log("unhandled",a,i)}}return void 0!==s&&p.elements.push(s),p}function n(e,t){switch(t){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(e);case"float":case"double":case"float32":case"float64":return parseFloat(e)}}function s(e,t){for(var r=t.split(/\s+/),s={},a=0;a<e.length;a++)if("list"===e[a].type){for(var i=[],o=n(r.shift(),e[a].countType),c=0;c<o;c++)i.push(n(r.shift(),e[a].itemType));s[e[a].name]=i}else s[e[a].name]=n(r.shift(),e[a].type);return s}function i(e,t){var n,r={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]},a="";null!==(n=/end_header\s([\s\S]*)$/.exec(e))&&(a=n[1]);for(var i=a.split("\n"),o=0,p=0,l=0;l<i.length;l++){var h=i[l];if(""!==(h=h.trim())){p>=t.elements[o].count&&(o++,p=0);var f=s(t.elements[o].properties,h);u(r,t.elements[o].name,f),p++}}return c(r)}function c(e){var t=new r.a;return e.indices.length>0&&t.setIndex(e.indices),t.setAttribute("position",new a.b(e.vertices,3)),e.normals.length>0&&t.setAttribute("normal",new a.b(e.normals,3)),e.uvs.length>0&&t.setAttribute("uv",new a.b(e.uvs,2)),e.colors.length>0&&t.setAttribute("color",new a.b(e.colors,3)),e.faceVertexUvs.length>0&&(t=t.toNonIndexed()).setAttribute("uv",new a.b(e.faceVertexUvs,2)),t.computeBoundingSphere(),t}function u(e,t,n){if("vertex"===t)e.vertices.push(n.x,n.y,n.z),"nx"in n&&"ny"in n&&"nz"in n&&e.normals.push(n.nx,n.ny,n.nz),"s"in n&&"t"in n&&e.uvs.push(n.s,n.t),"red"in n&&"green"in n&&"blue"in n&&e.colors.push(n.red/255,n.green/255,n.blue/255);else if("face"===t){var r=n.vertex_indices||n.vertex_index,s=n.texcoord;3===r.length?(e.indices.push(r[0],r[1],r[2]),s&&6===s.length&&(e.faceVertexUvs.push(s[0],s[1]),e.faceVertexUvs.push(s[2],s[3]),e.faceVertexUvs.push(s[4],s[5]))):4===r.length&&(e.indices.push(r[0],r[1],r[3]),e.indices.push(r[1],r[2],r[3]))}}function p(e,t,n,r){switch(n){case"int8":case"char":return[e.getInt8(t),1];case"uint8":case"uchar":return[e.getUint8(t),1];case"int16":case"short":return[e.getInt16(t,r),2];case"uint16":case"ushort":return[e.getUint16(t,r),2];case"int32":case"int":return[e.getInt32(t,r),4];case"uint32":case"uint":return[e.getUint32(t,r),4];case"float32":case"float":return[e.getFloat32(t,r),4];case"float64":case"double":return[e.getFloat64(t,r),8]}}function l(e,t,n,r){for(var s,a={},i=0,o=0;o<n.length;o++)if("list"===n[o].type){var c=[],u=(s=p(e,t+i,n[o].countType,r))[0];i+=s[1];for(var l=0;l<u;l++)s=p(e,t+i,n[o].itemType,r),c.push(s[0]),i+=s[1];a[n[o].name]=c}else s=p(e,t+i,n[o].type,r),a[n[o].name]=s[0],i+=s[1];return[a,i]}var h,f=this;if(e instanceof ArrayBuffer){var m=o.a.decodeText(new Uint8Array(e)),v=t(m);h="ascii"===v.format?i(m,v):function(e,t){for(var n,r={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]},s="binary_little_endian"===t.format,a=new DataView(e,t.headerLength),i=0,o=0;o<t.elements.length;o++)for(var p=0;p<t.elements[o].count;p++){i+=(n=l(a,i,t.elements[o].properties,s))[1];var h=n[0];u(r,t.elements[o].name,h)}return c(r)}(e,v)}else h=i(e,t(e));return h}})}}]);
//# sourceMappingURL=9.bundle.js.map