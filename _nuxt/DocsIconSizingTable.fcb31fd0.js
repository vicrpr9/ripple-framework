import{_ as i}from"./RplIcon.vue.8f360716.js";import{g as p,m as d,o as l,c as n,a as e,F as _,C as m,b as f,t as a,v as h}from"./entry.ccb7834f.js";const b={class:"rpl-table rpl-table--no-stripes"},z={class:"w-full"},v=e("thead",null,[e("tr",null,[e("th",null,"Preview"),e("th",null,"Value"),e("th",null,"Size")])],-1),S=p({__name:"DocsIconSizingTable",props:{sizes:{}},setup(o){const c=o,r=d(()=>c.sizes.map(s=>({value:Object.values(s)[0],size:Object.keys(s)[0]})));return(s,g)=>{const u=i;return l(),n("div",b,[e("table",z,[v,e("tbody",null,[(l(!0),n(_,null,m(h(r),t=>(l(),n("tr",{key:t.size},[e("td",null,[f(u,{name:"icon-search",colour:"default",size:t.size},null,8,["size"])]),e("td",null,a(t.value),1),e("td",null,a(t.size),1)]))),128))])])])}}});export{S as default};
