#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Assemble the NOVA memory: nova_memory.json + standalone index.html + updates.js (+ markdown exports)."""
import json, shutil, os
from pathlib import Path
from data_meta import REFERENCE_DATE, REFERENCE_DATE_LABEL, PEOPLE, SOURCE_META, SCREENSHOTS
from data_questions_a import QUESTIONS_A
from data_questions_b import QUESTIONS_B
from data_timeline import TIMELINE
from data_decisions import DECISIONS
from data_contradictions import CONTRADICTIONS
from data_actions import ACTIONS, CLOSED_COMMITMENTS
from data_brief import BRIEF, UPDATE_TEMPLATE, USAGE

OUT = Path("NOVA_Memoire_360"); OUT.mkdir(exist_ok=True)
sources = json.load(open("sources.json"))
for s in sources:
    if s["id"] in SCREENSHOTS:
        s["text"] = SCREENSHOTS[s["id"]]
    if s["id"] in ("README", "MANIFEST"):
        s["category"] = "Racine du dossier"

# --- integrity checks: every cited source id exists and cited lines are within range
ids = {s["id"] for s in sources}
problems = []
def check(src, lines, where):
    if src not in ids:
        problems.append(f"{where}: source inconnue {src}"); return
    s = next(x for x in sources if x["id"] == src)
    n = len(s["text"].split("\n"))
    if lines and lines[1] and lines[1] > n:
        problems.append(f"{where}: {src} ligne {lines[1]} > {n} lignes")
for q in QUESTIONS_A + QUESTIONS_B:
    for e in q["evidence"]: check(e["src"], e["lines"], q["id"])
for t in TIMELINE:
    check(t["src"], t["lines"], t["title"][:40])
    for a in t.get("also", []): check(a[0], [a[1], a[2]], t["title"][:40] + " (also)")
for d in DECISIONS:
    for k in ("proposition", "decision", "validation"): check(d[k]["src"], d[k]["lines"], d["id"])
for c in CONTRADICTIONS:
    check(c["a"]["src"], c["a"]["lines"], c["id"]); check(c["b"]["src"], c["b"]["lines"], c["id"])
    for x in c.get("extra", []): check(x[0], [x[1], x[2]], c["id"] + " extra")
for a in ACTIONS:
    for e in a["evidence"]: check(e[0], [e[1], e[2]], a["id"])
for c in CLOSED_COMMITMENTS: check(c["src"], c["lines"], c["title"][:30])
for p in PEOPLE:
    for s in p["src"]: check(s, None, p["name"])
for sid in SOURCE_META:
    if sid not in ids: problems.append(f"source_meta: {sid} inconnu")
for s in sources:
    if s["id"] not in SOURCE_META: problems.append(f"source sans meta: {s['id']}")
if problems:
    print("PROBLÈMES D'INTÉGRITÉ:"); [print(" -", p) for p in problems]
else:
    print("Intégrité des citations : OK")

memory = {
    "project": "NOVA", "reference_date": REFERENCE_DATE, "reference_date_label": REFERENCE_DATE_LABEL,
    "people": PEOPLE, "source_meta": SOURCE_META, "questions": QUESTIONS_A + QUESTIONS_B, "timeline": TIMELINE,
    "decisions": DECISIONS, "contradictions": CONTRADICTIONS, "actions": ACTIONS, "closed_commitments": CLOSED_COMMITMENTS,
    "brief": BRIEF, "update_template": UPDATE_TEMPLATE, "usage": USAGE,
    "sources": [{k: v for k, v in s.items() if k != "image"} for s in sources],
}
(OUT / "nova_memory.json").write_text(json.dumps(memory, ensure_ascii=False, indent=1), encoding="utf-8")

# --- updates.js (empty by default, template in comment)
tmpl = json.dumps(UPDATE_TEMPLATE, ensure_ascii=False, indent=2)
(OUT / "updates.js").write_text(
    "/* NOVA Mémoire 360 : MISES À JOUR après la nouvelle information.\n"
    "   Ce fichier est chargé par index.html. Le baseline (30 sept. 2026, 9 h) n'est jamais modifié :\n"
    "   chaque événement est une couche datée ajoutée à la liste ci-dessous.\n"
    "   Modèle d'un élément (copier, remplir, respecter la syntaxe JSON) :\n" + tmpl + "\n"
    "   Champ 'ref' : Q01 à Q10, D-01 à D-08, C-01 à C-10, A-01 à A-13. Plusieurs refs possibles, séparées par des espaces.\n*/\n"
    "window.NOVA_UPDATES = [];\n", encoding="utf-8")

# --- index.html
css = Path("app_css.css").read_text(encoding="utf-8")
js = Path("app_js.js").read_text(encoding="utf-8")
js_ia = Path("app_ia.js").read_text(encoding="utf-8")
js_aide = Path("app_aide.js").read_text(encoding="utf-8")
data_full = dict(memory); data_full["sources"] = sources  # with images
data_json = json.dumps(data_full, ensure_ascii=False).replace("</", "<\\/")
tabs = [("brief", "Brief"), ("questions", "Questions Q01 à Q10"), ("chronologie", "Chronologie"), ("decisions", "Décisions"),
        ("contradictions", "Contradictions"), ("actions", "Actions"), ("sources", "Sources"), ("maj", "Mise à jour"), ("assistant", "Assistant IA"), ("usage", "Mode d'emploi"), ("recherche", "Recherche")]
html = f"""<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>NOVA : Mémoire 360</title>
<style>{css}</style></head>
<body>
<header><div><h1>NOVA : mémoire opérationnelle 360</h1><div class="asof">Baseline : {REFERENCE_DATE_LABEL} · Projet 360, Loto-Québec · toutes les données sont fictives</div></div>
<div class="viewsel"><button class="on" data-view="baseline">Baseline 30 sept. 9 h</button><button data-view="updated">Mis à jour (événement)</button></div>
<div class="grow"></div><input id="search" type="search" placeholder="Chercher dans la mémoire et les 64 fichiers (ex. rollback, 18 000, Canada Central)"></header>
<nav class="tabs">{''.join(f'<button data-tab="{k}">{v}</button>' for k, v in tabs)}</nav>
<main>{''.join(f'<section class="tab{" print" if k=="brief" else ""}" id="tab-{k}"></section>' for k, v in tabs)}</main>
<div id="drawer"><div class="dh"><h3></h3><button title="Fermer (Échap)">×</button></div><div class="meta"></div><div class="body"></div></div>
<script>window.NOVA = {data_json};</script>
<script src="updates.js"></script>
<script>{js}</script>
<script>{js_aide}</script>
<script>{js_ia}</script>
</body></html>"""
(OUT / "index.html").write_text(html, encoding="utf-8")

# --- corpus copy (for "open original" links)
dst = OUT / "corpus" / "Projet360_NOVA_ETUDIANTS"
if dst.exists(): shutil.rmtree(dst)
shutil.copytree("Projet360_NOVA_ETUDIANTS", dst)
(OUT / "corpus" / "09_Evenement").mkdir(exist_ok=True)
(OUT / "corpus" / "09_Evenement" / "LISEZMOI.txt").write_text("Déposez ici le ou les fichiers de la nouvelle information reçue pendant le défi. Citez-les ensuite comme preuve dans updates.js (onglet Mise à jour).\n", encoding="utf-8")
print("index.html:", (OUT/"index.html").stat().st_size, "bytes; nova_memory.json:", (OUT/"nova_memory.json").stat().st_size)
