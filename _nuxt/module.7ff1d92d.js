import C from"./DocsModuleNavigation.a700dc70.js";import v from"./DocsNavLink.ae3918ae.js";import k from"./DocsModuleInfo.69f172ed.js";import h from"./DocsPageHeader.25ce336b.js";import $ from"./ContentRenderer.31dc9ef2.js";import{_ as w}from"./AppSidebarLayout.vue.2f7ab908.js";import{_ as D}from"./AppLayout.vue.a97482d3.js";import{u as N}from"./asyncData.bc92f259.js";import{d as b,U as A,m as M,Z as S,E as i,w as e,b as _,g as n,C as I,M as t,e as V,f as B,q as H}from"./entry.dd1572a1.js";import{u as L}from"./head.1e94051c.js";import{_ as q}from"./_plugin-vue_export-helper.c27b6911.js";import"./useDocsNavigation.8d775814.js";import"./RplLink.vue.318a19b6.js";import"./useRippleEvent.d50fbc76.js";import"./RplIcon.vue.834ededa.js";import"./nuxt-link.ae4c887a.js";import"./ready.96454187.js";import"./DocsLink.b7732ae9.js";import"./RplTextLink.css.c7da7c1f.js";import"./ContentRendererMarkdown.627ec442.js";import"./index.9b0bef9c.js";import"./config.f330dc4a.js";import"./index.8730752d.js";import"./RplImage.css.47d6d810.js";import"./RplList.vue.a41b9df7.js";import"./RplExpandable.vue.56aa51de.js";const P={class:"docs-sidebar-nav"},R=b({__name:"module",async setup(E){let a,m;const{page:o}=A();L(o);const s=M(),c=s.params.slug[0]==="framework",{data:p}=([a,m]=S(async()=>N(`module-info-${s.params.slug[2]}`,async()=>await H(`${s.params.slug[0]}/${s.params.slug[1]}/${s.params.slug[2]}/_module`).findOne()||null)),a=await a,m(),a);return(u,T)=>{const r=C,l=v,d=k,f=h,g=$,x=w,y=D;return _(),i(y,{theme:c?"module":"default"},{menuContents:e(()=>[n(r)]),default:e(()=>[n(x,{hideMobileSidebar:!1},{aside:e(()=>[n(l,{url:"/framework/modules/all-modules",icon:"icon-chevron-left",iconPosition:"start"},{default:e(()=>[I("All modules")]),_:1}),n(d,{module:t(p)},null,8,["module"]),V("div",P,[n(r)])]),pageHeader:e(()=>[n(f,{title:t(o).title,description:t(o).description,links:t(o).links},null,8,["title","description","links"])]),default:e(()=>[t(o)?(_(),i(g,{tag:t(o).tag||"DocsContent",key:t(o)._id,value:t(o)},null,8,["tag","value"])):B("",!0)]),_:1})]),_:1},8,["theme"])}}});const fo=q(R,[["__scopeId","data-v-2a19721d"]]);export{fo as default};
