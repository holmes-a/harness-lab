(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(s){if(s.ep)return;s.ep=!0;const t=n(s);fetch(s.href,t)}})();function g(e){return e.status==="Active"||e.status==="Blocked"}async function k(e){try{const[a,n]=await Promise.all([fetch("/data/projects.json"),fetch("/data/roles.json")]),[l,s]=await Promise.all([a.json(),n.json()]);return e({projects:l.filter(g),roles:s}),!0}catch{return!1}}function w(e){let a=null,n=!1;return{async poll(){n=!await e.fetch(s=>{a=s}),a&&e.render(a,n)},rerender(){a&&e.render(a,n)}}}function D(e){return[...e].sort((a,n)=>!a.last_worked&&!n.last_worked?0:a.last_worked?n.last_worked?n.last_worked.localeCompare(a.last_worked):-1:1)}function _(e,a){const n=Math.round((Date.parse(a)-Date.parse(e))/864e5);return n===0?"Today":n<7?f(n,"day"):n<28?f(Math.floor(n/7),"week"):n<365?f(Math.min(11,Math.round(n/30)),"month"):f(Math.floor(n/365),"year")}function f(e,a){return`${e} ${a}${e===1?"":"s"} ago`}const S=30*864e5;function O(e,a){return e?Date.parse(a)-Date.parse(e)>=S:!1}function v(e,a){return e.filter(n=>!(a.blocked&&n.status!=="Blocked"||a.type!==null&&n.type!==a.type))}function L(e,a,n){return a==="blocked"?v(e,{...n,blocked:!0}).length:v(e,{...n,type:a}).length}const M=["January","February","March","April","May","June","July","August","September","October","November","December"];function y(e){const[a,n,l]=e.split("-").map(Number);return`${l} ${M[n-1]} ${a}`}function P(e,a){if(e<a)return"overdue";const n=new Date(a);n.setDate(n.getDate()+14);const l=n.toISOString().slice(0,10);return e<=l?"due-soon":"normal"}const b={Ongoing:"loop","Defined Goal":"flag"};function C(e,a,n,l,s=!1){const t=new Date().toISOString().slice(0,10),r=e.projects.length,o=n?e.projects.find(c=>c.id===n)??null:null,p=o?e.roles.find(c=>c.key===o.role)??null:null;l.innerHTML=`
    ${s?'<div class="error-indicator" aria-label="Data error">✕</div>':""}
    <header class="dash-header">
      <h1>Saturn AI Dashboard</h1>
      <span class="dash-count">${r} project${r===1?"":"s"}</span>
    </header>
    <div class="filter-bar">
      ${h("blocked","Blocked",a,e.projects)}
      ${h("Ongoing","Ongoing",a,e.projects)}
      ${h("Defined Goal","Defined Goal",a,e.projects)}
    </div>
    <div class="dash-body${o?" dash-body--panel-open":""}">
      <div class="swimlane">
        ${[...e.roles].sort((c,$)=>c.order-$.order).map(c=>E(c,e.projects,a,t)).join("")}
      </div>
      ${o&&p?B(o,p,t):""}
    </div>
  `}function h(e,a,n,l){const s=L(l,e,n);return`<button class="chip${(e==="blocked"?n.blocked:n.type===e)?" chip--active":""}" data-filter="${e}">${a} (${s})</button>`}function E(e,a,n,l){const s=D(a.filter(p=>p.role===e.key)),t=v(s,n),o=(n.blocked||n.type!==null)&&s.length>0?"No matching projects":"No active projects";return`
    <section class="column">
      <h2 class="column-header">
        <span class="column-label">${e.label}</span>
        <span class="column-count">${t.length}</span>
      </h2>
      <div class="cards">
        ${t.length?t.map(p=>N(p,l)).join(""):`<p class="empty-state">${o}</p>`}
      </div>
    </section>
  `}function N(e,a){const n=O(e.last_worked,a),l=e.last_worked?_(e.last_worked,a):"—",s=b[e.type]??"circle";return`
    <article class="card" data-id="${e.id}">
      <span class="card-name">${e.name}</span>
      <div class="card-meta">
        <span class="card-type">
          <span class="material-symbols-outlined">${s}</span>${e.type}
        </span>
        ${e.status==="Blocked"?'<span class="badge badge--blocked">Blocked</span>':""}
      </div>
      <span class="card-date${n?" card-date--cold":""}">${l}</span>
    </article>
  `}function B(e,a,n){const l=b[e.type]??"circle",s=P(e.deadline??"",n),t=e.deadline?` panel-deadline--${s}`:"";return`
    <aside class="side-panel" data-panel>
      <header class="panel-header">
        <span class="panel-name">${e.name}</span>
        <button class="panel-close" data-close aria-label="Close">✕</button>
      </header>
      <div class="panel-body">
        <div class="panel-row">
          <span class="panel-label">Role</span>
          <span class="panel-value">${a.label}</span>
        </div>
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
        ${e.start_date?`
        <div class="panel-row">
          <span class="panel-label">Started</span>
          <span class="panel-value">${y(e.start_date)}</span>
        </div>`:""}
        <div class="panel-row">
          <span class="panel-label">Last worked</span>
          <span class="panel-value">${e.last_worked?y(e.last_worked):"—"}</span>
        </div>
        ${e.type==="Defined Goal"&&e.deadline?`
        <div class="panel-row">
          <span class="panel-label">Deadline</span>
          <span class="panel-value${t}">${y(e.deadline)}</span>
        </div>`:""}
        <div class="panel-row">
          <span class="panel-label">Path</span>
          <button class="panel-path" data-copy="${e.path}">${e.path}</button>
        </div>
      </div>
    </aside>
  `}const m=document.getElementById("app"),I=6e4;let d={blocked:!1,type:null},i=null;const u=w({fetch:k,render(e,a){C(e,d,i,m,a)}});m.addEventListener("click",e=>{const a=e.target;if(a.closest("[data-close]")){i=null,u.rerender();return}const n=a.closest("[data-copy]");if(n){navigator.clipboard.writeText(n.dataset.copy??"");return}const l=a.closest("[data-filter]");if(l){const t=l.dataset.filter;t==="blocked"?d={...d,blocked:!d.blocked}:d={...d,type:d.type===t?null:t},u.rerender();return}const s=a.closest("[data-id]");if(s){i=s.dataset.id??null,u.rerender();return}i&&!a.closest("[data-panel]")&&(i=null,u.rerender())});document.addEventListener("keydown",e=>{e.key==="Escape"&&i&&(i=null,u.rerender())});u.poll();setInterval(()=>u.poll(),I);
