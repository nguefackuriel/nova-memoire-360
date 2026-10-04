/* NOVA Mémoire 360 : application autonome (aucune dépendance). */
(function(){
const D = window.NOVA;
const S = {}; D.sources.forEach(s => S[s.id] = s);
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LS_KEY = "nova360.updates";

/* ---------- updates (couche datée, baseline intacte) ---------- */
function loadLocalUpdates(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||"[]"); }catch(e){ return []; } }
function saveLocalUpdates(arr){ try{ localStorage.setItem(LS_KEY, JSON.stringify(arr)); }catch(e){} }
function allUpdates(){
  const file = (window.NOVA_UPDATES||[]).map(u => Object.assign({_origin:"updates.js"}, u));
  const local = loadLocalUpdates().map(u => Object.assign({_origin:"navigateur (localStorage)"}, u));
  const ids = new Set(file.map(u=>u.id));
  return file.concat(local.filter(u => !ids.has(u.id)));
}
let VIEW = "baseline"; // or "updated"
function updatesFor(ref){
  if (VIEW!=="updated") return [];
  const out = [];
  allUpdates().forEach(u => {
    (u.affected_facts||[]).forEach(f => { if ((f.ref||"").split(/[\s,\/]+/).includes(ref)) out.push({u, f, kind:"fact"}); });
    (u.affected_actions||[]).forEach(a => { if ((a.ref||"").split(/[\s,\/]+/).includes(ref)) out.push({u, f:a, kind:"action"}); });
  });
  return out;
}
function updBadge(ref){
  const ups = updatesFor(ref);
  if (!ups.length) return "";
  return ups.map(x => `<span class="badge-upd" title="${esc(x.u.summary||"")}">↻ ${esc(x.u.id)}</span>`).join("");
}
function updBlocks(ref){
  const ups = updatesFor(ref);
  if (!ups.length) return "";
  return ups.map(x => {
    const f = x.f;
    const body = x.kind==="fact"
      ? `<div class="diff"><span class="before">${esc(f.before||"")}</span> → <span class="after">${esc(f.after||"")}</span></div>`
      : `<div><b>Changement :</b> ${esc(f.change||"")}</div>`;
    return `<div class="upd-box"><h3>Mise à jour ${esc(x.u.id)} (${esc(x.u.event_date||x.u.received_at||"")})</h3>${body}<div class="small">Preuve : ${esc(f.evidence||"")} · <i>${esc(x.u.summary||"")}</i></div><div class="small muted">Le texte du baseline, au-dessus, est gardé tel quel.</div></div>`;
  }).join("");
}

/* ---------- evidence chips & source drawer ---------- */
function ev(src, a, b, label){
  const s = S[src]; if (!s) return `<span class="ev" title="source inconnue">${esc(src)}</span>`;
  const isImg = !!s.image;
  const lab = label || (s.file + (a? (isImg? "" : ` · l. ${a}${b&&b!==a?" à "+b:""}`) : ""));
  return `<a class="ev${isImg?" img":""}" href="#src=${esc(src)}&l=${a||""}-${b||""}" data-src="${esc(src)}" data-a="${a||""}" data-b="${b||""}" title="${esc(s.path)}">${esc(lab)}</a>`;
}
function evList(arr){ return (arr||[]).map(e => ev(e[0], e[1], e[2], e[3]? `${S[e[0]]?S[e[0]].file:e[0]} · ${e[3]}` : null)).join(" "); }
function openSource(id, a, b){
  const s = S[id]; if (!s) return;
  const meta = D.source_meta[id] || {};
  const dr = $("#drawer");
  $("#drawer .dh h3").textContent = s.path;
  let m = `<b>${esc(s.category)}</b> · ${esc(s.kind.toUpperCase())} · ${s.bytes} octets · lecture : <b class="role-${(meta.role||"").slice(0,4)}">${esc(meta.role||"")}</b><br>Qui décide, comment lire : ${esc(meta.authority||"non précisé")}`;
  if (s.date) m += `<br>Courriel de ${esc(s.from||"")}, le ${esc(s.date)}, objet « ${esc(s.subject||"")} »`;
  if (s.attachments && s.attachments.length) m += `<br>Pièces jointes : ` + s.attachments.map(x => `${esc(x.name)}${x.same_as&&x.same_as.length? " = même fichier que " + x.same_as.map(esc).join(", ") + " (ne compte pas comme une deuxième preuve)" : ""}`).join("; ");
  if (s.duplicate_of) m += `<br><b>Copie exacte de :</b> ${s.duplicate_of.map(esc).join(", ")}`;
  m += `<br><a href="corpus/Projet360_NOVA_ETUDIANTS/${encodeURI(s.path)}" target="_blank">Ouvrir le fichier original</a> · SHA-256 ${s.sha256.slice(0,12)}…`;
  $("#drawer .meta").innerHTML = m;
  let body = "";
  if (s.image) body += `<img src="${s.image}" alt="${esc(s.file)}"><div class="small muted">Transcription vérifiée (OCR corrigé à la main) :</div>`;
  else if (s.kind==="pdf") body += `<div class="small muted">Texte extrait du PDF (page 1). La mise en page est approximative. Ouvrez l'original pour voir la présentation.</div>`;
  else if (s.kind==="xlsx") body += `<div class="small muted">Cellules non vides, une ligne par rangée (A1=…). La ligne N du tableur est la ligne N+1 ci-dessous.</div>`;
  const lines = (s.text||"").split("\n");
  body += `<pre class="src">` + lines.map((l,i) => { const n=i+1; const hl = a && n>=a && n<=(b||a); return `<span class="ln${hl?" hl":""}" id="L${n}"><span class="n">${n}</span>${esc(l)||" "}</span>`; }).join("") + `</pre>`;
  $("#drawer .body").innerHTML = body;
  dr.classList.add("open");
  if (a) setTimeout(() => { const el = $("#drawer #L"+a); if (el) el.scrollIntoView({block:"center"}); }, 30);
}
document.addEventListener("click", e => {
  const chip = e.target.closest("a.ev"); if (chip){ e.preventDefault(); openSource(chip.dataset.src, +chip.dataset.a||0, +chip.dataset.b||0); return; }
  const srow = e.target.closest("[data-open-src]"); if (srow){ openSource(srow.dataset.openSrc, 0, 0); }
});
$("#drawer .dh button").addEventListener("click", () => $("#drawer").classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key==="Escape") $("#drawer").classList.remove("open"); });

/* ---------- tabs & view ---------- */
function showTab(name){
  $$("nav.tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab===name));
  $$("section.tab").forEach(s => s.classList.toggle("on", s.id==="tab-"+name));
  location.hash = "#tab=" + name;
}
$$("nav.tabs button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
$$(".viewsel button").forEach(b => b.addEventListener("click", () => { VIEW = b.dataset.view; $$(".viewsel button").forEach(x => x.classList.toggle("on", x===b)); renderAll(); }));

/* ---------- renderers ---------- */
function renderBrief(){
  const B = D.brief; let h = "";
  if (VIEW==="updated"){
    const ups = allUpdates();
    if (ups.length){
      h += `<div class="upd-box"><h3>État mis à jour : ${ups.length} événement(s) ajouté(s) par-dessus le baseline du 30 sept.</h3>` + ups.map(u => `<p><b>${esc(u.id)}</b> (${esc(u.event_date||u.received_at||"")}) : ${esc(u.summary||"")}<br><b>Statut du problème :</b> ${esc(u.problem_status||"non précisé")}<br><b>Décision antérieure (toujours en vigueur, sauf mention) :</b> ${esc(u.prior_decision||"non précisé")}<br><b>Nouvelle proposition (non approuvée) :</b> ${esc(u.new_proposal||"aucune")}<br><b>Ce qui ne change pas :</b> ${esc(u.unchanged||"non précisé")}<br><span class="small">Preuve : ${esc((u.source||{}).file||"")} · ${esc((u.source||{}).loc||"")}</span></p>`).join("") + `</div>`;
    } else h += `<div class="upd-box"><h3>Vue « Mis à jour »</h3><p>Aucun événement ajouté pour l'instant : l'état mis à jour est le même que le baseline. Utilisez l'onglet « Mise à jour » pour saisir la nouvelle information.</p></div>`;
  }
  h += `<div class="brief"><h2>${esc(B.title)}</h2><div class="asof">${esc(B.asof)}</div>`;
  B.sections.forEach(sec => { h += `<h4>${esc(sec.h)}</h4>` + sec.items.map(p => `<p>${esc(p)}</p>`).join(""); });
  // go-live conditions table linked to actions
  h += `<h4>Conditions de go-live : actions, responsables, échéances</h4><table class="conds"><tr><th>Condition (comité du 26 sept.)</th><th>Action</th><th>Responsable</th><th>Échéance</th><th>Preuve</th></tr>`;
  D.actions.filter(a => a.condition).forEach(a => { h += `<tr><td><span class="cond">${a.condition}</span>${["","Sécurité SEC-210","Accessibilité ACC-303","Runbook + rollback"][a.condition]}</td><td>${esc(a.id)} ${esc(a.title)}</td><td>${esc(a.owner)} <span class="tag ${a.owner_status==="confirmé"?"conf":"prop"}">${a.owner_status}</span></td><td>${esc(a.due)}</td><td>${evList(a.evidence.slice(0,2))}</td></tr>`; });
  h += `</table><p class="small muted" style="margin-top:8px">${esc(B.footer)}</p></div>`;
  h += `<p class="noprint"><button class="btn sec" onclick="window.print()">Imprimer le brief ou l'exporter en PDF</button> <span class="small muted">(il tient sur une page)</span></p>`;
  $("#tab-brief").innerHTML = h;
}
function renderQuestions(){
  let h = `<h2>Les dix questions, avec leurs preuves</h2><p class="small muted">Chaque réponse cite un fichier et un repère précis (ligne, cellule, page, heure, capture). Cliquez une puce pour ouvrir la source avec le passage surligné. « Sources croisées » veut dire que la réponse s'appuie sur des documents différents (les pièces jointes en double ne comptent pas).</p>`;
  D.questions.forEach(q => {
    h += `<div class="card q" id="${q.id}"><h3>${q.id}. ${esc(q.question)} ${updBadge(q.id)}</h3><div class="answer">${esc(q.answer)}</div>`;
    h += `<div><b>Preuves :</b><table>` + q.evidence.map(e => `<tr><td>${ev(e.src, e.lines[0], e.lines[1], S[e.src].file + " · " + e.loc)}</td><td class="small">« ${esc(e.quote)} »<br><span class="muted">${esc(e.note)}</span></td></tr>`).join("") + `</table></div>`;
    h += `<details open><summary>Nuances et pièges à éviter</summary><ul class="tight">` + q.nuance.map(n => `<li>${esc(n)}</li>`).join("") + `</ul></details>`;
    h += `<p class="small"><b>Sources croisées :</b> ${esc(q.cross)}<br><b>Incertitude :</b> ${esc(q.uncertainty)}</p>`;
    h += updBlocks(q.id) + `</div>`;
  });
  $("#tab-questions").innerHTML = h;
}
let TLF = {theme:"", type:"", validOnly:false};
function renderTimeline(){
  const themes = [...new Set(D.timeline.map(t=>t.theme))];
  const types = [...new Set(D.timeline.map(t=>t.type))];
  let h = `<h2>Chronologie</h2><p class="small muted">Chaque entrée a un type : <span class="tag proposition">proposition</span> <span class="tag decision">décision</span> <span class="tag validation">validation</span> <span class="tag fait">fait</span> <span class="tag livraison">livraison</span> <span class="tag communication">communication</span> <span class="tag contradiction">contradiction</span>. Les entrées grisées sont anciennes : une décision ou une validation plus récente les a remplacées.</p>`;
  h += `<div class="filters"><button data-f="theme" data-v="" class="${TLF.theme===""?"on":""}">Tous les thèmes</button>` + themes.map(t => `<button data-f="theme" data-v="${t}" class="${TLF.theme===t?"on":""}">${t}</button>`).join("") + `</div>`;
  h += `<div class="filters"><button data-f="type" data-v="" class="${TLF.type===""?"on":""}">Tous les types</button>` + types.map(t => `<button data-f="type" data-v="${t}" class="${TLF.type===t?"on":""}">${t}</button>`).join("") + `<button data-f="validOnly" class="${TLF.validOnly?"on":""}">valable au 30 sept. seulement</button></div>`;
  let items = D.timeline.slice();
  if (VIEW==="updated") allUpdates().forEach(u => items.push({date:u.event_date||u.received_at||"", type:u.event_type||"fait", theme:u.theme||"gouvernance", title:`[${u.id}] ${u.summary||""}`, detail:`Statut du problème : ${u.problem_status||"non précisé"} · Décision antérieure : ${u.prior_decision||"non précisé"} · Nouvelle proposition : ${u.new_proposal||"aucune"}`, src:null, upd:true, valid:true, _loc:(u.source||{})}));
  items.sort((a,b) => (a.date||"").localeCompare(b.date||""));
  items = items.filter(t => (!TLF.theme||t.theme===TLF.theme) && (!TLF.type||t.type===TLF.type) && (!TLF.validOnly||t.valid));
  h += `<div class="tl">` + items.map(t => `<div class="item ${t.type}${t.valid?"":" hist"}"><span class="date">${esc(t.date)}</span> <span class="tag ${t.type==="décision"?"decision":t.type}">${t.type}</span><span class="tag">${esc(t.theme)}</span>${t.upd?`<span class="badge-upd">événement</span>`:""}${t.valid?"":`<span class="tag hist">ancien</span>`}<div class="title">${esc(t.title)}</div>${t.detail?`<div class="small">${esc(t.detail)}</div>`:""}<div>${t.src? ev(t.src, t.lines[0], t.lines[1]) : (t._loc? `<span class="ev">${esc(t._loc.file||"source de l'événement")} · ${esc(t._loc.loc||"")}</span>`:"")} ${t.also? t.also.map(a => ev(a[0], a[1], a[2])).join(" "):""}</div></div>`).join("") + `</div>`;
  const el = $("#tab-chronologie"); el.innerHTML = h;
  $$(".filters button", el).forEach(b => b.addEventListener("click", () => { if (b.dataset.f==="validOnly") TLF.validOnly=!TLF.validOnly; else TLF[b.dataset.f]=b.dataset.v; renderTimeline(); }));
}
function renderDecisions(){
  let h = `<h2>Registre des décisions : qui propose, qui décide, qui confirme</h2><p class="small muted">Une proposition n'est pas une décision. Une correction livrée n'est pas une validation. Chaque étape a son auteur, sa date et sa source.</p>`;
  D.decisions.forEach(d => {
    h += `<div class="card" id="${d.id}"><h3>${d.id}. ${esc(d.title)} ${updBadge(d.id)}</h3><p><span class="tag ${/Refus|NON|brouillon/i.test(d.status)?"bad":(/conditionnelle|aucune condition/i.test(d.status)?"warn":"ok")}">${esc(d.status)}</span></p><table><tr><th style="width:120px">Étape</th><th>Qui</th><th>Quand</th><th>Source</th></tr>`;
    [["Proposition",d.proposition],["Décision",d.decision],["Validation / confirmation",d.validation]].forEach(([k,v]) => { h += `<tr><td><span class="tag ${k[0]==="P"?"proposition":k[0]==="D"?"decision":"validation"}">${k}</span></td><td>${esc(v.who)}</td><td>${esc(v.when)}</td><td>${ev(v.src, v.lines[0], v.lines[1])}</td></tr>`; });
    h += `</table><p class="small"><b>Pourquoi :</b> ${esc(d.why)}${d.conditions?`<br><b>Conditions et réserves :</b> ${esc(d.conditions)}`:""}${d.docs_to_update?`<br><b>Documents impactés :</b> ${esc(d.docs_to_update)}`:""}</p>${updBlocks(d.id)}</div>`;
  });
  $("#tab-decisions").innerHTML = h;
}
function renderContradictions(){
  let h = `<h2>Contradictions résolues</h2><p class="small muted">On tranche avec deux critères : <b>qui décide</b> (qui a le pouvoir de trancher) et la <b>date des faits</b> (pas la date du fichier). Les contradictions marquées <span class="tag warn">plan / registre</span> touchent un plan de projet ou le registre de risques.</p>`;
  D.contradictions.forEach(c => {
    h += `<div class="card contra" id="${c.id}"><h3>${c.id}. ${esc(c.title)} ${c.in_plan_or_register?'<span class="tag warn">plan / registre</span>':""}<span class="tag">${esc(c.theme)}</span> ${updBadge(c.id)}</h3>`;
    h += `<div class="vs"><div class="side a"><b>Version A (écartée)</b><br>${esc(c.a.claim)}<br>${ev(c.a.src, c.a.lines[0], c.a.lines[1], S[c.a.src].file + " · " + c.a.loc)}</div><div class="side b"><b>Version B (retenue)</b><br>${esc(c.b.claim)}<br>${ev(c.b.src, c.b.lines[0], c.b.lines[1], S[c.b.src].file + " · " + c.b.loc)}</div></div>`;
    h += `<div class="res"><b>Ce qu'on retient (critère : ${esc(c.basis)}) :</b> ${esc(c.resolution)}<br><b>État au 30 sept. :</b> ${esc(c.status_now)}</div>`;
    if (c.extra && c.extra.length) h += `<p class="small"><b>Autres preuves :</b> ${c.extra.map(x => ev(x[0], x[1], x[2])).join(" ")}</p>`;
    h += updBlocks(c.id) + `</div>`;
  });
  $("#tab-contradictions").innerHTML = h;
}
function renderActions(){
  let h = `<h2>Actions restantes</h2><p class="small muted"><span class="tag conf">confirmé</span> = la personne est nommée dans le dossier · <span class="tag prop">proposé</span> = c'est notre proposition · <b>engagement documenté</b> = l'action existe dans le dossier · <b>recommandation</b> = c'est notre équipe qui la propose · « À confirmer » = aucune date dans le dossier.</p>`;
  h += `<table><tr><th>ID</th><th>Cond.</th><th>Action</th><th>Responsable</th><th>Nature</th><th>Échéance</th><th>Preuves</th></tr>`;
  D.actions.forEach(a => {
    h += `<tr id="${a.id}"><td><b>${a.id}</b>${updBadge(a.id)}</td><td>${a.condition?`<span class="cond">${a.condition}</span>`:""}</td><td>${esc(a.title)}${a.note?`<div class="small muted">${esc(a.note)}</div>`:""}<div class="small"><span class="tag ${/Bloquant/.test(a.priority)?"bad":/Haute/.test(a.priority)?"warn":""}">${esc(a.priority)}</span></div>${updBlocks(a.id)}</td><td>${esc(a.owner)} <span class="tag ${a.owner_status==="confirmé"?"conf":"prop"}">${a.owner_status}</span></td><td class="small">${esc(a.kind)}</td><td>${esc(a.due)}</td><td>${evList(a.evidence)}</td></tr>`;
  });
  if (VIEW==="updated") allUpdates().forEach(u => (u.new_actions||[]).forEach(a => { h += `<tr><td><b>${esc(a.id||"A-?")}</b><span class="badge-upd">nouvelle · ${esc(u.id)}</span></td><td></td><td>${esc(a.title||"")}</td><td>${esc(a.owner||"")}</td><td class="small">${esc(a.kind||"issue de l'événement")}</td><td>${esc(a.due||"À confirmer")}</td><td class="small">${esc(a.evidence||"")}</td></tr>`; }));
  h += `</table><h3>Engagements déjà tenus (pour la traçabilité)</h3><table><tr><th>Engagement</th><th>Clôture</th><th>Source</th></tr>` + D.closed_commitments.map(c => `<tr><td>${esc(c.title)}</td><td>${esc(c.closed)}</td><td>${ev(c.src, c.lines[0], c.lines[1])}</td></tr>`).join("") + `</table>`;
  $("#tab-actions").innerHTML = h;
}
function renderSources(){
  let h = `<h2>Index des sources (${D.sources.length} fichiers)</h2><p class="small muted">Lecture : <b>primaire</b> (preuve), <b>capture</b> (preuve visuelle, souvent ancienne), <b>pièce jointe</b>, <b>doublon</b> (copie exacte, ne compte pas deux fois), <b>hors sujet</b>, <b>non officiel</b>, <b>historique</b>. Cliquez une ligne pour ouvrir le fichier.</p><h3>Personnes et rôles</h3><table><tr><th>Nom</th><th>Organisation</th><th>Rôle dans NOVA</th><th>Sources</th></tr>` + D.people.map(p => `<tr><td><b>${esc(p.name)}</b></td><td>${esc(p.org)}</td><td>${esc(p.role)}</td><td>${p.src.map(s => ev(s)).join(" ")}</td></tr>`).join("") + `</table>`;
  h += `<h3>Fichiers</h3><div class="srcs"><table><tr><th>Fichier</th><th>Catégorie</th><th>Lecture</th><th>Qui décide, comment lire</th></tr>`;
  D.sources.forEach(s => { const m = D.source_meta[s.id]||{}; h += `<tr data-open-src="${s.id}" style="cursor:pointer"><td>${esc(s.path)}${s.image?" 🖼":""}${s.duplicate_of?` <span class="tag bad">doublon</span>`:""}${(s.attachments||[]).length?` <span class="tag">${s.attachments.length} PJ</span>`:""}</td><td>${esc(s.category)}</td><td class="role-${(m.role||"").slice(0,4)}">${esc(m.role||"")}</td><td class="small">${esc(m.authority||"")}</td></tr>`; });
  h += `</table></div>`;
  $("#tab-sources").innerHTML = h;
}
function renderUpdate(){
  const ups = allUpdates();
  let h = `<h2>Mise à jour après la nouvelle information</h2>JURY_PLACEHOLDER
  <div class="card"><h3>Comment ça marche</h3><p>Le baseline (30 sept. 2026, 9 h) n'est jamais modifié. Chaque nouvelle information devient une <b>couche datée</b> (U-01, U-02…) qui précise : le <b>statut du problème</b> concerné, la <b>décision antérieure</b> qui reste en vigueur, la <b>nouvelle proposition</b> s'il y en a une (pas approuvée tant qu'aucune décision n'est documentée), les <b>faits et actions touchés</b> (avant, après, preuve), les <b>nouvelles actions</b>, et <b>ce qui ne change pas</b> (les autres conditions de go-live restent ouvertes; aucune approbation n'est inventée).</p>
  <p>Trois façons d'ajouter l'événement :</p><ol class="tight"><li><b>Le formulaire ci-dessous</b>, puis « Enregistrer dans ce navigateur » (gardé sur cet ordinateur) et « Télécharger updates.js » pour remplacer le fichier <code>updates.js</code> à côté de <code>index.html</code> (durable, partageable).</li><li>Modifier <code>updates.js</code> avec un éditeur de texte (le modèle est en commentaire dans le fichier), puis recharger la page.</li><li>Déposer le document reçu dans <code>corpus/09_Evenement/</code> et le citer comme preuve.</li></ol><p>Passez ensuite à la vue <b>« Mis à jour »</b> (en haut) : le brief, les questions, les décisions, les contradictions, les actions et la chronologie montrent les changements par-dessus le baseline, avec le badge ↻.</p></div>`;
  let jury = "";
  if (ups.length){
    const lab = {Q:"question", D:"décision", C:"contradiction", A:"action"};
    const refLink = r => (r||"").split(/[\s,\/]+/).filter(Boolean).map(id => { const tab = id.startsWith("Q")?"questions":id.startsWith("D")?"decisions":id.startsWith("C")?"contradictions":"actions"; return `<a href="#" onclick="document.querySelector('[data-tab=${tab}]').click();setTimeout(()=>{const e=document.getElementById('${esc(id)}');if(e)e.scrollIntoView({block:'start'})},60);return false">${esc(id)}</a> <span class="small muted">(${lab[id[0]]||""})</span>`; }).join("<br>");
    jury = `<div class="card jury" id="jury"><h3>Réponse aux trois questions du jury</h3>` + ups.map(u => `
      <div class="upd-box"><h3>${esc(u.id)} : ${esc(u.summary||"")}</h3>
      <p class="small">Preuve : ${esc((u.source||{}).file||"")} · ${esc((u.source||{}).loc||"")} · « ${esc((u.source||{}).quote||"")} »</p>
      <h4>1. Qu'est-ce qui vient de changer?</h4>
      <p><b>Statut du problème :</b> ${esc(u.problem_status||"non précisé")}<br><b>Nouvelle proposition :</b> ${esc(u.new_proposal||"aucune")}<br><b>Décision antérieure (elle tient toujours) :</b> ${esc(u.prior_decision||"non précisée")}</p>
      <h4>2. Quelles informations précédentes sont touchées?</h4>
      ${(u.affected_facts||[]).length ? `<table><tr><th>Réf.</th><th>Avant (baseline, conservé)</th><th>Après</th><th>Preuve</th></tr>${u.affected_facts.map(f=>`<tr><td>${refLink(f.ref)}</td><td class="small">${esc(f.before)}</td><td class="small"><b>${esc(f.after)}</b></td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>` : `<p class="muted">Aucun fait du baseline n'est modifié.</p>`}
      <h4>3. Quelles actions faut-il prendre?</h4>
      ${(u.affected_actions||[]).length ? `<table><tr><th>Action existante</th><th>Changement</th><th>Preuve</th></tr>${u.affected_actions.map(f=>`<tr><td>${refLink(f.ref)}</td><td class="small">${esc(f.change)}</td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>` : ``}
      ${(u.new_actions||[]).length ? `<table><tr><th>Nouvelle action</th><th>Responsable</th><th>Échéance</th><th>Preuve</th></tr>${u.new_actions.map(f=>`<tr><td><b>${esc(f.id)}</b> ${esc(f.title)}</td><td class="small">${esc(f.owner)}</td><td class="small">${esc(f.due)}</td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>` : ``}
      ${!(u.affected_actions||[]).length && !(u.new_actions||[]).length ? `<p class="muted">Aucune action touchée ni ajoutée.</p>` : ``}
      <h4>Ce qui ne change pas</h4><p>${esc(u.unchanged||"non précisé")}</p>
      <h4>Ce qu'on ne sait pas</h4><p>${esc(u.uncertainty||"non précisé")}</p>
      </div>`).join("") + `<p class="noprint small muted">Les références (Q, D, C, A) sont cliquables et mènent à l'entrée du baseline, qui reste affichée telle quelle avec le badge ↻.</p></div>`;
  }
  h = h.replace("JURY_PLACEHOLDER", jury);
  h += `<div class="card"><h3>Journal des mises à jour (${ups.length})</h3>` + (ups.length? ups.map(u => `<div class="upd-box"><h3>${esc(u.id)} : reçu le ${esc(u.received_at||"?")}, événement du ${esc(u.event_date||"?")} <span class="small muted">[${esc(u._origin)}]</span></h3><p><b>Résumé :</b> ${esc(u.summary||"")}</p><p><b>Source :</b> ${esc((u.source||{}).file||"")} · ${esc((u.source||{}).loc||"")} · « ${esc((u.source||{}).quote||"")} »</p><p><b>Statut du problème :</b> ${esc(u.problem_status||"")}<br><b>Décision antérieure :</b> ${esc(u.prior_decision||"")}<br><b>Nouvelle proposition :</b> ${esc(u.new_proposal||"")}</p>${(u.affected_facts||[]).length?`<p><b>Faits touchés :</b></p><table><tr><th>Réf.</th><th>Avant (baseline)</th><th>Après</th><th>Preuve</th></tr>${u.affected_facts.map(f=>`<tr><td>${esc(f.ref)}</td><td class="small">${esc(f.before)}</td><td class="small"><b>${esc(f.after)}</b></td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>`:""}${(u.affected_actions||[]).length?`<p><b>Actions touchées :</b></p><table><tr><th>Réf.</th><th>Changement</th><th>Preuve</th></tr>${u.affected_actions.map(f=>`<tr><td>${esc(f.ref)}</td><td class="small">${esc(f.change)}</td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>`:""}${(u.new_actions||[]).length?`<p><b>Nouvelles actions :</b></p><table><tr><th>ID</th><th>Action</th><th>Responsable</th><th>Échéance</th><th>Preuve</th></tr>${u.new_actions.map(f=>`<tr><td>${esc(f.id)}</td><td class="small">${esc(f.title)}</td><td class="small">${esc(f.owner)}</td><td class="small">${esc(f.due)}</td><td class="small">${esc(f.evidence)}</td></tr>`).join("")}</table>`:""}<p><b>Ce qui ne change pas :</b> ${esc(u.unchanged||"")}<br><b>Ce qu'on ne sait pas :</b> ${esc(u.uncertainty||"")}</p></div>`).join("") : `<p class="muted">Aucun événement ajouté. L'état mis à jour est le même que le baseline.</p>`) + `</div>`;
  h += `<div class="card noprint"><h3>Saisir un événement</h3><p class="small muted">Les cinq champs qui comptent le plus : résumé, statut du problème, décision antérieure, nouvelle proposition, ce qui ne change pas. Les tableaux peuvent être remplis ensuite, ou proposés par l'assistant IA local.</p><form class="upd" id="updform">
  <div class="grid2"><div><label>Identifiant</label><input name="id" value="U-${String(ups.length+1).padStart(2,"0")}"></div><div><label>Reçu le (réel)</label><input name="received_at" value="${(d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"))(new Date())}" placeholder="2026-10-04T14:30"></div><div><label>Date fictive de l'événement</label><input name="event_date" placeholder="2026-10-01"></div><div><label>Type d'événement</label><select name="event_type"><option>fait</option><option>proposition</option><option>décision</option><option>validation</option><option>livraison</option><option>communication</option><option>contradiction</option></select></div><div><label>Thème</label><select name="theme"><option>gouvernance</option><option>échéancier</option><option>sécurité</option><option>accessibilité</option><option>exploitation</option><option>finances</option><option>portée</option><option>architecture</option><option>intégration</option><option>données</option></select></div></div>
  <label>Résumé (ce qui vient de changer, sans interpréter)</label><textarea name="summary"></textarea>
  <div class="grid2"><div><label>Fichier source de l'événement</label><input name="src_file" placeholder="09_Evenement/E13_....eml"></div><div><label>Repère précis</label><input name="src_loc" placeholder="ligne 9 / page 1 / 10:12"></div></div>
  <label>Citation verbatim</label><textarea name="src_quote"></textarea>
  <label>Statut du problème concerné</label><textarea name="problem_status" placeholder="ex. SEC-210 : re-test fait le …, résultat …, statut du ticket …"></textarea>
  <label>Décision antérieure (elle reste en vigueur tant que personne d'habilité ne l'a changée)</label><textarea name="prior_decision">22 octobre approuvé par le comité de direction le 10 sept. (M04 15:25), sous les trois conditions du 26 sept. (M06 10:09).</textarea>
  <label>Nouvelle proposition (qui, à qui; PAS approuvée tant qu'aucune décision n'est documentée)</label><textarea name="new_proposal"></textarea>
  <details class="formdet" open><summary>Tableaux : faits touchés, actions touchées, nouvelles actions (une ligne par élément)</summary>
  <label>Faits touchés, une ligne par fait : <code>Réf | avant | après | preuve</code> (Réf = Q01, D-01, C-03…)</label><textarea name="affected_facts" placeholder="Q08 | SEC-210 EN VALIDATION | … | 09_Evenement/… l. 5"></textarea>
  <label>Actions touchées, une ligne par action : <code>A-0x | changement | preuve</code></label><textarea name="affected_actions" placeholder="A-01 | échéance précisée : re-test le … | …"></textarea>
  <label>Nouvelles actions, une ligne par action : <code>ID | titre | responsable (confirmé ou proposé) | date ou À confirmer | preuve</code></label><textarea name="new_actions"></textarea>
  </details>
  <label>Ce qui ne change pas</label><textarea name="unchanged">Les autres conditions de go-live restent ouvertes; aucune approbation n'est inventée; le baseline du 30 sept. est conservé.</textarea>
  <label>Ce qu'on ne sait pas (ce que l'événement ne dit pas)</label><textarea name="uncertainty"></textarea>
  <button type="button" class="btn" id="btnSaveLocal">Enregistrer dans ce navigateur</button><button type="button" class="btn" id="btnDownload">Télécharger updates.js (toutes les mises à jour)</button><button type="button" class="btn sec" id="btnJson">Afficher le JSON</button><button type="button" class="btn sec" id="btnClear">Effacer les mises à jour gardées dans ce navigateur</button>
  <pre id="updjson" class="src hidden" style="margin-top:10px;background:#f7f9fb;padding:8px"></pre></form></div>`;
  $("#tab-maj").innerHTML = h;
  const parseLines = (txt, keys) => txt.split("\n").map(l => l.trim()).filter(Boolean).map(l => { const p = l.split("|").map(x => x.trim()); const o = {}; keys.forEach((k,i) => o[k] = p[i]||""); return o; });
  const fromForm = () => { const f = $("#updform"); const g = n => f.elements[n].value.trim(); return {id:g("id"), received_at:g("received_at"), event_date:g("event_date"), event_type:g("event_type"), theme:g("theme"), source:{file:g("src_file"), loc:g("src_loc"), quote:g("src_quote")}, summary:g("summary"), problem_status:g("problem_status"), prior_decision:g("prior_decision"), new_proposal:g("new_proposal"), affected_facts:parseLines(g("affected_facts"),["ref","before","after","evidence"]), affected_actions:parseLines(g("affected_actions"),["ref","change","evidence"]), new_actions:parseLines(g("new_actions"),["id","title","owner","due","evidence"]), unchanged:g("unchanged"), uncertainty:g("uncertainty")}; };
  $("#btnJson").onclick = () => { const p = $("#updjson"); p.classList.remove("hidden"); p.textContent = JSON.stringify(fromForm(), null, 2); };
  $("#btnSaveLocal").onclick = () => { const u = fromForm(); if (!u.summary){ alert("Résumé requis."); return; } const arr = loadLocalUpdates().filter(x => x.id!==u.id); arr.push(u); saveLocalUpdates(arr); VIEW="updated"; $$(".viewsel button").forEach(x => x.classList.toggle("on", x.dataset.view==="updated")); renderAll(); showTab("maj"); };
  $("#btnDownload").onclick = () => { const cur = fromForm(); const arr = allUpdates().map(u => { const c = Object.assign({}, u); delete c._origin; return c; }).filter(x => x.id!==cur.id); if (cur.summary) arr.push(cur); const txt = "/* NOVA Mémoire 360 : mises à jour (couches datées par-dessus le baseline du 30 sept. 2026, 9 h). Généré le " + new Date().toISOString() + " */\nwindow.NOVA_UPDATES = " + JSON.stringify(arr, null, 2) + ";\n"; const b = new Blob([txt], {type:"text/javascript"}); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "updates.js"; a.click(); };
  $("#btnClear").onclick = () => { if (confirm("Effacer les mises à jour gardées dans ce navigateur? (updates.js n'est pas touché)")){ saveLocalUpdates([]); renderAll(); } };
}
function renderUsage(){
  const U = D.usage; const sec = (t, arr) => `<h3>${t}</h3><ul class="tight">` + arr.map(x => `<li>${esc(x)}</li>`).join("") + `</ul>`;
  $("#tab-usage").innerHTML = `<h2>Mode d'emploi</h2><div class="card">${sec("Ouvrir", U.open)}${sec("Naviguer", U.navigate)}${sec("Outils utilisés", U.tools)}${sec("Ce qui a été fait à la main", U.manual)}${sec("Limites", U.limits)}${sec("Ce qu'on ne sait pas (au 30 sept.)", U.uncertain)}</div><div class="card"><h3>Comment lire un repère</h3><p class="small">Textes (.txt, .md, .eml) : numéro de ligne tel qu'affiché dans le visualiseur (pour un .eml, les lignes 1 à 5 sont les en-têtes et le corps commence à la ligne 7). Transcriptions : l'heure (ex. 15:25). Tableurs : la cellule (ex. F7); la ligne N du tableur est la ligne N+1 du visualiseur. PDF : page 1 et le nom de la section ou de la ligne du tableau. Captures : l'élément visible (ex. étape 4 « TODO ») et la transcription vérifiée.</p></div>`;
}
function renderAll(){ renderBrief(); renderQuestions(); renderTimeline(); renderDecisions(); renderContradictions(); renderActions(); renderSources(); renderUpdate(); renderUsage(); }

/* ---------- search ---------- */
function search(qs){
  const box = $("#tab-recherche"); const q = qs.trim().toLowerCase();
  if (q.length < 2){ box.innerHTML = `<h2>Recherche</h2><p class="muted">Tapez au moins deux lettres.</p>`; return; }
  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
  const mark = s => esc(s).replace(re, m => `<mark>${m}</mark>`);
  let hits = [];
  D.questions.forEach(x => { const t = x.question+" "+x.answer+" "+x.nuance.join(" "); if (t.toLowerCase().includes(q)) hits.push(`<div class="hit"><span class="tag">question</span> <a href="#tab=questions" onclick="document.querySelector('[data-tab=questions]').click();setTimeout(()=>location.hash='#${x.id}',50)"><b>${x.id}</b> ${esc(x.question)}</a><br>${mark(snippet(t,q))}</div>`); });
  D.decisions.forEach(x => { const t = x.title+" "+x.why+" "+x.conditions; if (t.toLowerCase().includes(q)) hits.push(`<div class="hit"><span class="tag decision">décision</span> <b>${x.id}</b> ${mark(x.title)}</div>`); });
  D.contradictions.forEach(x => { const t = x.title+" "+x.resolution; if (t.toLowerCase().includes(q)) hits.push(`<div class="hit"><span class="tag contradiction">contradiction</span> <b>${x.id}</b> ${mark(x.title)}<br>${mark(snippet(x.resolution,q))}</div>`); });
  D.actions.forEach(x => { const t = x.title+" "+x.owner+" "+x.note; if (t.toLowerCase().includes(q)) hits.push(`<div class="hit"><span class="tag">action</span> <b>${x.id}</b> ${mark(x.title)} · ${esc(x.owner)} · ${esc(x.due)}</div>`); });
  D.timeline.forEach(x => { const t = x.title+" "+x.detail; if (t.toLowerCase().includes(q)) hits.push(`<div class="hit"><span class="tag ${x.type==="décision"?"decision":x.type}">${x.type}</span> <span class="date">${x.date}</span> ${mark(x.title)} ${x.src?ev(x.src,x.lines[0],x.lines[1]):""}</div>`); });
  let shits = [];
  D.sources.forEach(s => { const lines = (s.text||"").split("\n"); lines.forEach((l,i) => { if (l.toLowerCase().includes(q)) shits.push(`<div class="hit">${ev(s.id, i+1, i+1)} ${mark(l.trim().slice(0,220))}</div>`); }); });
  box.innerHTML = `<h2>Recherche : « ${esc(qs)} »</h2><h3>Dans la mémoire (${hits.length} résultats)</h3><div class="search-res">${hits.join("")||"<p class='muted'>Aucun résultat.</p>"}</div><h3>Dans le texte complet des sources (${shits.length} lignes)</h3><div class="search-res">${shits.slice(0,400).join("")||"<p class='muted'>Aucun résultat.</p>"}${shits.length>400?"<p class='muted'>… liste coupée, précisez la recherche.</p>":""}</div>`;
}
function snippet(t, q){ const i = t.toLowerCase().indexOf(q); const a = Math.max(0, i-90); return (a>0?"…":"") + t.slice(a, i+160) + "…"; }
$("#search").addEventListener("input", e => { const v = e.target.value; if (v.trim().length>=2){ showTab("recherche"); search(v); } });
$("#search").addEventListener("keydown", e => { if (e.key==="Enter"){ showTab("recherche"); search(e.target.value); } });

/* ---------- init ---------- */
renderAll();
const h = location.hash;
const mt = h.match(/tab=([a-z]+)/); showTab(mt? mt[1] : "brief");
const ms = h.match(/src=([^&]+)&l=(\d*)-(\d*)/); if (ms) openSource(decodeURIComponent(ms[1]), +ms[2]||0, +ms[3]||0);
})();
