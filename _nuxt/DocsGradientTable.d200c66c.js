import v from"./Swatch.db080672.js";import{g as c,a as g,b as S,c as C}from"./colour.141fcd40.js";import{g as k,m as _,o as n,c as s,a as t,F as p,C as i,b as d,t as u,v as m,p as x,e as y}from"./entry.ccb7834f.js";import{_ as V}from"./_plugin-vue_export-helper.c27b6911.js";const h=a=>(x("data-v-8e2514b8"),a=a(),y(),a),w={class:"rpl-table rpl-table--no-stripes"},D={class:"rpl-table__scroll-container",tabindex:"0"},I={class:"w-full"},T=h(()=>t("thead",null,[t("tr",null,[t("th",null,"Swatch"),t("th",null,"Colour"),t("th",null,"CSS Variable")])],-1)),B=h(()=>t("thead",null,[t("tr",null,[t("th"),t("th",null,"Value"),t("th",null,"Position")])],-1)),G=k({__name:"DocsGradientTable",setup(a){const b=_(()=>{const o=c(["clr.gradient"]);return Object.keys(o).map(l=>({name:g(l),value:S(o[l]),token:C(l)}))}),f=_(()=>{let o=[];const l=c(["theme.clr.gradient"]);for(const[r,e]of Object.entries(l))o.push({value:e,position:r.split(".").pop()});return o});return(o,l)=>{const r=v;return n(),s("div",w,[t("div",D,[t("table",I,[T,t("tbody",null,[(n(!0),s(p,null,i(m(b),e=>(n(),s("tr",{key:e.name},[t("td",null,[d(r,{colour:`var(--${e.token})`},null,8,["colour"])]),t("td",null,u(e.name),1),t("td",null,u(e.token),1)]))),128))]),B,t("tbody",null,[(n(!0),s(p,null,i(m(f),e=>(n(),s("tr",{key:e.name},[t("td",null,[d(r,{colour:e.value},null,8,["colour"])]),t("td",null,u(e.value),1),t("td",null,u(e.position)+"%",1)]))),128))])])])])}}});const E=V(G,[["__scopeId","data-v-8e2514b8"]]);export{E as default};
