import{n as l,D as f,g as h,m as g,o as v,i as _,w as m,G as x,a as y,H as B,r as w,ai as C,T as E}from"./entry.ccb7834f.js";function R(a,s,n=null){const t=l(n);return f(()=>{t.value=parseFloat(getComputedStyle(a.value).getPropertyValue(s))*1e3}),t}const S=h({__name:"RplExpandable",props:{expanded:{type:Boolean,default:!1}},setup(a){const s=a,n=l(null),t=R(n,"--rpl-motion-speed-9",420);function r(e){e.style.height="0px"}function i(e,o){e.style.height=`${e.scrollHeight}px`,setTimeout(o,t.value)}function p(e){e.style.height="auto",e.style.overflow="initial"}function u(e){e.style.height=`${e.getBoundingClientRect().height}px`,e.style.overflow="hidden"}function d(e,o){e.style.height="0px",setTimeout(o,t.value)}const c=g(()=>({"rpl-expandable":!0,["rpl-expandable--open"]:s.expanded}));return(e,o)=>(v(),_(E,{onBeforeEnter:r,onEnter:i,onAfterEnter:p,onBeforeLeave:u,onLeave:d},{default:m(()=>[x(y("div",{ref_key:"containerRef",ref:n,class:B(c.value),role:"region"},[w(e.$slots,"default")],2),[[C,e.expanded]])]),_:3}))}});export{S as _};
