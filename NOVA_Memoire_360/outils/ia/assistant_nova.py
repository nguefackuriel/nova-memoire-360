#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Assistant IA local pour NOVA Mémoire 360, version terminal (même logique que l'onglet « Assistant IA » de index.html).
Le modèle ne décide rien : il rédige un brouillon que l'humain vérifie, et il doit citer fichier + ligne.

Exemples :
  python3 assistant_nova.py question "Quelle est la date de mise en production et pourquoi?"
  python3 assistant_nova.py bench x                                            # mesure la vitesse du modèle
  python3 assistant_nova.py evenement corpus/09_Evenement/E13.eml            # écrit E13.brouillon.json
  python3 assistant_nova.py --model llama3.1:8b question "..."
  python3 assistant_nova.py --openai --url http://localhost:1234 question "..."   # LM Studio, llama.cpp
Sans dépendance : Python 3 seulement. Il faut un serveur local qui tourne (Ollama : `ollama serve`)."""
import argparse, json, math, re, sys, unicodedata, urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
MEM = None
for cand in [HERE / "nova_memory.json", HERE.parent / "nova_memory.json", HERE.parent.parent / "nova_memory.json", Path("nova_memory.json")]:
    if cand.exists(): MEM = json.load(open(cand, encoding="utf-8")); break
if MEM is None: sys.exit("nova_memory.json introuvable (placez ce script dans NOVA_Memoire_360/outils/ia/).")

RULES = """Règles absolues :
1. N'invente rien. Si le document ne le dit pas, écris « à confirmer » ou « le document ne le dit pas ».
2. Une proposition n'est pas une décision. Une correction livrée n'est pas validée. « Nos tests passent » (fournisseur) n'est pas une acceptation du client.
3. Seules les personnes habilitées ferment une condition ou changent une date. Le fournisseur ne peut rien fermer.
4. Chaque fait et chaque action doit citer une preuve : nom du fichier et numéro de ligne (ex. « E13.eml, l. 12 »).
5. Ne ferme jamais une condition de go-live qui n'est pas touchée par le document. Ne crée aucune approbation.
6. Réponds en français simple, phrases courtes, sans tiret long."""

def baseline_context():
    """Contexte compact (environ 1 000 mots) : le brief d'une page + les actions + qui décide."""
    B = MEM["brief"]; L = ["FAITS CLÉS DU BASELINE (" + MEM["reference_date_label"] + ") :"]
    for sec in B["sections"]:
        for it in sec["items"]: L.append(f"- [{sec['h']}] {it}")
    L.append("\nACTIONS RESTANTES (identifiants à réutiliser) :")
    L += [f"- {a['id']} {a['title'][:110]} | {a['owner']} ({a['owner_status']}) | {a['due'][:60]}" + (f" | condition {a['condition']}" if a.get('condition') else "") for a in MEM["actions"]]
    L.append("\nIDENTIFIANTS DES QUESTIONS : " + "; ".join(f"{q['id']} = {q['question'][:70]}" for q in MEM["questions"]))
    L.append("IDENTIFIANTS DES DÉCISIONS : " + "; ".join(f"{d['id']} = {d['title'][:60]}" for d in MEM["decisions"]))
    L.append("IDENTIFIANTS DES CONTRADICTIONS : " + "; ".join(f"{c['id']} = {c['title'][:50]}" for c in MEM["contradictions"]))
    L.append("\nQUI A LE POUVOIR DE DÉCIDER : comité de direction = date de mise en production; Nicolas Perron (chargé de projet) = portée, plans, communications; Sophie Lambert = acceptation sécurité (SEC-210); Mélissa Gagnon = validation accessibilité (ACC-303); Olivier Côté = approbation du runbook et go exploitation; Amélie Fortin (Finances) = paiement des factures; Boréal Numérique (Julien Moreau) = fournisseur, ne décide rien côté client.")
    return "\n".join(L)

def call_model(args, system, user, max_tokens=1200):
    import time; t0 = time.time()
    if args.openai:
        url = args.url.rstrip("/") + "/v1/chat/completions"
        body = {"model": args.model, "temperature": 0, "max_tokens": max_tokens, "response_format": {"type": "json_object"}, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
    else:
        url = args.url.rstrip("/") + "/api/chat"
        body = {"model": args.model, "stream": False, "format": "json", "keep_alive": "30m", "options": {"temperature": 0, "num_ctx": args.ctx, "num_predict": max_tokens}, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
    print(f"Appel du modèle {args.model} ({len(system)+len(user)} caractères de prompt). Sur une machine sans GPU, comptez 1 à 5 minutes la première fois…", flush=True)
    req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as r:
            j = json.loads(r.read().decode("utf-8"))
    except Exception as e:
        raise SystemExit(f"Le serveur local n'a pas répondu ({e}). Vérifiez : 1) `ollama list` montre le modèle; 2) `curl {args.url}/api/tags` répond; 3) lancez `python3 {sys.argv[0]} bench x` pour mesurer la vitesse. Si la machine est lente, essayez --model qwen2.5:3b.")
    if not args.openai and j.get("eval_count"):
        print(f"Réponse en {time.time()-t0:.0f} s : {j.get('prompt_eval_count',0)} jetons lus, {j['eval_count']} jetons écrits ({j['eval_count']/max(j['eval_duration'],1)*1e9:.1f} jetons/s).", flush=True)
    txt = j["choices"][0]["message"]["content"] if args.openai else j["message"]["content"]
    try: return json.loads(txt)
    except Exception:
        m = re.search(r"\{[\s\S]*\}", txt)
        if m: return json.loads(m.group(0))
        raise SystemExit("Le modèle n'a pas renvoyé un JSON lisible :\n" + txt[:800])

def cmd_bench(args):
    """Mesure la vitesse du modèle : lecture d'un prompt moyen et écriture de 60 jetons."""
    import time
    ctx = baseline_context()
    body = {"model": args.model, "stream": False, "keep_alive": "30m", "options": {"temperature": 0, "num_ctx": args.ctx, "num_predict": 60}, "messages": [{"role": "system", "content": ctx}, {"role": "user", "content": "Résume en deux phrases où en est le projet NOVA."}]}
    print(f"Test de vitesse avec {args.model} ({len(ctx)} caractères de contexte)…", flush=True); t0 = time.time()
    req = urllib.request.Request(args.url.rstrip("/") + "/api/chat", data=json.dumps(body).encode("utf-8"), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as r: j = json.loads(r.read().decode("utf-8"))
    except Exception as e: raise SystemExit(f"Pas de réponse : {e}")
    tot = time.time() - t0
    pe, pd, ec, ed = j.get("prompt_eval_count", 0), j.get("prompt_eval_duration", 1), j.get("eval_count", 0), j.get("eval_duration", 1)
    print(f"Durée totale : {tot:.0f} s (chargement du modèle inclus : {j.get('load_duration',0)/1e9:.0f} s).")
    print(f"Lecture du prompt : {pe} jetons en {pd/1e9:.0f} s ({pe/max(pd,1)*1e9:.0f} jetons/s).")
    print(f"Écriture : {ec} jetons en {ed/1e9:.0f} s ({ec/max(ed,1)*1e9:.1f} jetons/s).")
    est = 2200 / max(pe/max(pd,1)*1e9, 1) + 900 / max(ec/max(ed,1)*1e9, 0.1)
    print(f"Estimation pour une fiche d'événement complète (environ 2 200 jetons lus, 900 écrits) : {est/60:.1f} minutes.")
    if est > 300: print("C'est lent. Conseil : --model qwen2.5:3b (ou 1.5b), et garder Ollama ouvert pour ne pas recharger le modèle.")
    print("Réponse du modèle : " + (j.get("message", {}).get("content", "")[:300]))

def norm(s): return "".join(c for c in unicodedata.normalize("NFD", str(s or "").lower()) if unicodedata.category(c) != "Mn")
STOP = set("projet nova boreal demo aujourd hui demain matin actuellement actuel actuelle maintenant devrais devrait savoir faut le la les un une des du de d l et ou a au aux en dans sur pour par avec sans que qui quoi dont est sont etait ete etre il elle ils elles on nous vous je tu ce cet cette ces se sa son ses leur leurs ne pas plus comme mais donc or ni car si quand quelle quel quels quelles pourquoi comment combien".split())
def terms(q): return [t for t in dict.fromkeys(re.split(r"[^a-z0-9]+", norm(q))) if len(t) >= 3 and t not in STOP]

def retrieve(question, k=8):
    T = terms(question)
    if not T: return [], []
    meta = MEM["source_meta"]; srcs = [s for s in MEM["sources"] if meta.get(s["id"], {}).get("role") not in ("hors sujet", "doublon", "consigne", "inventaire")]
    N = 0; df = {}
    for s in srcs:
        for l in s["text"].split("\n"):
            N += 1; nl = norm(l)
            for t in T:
                if t in nl: df[t] = df.get(t, 0) + 1
    idf = lambda t: math.log(1 + N / (1 + df.get(t, 0)))
    hits = []
    for s in srcs:
        lines = s["text"].split("\n")
        for i, l in enumerate(lines):
            nl = norm(l); sc = sum(idf(t) for t in T if t in nl)
            if sc > 0: hits.append((sc, s, i))
    hits.sort(key=lambda x: -x[0])
    out, seen = [], set()
    for sc, s, i in hits:
        lines = s["text"].split("\n"); whole = s.get("kind") == "xlsx" or len(lines) <= 14
        key = s["id"] if whole else (s["id"], i // 3)
        if key in seen: continue
        seen.add(key); a, b = (0, len(lines) - 1) if whole else (max(0, i - 2), min(len(lines) - 1, i + 2))
        mm = meta.get(s["id"], {}); out.append({"path": s["path"], "role": mm.get("role", ""), "authority": mm.get("authority", ""), "from": a + 1, "to": b + 1, "text": "\n".join(f"{a+1+j}: {l}" for j, l in enumerate(lines[a:b+1]))})
        if len(out) >= k: break
    mem = []
    need = max(1, math.ceil(len(T) / 3))
    for q in MEM["questions"]:
        t = norm(q["question"] + " " + q["answer"]); sc = sum(1 for x in T if x in t)
        if sc >= need: mem.append((sc, f"{q['id']} {q['question']}\n→ {q['answer']}"))
    for d in MEM["decisions"]:
        t = norm(d["title"] + " " + d["why"] + " " + (d.get("conditions") or "")); sc = sum(1 for x in T if x in t)
        if sc >= need: mem.append((sc, f"{d['id']} {d['title']} [{d['status']}] : {d['why']} {d.get('conditions') or ''}"))
    for a in MEM["actions"]:
        t = norm(a["title"] + " " + a["owner"] + " " + a.get("note", "")); sc = sum(1 for x in T if x in t)
        if sc >= need: mem.append((sc, f"{a['id']} {a['title']} | {a['owner']} ({a['owner_status']}) | {a['due']}"))
    for c in MEM["contradictions"]:
        t = norm(c["title"] + " " + c["resolution"]); sc = sum(1 for x in T if x in t)
        if sc >= need: mem.append((sc, f"{c['id']} {c['title']} : {c['resolution']}"))
    mem.sort(key=lambda x: -x[0])
    return out, [m[1][:900] for m in mem[:3]]

def cmd_question(args):
    passages, mem = retrieve(args.text)
    brief = "\n".join(f"- [{sec['h']}] {it}" for sec in MEM["brief"]["sections"] for it in sec["items"])
    ctx = ("FAITS CLÉS VÉRIFIÉS (baseline au " + MEM["reference_date_label"] + "). Ils l'emportent sur tout extrait plus ancien ou écrit par quelqu'un qui n'a pas le pouvoir de décider :\n" + brief
           + "\n\nEXTRAITS DES FICHIERS (numéro de ligne devant chaque ligne; la note [lecture : …] dit si la source est ancienne, périmée ou sans pouvoir) :\n\n" + "\n\n".join(f"### {p['path']} (lignes {p['from']} à {p['to']}) [lecture : {p['role']}. {p['authority']}]\n{p['text']}" for p in passages) + "\n\nENTRÉES DE LA MÉMOIRE VÉRIFIÉE :\n\n" + "\n\n".join(mem))
    system = ("Tu réponds à des questions sur le projet NOVA en t'appuyant UNIQUEMENT sur les faits clés vérifiés et les extraits fournis. Tu réponds par un objet JSON : "
              "{\"reponse\": \"texte en français simple, phrases courtes\", \"sources\": [{\"fichier\": \"chemin exact tel qu'écrit dans les extraits, ou le code court cité dans les faits clés (E09, M04, M06, ADR-007…)\", \"ligne\": numéro}], \"incertitude\": \"ce que les extraits ne disent pas\"}.\n"
              + RULES + "\n7. Pour une question large (risques, reprise du projet, décisions, état du projet), pars des FAITS CLÉS VÉRIFIÉS, puis complète avec les extraits. Un problème fermé n'est plus un risque. Un document ancien (charte, plan v2, courriel de juillet) ne donne pas l'état actuel.\nSi rien ne permet de répondre, écris-le clairement dans « reponse ». Date de référence : " + MEM["reference_date_label"] + ".")
    j = call_model(args, system, f"QUESTION : {args.text}\n\n{ctx}")
    print("\nRÉPONSE (brouillon du modèle local, à vérifier) :\n" + j.get("reponse", ""))
    print("\nSOURCES CITÉES :"); [print(f"  - {s.get('fichier')} , l. {s.get('ligne')}") for s in j.get("sources", [])]
    print("\nCE QUE LES EXTRAITS NE DISENT PAS : " + str(j.get("incertitude", "")))
    if args.verbose:
        print("\nPASSAGES FOURNIS :"); [print(f"  - {p['path']} l. {p['from']} à {p['to']}") for p in passages]

def cmd_evenement(args):
    path = Path(args.text); text = path.read_text(encoding="utf-8", errors="replace").replace("\r", "")
    numbered = "\n".join(f"{i+1}: {l}" for i, l in enumerate(text.split("\n")))
    schema = MEM["update_template"]
    system = "Tu es l'assistant de la mémoire du projet NOVA. Tu rédiges un BROUILLON de mise à jour qu'un humain va vérifier. Tu réponds UNIQUEMENT par un objet JSON valide.\n" + RULES + "\n\nCONTEXTE DU BASELINE (vérifié, ne pas contredire sans preuve) :\n" + baseline_context()
    user = (f"DOCUMENT REÇU (09_Evenement/{path.name}), avec numéros de ligne :\n{numbered}\n\nProduis le JSON avec exactement ces clés (remplis chaque champ, cite « fichier, l. N » comme preuve, laisse 'id' = 'U-01' et 'received_at' vide) :\n"
            + json.dumps(schema, ensure_ascii=False, indent=1))
    d = call_model(args, system, user)
    d.setdefault("source", {})["file"] = f"09_Evenement/{path.name}"
    # validation de forme
    known = {q["id"] for q in MEM["questions"]} | {x["id"] for x in MEM["decisions"]} | {x["id"] for x in MEM["contradictions"]} | {x["id"] for x in MEM["actions"]}
    n = len(text.split("\n")); flags = []
    def ev(e, where):
        if not e: flags.append(f"{where} : preuve manquante"); return
        m = re.search(r"l\.?\s*(\d+)", str(e), re.I)
        if m and int(m.group(1)) > n: flags.append(f"{where} : la ligne {m.group(1)} n'existe pas ({n} lignes)")
    for i, f in enumerate(d.get("affected_facts", []), 1):
        for r in re.split(r"[\s,/]+", str(f.get("ref", ""))):
            if r and r not in known: flags.append(f"fait {i} : référence inconnue « {r} »")
        ev(f.get("evidence"), f"fait {i}")
    for i, f in enumerate(d.get("affected_actions", []), 1):
        for r in re.split(r"[\s,/]+", str(f.get("ref", ""))):
            if r and r not in known: flags.append(f"action touchée {i} : référence inconnue « {r} »")
        ev(f.get("evidence"), f"action touchée {i}")
    for i, f in enumerate(d.get("new_actions", []), 1): ev(f.get("evidence"), f"nouvelle action {i}")
    if re.search(r"approuv", str(d.get("new_proposal", "")), re.I) and not re.search(r"\bnon\b|\bpas\b", str(d.get("new_proposal", "")), re.I):
        flags.append("nouvelle proposition : « approuvé » apparaît sans « non » ou « pas »")
    if not str(d.get("unchanged", "")).strip(): flags.append("« ce qui ne change pas » est vide")
    out = path.with_suffix(".brouillon.json"); out.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nBrouillon écrit : {out}")
    print("\nÀ VÉRIFIER AVANT D'ENREGISTRER :" if flags else "\nAucun problème de forme détecté. Relisez le fond : qui décide, livré ou validé, proposition ou décision.")
    [print("  - " + f) for f in flags]
    print("\nEnsuite : ouvrez index.html, onglet Mise à jour, collez le contenu du brouillon dans le formulaire (ou dans updates.js), corrigez, enregistrez, téléchargez updates.js.")

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--url", default="http://localhost:11434"); ap.add_argument("--model", default="qwen2.5:7b"); ap.add_argument("--ctx", type=int, default=12288)
ap.add_argument("--openai", action="store_true", help="serveur compatible OpenAI (LM Studio, llama.cpp) au lieu d'Ollama"); ap.add_argument("-v", "--verbose", action="store_true")
ap.add_argument("--timeout", type=int, default=1800, help="secondes d'attente max (défaut 1800)")
ap.add_argument("cmd", choices=["question", "evenement", "bench"]); ap.add_argument("text", help="la question, ou le chemin du fichier de l'événement")
a = ap.parse_args()
{"question": cmd_question, "evenement": cmd_evenement, "bench": cmd_bench}[a.cmd](a)
