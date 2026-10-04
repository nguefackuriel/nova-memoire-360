#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Exports Markdown de la mémoire (brief, réponses, registres, mode d'emploi)."""
import json
from pathlib import Path
OUT = Path("NOVA_Memoire_360")
M = json.load(open(OUT / "nova_memory.json", encoding="utf-8"))
S = {s["id"]: s for s in M["sources"]}
def cite(src, lines=None, loc=None):
    p = S[src]["path"] if src in S else src
    l = ""
    if loc: l = f", {loc}"
    elif lines and lines[0]: l = f", l. {lines[0]}" + (f" à {lines[1]}" if lines[1] and lines[1] != lines[0] else "")
    return f"`{p}`{l}"

# ---------- Brief ----------
B = M["brief"]
md = [f"# {B['title']}", "", f"_{B['asof']}_", ""]
for sec in B["sections"]:
    md.append(f"## {sec['h']}")
    md += [f"- {p}" for p in sec["items"]]
    md.append("")
md.append("## Conditions de go-live : actions, responsables, échéances")
md.append("| # | Condition | Action | Responsable | Échéance | Preuve |")
md.append("|---|---|---|---|---|---|")
names = {1: "Sécurité SEC-210", 2: "Accessibilité ACC-303", 3: "Runbook + rollback"}
for a in M["actions"]:
    if a["condition"]:
        e = a["evidence"][0]
        md.append(f"| {a['condition']} | {names[a['condition']]} | {a['id']} {a['title']} | {a['owner']} ({a['owner_status']}) | {a['due']} | {cite(e[0], [e[1], e[2]], e[3])} |")
md += ["", f"_{B['footer']}_"]
(OUT / "Brief_reprise_NOVA.md").write_text("\n".join(md), encoding="utf-8")

# ---------- Réponses ----------
md = ["# NOVA : réponses aux dix questions (état au 30 septembre 2026, 9 h)", "",
      "Chaque réponse cite un fichier du dossier et un repère précis. Les numéros de ligne renvoient au texte tel qu'il s'affiche dans `index.html` (visualiseur de sources). Pour un .eml, le corps commence à la ligne 7. Pour un .xlsx, la ligne N du tableur est la ligne N+1. Pour un PDF, c'est le texte extrait de la page 1. Pour une capture, c'est la transcription vérifiée.", ""]
for q in M["questions"]:
    md += [f"## {q['id']}. {q['question']}", "", f"**Réponse.** {q['answer']}", "", "**Preuves.**", ""]
    for e in q["evidence"]:
        md.append(f"- {cite(e['src'], e['lines'], e['loc'])} : « {e['quote']} » _({e['note']})_")
    md += ["", "**Nuances et pièges à éviter.**", ""] + [f"- {n}" for n in q["nuance"]]
    md += ["", f"**Sources croisées.** {q['cross']}", "", f"**Ce qu'on ne sait pas.** {q['uncertainty']}", ""]
(OUT / "Reponses_Q01-Q10.md").write_text("\n".join(md), encoding="utf-8")

# ---------- Mémoire (registres) ----------
md = ["# NOVA : mémoire consultable (version texte)", "", "Baseline : 30 septembre 2026, 9 h (Montréal). Version interactive : `index.html`.", ""]
md += ["## 1. Chronologie", "", "| Date | Type | Thème | Événement | Valable au 30 sept. | Source |", "|---|---|---|---|---|---|"]
for t in M["timeline"]:
    md.append(f"| {t['date']} | {t['type']} | {t['theme']} | {t['title']} | {'oui' if t['valid'] else 'ancien'} | {cite(t['src'], t['lines'])} |")
md += ["", "## 2. Décisions (qui propose, qui décide, qui confirme)", ""]
for d in M["decisions"]:
    md += [f"### {d['id']}. {d['title']}", f"_Statut : {d['status']}_", "",
           f"- **Proposition :** {d['proposition']['who']}, {d['proposition']['when']}. Source : {cite(d['proposition']['src'], d['proposition']['lines'])}",
           f"- **Décision :** {d['decision']['who']}, {d['decision']['when']}. Source : {cite(d['decision']['src'], d['decision']['lines'])}",
           f"- **Validation ou confirmation :** {d['validation']['who']}, {d['validation']['when']}. Source : {cite(d['validation']['src'], d['validation']['lines'])}",
           f"- **Pourquoi :** {d['why']}"]
    if d["conditions"]: md.append(f"- **Conditions :** {d['conditions']}")
    if d["docs_to_update"]: md.append(f"- **Documents touchés :** {d['docs_to_update']}")
    md.append("")
md += ["## 3. Contradictions résolues", ""]
for c in M["contradictions"]:
    md += [f"### {c['id']}. {c['title']}" + (" _(plan ou registre)_" if c["in_plan_or_register"] else ""),
           f"- **Version A (écartée) :** {c['a']['claim']}. Source : {cite(c['a']['src'], c['a']['lines'], c['a']['loc'])}",
           f"- **Version B (retenue) :** {c['b']['claim']}. Source : {cite(c['b']['src'], c['b']['lines'], c['b']['loc'])}",
           f"- **Ce qu'on retient (critère : {c['basis']}) :** {c['resolution']}",
           f"- **État au 30 sept. :** {c['status_now']}"]
    if c["extra"]: md.append("- **Autres preuves :** " + "; ".join(cite(x[0], [x[1], x[2]]) for x in c["extra"]))
    md.append("")
md += ["## 4. Actions restantes", "", "| ID | Cond. | Action | Responsable | Nature | Échéance | Preuves |", "|---|---|---|---|---|---|---|"]
for a in M["actions"]:
    md.append(f"| {a['id']} | {a['condition'] or ''} | {a['title']} | {a['owner']} ({a['owner_status']}) | {a['kind']} | {a['due']} | " + "; ".join(cite(e[0], [e[1], e[2]], e[3]) for e in a["evidence"]) + " |")
md += ["", "### Engagements déjà tenus", ""]
for c in M["closed_commitments"]:
    md.append(f"- {c['title']}. Fermé : {c['closed']}. Source : {cite(c['src'], c['lines'])}")
md += ["", "## 5. Personnes et rôles", ""]
for p in M["people"]:
    md.append(f"- **{p['name']}** ({p['org']}) : {p['role']}")
md += ["", "## 6. Liste des sources (lecture et qui décide)", "", "| Fichier | Catégorie | Lecture | Qui décide, comment lire |", "|---|---|---|---|"]
for s in M["sources"]:
    m = M["source_meta"].get(s["id"], {})
    md.append(f"| `{s['path']}` | {s['category']} | {m.get('role','')} | {m.get('authority','')} |")
(OUT / "Memoire_NOVA.md").write_text("\n".join(md), encoding="utf-8")

# ---------- Mode d'emploi ----------
U = M["usage"]
md = ["# NOVA Mémoire 360 : mode d'emploi", ""]
for h, k in [("Ouvrir", "open"), ("Naviguer", "navigate"), ("Outils utilisés", "tools"), ("Ce qui a été fait à la main", "manual"), ("Limites", "limits"), ("Ce qu'on ne sait pas (au 30 sept.)", "uncertain")]:
    md += [f"## {h}", ""] + [f"- {x}" for x in U[k]] + [""]
md += ["## Ajouter la nouvelle information (l'événement)", "",
       "1. Déposer le fichier reçu dans `corpus/09_Evenement/`.",
       "2. Ouvrir `index.html`, onglet **Mise à jour**. Remplir le formulaire (statut du problème, décision antérieure, nouvelle proposition, faits et actions touchés, nouvelles actions, ce qui ne change pas, ce qu'on ne sait pas). Cliquer **Enregistrer dans ce navigateur**, puis **Télécharger updates.js**.",
       "3. Remplacer le fichier `updates.js` à côté de `index.html` par celui téléchargé (ou le modifier à la main : le modèle est en commentaire).",
       "4. Passer à la vue **Mis à jour (événement)** : le brief, les questions, les décisions, les contradictions, les actions et la chronologie montrent les changements par-dessus le baseline (badge ↻). La vue **Baseline** reste intacte.",
       "", "Modèle d'une mise à jour (JSON) :", "", "```json", json.dumps(M["update_template"], ensure_ascii=False, indent=2), "```", "",
       "## Assistant IA local (optionnel)", "",
       "Ce qu'il fait : répondre à une question en langage naturel en citant fichier et ligne (onglet **Assistant IA**), et pré-remplir la fiche d'événement (onglet **Mise à jour**, bloc « Pré-remplir avec l'IA locale »). Il rédige un brouillon; vous vérifiez. Il ne touche jamais au baseline.", "",
       "Installation (une fois, sur l'ordinateur de démonstration) :", "",
       "1. Installer Ollama (https://ollama.com), gratuit, sans compte.",
       "2. Télécharger un modèle : `ollama pull qwen2.5:7b` (bon en français, environ 5 Go). Autres choix : `llama3.1:8b`, `mistral`. Avec 8 Go de mémoire vive, prendre `qwen2.5:3b`.",
       "3. Lancer le serveur en autorisant la page locale à l'appeler : `OLLAMA_ORIGINS=\"*\" ollama serve` (dans un terminal, et le laisser ouvert). Si l'application Ollama tourne déjà, la fermer d'abord, ou régler la variable avec `launchctl setenv OLLAMA_ORIGINS \"*\"` puis relancer l'application.",
       "4. Dans `index.html`, onglet Assistant IA, ouvrir « Réglages du modèle local », cliquer « Tester la connexion ». Le nom du modèle doit être celui de `ollama list`.", "",
       "Avec LM Studio ou llama.cpp : choisir « Compatible OpenAI » dans les réglages, adresse `http://localhost:1234`, et activer CORS dans le serveur.", "",
       "Version terminal (même logique) : `python3 outils/ia/assistant_nova.py question \"…\"` ou `python3 outils/ia/assistant_nova.py evenement corpus/09_Evenement/E13.eml` (écrit un brouillon `.brouillon.json` et liste les points à vérifier).", "",
       "Limites : le modèle peut se tromper, surtout sur qui a le pouvoir de décider; la recherche de passages est par mots-clés; une réponse sans source cliquable ne vaut rien. Sans serveur local, tout le reste du rendu fonctionne.", "",
       "## Contenu du dossier", "",
       "- `index.html` : mémoire interactive autonome (à ouvrir dans un navigateur)",
       "- `updates.js` : couches de mise à jour (vide au départ)",
       "- `nova_memory.json` : mémoire structurée (questions, chronologie, décisions, contradictions, actions, sources avec texte extrait et empreintes SHA-256)",
       "- `Brief_reprise_NOVA.pdf` et `.md` : brief d'une page",
       "- `Reponses_Q01-Q10.md` : les dix réponses avec leurs preuves",
       "- `Memoire_NOVA.md` : chronologie, décisions, contradictions, actions, liste des sources (texte)",
       "- `Mode_emploi.md` : ce document",
       "- `corpus/Projet360_NOVA_ETUDIANTS/` : copie complète du dossier reçu; `corpus/09_Evenement/` : la nouvelle information",
       "- `outils/` : scripts Python d'extraction et de construction, pour refaire la mémoire; `outils/ia/assistant_nova.py` : assistant IA local en version terminal"]
(OUT / "Mode_emploi.md").write_text("\n".join(md), encoding="utf-8")
print("exports OK")
