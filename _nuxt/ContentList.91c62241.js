import n from"./ContentQuery.9a998d90.js";import{g as c,a0 as l,x as f}from"./entry.ccb7834f.js";import"./asyncData.00443c43.js";const r=(u,t)=>f("pre",null,JSON.stringify({message:"You should use slots with <ContentList>",slot:u,data:t},null,2)),C=c({name:"ContentList",props:{path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0}},render(u){const t=l(),{path:p,query:a}=u,m={...a||{},path:p||(a==null?void 0:a.path)||"/"};return f(n,m,{default:t!=null&&t.default?({data:e,refresh:o,isPartial:d})=>t.default({list:e,refresh:o,isPartial:d,...this.$attrs}):e=>r("default",e.data),empty:e=>t!=null&&t.empty?t.empty(e):r("default",e==null?void 0:e.data),"not-found":e=>{var o;return t!=null&&t["not-found"]?(o=t==null?void 0:t["not-found"])==null?void 0:o.call(t,e):r("not-found",e==null?void 0:e.data)}})}});export{C as default};
