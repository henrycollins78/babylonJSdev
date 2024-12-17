import{P as U,h as P,i as _,e as D,j as k,I as B,k as C,B as I,l as M,m as T,H as F,W as N,A as W,n as g,o as Z,C as m,a as z,E as O,p as S,q as G,r as H,F as x,s as X,t as Y,u as j}from"./index-CoiE-ux4.js";const V=20000630;function q(n,l){if(n.getUint32(0,!0)!=V)throw new Error("Incorrect OpenEXR format");const s=n.getUint8(4),i=n.getUint8(5),t={singleTile:!!(i&2),longName:!!(i&4),deepFormat:!!(i&8),multiPart:!!(i&16)};l.value=8;const r={};let e=!0;for(;e;){const a=U(n.buffer,l);if(!a)e=!1;else{const c=U(n.buffer,l),o=P(n,l),u=_(n,l,c,o);u===void 0?D.Warn(`Unknown header attribute type ${c}'.`):r[a]=u}}if(i&-5)throw new Error("Unsupported file format");return{version:s,spec:t,...r}}function $(n){let l=n.byteLength;const s=new Array;let i=0;const t=new DataView(n);for(;l>0;){const r=t.getInt8(i++);if(r<0){const e=-r;l-=e+1;for(let a=0;a<e;a++)s.push(t.getUint8(i++))}else{const e=r;l-=2;const a=t.getUint8(i++);for(let c=0;c<e+1;c++)s.push(a)}}return s}function v(n){return new DataView(n.array.buffer,n.offset.value,n.size)}function J(n){const l=n.viewer.buffer.slice(n.offset.value,n.offset.value+n.size),s=new Uint8Array($(l)),i=new Uint8Array(s.length);return k(s),B(s,i),new DataView(i.buffer)}function L(n){const l=n.array.slice(n.offset.value,n.offset.value+n.size),s=fflate.unzlibSync(l),i=new Uint8Array(s.length);return k(s),B(s,i),new DataView(i.buffer)}function K(n){const l=n.array.slice(n.offset.value,n.offset.value+n.size),s=fflate.unzlibSync(l),i=n.lines*n.channels*n.width,t=n.type==1?new Uint16Array(i):new Uint32Array(i);let r=0,e=0;const a=new Array(4);for(let c=0;c<n.lines;c++)for(let o=0;o<n.channels;o++){let u=0;switch(n.type){case 1:a[0]=r,a[1]=a[0]+n.width,r=a[1]+n.width;for(let h=0;h<n.width;++h){const w=s[a[0]++]<<8|s[a[1]++];u+=w,t[e]=u,e++}break;case 2:a[0]=r,a[1]=a[0]+n.width,a[2]=a[1]+n.width,r=a[2]+n.width;for(let h=0;h<n.width;++h){const w=s[a[0]++]<<24|s[a[1]++]<<16|s[a[2]++]<<8;u+=w,t[e]=u,e++}break}}return new DataView(t.buffer)}function Q(n){const l=n.viewer,s={value:n.offset.value},i=new Uint16Array(n.width*n.scanlineBlockSize*(n.channels*n.type)),t=new Uint8Array(I);let r=0;const e=new Array(n.channels);for(let f=0;f<n.channels;f++)e[f]={},e[f].start=r,e[f].end=e[f].start,e[f].nx=n.width,e[f].ny=n.lines,e[f].size=n.type,r+=e[f].nx*e[f].ny*e[f].size;const a=C(l,s),c=C(l,s);if(c>=I)throw new Error("Wrong PIZ_COMPRESSION BITMAP_SIZE");if(a<=c)for(let f=0;f<c-a+1;f++)t[f+a]=M(l,s);const o=new Uint16Array(Z),u=T(t,o),h=P(l,s);F(n.array,l,s,h,i,r);for(let f=0;f<n.channels;++f){const p=e[f];for(let y=0;y<e[f].size;++y)N(i,p.start+y,p.nx,p.size,p.ny,p.nx*p.size,u)}W(o,i,r);let w=0;const E=new Uint8Array(i.buffer.byteLength);for(let f=0;f<n.lines;f++)for(let p=0;p<n.channels;p++){const y=e[p],b=y.nx*y.size,A=new Uint8Array(i.buffer,y.end*g,b*g);E.set(A,w),w+=b*g,y.end+=b}return new DataView(E.buffer)}async function d(n,l,s,i){const t={size:0,viewer:l,array:new Uint8Array(l.buffer),offset:s,width:n.dataWindow.xMax-n.dataWindow.xMin+1,height:n.dataWindow.yMax-n.dataWindow.yMin+1,channels:n.channels.length,channelLineOffsets:{},scanOrder:()=>0,bytesPerLine:0,outLineWidth:0,lines:0,scanlineBlockSize:0,inputSize:null,type:0,uncompress:null,getter:()=>0,format:5,outputChannels:0,decodeChannels:{},blockCount:null,byteArray:null,linearSpace:!1,textureType:0};switch(n.compression){case m.NO_COMPRESSION:t.lines=1,t.uncompress=v;break;case m.RLE_COMPRESSION:t.lines=1,t.uncompress=J;break;case m.ZIPS_COMPRESSION:t.lines=1,t.uncompress=L,await z.LoadScriptAsync(O.FFLATEUrl);break;case m.ZIP_COMPRESSION:t.lines=16,t.uncompress=L,await z.LoadScriptAsync(O.FFLATEUrl);break;case m.PIZ_COMPRESSION:t.lines=32,t.uncompress=Q;break;case m.PXR24_COMPRESSION:t.lines=16,t.uncompress=K,await z.LoadScriptAsync(O.FFLATEUrl);break;default:throw new Error(m[n.compression]+" is unsupported")}t.scanlineBlockSize=t.lines;const r={};for(const o of n.channels)switch(o.name){case"Y":case"R":case"G":case"B":case"A":r[o.name]=!0,t.type=o.pixelType}let e=!1;if(r.R&&r.G&&r.B)e=!r.A,t.outputChannels=4,t.decodeChannels={R:0,G:1,B:2,A:3};else if(r.Y)t.outputChannels=1,t.decodeChannels={Y:0};else throw new Error("EXRLoader.parse: file contains unsupported data channels.");if(t.type===1)switch(i){case S.Float:t.getter=G,t.inputSize=g;break;case S.HalfFloat:t.getter=C,t.inputSize=g;break}else if(t.type===2)switch(i){case S.Float:t.getter=X,t.inputSize=x;break;case S.HalfFloat:t.getter=H,t.inputSize=x}else throw new Error("Unsupported pixelType "+t.type+" for "+n.compression);t.blockCount=t.height/t.scanlineBlockSize;for(let o=0;o<t.blockCount;o++)Y(l,s);const a=t.width*t.height*t.outputChannels;switch(i){case S.Float:t.byteArray=new Float32Array(a),t.textureType=1,e&&t.byteArray.fill(1,0,a);break;case S.HalfFloat:t.byteArray=new Uint16Array(a),t.textureType=2,e&&t.byteArray.fill(15360,0,a);break;default:throw new Error("Unsupported type: "+i)}let c=0;for(const o of n.channels)t.decodeChannels[o.name]!==void 0&&(t.channelLineOffsets[o.name]=c*t.width),c+=o.pixelType*2;return t.bytesPerLine=t.width*c,t.outLineWidth=t.width*t.outputChannels,n.lineOrder==="INCREASING_Y"?t.scanOrder=o=>o:t.scanOrder=o=>t.height-1-o,t.outputChannels==4?(t.format=5,t.linearSpace=!0):(t.format=6,t.linearSpace=!1),t}function nn(n,l,s,i){const t={value:0};for(let r=0;r<n.height/n.scanlineBlockSize;r++){const e=j(s,i)-l.dataWindow.yMin;n.size=P(s,i),n.lines=e+n.scanlineBlockSize>n.height?n.height-e:n.scanlineBlockSize;const c=n.size<n.lines*n.bytesPerLine&&n.uncompress?n.uncompress(n):v(n);i.value+=n.size;for(let o=0;o<n.scanlineBlockSize;o++){const u=r*n.scanlineBlockSize,h=o+n.scanOrder(u);if(h>=n.height)continue;const w=o*n.bytesPerLine,E=(n.height-1-h)*n.outLineWidth;for(let f=0;f<n.channels;f++){const p=l.channels[f].name,y=n.channelLineOffsets[p],b=n.decodeChannels[p];if(b!==void 0){t.value=w+y;for(let A=0;A<n.width;A++){const R=E+A*n.outputChannels+b;n.byteArray&&(n.byteArray[R]=n.getter(c,t))}}}}}}class en{constructor(){this.supportCascades=!1}loadCubeData(l,s,i,t,r){throw".exr not supported in Cube."}async loadData(l,s,i){const t=new DataView(l.buffer),r={value:0},e=q(t,r),a=await d(e,t,r,O.DefaultOutputType);nn(a,e,t,r);const c=e.dataWindow.xMax-e.dataWindow.xMin+1,o=e.dataWindow.yMax-e.dataWindow.yMin+1;i(c,o,s.generateMipMaps,!1,()=>{const u=s.getEngine();s.format=e.format,s.type=a.textureType,s.invertY=!1,s._gammaSpace=!e.linearSpace,a.byteArray&&u._uploadDataToTextureDirectly(s,a.byteArray,0,0,void 0,!0)})}}export{en as _ExrTextureLoader};
