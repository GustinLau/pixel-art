(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(t,e,a){t.exports=a("56d7")},"110b":function(t,e,a){},"219c":function(t,e,a){"use strict";a("f641")},"25e4":function(t,e,a){},"3f8a":function(t,e,a){"use strict";a("e12c")},4620:function(t,e,a){},"4e6f":function(t,e,a){"use strict";a("4620")},"56d7":function(t,e,a){"use strict";a.r(e);var i=a("2b0e"),o=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},s=[],r=(a("98e9"),a("2877")),l={},n=Object(r["a"])(l,o,s,!1,null,null,null),c=n.exports,h=a("8c4f"),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("div",{staticClass:"sidebar"},[e("sidebar",{attrs:{pixelit:t.px}})],1),e("div",{staticClass:"container"},[t.showCanvas?[e("canvas",{ref:"canvas",staticClass:"canvas",class:{hidden:!t.canvasReady}}),e("img",{ref:"baseCanvasUrl",staticClass:"hidden",attrs:{id:"baseCanvasUrl",alt:""}}),t.statistics?e("div",{staticClass:"statistics"},t._l(t.statistics,(function(a,i){return e("div",{key:i,staticClass:"statistics-box"},[e("div",{staticClass:"color",style:{background:`rgba(${a.color})`,color:a.isLightColor?"#000":"#fff"}},[t._v(" "+t._s(a.no)+" ")]),e("div",{staticClass:"count"},[t._v(t._s(a.count))])])})),0):t._e()]:t._e()],2)])},p=[];a("caad");const u=1,f=1,m=1,g=6103515625,w=t=>t*(Math.PI/180),v=t=>180/Math.PI*t,b=w(360),C=w(180),I=.045,x=.015;function M(t,e,a){return.213*t+.715*e+.072*a>127.5}function y(t,e,a){let i="#";const o=[t,e,a];for(let s=0;s<o.length;s++){let t=Number(o[s]).toString(16);t=1===t.length?"0"+t:t,i+=t}return i}function k(t){if(t=t.toLowerCase(),4===t.length){let e="#";for(let a=1;a<4;a+=1)e+=t.slice(a,a+1).concat(t.slice(a,a+1));t=e}const e=[];for(let a=1;a<7;a+=2)e.push(parseInt("0x"+t.slice(a,a+2)));return e}function _(t,e,a){const i=t=>t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,o=i(t/255),s=i(e/255),r=i(a/255);return[.4124*o+.3576*s+.1805*r,.2126*o+.7152*s+.0722*r,.0193*o+.1192*s+.9505*r]}function E(t,e,a){const i=1/3,o=4/29,s=1/3*Math.pow(29/6.9,2),r=Math.pow(6/29,3),l=.950456,n=1,c=1.088754,h=t=>t>r?Math.pow(t,i):s*t+o,d=h(t/l),p=h(e/n),u=h(a/c);return[Math.max(116*p-16,0),500*(d-p),200*(p-u)]}function S(t,e,a){return E(..._(t,e,a))}function P(t,e,a){const i=Math.sqrt(e*e+a*a);let o=i<=0?0:v(Math.atan2(a,e));while(o>=360)o-=360;while(o<0)o+=360;return[t,i,o]}function L(t,e,a){const i=Math.min(t,e,a),o=Math.max(t,e,a);let s,r;const l=o,n=o-i;return 0===n?s=r=0:(r=n/l,s=t===o?(e-a)/n:e===o?2+(a-t)/n:4+(t-e)/n,s=(60*s+360)%360),[s,r,l/255]}function $(t,e,a){let i,o,s;if(t%=360,e=Math.min(Math.max(0,e),1),a=Math.round(255*Math.min(Math.max(0,a))),0===e)return i=a,o=a,s=a,[i,o,s];const r=t/60,l=Math.floor(r),n=r-l,c=a*(1-e),h=a*(1-e*n),d=a*(1-e*(1-n));switch(l){case 0:i=a,o=d,s=c;break;case 1:i=h,o=a,s=c;break;case 2:i=c,o=a,s=d;break;case 3:i=c,o=h,s=a;break;case 4:i=d,o=c,s=a;break;default:i=a,o=c,s=h;break}return[Math.round(i),Math.round(o),Math.round(s)]}function O(t,e,a){t%=360,e=Math.min(Math.max(0,e),1),a=Math.min(Math.max(0,a));let i=(2-e)*a;return e*=a,i&&2-i&&(e/=i<=1?i:2-i),i/=2,[t,e,i]}function T(t,e,a){t%=360,e=Math.min(Math.max(0,e),1),a=Math.min(Math.max(0,a));const i=2*a,o=e*(i<=1?i:2-i),s=(i+o)/2;return e=2*o/(i+o)||0,[t,e,s]}function j(t,e,a){return O(...L(t,e,a))}function U(t,e,a){return $(...T(t,e,a))}function R(t,e){const[a,i,o]=t,[s,r,l]=e,n=a-s,c=i-r,h=o-l;return Math.sqrt(n*n+c*c+h*h)}function A(t,e){const[a,i,o]=t,[s,r,l]=e,n=a-s,c=i-r,h=o-l;return Math.sqrt(2*n*n+4*c*c+3*h*h)}function W(t,e){const[a,i,o]=t,[s,r,l]=e,n=(a+s)/2,c=a-s,h=i-r,d=o-l;return Math.sqrt((2+n/256)*c*c+4*h*h+(2+(255-n)/256)*d*d)}function V(t,e){let a=0;for(let i=0;i<3;i++)a+=Math.pow(t[i]-e[i],2);return Math.sqrt(a)}function H(t,e){const[a,i,o]=t,[s,r,l]=e,n=Math.sqrt(i*i+o*o),c=Math.sqrt(r*r+l*l),h=a-s,d=i-r,p=o-l,g=n-c,w=Math.sqrt(Math.pow(d,2)+Math.pow(p,2)-Math.pow(g,2)),v=1,b=1+I*n,C=1+x*n;return Math.sqrt(Math.pow(h/(u*v),2)+Math.pow(g/(f*b),2)+Math.pow(w/(m*C),2))}function N(t,e){const[a,i,o]=t,[s,r,l]=e,n=Math.sqrt(i*i+o*o),c=Math.sqrt(r*r+l*l),h=(n+c)/2,d=.5*(1-Math.sqrt(Math.pow(h,7)/(Math.pow(h,7)+g))),p=(1+d)*i,v=(1+d)*r,I=Math.sqrt(p*p+o*o),x=Math.sqrt(v*v+l*l);let M,y;0===o&&0===p?M=0:(M=Math.atan2(o,p),M<0&&(M+=b)),0===l&&0===v?y=0:(y=Math.atan2(l,v),y<0&&(y+=b));const k=s-a,_=x-I,E=I*x;let S;0===E?S=0:(S=y-M,S<-C?S+=b:S>C&&(S-=b));const P=2*Math.sqrt(E)*Math.sin(S/2),L=(a+s)/2,$=(I+x)/2;let O;const T=M+y;O=0===E?T:Math.abs(M-y)<=C?T/2:T<b?(T+b)/2:(T-b)/2;const j=1-.17*Math.cos(O-w(30))+.24*Math.cos(2*O)+.32*Math.cos(3*O+w(6))-.2*Math.cos(4*O-w(63)),U=1+.015*Math.pow(L-50,2)/Math.sqrt(20+Math.pow(L-50,2)),R=1+.045*$,A=1+.015*$*j,W=Math.pow($,7),V=-2*Math.sqrt(W/(W+g))*Math.sin(w(60)*Math.exp(-Math.pow((O-w(275))/w(25),2)));return Math.sqrt(Math.pow(k/(u*U),2)+Math.pow(_/(f*R),2)+Math.pow(P/(m*A),2)+V*(_/(f*R))*(P/(m*A)))}function q(t,e){const a=2,i=1,[o,s,r]=t,[l,n,c]=e,[h,d,p]=P(o,s,r),[u,f,m]=P(l,n,c),g=d*d*d*d,v=Math.sqrt(g/(g+1900));let b;b=p>=164&&p<=345?.56+Math.abs(.2*Math.cos(w(p+168))):.36+Math.abs(.4*Math.cos(w(p+35)));const C=o<16?.511:.040975*o/(1+.01765*o),I=.0638*d/(1+.0131*d)+.638,x=I*(v*b+1-v),M=s-n,y=r-c,k=d-f,_=Math.sqrt(M*M+y*y-k*k);return Math.sqrt(Math.pow((o-l)/(a*C),2)+Math.pow((d-f)/(i*I),2)+Math.pow(_/x,2))}const D={CIE76:"CIE76",CIE94:"CIE94",CIE2000:"CIE2000",Euclidean_1:"Euclidean_1",Euclidean_2:"Euclidean_2",Euclidean_3:"Euclidean_3",CMC:"CMC"},z=[D.CIE76,D.CIE94,D.CIE2000,D.CMC];class B{constructor(t={}){this.drawto=t.to||document.getElementById("pixelitcanvas"),this.drawfrom=t.from||document.getElementById("pixelitimg"),this.similarColorAlgorithm=t.similarColorAlgorithm||D.CIE76,this.pixelW=t.pixelW||64,this.pixelH=t.pixelH||64,this.palette=t.palette||[[140,143,174],[88,69,99],[62,33,55],[154,99,72],[215,155,125],[245,237,186],[192,199,65],[100,125,52],[228,148,58],[157,48,59],[210,100,113],[112,55,127],[126,196,193],[52,133,157],[23,67,75],[31,14,28]],this.height=t.height,this.width=t.width,this.ctx=this.drawto.getContext("2d"),this.paletteMap={},this.paletteLab={},z.includes(this.similarColorAlgorithm)&&this.palette.map(t=>S(...t)).forEach((t,e)=>{this.paletteLab[this.palette[e].join(",")]=t})}hideFromImg(){return this.drawfrom.style.visibility="hidden",this.drawfrom.style.position="fixed",this.drawfrom.style.top=0,this.drawfrom.style.left=0,this}setFromImgSource(t){return this.drawfrom.src=t,this}setDrawFrom(t){return this.drawfrom=t,this}setDrawTo(t){return this.drawto=t,this}setPalette(t){return this.palette=t,this}setSimilarColorAlgorithm(t){this.similarColorAlgorithm=t,z.includes(this.similarColorAlgorithm)&&(this.paletteLab={},this.palette.map(t=>S(...t)).forEach((t,e)=>{this.paletteLab[this.palette[e].join(",")]=t}))}setWidth(t){return this.width=t,this}setHeight(t){return this.height=t,this}setPixelW(t){return this.pixelW=t,this}setPixelH(t){return this.pixelH=t,this}getPalette(){return this.palette}getPaletteMap(){return this.paletteMap}colorSim(t,e,a="RGB"){return this.similarColorAlgorithm===D.Euclidean_1?R(t,e):this.similarColorAlgorithm===D.Euclidean_2?A(t,e):this.similarColorAlgorithm===D.Euclidean_3?W(t,e):this.similarColorAlgorithm===D.CIE76?V(t,e):this.similarColorAlgorithm===D.CIE94?H(t,e):this.similarColorAlgorithm===D.CIE2000?N(t,e):this.similarColorAlgorithm===D.CMC?q(t,e):void 0}similarColor(t){let e=[],a=1/0,i="RGB";return[D.CIE76,D.CIE94,D.CIE2000].includes(this.similarColorAlgorithm)&&(t=S(...t),i="Lab"),this.palette.forEach(o=>{let s=o;[D.CIE76,D.CIE94,D.CIE2000].includes(this.similarColorAlgorithm)&&(s=this.paletteLab[o.join(",")]);const r=this.colorSim(t,s,i);r<=a&&(e=o,a=r)}),e}pixelate(){this.drawto.width=this.drawfrom.naturalWidth,this.drawto.height=this.drawfrom.naturalHeight;const t=this.pixelW,e=this.pixelH,a=document.createElement("canvas"),i=a.getContext("2d");return i.drawImage(this.drawfrom,0,0,t,e),document.body.appendChild(a),this.ctx.mozImageSmoothingEnabled=!1,this.ctx.webkitImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(a,0,0,t,e,0,0,this.drawfrom.naturalWidth,this.drawfrom.naturalHeight),a.remove(),this}convertGrayscale(){const t=this.drawto.width,e=this.drawto.height;for(var a=this.ctx.getImageData(0,0,t,e),i=0;i<a.height;i++)for(var o=0;o<a.width;o++){var s=4*i*a.width+4*o,r=(a.data[s]+a.data[s+1]+a.data[s+2])/3;a.data[s]=r,a.data[s+1]=r,a.data[s+2]=r}return this.ctx.putImageData(a,0,0,0,0,a.width,a.height),this}convertPalette(){const t=this.drawto.width,e=this.drawto.height;var a=this.ctx.getImageData(0,0,t,e);let i=0;for(var o=0;o<a.height;o++)for(var s=0;s<a.width;s++){var r=4*o*a.width+4*s;const t=this.similarColor([a.data[r],a.data[r+1],a.data[r+2]]);a.data[r]=t[0],a.data[r+1]=t[1],a.data[r+2]=t[2];const e=`${t[0]},${t[1]},${t[2]}`;this.paletteMap[e]?this.paletteMap[e].push(i++):this.paletteMap[e]=[i++]}return this.ctx.putImageData(a,0,0,0,0,a.width,a.height),this}resizeImage(){const t=document.createElement("canvas"),e=t.getContext("2d");return this.width||this.height?(t.width=this.drawto.width,t.height=this.drawto.height,e.drawImage(this.drawto,0,0),this.drawto.width=this.width,this.drawto.height=this.height,this.ctx.mozImageSmoothingEnabled=!1,this.ctx.webkitImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(t,0,0,t.width,t.height,0,0,this.drawto.width,this.drawto.height),this):0}draw(){return this.drawto.width=this.drawfrom.width,this.drawto.height=this.drawfrom.height,this.ctx.drawImage(this.drawfrom,0,0),this.resizeImage(),this}drawLine(){const t=this.drawto.width,e=this.drawto.height,a=this.drawto.width/this.pixelW;var i=this.ctx.getImageData(0,0,t,e);this.ctx.strokeStyle="black",this.ctx.lineWidth=1;for(var o=a;o<i.height;o+=a)this.ctx.beginPath(),this.ctx.moveTo(0,o),this.ctx.lineTo(t,o),this.ctx.stroke();for(var s=a;s<i.width;s+=a)this.ctx.beginPath(),this.ctx.moveTo(s,0),this.ctx.lineTo(s,e),this.ctx.stroke();return this}fillNumbers(){const t=Object.keys(this.paletteMap);if(t.length>0){const e=this.palette.filter(e=>t.includes(e.join(","))),a=this.drawto.width/this.pixelW;this.ctx.font=Math.floor(.8*a)+"px sans-serif",this.ctx.textBaseline="middle",this.ctx.textAlign="center";const i=1;for(let t=0;t<e.length;t++){const o=e[t],s=o.join(",");this.ctx.fillStyle=M(o[0],o[1],o[2])?"#000":"#fff";for(let e=0;e<this.paletteMap[s].length;e++){const o=this.paletteMap[s][e]%this.pixelW,r=Math.floor(this.paletteMap[s][e]/this.pixelW);this.ctx.fillText(""+(t+1),o*a+a/2,r*a+a/2+i,a)}}}return this}statistics(){const t=Object.keys(this.paletteMap),e=this.palette.filter(e=>t.includes(e.join(",")));return e.map((t,e)=>{const a=t.join(",");return{no:e+1,color:a,count:this.paletteMap[a].length,isLightColor:M(...t)}})}saveImage(){const t=document.createElement("a");t.download="pxArt.png",t.href=this.drawto.toDataURL("image/png").replace("image/png","image/octet-stream"),document.querySelector("body").appendChild(t),t.click(),document.querySelector("body").removeChild(t)}}var F=function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar"},[e("div",{staticClass:"setting"},[e("setting")],1),e("h1",{staticClass:"title"},[t._v("PIXEL ART")]),e("el-row",[e("el-col",{attrs:{span:24}},[e("div",{staticClass:"upload"},[e("uploader",{ref:"uploader",attrs:{accept:"image/jpeg,image/png"}})],1)])],1),e("el-row",{attrs:{gutter:16}},[e("el-col",{attrs:{span:6}},[e("label",{staticClass:"label"},[t._v("颜色算法")])]),e("el-col",{attrs:{span:18}},[e("el-select",{staticClass:"control",attrs:{placeholder:"请选择"},model:{value:t.config.algorithm,callback:function(e){t.$set(t.config,"algorithm",e)},expression:"config.algorithm"}},t._l(t.ALGORITHMS,(function(t){return e("el-option",{key:t.key,attrs:{label:t.value,value:t.key}})})),1)],1)],1),e("el-row",{attrs:{gutter:16}},[e("el-col",{attrs:{span:6}},[e("label",{staticClass:"label"},[t._v("模式")])]),e("el-col",{attrs:{span:18}},[e("div",{staticClass:"mode-group"},[e("el-checkbox",{model:{value:t.config.drawLine,callback:function(e){t.$set(t.config,"drawLine",e)},expression:"config.drawLine"}},[t._v("像素描边")]),e("el-checkbox",{attrs:{disabled:!t.havePalette},model:{value:t.config.palette,callback:function(e){t.$set(t.config,"palette",e)},expression:"config.palette"}},[t._v("调色板")]),e("el-checkbox",{attrs:{disabled:!t.havePalette||!t.config.palette},model:{value:t.config.fillNums,callback:function(e){t.$set(t.config,"fillNums",e)},expression:"config.fillNums"}},[t._v("填充数字")]),e("el-checkbox",{attrs:{disabled:!t.havePalette||!t.config.palette},model:{value:t.config.statistics,callback:function(e){t.$set(t.config,"statistics",e)},expression:"config.statistics"}},[t._v("统计")])],1)])],1),e("el-row",{attrs:{gutter:16}},[e("el-col",{attrs:{span:6}},[e("label",{staticClass:"label"},[t._v("亮度")])]),e("el-col",{attrs:{span:18}},[e("div",{staticClass:"mode-group"},[e("el-slider",{attrs:{min:-100,max:100,"format-tooltip":t.formatTooltip,disabled:!t.canvasShowed},on:{change:t.handleBrightnessChange},model:{value:t.brightness,callback:function(e){t.brightness=e},expression:"brightness"}})],1)])],1),e("el-row",{attrs:{gutter:16}},[e("el-col",{attrs:{span:6}},[e("label",{staticClass:"label"},[t._v("饱和度")])]),e("el-col",{attrs:{span:18}},[e("div",{staticClass:"mode-group"},[e("el-slider",{attrs:{min:-100,max:100,"format-tooltip":t.formatTooltip,disabled:!t.canvasShowed},on:{change:t.handleSaturationChange},model:{value:t.saturation,callback:function(e){t.saturation=e},expression:"saturation"}})],1)])],1),e("el-row",{attrs:{gutter:16}},[e("el-col",{attrs:{span:6}},[e("label",{staticClass:"label"},[t._v("对比度")])]),e("el-col",{attrs:{span:18}},[e("div",{staticClass:"mode-group"},[e("el-slider",{attrs:{min:-100,max:100,"format-tooltip":t.formatTooltip,disabled:!t.canvasShowed},on:{change:t.handleContrastChange},model:{value:t.contrast,callback:function(e){t.contrast=e},expression:"contrast"}})],1)])],1),e("el-button",{attrs:{icon:"el-icon-download",type:"primary",disabled:!t.canvasShowed,loading:t.downloading},on:{click:t.download}},[t._v("下载图片 ")])],1)},G=[],J=function(){var t=this,e=t._self._c;return e("div",[e("el-link",{attrs:{underline:!1},on:{click:function(e){t.drawerVisible=!0}}},[e("i",{staticClass:"el-icon-brush"})]),e("palette",{attrs:{visible:t.drawerVisible},on:{"update:visible":function(e){t.drawerVisible=e}}})],1)},X=[],Z=function(){var t=this,e=t._self._c;return e("el-drawer",{staticClass:"palette-drawer",attrs:{title:"调色板",visible:t.drawerVisible,direction:"ltr",size:"auto","append-to-body":!0},on:{"update:visible":function(e){t.drawerVisible=e}}},[e("div",{staticClass:"palette-container"},[t._l(t.colors,(function(a,i){return e("palette-color",{key:"color_"+i,attrs:{name:a.name,value:a.value},on:{remove:t.removeColor}})})),e("el-button",{staticClass:"add-btn",attrs:{size:"small",icon:"el-icon-plus"},on:{click:function(e){t.dialogVisible=!0}}})],2),e("div",{staticClass:"footer"},[e("input",{ref:"input",staticClass:"hidden",attrs:{type:"file",name:"file",accept:"application/json"},on:{change:t.handleInputChange}}),e("el-button",{attrs:{icon:"el-icon-upload2"},on:{click:t.importPalette}},[t._v("导入")]),e("el-button",{attrs:{icon:"el-icon-download"},on:{click:t.exportPalette}},[t._v("导出")])],1),e("el-dialog",{attrs:{title:"新颜色",visible:t.dialogVisible,width:"300px","append-to-body":"","close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogVisible=e},closed:t.handleDialogClosed}},[e("div",{staticClass:"create-color-dialog"},[e("el-row",[e("el-col",{attrs:{span:4}},[t._v(" 名称: ")]),e("el-col",{attrs:{span:20}},[e("el-input",{ref:"colorName",model:{value:t.colorName,callback:function(e){t.colorName="string"===typeof e?e.trim():e},expression:"colorName"}})],1)],1),e("el-row",[e("el-col",{attrs:{span:4}},[t._v(" 代码: ")]),e("el-col",{attrs:{span:20}},[e("el-input",{ref:"colorValue",attrs:{maxlength:6},model:{value:t.colorValue,callback:function(e){t.colorValue=e},expression:"colorValue"}},[e("template",{slot:"prepend"},[t._v("#")])],2)],1)],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.confirmNewColor}},[t._v("确 定")])],1)])],1)},Y=[],K=(a("d9e2"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"palette-color",class:{hover:t.showAction},on:{mouseover:function(e){t.showAction=!0},mouseout:function(e){t.showAction=!1}}},[e("div",{staticClass:"color",style:{background:t.value}}),e("div",{staticClass:"name"},[t._v(t._s(t.name))]),e("div",{staticClass:"actions"},[e("span",{staticClass:"action",on:{click:t.removeColor}},[e("i",{staticClass:"el-icon-delete"})])])])}),Q=[],tt={name:"PaletteColor",props:{value:{type:String,default:"",required:!1},name:{type:String,default:"",required:!1}},data(){return{showAction:!1}},methods:{removeColor(){this.$emit("remove",{name:this.name,value:this.value})}}},et=tt,at=(a("4e6f"),Object(r["a"])(et,K,Q,!1,null,"18b5fd24",null)),it=at.exports;function ot(t){return/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(t)}var st={name:"Palette",components:{PaletteColor:it},props:{visible:{type:Boolean,default:!1}},data(){return{colors:this.$store.state.app.colors.concat(),drawerVisible:!1,dialogVisible:!1,colorName:"",shadowColorValue:""}},computed:{colorValue:{get:function(){return this.shadowColorValue},set:function(t){this.shadowColorValue=t.toUpperCase()}}},watch:{visible:{immediate:!0,handler(t){this.drawerVisible=t}},drawerVisible(t){this.$emit("update:visible",t)},"$store.state.app.colors"(t){this.colors=t}},methods:{setLocalPalette(t){return this.$store.dispatch("app/setColors",t||this.colors)},removeColor(t){this.colors=this.colors.filter(e=>e.name!==t.name),this.setLocalPalette()},handleDialogClosed(){this.colorName="",this.colorValue=""},confirmNewColor(){return this.colorName?this.colorValue&&ot("#"+this.colorValue)?void(this.addColor()&&(this.dialogVisible=!1)):(this.$notify({type:"error",title:"请输入颜色代码"}),void this.$refs.colorValue.focus()):(this.$notify({type:"error",title:"请输入颜色名称"}),void this.$refs.colorName.focus())},addColor(){return this.colors.some(t=>t.name===this.colorName)?(this.$notify({type:"error",message:"颜色名称已存在"}),!1):(this.colors.push({name:this.colorName,value:"#"+this.colorValue}),this.setLocalPalette(),!0)},handleInputChange(t){const e=t.target.files;if(!e)return;const a=new FileReader;a.onload=e=>{try{const t=JSON.parse(e.target.result);if(!(t instanceof Array))throw new Error("格式错误");if(!t.every(t=>t.name&&t.value&&ot(t.value)))throw new Error("内容错误");{const e=t.map(t=>t.name),a=new Set(e);if(e.length!==a.size)throw new Error("内容错误");this.setLocalPalette(t),this.$notify({type:"success",title:"导入成功"})}}catch(t){this.$notify({type:"error",title:"文件有误，请确认！"})}},a.readAsText(e[0])},importPalette(){this.$refs.input.value=null,this.$refs.input.click()},exportPalette(){const t=document.createElement("a"),e=new Blob([JSON.stringify(this.colors)]);t.download="palette.json",t.href=URL.createObjectURL(e),t.click(),URL.revokeObjectURL(e)}}},rt=st,lt=(a("fcda"),Object(r["a"])(rt,Z,Y,!1,null,"159a0640",null)),nt=lt.exports,ct={name:"Setting",components:{Palette:nt},data(){return{drawerVisible:!1}}},ht=ct,dt=(a("3f8a"),Object(r["a"])(ht,J,X,!1,null,"f09f0ef8",null)),pt=dt.exports,ut=function(){var t=this,e=t._self._c;return e("div",{staticClass:"uploader"},[t.previewHtml||t.croppedInfo?t.croppedInfo?[e("div",{staticClass:"preview",class:{hover:t.showPreviewAction},on:{mouseover:function(e){t.showPreviewAction=!0},mouseout:function(e){t.showPreviewAction=!1}}},[e("div",{staticClass:"show-preview",staticStyle:{overflow:"hidden"},style:{width:t.croppedInfo.width+"px",height:t.croppedInfo.height+"px"}},[e("div",{style:{width:t.croppedInfo.width+"px",height:t.croppedInfo.height+"px"}},[e("img",{ref:"croppedImage",attrs:{src:t.croppedInfo.url,alt:""},on:{load:t.onCroppedImageLoaded}}),e("img",{ref:"croppedImageOriginal",staticStyle:{display:"none"},attrs:{src:t.croppedInfo.originUrl,alt:""}})])]),e("div",{staticClass:"actions"},[e("span",{staticClass:"action",on:{click:t.removeCurrentImage}},[e("i",{staticClass:"el-icon-delete"})])])])]:[e("div",{staticClass:"preview"},[e("div",{domProps:{innerHTML:t._s(t.previewHtml)}})])]:[e("div",{staticClass:"el-upload"},[e("div",{staticClass:"el-upload-dragger",class:{"is-dragover":t.dragover},on:{click:t.handleClick,drop:function(e){return e.preventDefault(),t.handleDrop.apply(null,arguments)},dragover:function(e){return e.preventDefault(),t.handleDragOver.apply(null,arguments)},dragleave:function(e){e.preventDefault(),t.dragover=!1}}},[e("i",{staticClass:"el-icon-upload"}),t._m(0)]),e("input",{ref:"input",staticClass:"el-upload__input",attrs:{accept:t.accept,type:"file",name:"file"},on:{change:t.handleChange}})])],e("el-dialog",{attrs:{visible:t.cropperDialogVisible,title:"裁剪","append-to-body":"","close-on-click-modal":!1,"close-on-press-escape":!1,width:"600px","show-close":!1,"destroy-on-close":!0},on:{"update:visible":function(e){t.cropperDialogVisible=e}}},[e("cropper",{ref:"cropper",attrs:{type:"64x64",image:t.file},on:{"real-time-html":t.handleRealTimeChange}}),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.close}},[t._v("取消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确定")])],1)],1)],2)},ft=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"el-upload__text"},[t._v("将图片拖到此处，或"),e("em",{attrs:{"data-v-7d622f5c":""}},[t._v("点击上传")])])}],mt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"cropper"},[e("div",{staticStyle:{height:"300px"}},[e("vue-cropper",{ref:"cropper",attrs:{img:t.image,"output-type":"png",info:!1,full:!0,"can-move-box":!1,"fixed-box":!0,"center-box":!0,high:!1,autoCrop:!0,mode:"cover",autoCropWidth:t.cropperSize.width,autoCropHeight:t.cropperSize.height},on:{"real-time":t.realTime}})],1),e("div",{staticClass:"type-box"},t._l(Object.keys(t.SIZE),(function(a){return e("el-radio",{key:a,attrs:{label:a,border:""},model:{value:t.cropperType,callback:function(e){t.cropperType=e},expression:"cropperType"}},[t._v(t._s(a))])})),1)])},gt=[],wt=a("5a50"),vt={name:"Cropper",props:{image:{type:[String,null],default:null,required:!1},type:{type:String,default:"64x64",required:!1}},data(){return{cropperType:this.type}},computed:{SIZE:()=>wt["b"],cropperSize(){const[t,e]=wt["b"][this.cropperType];return{originWidth:t,originHeight:e,width:3*t,height:3*e}}},watch:{type:{immediate:!0,handler(t){this.cropperType=t}},cropperType(){this.$nextTick(()=>{this.$refs.cropper.reload()})}},methods:{realTime(t){this.image?this.$emit("real-time-html",t.html):this.$emit("real-time-html",null)},crop(){return new Promise(t=>{this.$refs.cropper.getCropBlob(e=>{const a=window.URL.createObjectURL(e);URL.revokeObjectURL(e),t({originUrl:a,url:a,originWidth:this.cropperSize.originWidth,originHeight:this.cropperSize.originHeight,width:this.cropperSize.width,height:this.cropperSize.height})})})}}},bt=vt,Ct=(a("ff19"),Object(r["a"])(bt,mt,gt,!1,null,"4ecd4594",null)),It=Ct.exports,xt={name:"Uploader",components:{Cropper:It},props:{accept:{type:String,required:!1,default:""}},data(){return{disabled:!1,dragover:!1,file:null,cropperDialogVisible:!1,cropperType:"1",previewHtml:null,croppedInfo:null,showPreviewAction:!1}},watch:{file(t){t&&(this.cropperDialogVisible=!0)}},methods:{submit(){this.$refs.cropper.crop().then(t=>{this.croppedInfo=t,this.file=null,this.cropperDialogVisible=!1})},close(){this.cropperDialogVisible=!1,this.croppedInfo=null,this.file=null,this.$emit("close")},adjustCroppedInfoUrl(t){this.croppedInfo.url=t},onCroppedImageLoaded(){this.$store.dispatch("app/setCroppedImageInfo",{el:this.$refs.croppedImage,originEl:this.$refs.croppedImageOriginal,originUrl:this.croppedInfo.originUrl,scaleWidth:this.croppedInfo.width,scaleHeight:this.croppedInfo.height,width:this.croppedInfo.originWidth,height:this.croppedInfo.originHeight})},removeCurrentImage(){this.croppedInfo=null,this.$store.dispatch("app/setCroppedImageInfo",null)},handleRealTimeChange(t){this.previewHtml=t},handleFileChange(t){t?(this.file=URL.createObjectURL(t),URL.revokeObjectURL(t)):this.file=null},handleClick(){this.disabled||(this.$refs.input.value=null,this.$refs.input.click())},handleChange(t){const e=t.target.files;e&&this.handleFileChange(e[0])},handleDragOver(){this.disabled||(this.dragover=!0)},handleDrop(t){this.dragover=!1,this.accept?this.handleFileChange([].slice.call(t.dataTransfer.files).filter(t=>{const{type:e,name:a}=t,i=a.indexOf(".")>-1?"."+a.split(".").pop():"",o=e.replace(/\/.*$/,"");return this.accept.split(",").map(t=>t.trim()).filter(t=>t).some(t=>/\..+$/.test(t)?i===t:/\/\*$/.test(t)?o===t.replace(/\/\*$/,""):!!/^[^\/]+\/[^\/]+$/.test(t)&&e===t)})[0]):this.handleFileChange(t.dataTransfer.files[0])}}},Mt=xt,yt=(a("79f3"),Object(r["a"])(Mt,ut,ft,!1,null,"ae4ec0fe",null)),kt=yt.exports;function _t(t,e){return new Promise(a=>{const i=document.createElement("canvas"),o=i.getContext("2d");i.width=t.naturalWidth,i.height=t.naturalHeight,o.drawImage(t,0,0);const s=document.createElement("canvas"),r=s.getContext("2d"),{width:l,height:n}=e;s.width=l,s.height=n,r.drawImage(i,0,0,i.width,i.height,0,0,l,n);const c=r.getImageData(0,0,l,n);let h=0;for(let t=0;t<c.height;t++)for(let a=0;a<c.width;a++){const i=4*t*c.width+4*a,o=c.data[i],s=c.data[i+1],r=c.data[i+2],l=j(o,s,r);if(e.c&&(h+=o+s+r),e.s||e.l){e.s&&(e.s=Math.max(e.s,-1),e.s=Math.min(e.s,1),l[1]*=1+e.s),e.l&&(e.l=Math.max(e.l,-1),e.l=Math.min(e.l,1),l[2]*=1+e.l);const t=U(...l);c.data[i]=t[0],c.data[i+1]=t[1],c.data[i+2]=t[2]}}if(e.c){e.c=Math.max(e.c,-1),e.c=Math.min(e.c,1);const t=h/c.data.length;for(let a=0;a<c.height;a++)for(let i=0;i<c.width;i++){const o=4*a*c.width+4*i,s=c.data[o],r=c.data[o+1],l=c.data[o+2];if(e.c<0)if(-1===e.c){const e=Math.round(t);c.data[o]=e,c.data[o+1]=e,c.data[o+2]=e}else c.data[o]=Math.round(s+(s-t)*e.c),c.data[o+1]=Math.round(r+(r-t)*e.c),c.data[o+2]=Math.round(l+(l-t)*e.c);else{const a=65025/(255-255*e.c)-255;c.data[o]=Math.round(s+(s-t)*a/255),c.data[o+1]=Math.round(r+(r-t)*a/255),c.data[o+2]=Math.round(l+(l-t)*a/255)}}}r.putImageData(c,0,0,0,0,l,n),s.toBlob(t=>a(t))})}function Et(t){return new Promise(e=>{const a=document.createElement("canvas"),i=a.getContext("2d");a.width=t.pixelW,a.height=t.pixelH,i.drawImage(t.el,0,0,t.pixelW,t.pixelH);const o=document.createElement("canvas"),s=o.getContext("2d");o.width=a.width,o.height=a.height,s.drawImage(a,0,0);const r=32;if(a.width=a.width*r,a.height=a.height*r,i.mozImageSmoothingEnabled=!1,i.webkitImageSmoothingEnabled=!1,i.imageSmoothingEnabled=!1,i.drawImage(o,0,0,o.width,o.height,0,0,a.width,a.height),t.havePalette){if(t.drawLine){const e=a.width,o=a.height,s=a.width/t.pixelW;var l=i.getImageData(0,0,e,o);i.strokeStyle="black",i.lineWidth=1;for(var n=s;n<l.height;n+=s)i.beginPath(),i.moveTo(0,n),i.lineTo(e,n),i.stroke();for(var c=s;c<l.width;c+=s)i.beginPath(),i.moveTo(c,0),i.lineTo(c,o),i.stroke()}if(t.fillNums){const e=Object.keys(t.paletteMap);if(e.length>0){const o=t.palette.filter(t=>e.includes(t.join(","))),s=a.width/t.pixelW;i.font=Math.round(.8*s)+"px sans-serif",i.textBaseline="middle",i.textAlign="center";const r=1;for(let e=0;e<o.length;e++){const a=o[e],l=a.join(",");i.fillStyle=M(a[0],a[1],a[2])?"#000":"#fff";for(let o=0;o<t.paletteMap[l].length;o++){const a=t.paletteMap[l][o]%t.pixelW,n=Math.floor(t.paletteMap[l][o]/t.pixelW);i.fillText(""+(e+1),a*s+s/2,n*s+s/2+r,s)}}}}}o.width=a.width,o.height=a.height,s.drawImage(a,0,0);const h=a.width,d=a.height,p=64;a.width=h+2*p,a.height=d+2*p;const u=Object.keys(t.paletteMap),f=3.5*r,m=3.5*r,g=2*r,w=Math.floor((h+g)/(f+g)),v=Math.min(w,u.length),b=Math.ceil(u.length/w);if(t.havePalette&&(a.height=a.height+b*m+(b-1)*g+p),i.mozImageSmoothingEnabled=!1,i.webkitImageSmoothingEnabled=!1,i.imageSmoothingEnabled=!1,i.fillStyle="#fff",i.fillRect(0,0,a.width,a.height),i.drawImage(o,0,0,o.width,o.height,p,p,h,d),t.havePalette){const e=t.palette.filter(t=>u.includes(t.join(","))).map((e,a)=>{const i=e.join(",");return{no:a+1,color:y(...e),count:t.paletteMap[i].length,isLightColor:M(...e)}}),a=(t,e,a,i,o,r,l)=>{if(2*r>i||2*r>o)return!1;t.save(),t.translate(e,a),s(t,r,i,o),t.fillStyle=l||"#000",t.fill(),t.restore()},o=(t,e,a,i,o,r,l,n)=>{if(2*r>i||2*r>o)return!1;t.save(),t.translate(e,a),s(t,r,i,o),t.lineWidth=l||2,t.strokeStyle=n||"#000",t.stroke(),t.restore()},s=(t,e,a,i)=>{const[o,s,r,l]=e;t.beginPath(),t.arc(a-o,i-o,o,0,Math.PI/2),t.lineTo(s,i),t.arc(s,i-s,s,Math.PI/2,Math.PI),t.lineTo(0,r),t.arc(r,r,r,Math.PI,3*Math.PI/2),t.lineTo(a-l,0),t.arc(a-l,l,l,3*Math.PI/2,2*Math.PI),t.lineTo(a,i-l),t.closePath()};let r=0;const l=12,n=document.createElement("canvas");n.width=f,n.height=m;const c=n.getContext("2d");for(let t=0;t<b;t++)for(let s=0;s<v;s++){const h=p+s*(f+g),u=Math.round(d+2*p+t*(m+g)),w=e[r];if(i.shadowOffsetX=0,i.shadowOffsetY=2,i.shadowBlur=12,i.shadowColor="rgba(0, 0, 0, 0.1)",o(i,h,u,f,m,[l,l,l,l],1,"#ddd"),a(i,h-1,u-1,f+2,m/2+1,[0,0,l,l],w.color),a(i,h,u-1+Math.floor(m/2),f,m/2+1,[l,l,0,0],"#fff"),n.width=f,c.fillStyle="rgba(255, 255, 255, 0)",c.textBaseline="middle",c.textAlign="center",c.font=Math.round(m/2*.8)+"px sans-serif",c.fillStyle=w.isLightColor?"#000":"#fff",c.fillText(w.no,f/2,m/4,f),c.fillStyle="#000",c.fillText(w.count,f/2,3*m/4,f),i.drawImage(n,h,u),r++,r===e.length)break}}const C=document.createElement("a");C.download="pixel-art.png",C.href=a.toDataURL("image/png").replace("image/png","image/octet-stream"),document.querySelector("body").appendChild(C),C.click(),document.querySelector("body").removeChild(C),e()})}var St={name:"Sidebar",components:{Uploader:kt,Setting:pt},props:{pixelit:{type:Object,default:null,required:!1}},data(){const t={...this.$store.state.app.config};return{downloading:!1,config:t,brightness:0,contrast:0,saturation:0}},computed:{ALGORITHMS:()=>Object.keys(D).map(t=>({key:t,value:t})),canvasShowed(){return!!this.croppedImageInfo},havePalette(){return this.$store.state.app.colors.length>0},croppedImageInfo(){return this.$store.state.app.croppedImageInfo}},watch:{config:{deep:!0,handler(t){this.$store.dispatch("app/setConfig",t)}},croppedImageInfo(t,e){t&&e&&t.originUrl===e.originUrl||(this.brightness=0,this.contrast=0,this.saturation=0)}},methods:{formatTooltip(t){return t},handleBrightnessChange(t){_t(this.croppedImageInfo.originEl,{width:this.croppedImageInfo.scaleWidth,height:this.croppedImageInfo.scaleHeight,l:t/100,s:this.saturation/100,c:this.contrast/100}).then(t=>{this.$refs.uploader.adjustCroppedInfoUrl(URL.createObjectURL(t)),URL.revokeObjectURL(t)})},handleSaturationChange(t){_t(this.croppedImageInfo.originEl,{width:this.croppedImageInfo.scaleWidth,height:this.croppedImageInfo.scaleHeight,s:t/100,l:this.brightness/100,c:this.contrast/100}).then(t=>{this.$refs.uploader.adjustCroppedInfoUrl(URL.createObjectURL(t)),URL.revokeObjectURL(t)})},handleContrastChange(t){_t(this.croppedImageInfo.originEl,{width:this.croppedImageInfo.scaleWidth,height:this.croppedImageInfo.scaleHeight,c:t/100,s:this.saturation/100,l:this.brightness/100}).then(t=>{this.$refs.uploader.adjustCroppedInfoUrl(URL.createObjectURL(t)),URL.revokeObjectURL(t)})},download(){this.downloading=!0,Et({el:document.getElementById("baseCanvasUrl"),palette:this.pixelit.getPalette(),paletteMap:this.pixelit.getPaletteMap(),pixelW:this.croppedImageInfo.width,pixelH:this.croppedImageInfo.height,havePalette:this.havePalette&&this.config.palette,fillNums:!0,drawLine:!0}).then(()=>{this.downloading=!1})}}},Pt=St,Lt=(a("219c"),Object(r["a"])(Pt,F,G,!1,null,"64646026",null)),$t=Lt.exports,Ot={name:"Home",components:{Sidebar:$t},data(){return{px:null,croppedImageInfo:null,showCanvas:!1,statistics:null,canvasReady:!1}},computed:{config(){return this.$store.state.app.config},palette(){return this.$store.state.app.colors.map(t=>k(t.value))},havePalette(){return this.palette.length>0}},watch:{"$store.state.app.croppedImageInfo"(t){this.showCanvas=!!t,this.$nextTick(()=>{this.croppedImageInfo=t})},showCanvas(t){t||(this.canvasReady=!1)},croppedImageInfo(t){t&&this.draw()},config:{deep:!0,handler(){this.statistics=null,this.draw()}},"$store.state.app.colors"(){this.showCanvas&&this.draw()}},methods:{draw(){const{el:t,width:e,height:a}=this.croppedImageInfo,{algorithm:i,drawLine:o,palette:s,fillNums:r,statistics:l}=this.config,n=800/e;this.px=new B({to:this.$refs.canvas,from:t,similarColorAlgorithm:i,pixelW:e,pixelH:a,palette:this.palette,width:e*n,height:a*n}),this.px.draw().pixelate().setWidth(e).setHeight(a).resizeImage(),this.havePalette&&s&&this.px.convertPalette(),this.$refs.canvas.toBlob(t=>{this.$refs.baseCanvasUrl.src=window.URL.createObjectURL(t),this.px.setWidth(e*n).setHeight(a*n).resizeImage(),o&&this.px.drawLine(),this.havePalette&&r&&this.px.fillNumbers(),this.havePalette&&l&&(this.statistics=this.px.statistics()),this.canvasReady=!0})}}},Tt=Ot,jt=(a("d62d"),Object(r["a"])(Tt,d,p,!1,null,"6cf0385c",null)),Ut=jt.exports;i["default"].use(h["a"]);const Rt=[{path:"/",name:"Home",component:Ut}],At=new h["a"]({routes:Rt});var Wt=At,Vt=(a("13d5"),a("2f62"));i["default"].use(Vt["a"]);const Ht=a("c653"),Nt=Ht.keys().reduce((t,e)=>{const a=e.replace(/^\.\/(.*)\.\w+$/,"$1"),i=Ht(e);return t[a]=i.default,t},{}),qt=new Vt["a"].Store({modules:Nt});var Dt=qt,zt=a("5c96"),Bt=a.n(zt),Ft=a("7e79"),Gt=a.n(Ft);a("0fae"),a("b20f");i["default"].config.productionTip=!1,i["default"].use(Bt.a,{size:"small"}),i["default"].use(Gt.a),new i["default"]({router:Wt,store:Dt,render:t=>t(c)}).$mount("#app")},"5a50":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return o}));const i={"64x64":[64,64],"64x96":[64,96],"96x64":[96,64]},o=[{name:"黄色",value:"#d5c520"},{name:"蓝灰",value:"#98b0cc"},{name:"千岁绿",value:"#1d6c4e"},{name:"练色",value:"#d5c4a1"},{name:"丁香色",value:"#c0a0e0"},{name:"黑色",value:"#000000"},{name:"白色",value:"#f0f0f0"},{name:"枯茶",value:"#513127"},{name:"银灰",value:"#56595c"},{name:"浅蓝",value:"#7c98ae"},{name:"草绿",value:"#84be3d"},{name:"真红",value:"#920a09"},{name:"品红",value:"#c40098"},{name:"淡灰",value:"#a4a9a7"},{name:"淡棕色",value:"#745e41"},{name:"浅棕色",value:"#8d6d41"},{name:"虾黄",value:"#ba8f5e"},{name:"浅澄",value:"#fb9966"},{name:"橙色",value:"#ea8b5d"},{name:"蓝色",value:"#355db5"},{name:"紫蓝色",value:"#150057"},{name:"紫色",value:"#4b215d"},{name:"浅绿",value:"#4ea7b5"},{name:"墨绿",value:"#1d4942"}]},"6f27":function(t,e,a){},"79f3":function(t,e,a){"use strict";a("6f27")},"98e9":function(t,e,a){"use strict";a("25e4")},b20f:function(t,e,a){},c28f:function(t,e,a){},c653:function(t,e,a){var i={"./app.js":"d9cd"};function o(t){var e=s(t);return a(e)}function s(t){if(!a.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}o.keys=function(){return Object.keys(i)},o.resolve=s,t.exports=o,o.id="c653"},d62d:function(t,e,a){"use strict";a("c28f")},d9cd:function(t,e,a){"use strict";a.r(e);var i=a("5a50");const o={croppedImageInfo:null,colors:localStorage.getItem("palette")?JSON.parse(localStorage.getItem("palette")):i["a"],config:{algorithm:"CIE76",drawLine:!0,palette:!0,fillNums:!0,statistics:!0}},s={SET_CROPPED_IMAGE_INFO:(t,e)=>{t.croppedImageInfo=e},SET_CONFIG:(t,e)=>{t.config=e},SET_COLORS:(t,e)=>{t.colors=e}},r={setCroppedImageInfo({commit:t},e){t("SET_CROPPED_IMAGE_INFO",e)},setConfig({commit:t},e){t("SET_CONFIG",e)},setColors({commit:t},e){localStorage.setItem("palette",JSON.stringify(e)),t("SET_COLORS",e)}};e["default"]={namespaced:!0,state:o,mutations:s,actions:r}},e12c:function(t,e,a){},ea28:function(t,e,a){},f641:function(t,e,a){},fcda:function(t,e,a){"use strict";a("ea28")},ff19:function(t,e,a){"use strict";a("110b")}},[[0,"runtime","chunk-libs"]]]);
//# sourceMappingURL=app.0119827d.js.map