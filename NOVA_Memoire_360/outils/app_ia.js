/* NOVA Mémoire 360 : assistant IA local (optionnel). Fonctionne avec Ollama ou tout serveur compatible OpenAI (LM Studio, llama.cpp).
   Le modèle ne décide rien : il rédige un brouillon que l'humain vérifie, et il doit citer fichier + ligne. */
(function(){
const D = window.NOVA; const S = {}; D.sources.forEach(s => S[s.id] = s);
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const CFG_KEY = "nova360.ia";
const defaults = {kind:"ollama", url:"http://localhost:11434", model:"qwen2.5:7b", ctx:8192};
function cfg(){ try { return Object.assign({}, defaults, JSON.parse(localStorage.getItem(CFG_KEY)||"{}")); } catch(e){ return Object.assign({}, defaults); } }
function saveCfg(c){ try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch(e){} }

/* ---------- appel du modèle ---------- */
async function callModel(system, user, wantJson=true){
  const c = cfg();
  let url, body;
  if (c.kind === "ollama"){
    url = c.url.replace(/\/$/,"") + "/api/chat";
    body = {model:c.model, stream:false, messages:[{role:"system",content:system},{role:"user",content:user}], options:{temperature:0, num_ctx:+c.ctx||8192, num_predict:1200}, keep_alive:"30m"};
    if (wantJson) body.format = "json";
  } else {
    url = c.url.replace(/\/$/,"") + "/v1/chat/completions";
    body = {model:c.model, temperature:0, max_tokens:1200, messages:[{role:"system",content:system},{role:"user",content:user}]};
    if (wantJson) body.response_format = {type:"json_object"};
  }
  const r = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)});
  if (!r.ok) throw new Error("Le serveur a répondu " + r.status + " " + r.statusText);
  const j = await r.json();
  const txt = c.kind === "ollama" ? (j.message||{}).content : ((j.choices||[])[0]||{}).message?.content;
  if (!txt) throw new Error("Réponse vide du modèle.");
  return txt;
}
function parseJson(txt){
  try { return JSON.parse(txt); } catch(e){}
  const m = txt.match(/\{[\s\S]*\}/); if (m){ try { return JSON.parse(m[0]); } catch(e){} }
  throw new Error("Le modèle n'a pas renvoyé un JSON lisible. Réessayez ou remplissez à la main.");
}
async function ping(){
  const c = cfg();
  try {
    const u = c.kind==="ollama" ? c.url.replace(/\/$/,"")+"/api/tags" : c.url.replace(/\/$/,"")+"/v1/models";
    const r = await fetch(u); if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    const names = c.kind==="ollama" ? (j.models||[]).map(m=>m.name) : (j.data||[]).map(m=>m.id);
    return {ok:true, names};
  } catch(e){ return {ok:false, error:String(e)}; }
}

/* ---------- contexte du baseline (compact) ---------- */
function baselineContext(){
  const L = ["FAITS CLÉS DU BASELINE (" + D.reference_date_label + ") :"];
  D.brief.sections.forEach(sec => sec.items.forEach(it => L.push(`- [${sec.h}] ${it}`)));
  L.push("\nACTIONS RESTANTES (identifiants à réutiliser) :");
  D.actions.forEach(a => L.push(`- ${a.id} ${a.title.slice(0,110)} | ${a.owner} (${a.owner_status}) | ${a.due.slice(0,60)}${a.condition?` | condition ${a.condition}`:""}`));
  L.push("\nIDENTIFIANTS DES QUESTIONS : " + D.questions.map(q => `${q.id} = ${q.question.slice(0,70)}`).join("; "));
  L.push("IDENTIFIANTS DES DÉCISIONS : " + D.decisions.map(d => `${d.id} = ${d.title.slice(0,60)}`).join("; "));
  L.push("IDENTIFIANTS DES CONTRADICTIONS : " + D.contradictions.map(c => `${c.id} = ${c.title.slice(0,50)}`).join("; "));
  L.push("\nQUI A LE POUVOIR DE DÉCIDER : comité de direction = date de mise en production; Nicolas Perron (chargé de projet) = portée, plans, communications; Sophie Lambert = acceptation sécurité (SEC-210); Mélissa Gagnon = validation accessibilité (ACC-303); Olivier Côté = approbation du runbook et go exploitation; Amélie Fortin (Finances) = paiement des factures; Boréal Numérique (Julien Moreau) = fournisseur, ne décide rien côté client.");
  return L.join("\n");
}
const RULES = `Règles absolues :
1. N'invente rien. Si le document ne le dit pas, écris « à confirmer » ou « le document ne le dit pas ».
2. Une proposition n'est pas une décision. Une correction livrée n'est pas validée. « Nos tests passent » (fournisseur) n'est pas une acceptation du client.
3. Seules les personnes habilitées ferment une condition ou changent une date. Le fournisseur ne peut rien fermer.
4. Chaque fait et chaque action doit citer une preuve : nom du fichier et numéro de ligne (ex. « E13.eml, l. 12 »).
5. Ne ferme jamais une condition de go-live qui n'est pas touchée par le document. Ne crée aucune approbation.
6. Réponds en français simple, phrases courtes, sans tiret long.`;

/* ---------- pré-remplir la fiche d'événement ---------- */
function numbered(text){ return text.split("\n").map((l,i) => `${i+1}: ${l}`).join("\n"); }
async function draftUpdate(eventText, fileName){
  const system = "Tu es l'assistant de la mémoire du projet NOVA. Tu rédiges un BROUILLON de mise à jour qu'un humain va vérifier. Tu réponds UNIQUEMENT par un objet JSON valide, sans texte autour.\n" + RULES + "\n\nCONTEXTE DU BASELINE (vérifié, ne pas contredire sans preuve) :\n" + baselineContext();
  const schema = {
    event_date: "AAAA-MM-JJ (date de l'événement si elle est dans le document, sinon \"\")",
    event_type: "un mot parmi : fait, proposition, décision, validation, livraison, communication, contradiction",
    theme: "un mot parmi : gouvernance, échéancier, sécurité, accessibilité, exploitation, finances, portée, architecture, intégration, données",
    source: {file: fileName || "09_Evenement/<nom du fichier>", loc: "repère : lignes citées", quote: "citation mot pour mot, courte"},
    summary: "ce qui vient de changer, une phrase, sans interpréter",
    problem_status: "statut réel de chaque problème touché (ticket ouvert ou fermé, livré ou validé, par qui)",
    prior_decision: "la décision antérieure qui tient toujours",
    new_proposal: "la nouvelle proposition s'il y en a une : qui la fait, et préciser qu'elle n'est PAS approuvée; sinon « aucune »",
    affected_facts: [{ref: "identifiants parmi Q01..Q10, D-01..D-08, C-01..C-10, séparés par des espaces", before: "valeur du baseline", after: "valeur mise à jour", evidence: "fichier, l. N"}],
    affected_actions: [{ref: "A-01..A-13", change: "ce qui change pour cette action", evidence: "fichier, l. N"}],
    new_actions: [{id: "A-14, A-15…", title: "action", owner: "nom (confirmé ou proposé)", due: "date ou « À confirmer »", evidence: "fichier, l. N"}],
    unchanged: "ce qui ne change pas : nommer chaque condition de go-live qui reste ouverte",
    uncertainty: "ce que le document ne dit pas"
  };
  const user = `DOCUMENT REÇU (${fileName||"événement"}), avec numéros de ligne :\n${numbered(eventText)}\n\nProduis le JSON avec exactement ces clés :\n${JSON.stringify(schema, null, 1)}`;
  const txt = await callModel(system, user, true);
  return parseJson(txt);
}
function validateDraft(d, eventText){
  const flags = [];
  const nLines = eventText.split("\n").length;
  const known = new Set([...D.questions.map(q=>q.id), ...D.decisions.map(x=>x.id), ...D.contradictions.map(x=>x.id), ...D.actions.map(x=>x.id)]);
  const checkEv = (ev, where) => { if (!ev) { flags.push(`${where} : preuve manquante`); return; } const m = String(ev).match(/l\.?\s*(\d+)/i); if (m && +m[1] > nLines) flags.push(`${where} : la ligne ${m[1]} n'existe pas dans le document (${nLines} lignes)`); };
  (d.affected_facts||[]).forEach((f,i) => { String(f.ref||"").split(/[\s,\/]+/).filter(Boolean).forEach(r => { if (!known.has(r)) flags.push(`fait ${i+1} : référence inconnue « ${r} »`); }); checkEv(f.evidence, `fait ${i+1}`); });
  (d.affected_actions||[]).forEach((f,i) => { String(f.ref||"").split(/[\s,\/]+/).filter(Boolean).forEach(r => { if (!known.has(r)) flags.push(`action touchée ${i+1} : référence inconnue « ${r} »`); }); checkEv(f.evidence, `action touchée ${i+1}`); });
  (d.new_actions||[]).forEach((f,i) => checkEv(f.evidence, `nouvelle action ${i+1}`));
  if (/approuv/i.test(d.new_proposal||"") && !/non|pas /i.test(d.new_proposal||"")) flags.push("nouvelle proposition : le mot « approuvé » apparaît sans « non » ou « pas ». Vérifiez qu'aucune approbation n'est inventée.");
  if (!(d.unchanged||"").trim()) flags.push("« ce qui ne change pas » est vide : nommez les conditions qui restent ouvertes.");
  return flags;
}
function fillForm(d){
  const f = $("#updform"); if (!f) return;
  const set = (n,v) => { if (f.elements[n] && v!=null) f.elements[n].value = v; };
  set("event_date", d.event_date||""); set("summary", d.summary||""); set("problem_status", d.problem_status||""); set("prior_decision", d.prior_decision||""); set("new_proposal", d.new_proposal||"");
  set("unchanged", d.unchanged||""); set("uncertainty", d.uncertainty||"");
  if (d.source){ set("src_file", d.source.file||""); set("src_loc", d.source.loc||""); set("src_quote", d.source.quote||""); }
  if (d.event_type && f.elements.event_type) f.elements.event_type.value = d.event_type;
  if (d.theme && f.elements.theme) f.elements.theme.value = d.theme;
  set("affected_facts", (d.affected_facts||[]).map(x => [x.ref,x.before,x.after,x.evidence].map(v=>String(v||"").replace(/\|/g,"/")).join(" | ")).join("\n"));
  set("affected_actions", (d.affected_actions||[]).map(x => [x.ref,x.change,x.evidence].map(v=>String(v||"").replace(/\|/g,"/")).join(" | ")).join("\n"));
  set("new_actions", (d.new_actions||[]).map(x => [x.id,x.title,x.owner,x.due,x.evidence].map(v=>String(v||"").replace(/\|/g,"/")).join(" | ")).join("\n"));
}

/* ---------- recherche de passages (pour les questions) ---------- */
const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const STOP = new Set("projet nova boreal demo aujourd hui demain matin actuellement actuel actuelle maintenant devrais devrait savoir faut le la les un une des du de d l et ou a au aux en dans sur pour par avec sans que qui quoi dont est sont etait ete etre il elle ils elles on nous vous je tu ce cet cette ces se sa son ses leur leurs ne pas plus comme mais donc or ni car si quand quelle quel quels quelles pourquoi comment combien ya y il".split(" "));
function terms(q){ return [...new Set(norm(q).split(/[^a-z0-9]+/).filter(t => t.length>=3 && !STOP.has(t)))]; }
function retrieve(question, k=8){
  const T = terms(question); if (!T.length) return [];
  // document frequency per term over all lines
  const df = {}; let N = 0;
  D.sources.forEach(s => (s.text||"").split("\n").forEach(l => { N++; const nl = norm(l); T.forEach(t => { if (nl.includes(t)) df[t] = (df[t]||0)+1; }); }));
  const idf = t => Math.log(1 + N / (1 + (df[t]||0)));
  const hits = [];
  D.sources.forEach(s => {
    const meta = D.source_meta[s.id]||{}; if (["hors sujet","doublon","consigne","inventaire"].includes(meta.role)) return;
    const lines = (s.text||"").split("\n");
    lines.forEach((l,i) => { const nl = norm(l); let sc = 0; T.forEach(t => { if (nl.includes(t)) sc += idf(t); }); if (sc>0) hits.push({s, i, sc}); });
  });
  hits.sort((a,b) => b.sc - a.sc);
  const out = [], seen = new Set();
  for (const h of hits){ const all = h.s.text.split("\n"); const whole = (h.s.kind==="xlsx" || all.length<=14); const key = whole ? h.s.id : h.s.id + ":" + Math.floor(h.i/3); if (seen.has(key)) continue; seen.add(key); const a = whole ? 0 : Math.max(0,h.i-2), b = whole ? all.length-1 : Math.min(all.length-1, h.i+2); const mm = D.source_meta[h.s.id]||{}; out.push({id:h.s.id, path:h.s.path, role:mm.role||"", authority:mm.authority||"", from:a+1, to:b+1, text:all.slice(a,b+1).map((l,j)=>`${a+1+j}: ${l}`).join("\n")}); if (out.length>=k) break; }
  // memory entries
  const mem = [];
  D.questions.forEach(q => { const t = norm(q.question+" "+q.answer); const sc = T.reduce((acc,x)=>acc+(t.includes(x)?1:0),0); if (sc>=Math.max(1,Math.ceil(T.length/3))) mem.push({id:q.id, text:`${q.id} ${q.question}\n→ ${q.answer}`, sc}); });
  D.decisions.forEach(d => { const t = norm(d.title+" "+d.why+" "+d.conditions); const sc = T.reduce((acc,x)=>acc+(t.includes(x)?1:0),0); if (sc>=Math.max(1,Math.ceil(T.length/3))) mem.push({id:d.id, text:`${d.id} ${d.title} [${d.status}] : ${d.why} ${d.conditions||""}`, sc}); });
  D.actions.forEach(a => { const t = norm(a.title+" "+a.owner+" "+a.note); const sc = T.reduce((acc,x)=>acc+(t.includes(x)?1:0),0); if (sc>=Math.max(1,Math.ceil(T.length/3))) mem.push({id:a.id, text:`${a.id} ${a.title} | ${a.owner} (${a.owner_status}) | ${a.due}`, sc}); });
  D.contradictions.forEach(c => { const t = norm(c.title+" "+c.resolution); const sc = T.reduce((acc,x)=>acc+(t.includes(x)?1:0),0); if (sc>=Math.max(1,Math.ceil(T.length/3))) mem.push({id:c.id, text:`${c.id} ${c.title} : ${c.resolution}`, sc}); });
  mem.sort((a,b)=>b.sc-a.sc);
  return {passages: out, memory: mem.slice(0,3).map(m => Object.assign({}, m, {text: m.text.slice(0,900)}))};
}
async function answer(question){
  const R = retrieve(question);
  const brief = D.brief.sections.map(sec => sec.items.map(it => `- [${sec.h}] ${it}`).join("\n")).join("\n");
  const ctx = ["FAITS CLÉS VÉRIFIÉS (baseline au " + D.reference_date_label + "). Ils l'emportent sur tout extrait plus ancien ou écrit par quelqu'un qui n'a pas le pouvoir de décider :", brief, "\nEXTRAITS DES FICHIERS (numéro de ligne devant chaque ligne; la note [lecture : …] dit si la source est ancienne, périmée ou sans pouvoir) :", ...R.passages.map(p => `### ${p.path} (lignes ${p.from} à ${p.to}) [lecture : ${p.role}. ${p.authority}]\n${p.text}`), "\nENTRÉES DE LA MÉMOIRE VÉRIFIÉE :", ...R.memory.map(m => m.text)].join("\n\n");
  const system = "Tu réponds à des questions sur le projet NOVA en t'appuyant UNIQUEMENT sur les faits clés vérifiés et les extraits fournis. Tu réponds par un objet JSON : {\"reponse\": \"texte en français simple, phrases courtes\", \"sources\": [{\"fichier\": \"chemin exact tel qu'écrit dans les extraits, ou le code court cité dans les faits clés (E09, M04, M06, ADR-007…)\", \"ligne\": numéro}], \"incertitude\": \"ce que les extraits ne disent pas\"}.\n" + RULES + "\n7. Pour une question large (risques, reprise du projet, décisions, état du projet), pars des FAITS CLÉS VÉRIFIÉS, puis complète avec les extraits. Un problème fermé n'est plus un risque. Un document ancien (charte, plan v2, courriel de juillet) ne donne pas l'état actuel.\nSi rien ne permet de répondre, écris-le clairement dans « reponse ». Date de référence : " + D.reference_date_label + ".";
  const user = `QUESTION : ${question}\n\n${ctx}`;
  const txt = await callModel(system, user, true);
  const j = parseJson(txt);
  return {j, R};
}

/* ---------- interface ---------- */
function settingsHtml(){
  const c = cfg();
  return `<details class="iacfg"><summary>Réglages du modèle local</summary><div class="grid2" style="margin-top:6px">
    <div><label>Type de serveur</label><select class="ia_kind"><option value="ollama" ${c.kind==="ollama"?"selected":""}>Ollama (http://localhost:11434)</option><option value="openai" ${c.kind==="openai"?"selected":""}>Compatible OpenAI : LM Studio, llama.cpp (http://localhost:1234)</option></select></div>
    <div><label>Adresse</label><input class="ia_url" value="${esc(c.url)}"></div>
    <div><label>Modèle</label><input class="ia_model" value="${esc(c.model)}" placeholder="qwen2.5:7b, llama3.1:8b, mistral…"></div>
    <div><label>Taille de contexte (Ollama)</label><input class="ia_ctx" value="${esc(c.ctx)}"></div></div>
    <button type="button" class="btn sec ia_save">Enregistrer</button> <button type="button" class="btn sec ia_test">Tester la connexion</button> <span class="ia_status small muted"></span>
    <p class="small muted">Tout reste sur cet ordinateur : aucune donnée ne sort. <b>Si le test échoue (« Load failed », « Failed to fetch »)</b> : la page est sans doute ouverte en file:// (double-clic), ce que Safari et Ollama bloquent. Ouvrez-la plutôt avec <code>Ouvrir_avec_serveur_local.command</code> (à côté de index.html) : elle s'affiche sur http://localhost:8765 et Ollama l'accepte sans réglage. Autre solution : quitter l'application Ollama de la barre de menu, puis dans un terminal <code>OLLAMA_ORIGINS="*" ollama serve</code>. Si rien ne répond, la fiche se remplit avec l'aide rapide : le reste du rendu ne dépend pas du modèle.</p></details>`;
}
function wireSettings(root){
  $(".ia_save", root).onclick = () => { saveCfg({kind:$(".ia_kind",root).value, url:$(".ia_url",root).value.trim(), model:$(".ia_model",root).value.trim(), ctx:+$(".ia_ctx",root).value||12288}); $(".ia_status",root).textContent = "Réglages enregistrés."; };
  $(".ia_test", root).onclick = async () => { saveCfg({kind:$(".ia_kind",root).value, url:$(".ia_url",root).value.trim(), model:$(".ia_model",root).value.trim(), ctx:+$(".ia_ctx",root).value||12288}); $(".ia_status",root).textContent = "Test…"; const p = await ping(); $(".ia_status",root).textContent = p.ok ? ("Connecté. Modèles disponibles : " + (p.names.join(", ")||"aucun")) : ("Pas de réponse (" + p.error + "). Vérifiez que le serveur tourne et que OLLAMA_ORIGINS est réglé."); };
}
function renderAssistantTab(){
  const el = $("#tab-assistant"); if (!el) return;
  el.innerHTML = `<h2>Assistant IA local (optionnel)</h2>
  <div class="card"><p><b>Sur une machine sans GPU, comptez 2 à 3 minutes par réponse : préparez vos questions avant la démonstration.</b> Posez une question en langage naturel. L'assistant cherche d'abord les passages pertinents dans les 64 fichiers et dans la mémoire vérifiée, puis un modèle qui tourne <b>sur cet ordinateur</b> rédige la réponse en citant fichier et ligne. Les citations sont cliquables : vérifiez toujours la source. Sans modèle local, utilisez la barre de recherche et l'onglet Questions.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><input id="ia_q" style="flex:1;min-width:260px;font:inherit;padding:7px 9px;border:1px solid var(--line);border-radius:5px" placeholder="ex. Quelle est la date de livraison prévue et pourquoi? Quels engagements ne sont pas terminés?"><button class="btn" id="ia_ask">Demander</button></div>
  <div id="ia_out" style="margin-top:10px"></div>
  ${settingsHtml()}</div>`;
  wireSettings(el);
  const run = async () => {
    const q = $("#ia_q", el).value.trim(); if (!q) return;
    const out = $("#ia_out", el); out.innerHTML = `<p class="muted">Recherche des passages, puis appel du modèle local… (30 s à 3 minutes sans GPU)</p>`;
    try {
      const {j, R} = await answer(q);
      const chips = (j.sources||[]).map(s => { const f = String(s.fichier||"").trim(); const src = D.sources.find(x => x.path===f || x.file===f || x.id===f) || D.sources.find(x => f && (x.id.toLowerCase().startsWith(f.toLowerCase()) || x.file.toLowerCase().startsWith(f.toLowerCase()))); const ln = +s.ligne||0; return src ? `<a class="ev" href="#src=${esc(src.id)}&l=${ln}-${ln}" data-src="${esc(src.id)}" data-a="${ln}" data-b="${ln}">${esc(src.file)}${ln?` · l. ${ln}`:""}</a>` : `<span class="ev" title="fichier non reconnu">${esc(s.fichier||"?")}</span>`; }).join(" ");
      out.innerHTML = `<div class="upd-box"><h3>Réponse (brouillon du modèle local, à vérifier)</h3><p>${esc(j.reponse||"")}</p><p><b>Sources citées :</b> ${chips||"<span class='muted'>aucune</span>"}</p><p class="small"><b>Ce que les extraits ne disent pas :</b> ${esc(j.incertitude||"")}</p></div>
      <details><summary>Passages fournis au modèle (${R.passages.length} extraits, ${R.memory.length} entrées de mémoire)</summary>${R.passages.map(p => `<div class="hit"><a class="ev" href="#" data-src="${esc(p.id)}" data-a="${p.from}" data-b="${p.to}">${esc(p.path)} · l. ${p.from} à ${p.to}</a></div>`).join("")}</details>`;
    } catch(e){ out.innerHTML = `<p class="small" style="color:var(--bad)">Impossible d'obtenir une réponse : ${esc(e.message)}. Le modèle local ne répond pas, ou le format est inattendu. Vous pouvez utiliser la recherche (barre en haut) et l'onglet Questions.</p>`; }
  };
  $("#ia_ask", el).onclick = run; $("#ia_q", el).addEventListener("keydown", e => { if (e.key==="Enter") run(); });
}
function renderPrefill(){
  const form = $("#updform"); if (!form || $("#ia_prefill")) return;
  const box = document.createElement("div"); box.className = "card"; box.id = "ia_prefill";
  box.innerHTML = `<h3>Brouillon par le modèle local (optionnel, lent)</h3><p class="small">Utilisez d'abord l'aide rapide ci-dessus. Le modèle local peut ensuite proposer un brouillon, mais il met plusieurs minutes sans GPU et il se trompe souvent sur qui a le pouvoir de décider (il peut « fermer » un ticket que personne n'a validé). <b>Vérifiez chaque ligne avant d'enregistrer.</b></p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input type="file" id="ia_file" accept=".eml,.txt,.md,.csv"> <input id="ia_fname" placeholder="nom du fichier (ex. 09_Evenement/E13.eml)" style="flex:1;min-width:220px;font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:5px"></div>
  <textarea id="ia_text" style="width:100%;min-height:140px;font:inherit;font-size:13px;margin-top:8px;padding:6px 8px;border:1px solid var(--line);border-radius:5px" placeholder="Texte du document reçu…"></textarea>
  <button type="button" class="btn" id="ia_go">Proposer un brouillon</button> <span id="ia_pstatus" class="small muted"></span>
  <div id="ia_flags"></div>${settingsHtml()}`;
  form.parentNode.insertBefore(box, form);
  wireSettings(box);
  $("#ia_file", box).onchange = e => { const f = e.target.files[0]; if (!f) return; $("#ia_fname", box).value = "09_Evenement/" + f.name; const rd = new FileReader(); rd.onload = () => { let t = rd.result; if (/^From:|^Subject:/m.test(t)) { /* .eml : garder en-têtes utiles + corps */ t = t.replace(/\r/g,""); } $("#ia_text", box).value = t; }; rd.readAsText(f, "utf-8"); };
  $("#ia_go", box).onclick = async () => {
    const text = $("#ia_text", box).value.trim(); if (!text){ $("#ia_pstatus", box).textContent = "Collez d'abord le texte."; return; }
    $("#ia_pstatus", box).textContent = "Appel du modèle local… (1 à 5 minutes sans GPU; la première fois, le modèle doit se charger)"; $("#ia_flags", box).innerHTML = "";
    try {
      const d = await draftUpdate(text, $("#ia_fname", box).value.trim());
      fillForm(d);
      const flags = validateDraft(d, text);
      $("#ia_pstatus", box).textContent = "Brouillon placé dans le formulaire. Vérifiez, corrigez, puis enregistrez.";
      $("#ia_flags", box).innerHTML = `<div class="upd-box"><h3>Brouillon IA : à vérifier avant d'enregistrer</h3>${flags.length ? `<p><b>Points à contrôler (${flags.length}) :</b></p><ul class="tight">${flags.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>` : `<p>Aucun problème de forme détecté. Relisez quand même le fond : qui décide, livré ou validé, proposition ou décision.</p>`}</div>`;
      form.scrollIntoView({block:"start"});
    } catch(e){ $("#ia_pstatus", box).textContent = ""; $("#ia_flags", box).innerHTML = `<p class="small" style="color:var(--bad)">Pas de brouillon : ${esc(e.message)}. Remplissez la fiche à la main (les cinq champs essentiels : résumé, statut du problème, décision antérieure, nouvelle proposition, ce qui ne change pas).</p>`; }
  };
}
// hooks: the main app re-renders tabs; observe and (re)inject
renderAssistantTab();
const obs = new MutationObserver(() => { if ($("#updform") && !$("#ia_prefill")) renderPrefill(); if ($("#tab-assistant") && !$("#ia_q")) renderAssistantTab(); });
obs.observe(document.querySelector("main"), {childList:true, subtree:true});
renderPrefill();
window.NOVA_IA = {retrieve, answer, draftUpdate, validateDraft, cfg};
})();
