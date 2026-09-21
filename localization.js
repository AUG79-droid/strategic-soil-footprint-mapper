(function(){
  "use strict";
  const p=new URLSearchParams(location.search);
  const requested=p.get("hubLang")||p.get("lang");
  const lang=requested==="en"?"en":"es";
  document.documentElement.lang=lang;
  const exact=new Map(window.SSF_ES||[]);
  const partial=[
    ["Back to Sustainability Hub","Volver al Sustainability Hub"],
    ["Back","Volver"],["Next mission","Siguiente misión"],["Home","Inicio"],
    ["Mission ","Misión "],["Theory","Teoría"],["Audit risk","Riesgo de auditoría"],
    ["Soil integrity","Integridad del suelo"],["Drainage integrity","Integridad del drenaje"],
    ["Habitat continuity","Continuidad del hábitat"],["Mission readiness","Disponibilidad de misión"],
    ["Scientific basis","Base científica"],["Open source","Abrir fuente"],
    ["Selected","Seleccionado"],["Confirm","Confirmar"],["Continue","Continuar"],
    ["Final soil integrity:","Integridad final del suelo:"],
    ["Final drainage integrity:","Integridad final del drenaje:"],
    ["Final habitat continuity:","Continuidad final del hábitat:"],
    ["Final readiness:","Disponibilidad final:"],
    ["Accumulated audit risk:","Riesgo de auditoría acumulado:"],
    ["Final audit score:","Puntuación final de auditoría:"],
    ["Review traffic loading, vulnerable ground and restoration triggers.","Revisa las cargas de tráfico, el terreno vulnerable y los criterios de restauración."],
    ["Controls limited cumulative compaction and new disturbed footprint.","Los controles limitaron la compactación acumulativa y la nueva superficie alterada."],
    ["Inspect crossings, blocked flows, ponding and sediment pathways.","Inspecciona cruces, flujos bloqueados, encharcamientos y rutas de sedimentos."],
    ["Flow paths remained largely protected and observable.","Las trayectorias de flujo permanecieron en gran medida protegidas y observables."],
    ["Edge habitats and connecting strips require stronger no-go or footprint controls.","Los hábitats de borde y franjas de conexión requieren controles más estrictos de exclusión u ocupación."],
    ["Operational plans generally avoided unnecessary habitat-edge disturbance.","Los planes operativos evitaron en general alteraciones innecesarias de los bordes de hábitat."],
    ["Environmental planning must remain compatible with safe, timely operations.","La planificación ambiental debe seguir siendo compatible con operaciones seguras y dentro de plazo."],
    ["High-risk choices indicate gaps in planning, operational control or evidence.","Las decisiones de alto riesgo indican brechas en planificación, control operacional o evidencias."],
    ["The decision trail shows consistent preventive control.","El rastro de decisiones muestra un control preventivo consistente."],
    ["Live operation ","Operación en curso "],
    ["Objective:","Objetivo:"],
    ["Select a plan to see its projected consequences.","Selecciona un plan para ver sus consecuencias previstas."],
    ["Review the projected metric changes below.","Revisa abajo los cambios previstos en los indicadores."]
  ];
  function tr(v){
    if(lang!=="es"||!v)return v;
    const t=v.trim();
    if(exact.has(t)) return v.replace(t,exact.get(t));
    let o=v; for(const [a,b] of partial)o=o.split(a).join(b); return o;
  }
  function walk(root){
    if(lang!=="es"||!root)return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const ns=[];
    while(w.nextNode())ns.push(w.currentNode);
    for(const n of ns){
      if(!n.parentElement||/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(n.parentElement.tagName))continue;
      const x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;
    }
    root.querySelectorAll?.("[title],[aria-label],[alt],[placeholder],[data-guide]").forEach(el=>{
      for(const a of ["title","aria-label","alt","placeholder","data-guide"])if(el.hasAttribute(a))el.setAttribute(a,tr(el.getAttribute(a)));
    });
  }
  function addControl(){
    const b=document.createElement("div");b.id="sn-lang";
    b.innerHTML='<button data-l="es">ES</button><span>|</span><button data-l="en">EN</button>';
    b.style.cssText="position:fixed;z-index:2147483647;top:12px;right:12px;display:flex;align-items:center;gap:7px;padding:8px 11px;border-radius:999px;background:#071b33;color:#fff;border:2px solid rgba(255,255,255,.75);font:800 12px/1 system-ui,sans-serif;box-shadow:0 5px 18px rgba(0,0,0,.3)";
    b.querySelectorAll("button").forEach(x=>{x.type="button";x.style.cssText="border:0;background:transparent;color:#fff;font:inherit;cursor:pointer;padding:2px 4px";x.setAttribute("aria-pressed",x.dataset.l===lang?"true":"false");if(x.dataset.l===lang)x.style.textDecoration="underline";x.onclick=()=>{const u=new URL(location.href);u.searchParams.set("hubLang",x.dataset.l);location.href=u.toString();};});
    document.body.appendChild(b);
  }
  function init(){addControl();walk(document.body);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
  new MutationObserver(ms=>{if(lang!=="es")return;for(const m of ms){for(const n of m.addedNodes){if(n.nodeType===1)walk(n);else if(n.nodeType===3){const x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;}}if(m.type==="characterData"){const x=tr(m.target.nodeValue);if(x!==m.target.nodeValue)m.target.nodeValue=x;}}}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();