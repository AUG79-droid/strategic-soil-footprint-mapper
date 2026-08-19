function theory(){
 const m=missions[state.mission],t=theoryData[m.theory];
 setAvatar(`${t.tip} This module is deliberately detailed. Work through the core theory, field signals and control cycle before unlocking the next mission.`);
 const sectionHtml=t.sections.map((s,i)=>`<article class="lesson"><div class="sectionLabel">Core theory ${i+1}</div><h3>${s.title}</h3>${s.body.map(p=>`<p>${p}</p>`).join('')}${s.bullets&&s.bullets.length?`<ul>${s.bullets.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}</article>`).join('');
 const ctrl=(label,arr)=>`<article class="controlCard"><h4>${label}</h4><ul>${arr.map(x=>`<li>${x}</li>`).join('')}</ul></article>`;
 app.innerHTML=`<section class="screen card theory">
   <div class="theoryHeader">
    <div class="eyebrow">Knowledge module ${state.mission+1} / ${missions.length}</div>
    <h2>${t.title}</h2>
    <div class="theoryMeta"><span>Deep-dive learning</span><span>Approx. 7–10 min reading</span><span>Applied to base operations</span></div>
    <p class="lead" style="font-size:16px">${t.tip}</p>
    <div class="theoryIntro">${t.intro}</div>
   </div>
   <h3 style="margin-top:4px">What you should be able to explain after this module</h3>
   <div class="objectiveGrid">${t.objectives.map((x,i)=>`<div class="objectiveItem"><b>${i+1}</b><span>${x}</span></div>`).join('')}</div>
   <div class="conceptFlow">${t.flow.map(x=>`<div>${x}</div>`).join('')}</div>
   <div class="theoryGrid">${sectionHtml}</div>
   <div class="theoryDivider"></div>
   <h3 class="fieldTitle">Field signals: what deterioration looks like</h3>
   <div class="signalGrid">${t.fieldSignals.map(x=>`<div class="signal">${x}</div>`).join('')}</div>
   <h3 class="fieldTitle">Operational control cycle</h3>
   <div class="controlGrid">${ctrl('Before the operation',t.controls.before)}${ctrl('During the operation',t.controls.during)}${ctrl('After the operation',t.controls.after)}</div>
   <div class="takeaway"><strong>Core takeaway:</strong> ${t.takeaway}</div>
   <div class="callout" style="margin-top:18px"><strong>Audit lens:</strong> ${t.auditLens}</div>
   <div class="sourceCue">${t.sourceCue} See “Scientific basis” for the external references used by the simulator.</div>
   <div class="missionActions" style="margin-top:24px"><button class="btn primary" id="next">${state.mission<missions.length-1?'Next mission →':'Run final audit →'}</button></div>
  </section>`;
 document.getElementById('next').onclick=()=>{pushHistory();state.completedTheory[state.mission]=true;state.selected=null;if(state.mission<missions.length-1){state.mission++;state.screen='mission'}else state.screen='audit';render();window.scrollTo(0,0)};
}
