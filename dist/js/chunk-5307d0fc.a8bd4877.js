(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5307d0fc"],{"445b":function(e,n,t){"use strict";var u=t("da79"),c=t.n(u);c.a},"691a":function(e,n,t){"use strict";t.r(n);var u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.nodes&&e.nodes.length>0?t("ul",{class:"oc-branch oc-branch-level-"+e.level},e._l(e.nodes,(function(n){return t("leaf",{key:n.uuid,attrs:{uuid:n.uuid,"show-children":n.showchildren,level:e.level}})})),1):e._e()},c=[],i=t("8b81"),s={name:"oc-branch",components:{Leaf:i["a"]},props:["uuid","level"],computed:{nodes:function(){return this.$store.getters.getChildren(this.uuid)}},watch:{uuid:function(e){this.update(e)}},methods:{update:function(e){e&&this.$store.dispatch("fetchOrgUnitChildren",e)}},created:function(){this.update(this.uuid)}},o=s,d=(t("445b"),t("2877")),l=Object(d["a"])(o,u,c,!1,null,null,null);n["default"]=l.exports},da79:function(e,n,t){}}]);
//# sourceMappingURL=chunk-5307d0fc.a8bd4877.js.map