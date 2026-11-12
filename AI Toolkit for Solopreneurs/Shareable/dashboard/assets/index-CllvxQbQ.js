(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(s){if(s.ep)return;s.ep=!0;const t=a(s);fetch(s.href,t)}})();function h(e){return e.status==="Active"||e.status==="Blocked"}async function k(e){try{const[n,a]=await Promise.all([fetch("/data/projects.json"),fetch("/data/business-functions.json")]),[l,s]=await Promise.all([n.json(),a.json()]);return e({projects:l.filter(h),businessFunctions:s}),!0}catch{return!1}}function w(e){let n=null,a=!1;return{async poll(){a=!await e.fetch(s=>{n=s}),n&&e.render(n,a)},rerender(){n&&e.render(n,a)}}}function _(e){return[...e].sort((n,a)=>!n.last_worked&&!a.last_worked?0:n.last_worked?a.last_worked?a.last_worked.localeCompare(n.last_worked):-1:1)}function D(e,n){const a=Math.round((Date.parse(n)-Date.parse(e))/864e5);return a===0?"Today":a<7?b(a,"day"):a<28?b(Math.floor(a/7),"week"):a<365?b(Math.min(11,Math.round(a/30)),"month"):b(Math.floor(a/365),"year")}function b(e,n){return`${e} ${n}${e===1?"":"s"} ago`}const O=30*864e5;function x(e,n){return e?Date.parse(n)-Date.parse(e)>=O:!1}function v(e,n){return e.filter(a=>!(n.blocked&&a.status!=="Blocked"||n.type!==null&&a.type!==n.type||n.context!==null&&a.context!==n.context))}function C(e,n,a){return n==="blocked"?v(e,{...a,blocked:!0}).length:n==="Ongoing"||n==="Defined Goal"?v(e,{...a,type:n}).length:v(e,{...a,context:n}).length}const S=["January","February","March","April","May","June","July","August","September","October","November","December"];function $(e){const[n,a,l]=e.split("-").map(Number);return`${l} ${S[a-1]} ${n}`}function L(e,n){if(e<n)return"overdue";const a=new Date(n);a.setDate(a.getDate()+14);const l=a.toISOString().slice(0,10);return e<=l?"due-soon":"normal"}const y={Ongoing:"loop","Defined Goal":"flag"};function M(e,n,a,l,s=!1){const t=new Date().toISOString().slice(0,10),r=e.projects.length,c=a?e.projects.find(d=>d.id===a)??null:null,p=c?e.businessFunctions.find(d=>d.key===c.function)??null:null;l.innerHTML=`
    ${s?'<div class="error-indicator" aria-label="Data error">✕</div>':""}
    <header class="dash-header">
      <h1>Hot Iron Business Dashboard</h1>
      <span class="dash-count">${r} project${r===1?"":"s"}</span>
    </header>
    <div class="filter-bar">
      ${f("blocked","Blocked",n,e.projects)}
      ${f("Ongoing","Ongoing",n,e.projects)}
      ${f("Defined Goal","Defined Goal",n,e.projects)}
      <span class="filter-divider"></span>
      ${f("Company","Company",n,e.projects)}
      ${f("Customer","Customer",n,e.projects)}
      ${f("Agent","Agent",n,e.projects)}
    </div>
    <div class="dash-body${c?" dash-body--panel-open":""}">
      <div class="swimlane">
        ${[...e.businessFunctions].sort((d,m)=>d.order-m.order).map(d=>P(d,e.projects,n,t)).join("")}
      </div>
      ${c&&p?E(c,p,t):""}
    </div>
  `}function f(e,n,a,l){const s=C(l,e,a);return`<button class="chip${(e==="blocked"?a.blocked:e==="Ongoing"||e==="Defined Goal"?a.type===e:a.context===e)?" chip--active":""}" data-filter="${e}">${n} (${s})</button>`}function P(e,n,a,l){const s=_(n.filter(p=>p.function===e.key)),t=v(s,a),c=(a.blocked||a.type!==null)&&s.length>0?"No matching projects":"No active projects";return`
    <section class="column">
      <h2 class="column-header">
        <span class="column-label">${e.label}</span>
        <span class="column-count">${t.length}</span>
      </h2>
      <div class="cards">
        ${t.length?t.map(p=>B(p,l)).join(""):`<p class="empty-state">${c}</p>`}
      </div>
    </section>
  `}function B(e,n){const a=x(e.last_worked,n),l=e.last_worked?D(e.last_worked,n):"—",s=y[e.type]??"circle",t=[e.context?`<span class="badge badge--context">${e.context}</span>`:"",e.status==="Blocked"?'<span class="badge badge--blocked">Blocked</span>':"",e.open_tasks!=null&&e.open_tasks>0?`<span class="badge badge--tasks">${e.open_tasks} task${e.open_tasks===1?"":"s"}</span>`:""].filter(Boolean).join("");return`
    <article class="card" data-id="${e.id}">
      <span class="card-name">${e.name}</span>
      ${t?`<div class="card-badges">${t}</div>`:""}
      <span class="card-type">
        <span class="material-symbols-outlined">${s}</span>${e.type}
      </span>
      <span class="card-date${a?" card-date--cold":""}">${l}</span>
    </article>
  `}function E(e,n,a){const l=y[e.type]??"circle",s=L(e.deadline??"",a),t=e.deadline?` panel-deadline--${s}`:"";return`
    <aside class="side-panel" data-panel>
      <header class="panel-header">
        <span class="panel-name">${e.name}</span>
        <button class="panel-close" data-close aria-label="Close">✕</button>
      </header>
      <div class="panel-body">
        <div class="panel-row">
          <span class="panel-label">Function</span>
          <span class="panel-value">${n.label}</span>
        </div>
        ${e.context?`
        <div class="panel-row">
          <span class="panel-label">Context</span>
          <span class="panel-value"><span class="badge badge--context">${e.context}</span></span>
        </div>`:""}
        <div class="panel-row">
          <span class="panel-label">Type</span>
          <span class="panel-value">
            <span class="card-type">
              <span class="material-symbols-outlined">${l}</span>${e.type}
            </span>
          </span>
        </div>
        <div class="panel-row">
          <span class="panel-label">Status</span>
          <span class="panel-value${e.status==="Blocked"?" panel-value--blocked":""}">${e.status}</span>
        </div>
        ${e.status_note?`
        <div class="panel-row panel-row--note">
          <span class="panel-value panel-value--note">${e.status_note}</span>
        </div>`:""}
        ${e.open_tasks!=null?`
        <div class="panel-row">
          <span class="panel-label">Open tasks</span>
          <span class="panel-value${e.open_tasks>0?" panel-value--tasks":""}">${e.open_tasks}</span>
        </div>`:""}
        ${e.start_date?`
        <div class="panel-row">
          <span class="panel-label">Started</span>
          <span class="panel-value">${$(e.start_date)}</span>
        </div>`:""}
        <div class="panel-row">
          <span class="panel-label">Last worked</span>
          <span class="panel-value">${e.last_worked?$(e.last_worked):"—"}</span>
        </div>
        ${e.type==="Defined Goal"&&e.deadline?`
        <div class="panel-row">
          <span class="panel-label">Deadline</span>
          <span class="panel-value${t}">${$(e.deadline)}</span>
        </div>`:""}
        <div class="panel-row">
          <span class="panel-label">Path</span>
          <button class="panel-path" data-copy="${e.path}">${e.path}</button>
        </div>
      </div>
    </aside>
  `}const g=document.getElementById("app"),F=6e4;let o={blocked:!1,type:null,context:null},i=null;const u=w({fetch:k,render(e,n){M(e,o,i,g,n)}});g.addEventListener("click",e=>{const n=e.target;if(n.closest("[data-close]")){i=null,u.rerender();return}const a=n.closest("[data-copy]");if(a){navigator.clipboard.writeText(a.dataset.copy??"");return}const l=n.closest("[data-filter]");if(l){const t=l.dataset.filter;t==="blocked"?o={...o,blocked:!o.blocked}:t==="Ongoing"||t==="Defined Goal"?o={...o,type:o.type===t?null:t}:o={...o,context:o.context===t?null:t},u.rerender();return}const s=n.closest("[data-id]");if(s){i=s.dataset.id??null,u.rerender();return}i&&!n.closest("[data-panel]")&&(i=null,u.rerender())});document.addEventListener("keydown",e=>{e.key==="Escape"&&i&&(i=null,u.rerender())});u.poll();setInterval(()=>u.poll(),F);
