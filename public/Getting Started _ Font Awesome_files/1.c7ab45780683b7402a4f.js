(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1319:function(e,t,n){"use strict";function r(e){return""+window.location.origin+e.fullPath}function a(e,t,n){var r="function"==typeof t?t.call(e):t,a="function"==typeof n?n.call(e):n;return{name:r,fullName:("Font Awesome 5 "+r).trim(),description:a}}Object.defineProperty(t,"__esModule",{value:!0}),t.head=function(e){var t=e.name,n=void 0===t?"":t,o=e.description;return{title:function(){var e=a(this,n,o).name,t={inner:e,complement:"Font Awesome"};return 0!==e.length&&t},meta:function(){var e=a(this,n,o),t=e.fullName,i=e.description;return i?[{name:"application-name",content:t},{name:"description",content:i},{name:"twitter:title",content:t},{name:"twitter:description",content:i},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@fontawesome"},{itemprop:"name",content:t},{itemprop:"description",content:i},{property:"og:url",content:r(this.$route)},{property:"og:title",content:t},{property:"og:type",content:"website"},{property:"og:description",content:i},{property:"og:image",content:"https://fontawesome.com/images/open-graph.png"}]:[]},link:function(){return[{rel:"canonical",href:r(this.$route),"data-prerender":"keep"}]}}}},1338:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.versionProvider={provide:function(){return{version:this.version,resolvedVersion:this.resolvedVersion}},computed:{version:function(){return this.$route.meta.version.original},resolvedVersion:function(){return this.$route.meta.version.resolved}}}},1512:function(e,t,n){"use strict";n.r(t);var r=n(1513),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t.default=a.a},1513:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=w(n(1)),a=w(n(2)),o=w(n(5)),i=w(n(9)),s=w(n(22)),u=n(15),l=n(1319),c=n(1338),f=n(484),d=w(n(29)),p=w(n(1616)),v=w(n(1617)),m=w(n(1618)),h=w(n(1619));function w(e){return e&&e.__esModule?e:{default:e}}t.default={name:"HowToUseView",head:(0,o.default)({},(0,l.head)({name:function(){return this.title},description:"Learn how to use Font Awesome 5 to add vector icons and social logos to your website, desktop design, or project."})),components:{WhereNav:p.default,Outline:v.default,DocumentNav:m.default},mixins:[c.versionProvider],data:function(){return{title:"How to Use",failedLoadingDocument:!1,notFound:!1}},computed:(0,o.default)({},(0,u.mapGetters)("docs",["document"]),{outline:function(){var e=this,t=(0,s.default)(f.all,function(t){var n=t.version;return t.outline,e.$releases.active.version==n});return(0,i.default)(t,["outline"])},where:function(){return this.$route.params.where},group:function(){return this.$route.params.group},name:function(){return this.$route.params.name},groups:function(){return(0,i.default)(this.outline,[this.where])},pathOk:function(){return this.where&&this.group&&this.name},isReady:function(){return this.outline&&this.document&&this.pathOk},documentComponent:function(){return(0,h.default)(this.document.html,{version:this.version})}}),created:function(){var e=this;return(0,a.default)(r.default.mark(function t(){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.init();case 2:if(!e.isReady){t.next=4;break}return t.abrupt("return");case 4:e.outline&&!e.pathOk&&e.failedLoadingDocument?window.location.replace(d.default.resolve({name:e.version+".how-to-use.document",params:e.normalRouteParams({outline:e.outline,route:e.$route})}).href):e.outline&&e.document&&!e.pathOk?d.default.replace({name:e.version+".how-to-use.document",params:e.normalRouteParams({outline:e.outline,route:e.$route})}):e.notFound=!0;case 5:case"end":return t.stop()}},t,e)}))()},methods:(0,o.default)({},(0,u.mapActions)("docs",["fetchDocument"]),{init:function(){var e=this;return(0,a.default)(r.default.mark(function t(){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.fetchDocument(e.resolvedVersion);case 3:e.title=e.document.label,e.$emit("updateHead"),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.failedLoadingDocument=!0;case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},normalRouteParams:function(e){var t=e.outline,n=e.route.params,r=(0,o.default)({},n);if(n.where&&n.where in t||(r.where="on-the-web"),n.group||(r.group=(0,i.default)(t,[r.where,0,"directory"])),!n.name){var a=(0,i.default)((0,s.default)((0,i.default)(t,[r.where]),function(e){return e.directory==r.group}),["children",0,"filename"]);r.name=a?a.split(".").slice(0,1)[0]:null}return r}})}},1514:function(e,t,n){"use strict";n.r(t);var r=n(1515),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t.default=a.a},1515:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(9)),a=l(n(63)),o=n(61),i=n(484),s=l(n(29)),u=l(n(362));function l(e){return e&&e.__esModule?e:{default:e}}var c={"with-the-api":"The Font Awesome API"};t.default={name:"WhereNav",components:{VersionSelector:u.default},computed:{releases:function(){var e=i.all.map(function(e){return e.version});return o.all.reverse().filter(function(t){return(0,a.default)(e,t.version)})},hasTitleInstead:function(){return!!this.title},title:function(){return(0,r.default)(c,[this.$route.params.where])}},methods:{navClass:function(e){var t=e.where,n=this.$route.params.where===t;return["link db fw6 pv5 ph4 bb bw3 color-inherit",{"b--blue6":n},{"b--transparent o-60 hover-b--blue4 glow":!n}]},changeVersion:function(e){var t=e.version;t===o.latest.version&&(t="latest"),o.preview&&t===o.preview.version&&(t="preview"),(0,i.exists)(e.version,this.$route.params)?window.location.replace(s.default.resolve({name:t+".how-to-use.document",params:this.$route.params}).href):window.location.replace(s.default.resolve({name:t+".how-to-use"}).href)}}}},1516:function(e,t,n){"use strict";n.r(t);var r=n(1517),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t.default=a.a},1517:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Outline",props:{where:{type:String,required:!0},groups:{type:Array,required:!0},version:{type:String,required:!0}},computed:{lastGroupIndex:function(){return this.groups.length-1}},methods:{classFor:function(e){var t=e.where,n=e.group,r=e.name,a=this.$route.params,o=a.where,i=a.group,s=a.name;return t===o&&n===i&&r===s?"db link color-inherit pv2":"db link color-inherit o-60 glow pv2 hover-blue5"}}}},1518:function(e,t,n){"use strict";n.r(t);var r=n(1519),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t.default=a.a},1519:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(9)),a=i(n(360)),o=i(n(357));function i(e){return e&&e.__esModule?e:{default:e}}t.default={name:"DocumentNav",props:{activeDocument:{type:Object,required:!0},outline:{type:Object,required:!0}},computed:{flattenedWhere:function(){var e=this.activeDocument.where,t=(0,r.default)(this.outline,[e]);return(0,o.default)(t,function(t,n){return n.children.map(function(r){t.push({routeParams:{where:e,group:n.directory,name:r.name},label:r.label})}),t},[])},activeDocumentIndex:function(){var e=this.activeDocument,t=e.where,n=e.group,r=e.name;return(0,a.default)(this.flattenedWhere,function(e){var a=e.routeParams;return a.where===t&&a.group===n&&a.name===r})},previous:function(){return(0,r.default)(this.flattenedWhere,[this.activeDocumentIndex-1])},next:function(){return(0,r.default)(this.flattenedWhere,[this.activeDocumentIndex+1])}}}},1616:function(e,t,n){"use strict";n.r(t);var r=n(1728),a=n(1514);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var i=n(0),s=Object(i.a)(a.default,r.a,r.b,!1,null,null,null);t.default=s.exports},1617:function(e,t,n){"use strict";n.r(t);var r=n(1729),a=n(1516);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var i=n(0),s=Object(i.a)(a.default,r.a,r.b,!1,null,null,null);t.default=s.exports},1618:function(e,t,n){"use strict";n.r(t);var r=n(1741),a=n(1518);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var i=n(0),s=Object(i.a)(a.default,r.a,r.b,!1,null,null,null);t.default=s.exports},1619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(5));t.default=function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).version;return{name:"Document",template:'<main class="docs-generated">'+function(e){return e.replace(/<table>/g,'<div class="table-wrap"><table>').replace(/<\/table>/g,"</table></div>")}(function(e,t){var n=a.default.resolve({name:t+".how-to-use"}).href,r=(0,s.resolve)({version:t});return e.replace(/href="([a-z0-9\-\\]+)(\/[a-z0-9\-\\]+)?(\/[#a-z0-9\-\\]+)?"/g,'href="'+n+'/$1$2$3"').replace(/VERSION/g,r)}(e,void 0===t?"latest":t))+"</main>",provide:function(){return{token:this.token}},computed:(0,r.default)({},(0,o.mapGetters)("licenses",["evidenceOfProLicense"]),(0,o.mapGetters)("tokens",["npmToken"]),{token:function(){return(0,i.default)(this.npmToken,["token"],null)},showAd:function(){return!this.evidenceOfProLicense}})}};var a=u(n(29)),o=n(15),i=u(n(9)),s=n(61);function u(e){return e&&e.__esModule?e:{default:e}}},1706:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.notFound?n("bad-situation",[n("div",{attrs:{slot:"content"},slot:"content"},[n("main",[n("h1",{staticClass:"sans-serif mt0 mb3 tc-l"},[n("span",{staticClass:"db f3 danger6 fw6 ttu tracked1 mb2"},[e._v("What's up, Doc?")]),e._v(" "),n("span",{staticClass:"f7 f8-ns db fw6"},[e._v("Documentation Not Found")])]),e._v(" "),n("p",{staticClass:"mt0 mb5 lh-copy f4 mh6-l tc-l"},[n("a",{staticClass:"link underline-hover blue4",attrs:{href:e.$howto({params:{where:"on-the-web"}})}},[e._v("Let's just start over, shall we?")])])])])]):e.isReady?n("page",[n("div",{staticClass:"dn db-l bg-gray8 white ph4 ph6-ns",attrs:{slot:"subnav"},slot:"subnav"},[n("where-nav")],1),e._v(" "),n("template",{slot:"content"},[n("div",{staticClass:"ph4 ph6-ns bg-white"},[n("main",{staticClass:"main-view mw9 center flex flex-row-l flex-nowrap-l items-stretch justify-between-l",attrs:{role:"main"}},[n("section",{staticClass:"w-100 w-75-l w-80-2x pv6 pr6-l br-l bw1-l b--black-025"},[n(e.documentComponent,{tag:"component"}),e._v(" "),n("document-nav",{attrs:{"active-document":e.$route.params,outline:e.outline}})],1),e._v(" "),n("outline",{attrs:{where:e.where,groups:e.groups,version:e.version}})],1)])])],2):e._e()},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},1728:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mw9 center flex flex-row flex-nowrap items-stretch justify-between"},[n("nav",{staticClass:"w-75 w-80-2x flex flex-row flex-nowrap items-center justify-between pr6"},[e.hasTitleInstead?n("div",{staticClass:"flex flex-row flex-nowrap items-center pr6"},[n("h2",{staticClass:"mv0 fw6 f3 pv5"},[e._v(e._s(e.title))])]):n("div",{staticClass:"flex flex-row flex-nowrap items-center pr6"},[n("a",{class:e.navClass({where:"on-the-web"}),attrs:{href:e.$howto({params:{where:"on-the-web"}})}},[n("span",{staticClass:"sr-only"},[e._v("How to Use")]),e._v(" On the Web")]),e._v(" "),n("a",{class:e.navClass({where:"on-the-desktop"}),attrs:{href:e.$howto({params:{where:"on-the-desktop"}})}},[n("span",{staticClass:"sr-only"},[e._v("How to Use")]),e._v(" On the Desktop")])])]),e._v(" "),n("div",{staticClass:"w-25 w-20-2x flex flex-column items-center justify-center bg-gray9 ph5"},[n("div",{staticClass:"w-100 relative"},[n("version-selector",{attrs:{value:e.$releases.active,releases:e.releases,dark:""},on:{input:e.changeVersion}})],1)])])},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},1729:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"how-to-nav w-25 w-20-2x pv6 ph5 dn flex-l flex-column bg-gray0"},e._l(e.groups,function(t,r){return n("div",{key:t.directory},[n("h3",{staticClass:"mv0 pb2 f3 fw6"},[e._v(e._s(t.label))]),e._v(" "),n("ul",{staticClass:"list ma0 pa0"},e._l(t.children,function(r){return n("li",{key:t.directory+"-"+r.filename,staticClass:"ma0 pa0"},[n("a",{class:e.classFor({where:e.where,group:t.directory,name:r.name}),attrs:{href:e.$howto({params:{where:e.where,group:t.directory,name:r.name}})}},[e._v(e._s(r.label))])])})),e._v(" "),r<e.lastGroupIndex?n("hr",{staticClass:"db mv3 bn bb bw1 b--transparent nr4 nl4"}):e._e()])}))},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},1741:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"flex flex-row flex-nowrap items-center justify-between mt4"},[e.previous?n("a",{staticClass:"link blue4 hover-blue6 pa4 pl0",attrs:{href:e.$howto({params:e.previous.routeParams})}},[n("font-awesome-icon",{staticClass:"mr1",attrs:{icon:["fas","arrow-left"]}}),e._v("\n    "+e._s(e.previous.label)+"\n  ")],1):n("span"),e._v(" "),e.next?n("a",{staticClass:"link blue4 hover-blue6 pa4 pr0",attrs:{href:e.$howto({params:e.next.routeParams})}},[e._v("\n    "+e._s(e.next.label)+"\n    "),n("font-awesome-icon",{staticClass:"ml1",attrs:{icon:["fas","arrow-right"]}})],1):n("span")])},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},494:function(e,t,n){"use strict";n.r(t);var r=n(1706),a=n(1512);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var i=n(0),s=Object(i.a)(a.default,r.a,r.b,!1,null,null,null);t.default=s.exports}}]);
//# sourceMappingURL=1.c7ab45780683b7402a4f.js.map