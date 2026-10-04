/* NOVA Mémoire 360 : aide à la fiche d'événement, SANS modèle d'IA.
   Règles fixes : qui a le pouvoir de valider quoi, ce qui reste ouvert, quels identifiants sont touchés.
   Le texte reçu est analysé par mots-clés; l'humain vérifie les cases, puis la fiche est générée. */
(function(){
const D = window.NOVA;
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");

/* ---------- connaissances fixes (issues du baseline) ---------- */
const SPEAKERS = [
  {id:"boreal", label:"Boréal / Julien Moreau (fournisseur)", keys:["boreal","julien","moreau"], power:"ne décide rien côté client : il livre, il propose, il demande"},
  {id:"nicolas", label:"Nicolas Perron (chargé de projet)", keys:["nicolas","perron"], power:"décide de la portée, des plans et des communications; convoque le comité pour la date"},
  {id:"sophie", label:"Sophie Lambert (sécurité)", keys:["sophie","lambert"], power:"seule à accepter ou refuser SEC-210 (condition 1)"},
  {id:"melissa", label:"Mélissa Gagnon (QA, accessibilité)", keys:["melissa","gagnon"], power:"seule à fermer ACC-303 (condition 2)"},
  {id:"olivier", label:"Olivier Côté (exploitation)", keys:["olivier","cote"], power:"seul à approuver le runbook et donner le go exploitation (condition 3)"},
  {id:"amelie", label:"Amélie Fortin (Finances)", keys:["amelie","fortin","finances"], power:"libère ou retient les paiements; ne décide pas de la portée"},
  {id:"alex", label:"Alex Deschamps (communications)", keys:["alex","deschamps"], power:"rédige les messages; ne décide rien"},
  {id:"comite", label:"Comité de direction", keys:["comite de direction","comite"], power:"seul à changer la date de mise en production ou à lever les conditions"},
  {id:"elodie", label:"Élodie Caron (ancienne chargée de projet)", keys:["elodie","caron"], power:"n'est plus responsable depuis le 16 sept."},
  {id:"marc", label:"Marc Gervais (architecture)", keys:["marc","gervais"], power:"valide le connecteur et l'architecture"},
  {id:"camille", label:"Camille Beaulieu (données)", keys:["camille","beaulieu"], power:"valide la migration des données"},
  {id:"autre", label:"Autre ou inconnu", keys:[], power:"à établir : sans rôle documenté, aucun pouvoir de décision"},
];
const NATURES = [
  {id:"livraison", label:"Livraison : un correctif, une build, un document est livré ou déployé", keys:["livr","deploy","deploi","build","correctif","fix ","patch","envoy"]},
  {id:"proposition", label:"Proposition ou demande : quelqu'un propose, recommande, demande", keys:["propos","recommand","sugger","demand","merci de","souhait"]},
  {id:"validation", label:"Validation : une personne habilitée accepte, approuve, ferme", keys:["accept","approuv","valid","ferme ","fermé","go "]},
  {id:"decision", label:"Décision : une instance habilitée tranche (comité, chargé de projet)", keys:["decid","decision","tranch","officiel"]},
  {id:"fait", label:"Fait ou constat : un test échoue, un problème persiste, une information", keys:["echou","echec","toujours","persist","constat","probleme","erreur","ne passe pas"]},
  {id:"communication", label:"Communication : un message envoyé ou à envoyer", keys:["communication","message","annonce","infolettre"]},
];
const TOPICS = {
  sec:   {label:"SEC-210 (sécurité, condition 1)", keys:["sec-210","sec210","journalisation","audit","export csv","securite"], validator:"Sophie Lambert", cond:1, refs:["Q08","C-03","A-01"], baseline:"SEC-210 EN VALIDATION : correctif livré par Boréal le 19 sept., acceptation sécurité non donnée (re-test prévu, sans date)."},
  acc:   {label:"ACC-303 (accessibilité, condition 2)", keys:["acc-303","acc303","clavier","focus","modale","modal","enregistrer","accessibilit"], validator:"Mélissa Gagnon", cond:2, refs:["Q09","C-04","A-02","A-03"], baseline:"ACC-303 OUVERT : correctif promis pour la « prochaine build »; Tab n'atteint pas « Enregistrer »."},
  run:   {label:"Runbook et retour arrière (exploitation, condition 3)", keys:["runbook","rollback","retour arriere","ops-601","exploitation","post-deploiement"], validator:"Olivier Côté", cond:3, refs:["Q10","A-04","A-05"], baseline:"Runbook pas final : étape 4 (retour arrière) TODO, étape 5 (validation après déploiement) à compléter; version finale pas reçue le 29 sept."},
  date:  {label:"Date de mise en production", keys:["22 octobre","15 octobre","29 octobre","octobre","date ferme","mise en production","go-live","golive","report","echeance","calendrier"], validator:"comité de direction", cond:null, refs:["Q01","Q03","D-01","D-07"], baseline:"22 octobre 2026, approuvé par le comité de direction le 10 sept., sous les trois conditions du 26 sept. Pas un go garanti."},
  fin:   {label:"Factures et budget (INV-003, CR-04, 18 000 $)", keys:["inv-003","inv003","facture","18 000","18000","cr-04","cr04","jalon","paiement","liberer","note de credit","budget","montant"], validator:"Amélie Fortin (Finances) avec Nicolas Perron", cond:null, refs:["Q05","Q06","C-07","A-06"], baseline:"INV-003 (54 000 $) retenue : la ligne CR-04 de 18 000 $ n'est pas approuvée; jalon 3 (36 000 $) à payer après preuve de livraison. Autorisé 204 000 $, facturé 186 000 $, payé 132 000 $."},
  scope: {label:"Portée (mobile avancé, phase 2)", keys:["mobile","portee","phase 2","scope","optimisation"], validator:"Nicolas Perron", cond:null, refs:["D-05","C-05","A-12"], baseline:"CR-04 (mobile avancé) hors phase 1, reporté en phase 2 (24 sept.); aucune dépense sans nouvelle approbation."},
  resp:  {label:"Responsable du projet", keys:["charge de projet","chargee de projet","responsable","transition","remplace"], validator:"annonce officielle", cond:null, refs:["Q04","D-06"], baseline:"Nicolas Perron, chargé de projet depuis le 16 sept. 2026."},
  int:   {label:"Connecteur interne (INT-101) et registre de risques", keys:["int-101","connecteur","jeton"," 401","r-01","registre de risques","registre des risques"], validator:"Marc Gervais", cond:null, refs:["Q02","C-02","A-08"], baseline:"INT-101 fermé le 17 sept.; le registre de risques R-01 est périmé (encore « ouvert »)."},
  comm:  {label:"Communication de statut (« au vert »)", keys:["au vert","statut","communiqu","rapport de statut"], validator:"Nicolas Perron", cond:null, refs:["C-03","C-04","A-09","A-10"], baseline:"Brouillon d'Alex « NOVA au vert » à corriger; rapport du 21 sept. faux sur sécurité et accessibilité."},
};
const CONDS = {1:"condition 1 (acceptation sécurité SEC-210 par Sophie Lambert)", 2:"condition 2 (fermeture de ACC-303 par Mélissa Gagnon)", 3:"condition 3 (approbation du runbook avec retour arrière par Olivier Côté)"};

/* ---------- analyse par mots-clés ---------- */
function analyse(text){
  const t = norm(text);
  const body = text.replace(/\r/g,"").split("\n");
  // expéditeur : ligne From: ou premier nom cité
  let speaker = "autre";
  const from = body.find(l => /^from:/i.test(l)) || "";
  const nf = norm(from);
  for (const s of SPEAKERS){ if (s.keys.some(k => nf.includes(k))) { speaker = s.id; break; } }
  if (speaker==="autre"){ for (const s of SPEAKERS){ if (s.keys.length && s.keys.some(k => t.includes(k))) { speaker = s.id; break; } } }
  const natures = NATURES.map(n => ({id:n.id, score:n.keys.filter(k => t.includes(k)).length})).filter(x => x.score>0).sort((a,b)=>b.score-a.score);
  let nature = natures.length ? natures[0].id : "fait";
  const hasProposal = /propos|recommand|sugger|demand|merci de|souhait/.test(t);
  const claimsClosed = /regle|reglee|réglé|resolu|termine|conforme|ferme|ok de notre cote|nos tests passent|tests passent|complet/.test(t);
  const topics = Object.keys(TOPICS).filter(k => TOPICS[k].keys.some(kw => t.includes(kw)));
  // date fictive
  const dm = text.match(/(\d{1,2})\s+(janv|f[ée]v|mars|avr|mai|juin|juil|ao[uû]t|sept|oct|nov|d[ée]c)[a-zé]*\.?\s+(2026)/i) || text.match(/Date:\s*\w+,\s*(\d{1,2})\s+(\w{3})\s+(\d{4})/i);
  const months = {janv:"01",fev:"02",mars:"03",avr:"04",mai:"05",juin:"06",juil:"07",aout:"08",sept:"09",oct:"10",nov:"11",dec:"12",jan:"01",feb:"02",mar:"03",apr:"04",may:"05",jun:"06",jul:"07",aug:"08",sep:"09",dec_:"12"};
  let event_date = "";
  if (dm){ const mkey = norm(dm[2]).slice(0,4).replace(/\.$/,""); const mm = months[mkey] || months[mkey.slice(0,3)] || ""; if (mm) event_date = `${dm[3]}-${mm}-${String(dm[1]).padStart(2,"0")}`; }
  // citation : lignes du corps (hors en-têtes) les plus « chargées »
  const lines = body.map((l,i)=>({l:l.trim(), n:i+1})).filter(x => x.l && !/^(from|to|cc|date|subject|message-id|content-type):/i.test(x.l) && !/^\(?exemple/i.test(x.l));
  const scored = lines.map(x => ({...x, s: Object.values(TOPICS).reduce((a,tp)=>a+tp.keys.filter(k=>norm(x.l).includes(k)).length,0) + (/propos|livr|deploy|valid|accept|approuv|echou/.test(norm(x.l))?1:0)})).sort((a,b)=>b.s-a.s).slice(0,3).sort((a,b)=>a.n-b.n);
  return {speaker, nature, hasProposal, claimsClosed, topics, event_date, quoteLines: scored};
}

/* ---------- génération de la fiche (règles) ---------- */
function statusFor(k, a){
  const T = TOPICS[k]; const sp = a.speaker; const nat = a.nature;
  const isValidator = (k==="sec"&&sp==="sophie")||(k==="acc"&&sp==="melissa")||(k==="run"&&sp==="olivier")||(k==="date"&&sp==="comite")||(k==="fin"&&(sp==="amelie"||sp==="nicolas"))||(k==="scope"&&(sp==="nicolas"||sp==="comite"))||(k==="int"&&sp==="marc");
  if (k==="date"){
    if (sp==="comite" && nat==="decision") return "Nouvelle décision du comité de direction sur la date : À COMPLÉTER (date, heure, qui était présent). Mettre à jour D-01, le plan et les communications.";
    return "Le 22 octobre reste la date approuvée (comité du 10 sept.), toujours sous les trois conditions. Une autre date, ou une date « ferme », n'est qu'une proposition tant que le comité de direction n'a pas décidé.";
  }
  if (k==="fin") return "INV-003 : la ligne CR-04 (18 000 $) reste non approuvée tant qu'aucune demande de changement approuvée n'existe. Le jalon 3 (36 000 $) se paie après preuve de livraison côté client. À COMPLÉTER avec ce que dit le document (facture corrigée? note de crédit? demande de paiement?).";
  if (k==="scope") return "CR-04 reste hors phase 1 sauf nouvelle approbation écrite de Nicolas Perron ou du comité. À COMPLÉTER.";
  if (k==="resp") return "Un changement de responsable vaut à partir de la date de l'annonce officielle. À COMPLÉTER (qui, depuis quand, annoncé par qui).";
  if (k==="int") return "INT-101 est fermé depuis le 17 sept. Si le document rouvre un problème de connecteur : nouveau ticket, propriétaire Marc Gervais. À COMPLÉTER.";
  if (k==="comm") return "Toute communication doit présenter le 22 octobre comme une cible sous conditions, sans « au vert ». À COMPLÉTER (message envoyé ou brouillon?).";
  const name = k==="sec"?"SEC-210":k==="acc"?"ACC-303":"le runbook (OPS-601)";
  if (isValidator && nat==="validation") return `${name} : VALIDÉ par ${T.validator} (personne habilitée). La ${CONDS[T.cond]} est remplie. Les deux autres conditions restent ouvertes.`;
  if (isValidator && nat==="fait") return `${name} : constat de ${T.validator} (personne habilitée). À COMPLÉTER : test échoué? défaut toujours présent? Le ticket reste ouvert, la condition ${T.cond} reste ouverte.`;
  if (sp==="boreal" && (nat==="livraison"||nat==="proposition"||nat==="communication")) return `${name} : correctif ou document LIVRÉ ou ANNONCÉ par Boréal (tests du fournisseur). Le ticket reste OUVERT et la ${CONDS[T.cond]} reste ouverte tant que ${T.validator} n'a pas retesté et validé. À COMPLÉTER : livré ou seulement annoncé? dans quelle build?`;
  return `${name} : ${T.baseline} À COMPLÉTER avec ce que dit le document; seule ${T.validator} peut fermer la condition ${T.cond}.`;
}
function generate(a, fileName, text){
  const sp = SPEAKERS.find(s => s.id===a.speaker) || SPEAKERS[SPEAKERS.length-1];
  const topics = a.topics.length ? a.topics : ["date"];
  const touchedConds = new Set(topics.map(k => TOPICS[k].cond).filter(Boolean));
  const validatedConds = new Set(topics.filter(k => TOPICS[k].cond && a.nature==="validation" && ((k==="sec"&&a.speaker==="sophie")||(k==="acc"&&a.speaker==="melissa")||(k==="run"&&a.speaker==="olivier"))).map(k => TOPICS[k].cond));
  const natLabel = (NATURES.find(n=>n.id===a.nature)||{}).label.split(" :")[0].toLowerCase();
  const topicLabels = topics.map(k => TOPICS[k].label.split(" (")[0]).join(", ");
  const quote = a.quoteLines.map(x => x.l).join(" […] ");
  const loc = a.quoteLines.length ? `lignes ${a.quoteLines.map(x=>x.n).join(", ")}` : "repère à préciser";
  const summary = `${sp.label.split(" (")[0]} : ${natLabel} concernant ${topicLabels}${a.hasProposal?"; le document contient une proposition ou une demande":""}. À REFORMULER en une phrase factuelle.`;
  const problem_status = topics.map(k => statusFor(k, a)).join("\n");
  const prior_decision = "22 octobre approuvé par le comité de direction le 10 sept. (M04 15:25), sous les trois conditions du 26 sept. (M06 10:09). Nicolas Perron est chargé de projet depuis le 16 sept. INV-003 : 18 000 $ (CR-04) non approuvés. Ces décisions tiennent tant qu'une personne ou une instance habilitée ne les a pas changées par écrit.";
  let new_proposal = "aucune";
  if (a.hasProposal || a.nature==="proposition"){
    const who = sp.label.split(" (")[0];
    const can = topics.map(k => `${TOPICS[k].label.split(" (")[0]} : ${TOPICS[k].validator}`).join("; ");
    new_proposal = `${who} propose ou demande : À COMPLÉTER (citer la phrase). NON approuvée : ${who} ${sp.power}. Qui peut trancher : ${can}.`;
  }
  if (a.claimsClosed && a.speaker==="boreal") new_proposal += (new_proposal==="aucune" ? "" : " ") + "Boréal affirme qu'un point est réglé : ce n'est pas une validation; aucune condition n'est fermée par le fournisseur.";
  const ev = `${fileName||"09_Evenement/<fichier>"}, ${loc}`;
  const affected_facts = [];
  topics.forEach(k => { affected_facts.push(`${TOPICS[k].refs.filter(r=>!r.startsWith("A-")).join(" ")} | ${TOPICS[k].baseline} | À COMPLÉTER : ce qui change d'après le document (et ce qui ne change pas) | ${ev}`); });
  const affected_actions = [];
  topics.forEach(k => TOPICS[k].refs.filter(r=>r.startsWith("A-")).forEach(r => { const act = D.actions.find(x=>x.id===r); affected_actions.push(`${r} | À COMPLÉTER : ${act? act.title.slice(0,70):""}… (faite? modifiée? date précisée?) | ${ev}`); }));
  const new_actions = [];
  let n = 14;
  if (a.hasProposal || a.nature==="proposition") new_actions.push(`A-${n++} | Répondre à ${sp.label.split(" (")[0]} : rappeler la décision en vigueur et qui peut trancher; convoquer le comité si la date est en jeu | Nicolas Perron (proposé) | À confirmer | ${ev}`);
  topics.filter(k => TOPICS[k].cond && !validatedConds.has(TOPICS[k].cond) && a.speaker==="boreal").forEach(k => new_actions.push(`A-${n++} | Retester et valider ${TOPICS[k].label.split(" (")[0]} côté client | ${TOPICS[k].validator} (confirmé : personne habilitée) | À confirmer | ${ev}`));
  if (topics.includes("fin")) new_actions.push(`A-${n++} | Vérifier la preuve de livraison du jalon 3 avant tout paiement; maintenir le refus des 18 000 $ CR-04 | Nicolas Perron avec Amélie Fortin (proposé) | À confirmer | ${ev}`);
  const openConds = [1,2,3].filter(c => !validatedConds.has(c)).map(c => CONDS[c]);
  const unchanged = [
    openConds.length ? `Conditions de go-live toujours ouvertes : ${openConds.join("; ")}.` : "Les trois conditions sont remplies d'après des personnes habilitées : vérifier chaque preuve.",
    validatedConds.size ? `Condition(s) remplie(s) par une personne habilitée : ${[...validatedConds].map(c=>c).join(", ")}. Cela ne lève pas les autres.` : "",
    "Le 22 octobre reste une cible sous conditions tant que le comité de direction n'a pas décidé autrement; aucune approbation n'est inventée.",
    topics.includes("fin") ? "" : "INV-003 : les 18 000 $ de CR-04 restent refusés.",
    "Le baseline du 30 sept. est conservé tel quel.",
  ].filter(Boolean).join(" ");
  const uncertainty = "À COMPLÉTER : ce que le document ne dit pas (dates, preuves, résultat d'un test, contenu exact d'un livrable).";
  return {event_date:a.event_date, event_type:a.nature, theme: topics[0]==="sec"?"sécurité":topics[0]==="acc"?"accessibilité":topics[0]==="run"?"exploitation":topics[0]==="fin"?"finances":topics[0]==="scope"?"portée":topics[0]==="date"?"échéancier":"gouvernance", source:{file:fileName||"", loc, quote}, summary, problem_status, prior_decision, new_proposal, affected_facts, affected_actions, new_actions, unchanged, uncertainty};
}
function fill(g){
  const f = $("#updform"); if (!f) return;
  const set = (n,v) => { if (f.elements[n] && v!=null) f.elements[n].value = v; };
  set("event_date", g.event_date); set("summary", g.summary); set("problem_status", g.problem_status); set("prior_decision", g.prior_decision); set("new_proposal", g.new_proposal); set("unchanged", g.unchanged); set("uncertainty", g.uncertainty);
  set("src_file", g.source.file); set("src_loc", g.source.loc); set("src_quote", g.source.quote);
  if (f.elements.event_type) f.elements.event_type.value = g.event_type; if (f.elements.theme) f.elements.theme.value = g.theme;
  set("affected_facts", g.affected_facts.join("\n")); set("affected_actions", g.affected_actions.join("\n")); set("new_actions", g.new_actions.join("\n"));
}

/* ---------- interface ---------- */
function render(){
  const form = $("#updform"); if (!form || $("#aide_box")) return;
  const box = document.createElement("div"); box.className = "card"; box.id = "aide_box";
  box.innerHTML = `<h3>Aide rapide à la fiche (règles fixes, sans IA, instantané)</h3>
  <p class="small">1) Collez le texte reçu (ou choisissez le fichier). 2) Vérifiez ce que l'outil a reconnu : qui parle, quelle nature, quels sujets. 3) Générez : la fiche se remplit avec la bonne règle pour chaque sujet (qui peut valider, ce qui reste ouvert, identifiants touchés). Les passages marqués <b>À COMPLÉTER</b> sont les seuls à écrire à la main.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input type="file" id="aide_file" accept=".eml,.txt,.md,.csv"> <input id="aide_fname" placeholder="nom du fichier (ex. 09_Evenement/E13.eml)" style="flex:1;min-width:220px;font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:5px"></div>
  <textarea id="aide_text" style="width:100%;min-height:120px;font:inherit;font-size:13px;margin-top:8px;padding:6px 8px;border:1px solid var(--line);border-radius:5px" placeholder="Texte du document reçu…"></textarea>
  <button type="button" class="btn" id="aide_analyse">1. Analyser le texte</button>
  <div id="aide_ctrl" class="hidden" style="margin-top:8px"></div>`;
  form.parentNode.insertBefore(box, form);
  $("#aide_file", box).onchange = e => { const f = e.target.files[0]; if (!f) return; $("#aide_fname", box).value = "09_Evenement/" + f.name; const rd = new FileReader(); rd.onload = () => { $("#aide_text", box).value = rd.result; const ia = $("#ia_text"); if (ia) ia.value = rd.result; const iaf = $("#ia_fname"); if (iaf) iaf.value = "09_Evenement/" + f.name; }; rd.readAsText(f, "utf-8"); };
  $("#aide_analyse", box).onclick = () => {
    const text = $("#aide_text", box).value; if (!text.trim()) { alert("Collez d'abord le texte."); return; }
    const a = analyse(text);
    const ctrl = $("#aide_ctrl", box); ctrl.classList.remove("hidden");
    ctrl.innerHTML = `<div class="grid2">
      <div><label class="small"><b>Qui parle?</b></label><select id="aide_speaker" style="width:100%;font:inherit;padding:5px">${SPEAKERS.map(s => `<option value="${s.id}" ${s.id===a.speaker?"selected":""}>${esc(s.label)}</option>`).join("")}</select><div class="small muted" id="aide_power"></div></div>
      <div><label class="small"><b>Nature du document</b></label><select id="aide_nature" style="width:100%;font:inherit;padding:5px">${NATURES.map(n => `<option value="${n.id}" ${n.id===a.nature?"selected":""}>${esc(n.label)}</option>`).join("")}</select>
        <label class="small" style="display:block;margin-top:6px"><input type="checkbox" id="aide_prop" ${a.hasProposal?"checked":""}> Le document contient une proposition ou une demande</label>
        <label class="small" style="display:block"><input type="checkbox" id="aide_closed" ${a.claimsClosed?"checked":""}> Le document affirme qu'un point est « réglé », « conforme », « OK »</label></div></div>
      <div style="margin-top:8px"><b class="small">Sujets touchés</b><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2px 12px">${Object.keys(TOPICS).map(k => `<label class="small"><input type="checkbox" class="aide_topic" value="${k}" ${a.topics.includes(k)?"checked":""}> ${esc(TOPICS[k].label)} <span class="muted">(valide : ${esc(TOPICS[k].validator)})</span></label>`).join("")}</div></div>
      <div class="small muted" style="margin-top:6px">Date reconnue : ${esc(a.event_date||"aucune, à saisir")} · Citation proposée : ${esc(a.quoteLines.map(x=>"l. "+x.n).join(", ")||"aucune")}</div>
      <button type="button" class="btn" id="aide_gen">2. Générer la fiche dans le formulaire</button>`;
    const showPower = () => { const s = SPEAKERS.find(x=>x.id===$("#aide_speaker",ctrl).value); $("#aide_power",ctrl).textContent = s ? "Pouvoir : " + s.power : ""; };
    showPower(); $("#aide_speaker",ctrl).onchange = showPower;
    $("#aide_gen", ctrl).onclick = () => {
      const a2 = Object.assign({}, a, {speaker:$("#aide_speaker",ctrl).value, nature:$("#aide_nature",ctrl).value, hasProposal:$("#aide_prop",ctrl).checked, claimsClosed:$("#aide_closed",ctrl).checked, topics:$$(".aide_topic:checked",ctrl).map(x=>x.value)});
      fill(generate(a2, $("#aide_fname", box).value.trim(), text));
      const f = $("#updform"); f.scrollIntoView({block:"start"});
      let note = $("#aide_note"); if (!note){ note = document.createElement("div"); note.id = "aide_note"; f.parentNode.insertBefore(note, f); }
      note.innerHTML = `<div class="upd-box"><h3>Fiche générée par les règles : il reste les « À COMPLÉTER »</h3><p class="small">Relisez dans l'ordre : résumé (une phrase), statut du problème, nouvelle proposition, faits et actions touchés. Supprimez ce qui ne s'applique pas. Puis « Enregistrer dans ce navigateur » et « Télécharger updates.js ».</p></div>`;
    };
  };
}
render();
new MutationObserver(() => { if ($("#updform") && !$("#aide_box")) render(); }).observe(document.querySelector("main"), {childList:true, subtree:true});
window.NOVA_AIDE = {analyse, generate};
})();
