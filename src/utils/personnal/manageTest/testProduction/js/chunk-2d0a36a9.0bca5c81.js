(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a36a9"],{"01a3":function(t,e,n){"use strict";n.r(e);var a={name:"selectEqumentType",components:{myheader:function(){return n.e("chunk-2325facc").then(n.bind(null,"8c2e"))}},data:function(){return{testTypeList:this.$store.getters.testTypeDatas,headerOptionSettings:{hideleft:!1,title:"选择分机类型",routePath:"home"}}},methods:{handleRouterTo:function(t){this.$router.push({path:t.routepathName,query:{testType:t.value}})}}},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"manage"},[n("myheader",{attrs:{myheaderOption:t.headerOptionSettings}}),t._v(" "),t._l(t.testTypeList,function(e){return n("mt-cell",{key:e.testEquipment,attrs:{title:e.label,"is-link":""},nativeOn:{click:function(n){return t.handleRouterTo(e)}}})})],2)},s=[],i=n("2455"),u=!1,o=null,l=null,c=null,h=Object(i["a"])(a,r,s,u,o,l,c);e["default"]=h.exports}}]);