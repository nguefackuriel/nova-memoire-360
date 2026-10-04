# NOVA : mémoire opérationnelle 360

Défi 24 h « Projet 360 » (Loto-Québec). Reprise du projet fictif NOVA.
Baseline : **30 septembre 2026, 9 h** (heure de Montréal). Toutes les personnes, entreprises et données sont fictives.

## Ouvrir le rendu (rien à installer, aucun abonnement)

1. Double-cliquez sur **`index.html`** (Chrome, Edge, Firefox ou Safari). Tout est dans le fichier : le texte des 64 documents, les captures d'écran, la mémoire. Ça marche hors ligne.
2. Les onglets : **Brief** (une page), **Questions Q01 à Q10** (réponses avec preuves), **Chronologie**, **Décisions**, **Contradictions**, **Actions**, **Sources**, **Mise à jour** (événement), **Assistant IA** (optionnel), **Mode d'emploi**, **Recherche**.
3. Cliquez sur une puce de preuve `[fichier · repère]` : le fichier source s'ouvre avec le passage surligné (ou la capture avec sa transcription). « Ouvrir le fichier original » pointe vers `corpus/`.
4. La barre de recherche cherche dans la mémoire **et** dans le texte complet des 64 fichiers.
5. Optionnel : l'onglet **Assistant IA** permet de poser une question en langage naturel à un modèle qui tourne sur l'ordinateur (Ollama ou LM Studio, voir `Mode_emploi.md`). Pour cet onglet, ouvrir la page avec `Ouvrir_avec_serveur_local.command` plutôt que par double-clic. Il cite fichier et ligne, et ses réponses sont marquées « brouillon, à vérifier ». Sans modèle local, tout le reste fonctionne.

## Où trouver chaque livrable demandé

| Livrable demandé | Où |
|---|---|
| 1. Brief de reprise (une page) | onglet **Brief**, `Brief_reprise_NOVA.pdf`, `Brief_reprise_NOVA.md` |
| 2. Mémoire consultable (chronologie, décisions, contradictions, sources, actions) | onglets **Chronologie, Décisions, Contradictions, Actions, Sources**, `Memoire_NOVA.md`, `nova_memory.json` |
| 3. Dix réponses avec preuves | onglet **Questions**, `Reponses_Q01-Q10.md` |
| 4. Mise à jour après la nouvelle information (baseline conservé) | onglet **Mise à jour** (aide rapide par règles, fiche « Réponse aux trois questions du jury », modèle local en option) et le choix de vue **Baseline / Mis à jour**, `updates.js` |
| 5. Mode d'emploi (ouverture, navigation, outils, travail manuel, limites, incertitudes) | onglet **Mode d'emploi**, `Mode_emploi.md` |

## Contenu du dossier

- `index.html` : l'application, en un seul fichier (HTML, CSS, JavaScript, sans dépendance)
- `updates.js` : les couches de mise à jour (vide au départ, le modèle est en commentaire)
- `nova_memory.json` : la mémoire structurée, réutilisable (questions, chronologie, décisions, contradictions, actions, liste des sources avec texte extrait et empreintes SHA-256)
- `Brief_reprise_NOVA.pdf` et `.md`, `Reponses_Q01-Q10.md`, `Memoire_NOVA.md`, `Mode_emploi.md`
- `corpus/Projet360_NOVA_ETUDIANTS/` : copie complète du dossier reçu. `corpus/09_Evenement/` : à remplir avec la nouvelle information
- `outils/ia/assistant_nova.py` : l'assistant IA local en version terminal (question, ou brouillon de fiche d'événement)
- `outils/` : les scripts Python pour refaire la mémoire (`extract_sources.py` produit `sources.json`; `build.py` produit `index.html` et `nova_memory.json`; `export_docs.py` produit les fichiers Markdown). Commande : `python3 extract_sources.py && python3 build.py && python3 export_docs.py` (il faut poppler `pdftotext`, Tesseract `fra` et `openpyxl`).

## Les règles de lecture qu'on a suivies

- Une **proposition** n'est pas une **décision**. Une correction **livrée** n'est pas **validée**. Une capture **ancienne** ne prouve pas qu'un défaut est encore là.
- Quand deux sources se contredisent, on tranche avec deux critères : **qui a le pouvoir de décider** et **la date des faits** (pas la date du fichier).
- Une pièce jointe identique à un fichier du dossier (même empreinte SHA-256) ne compte pas comme une deuxième preuve.
- Montants en CAD hors taxes. **Autorisé** (204 000 $), **facturé** (186 000 $) et **payé** (132 000 $) sont trois choses différentes.
- Ce qui n'est pas dans le dossier est marqué **« à confirmer »** ou **incertain**. On n'invente ni décision, ni date, ni approbation. Les **recommandations de l'équipe** sont séparées des **engagements documentés**.
