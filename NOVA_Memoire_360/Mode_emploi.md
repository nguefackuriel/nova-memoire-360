# NOVA Mémoire 360 : mode d'emploi

## Ouvrir

- Ouvrir index.html dans un navigateur (Chrome, Edge, Firefox ou Safari). Pas de serveur, rien à installer, pas de compte, pas d'abonnement. Tout est dans le fichier : textes extraits, captures, données.
- Le dossier corpus/ contient la copie complète du dossier reçu (Projet360_NOVA_ETUDIANTS). Les liens « Ouvrir le fichier original » pointent vers ces fichiers. Selon le navigateur, un PDF ou un .eml peut s'ouvrir dans une autre application.
- Brief_reprise_NOVA.pdf (une page), Mode_emploi.md et Reponses_Q01-Q10.md sont les versions à imprimer. nova_memory.json est la mémoire structurée, réutilisable par un autre outil ou un chatbot.

## Naviguer

- Onglets : Brief, Questions (Q01 à Q10), Chronologie, Décisions, Contradictions, Actions, Sources, Mise à jour, Mode d'emploi.
- Chaque affirmation porte une puce de preuve [fichier · repère]. Un clic ouvre le fichier avec les lignes citées surlignées. Pour une capture, l'image s'affiche avec sa transcription.
- Recherche (barre en haut) : cherche à la fois dans la mémoire (réponses, décisions, actions) et dans le texte complet des 64 fichiers. Exemples : « rollback », « 18 000 », « Canada Central », « déployé ».
- Filtres de la chronologie : par thème (sécurité, finances…) et par type (proposition, décision, validation, contradiction). Les entrées anciennes sont grisées. Le bouton « valable au 30 sept. seulement » les cache.
- Choix de vue (en haut) : « Baseline 30 sept. 9 h » ou « Mis à jour (événement) ». Le baseline n'est jamais modifié : les mises à jour sont des couches datées qui s'ajoutent par-dessus.

## Outils utilisés

- Extraction : Python 3 (module email pour les .eml, openpyxl pour les .xlsx, pdftotext pour les PDF, Tesseract pour lire les captures). Le fichier sources.json contient le texte extrait et les empreintes SHA-256 (pour repérer les pièces jointes en double).
- Analyse et rédaction : assistant IA (Claude) pour la lecture croisée, les réponses et les registres. Chaque fait a été vérifié à la main dans le fichier source avant d'être gardé.
- Rendu : HTML, CSS et JavaScript sans dépendance externe (fonctionne hors ligne, en file://).
- Aide rapide à la fiche d'événement (sans IA) : l'outil reconnaît par mots-clés qui parle, la nature du document et les sujets touchés, puis applique des règles fixes (qui a le pouvoir de valider quoi, ce qui reste ouvert, quels identifiants sont touchés) pour remplir la fiche. Instantané, vérifiable, et c'est le chemin recommandé pendant la présentation.
- Assistant IA local (optionnel) : un modèle de langage qui tourne sur l'ordinateur (Ollama ou LM Studio, aucune donnée ne sort). Il sert à deux choses : répondre à une question en langage naturel en citant fichier et ligne (onglet Assistant IA), et pré-remplir la fiche d'événement (onglet Mise à jour). Il ne décide rien : il rédige un brouillon, et un humain vérifie chaque ligne. Les dix réponses du baseline ont été vérifiées à la main, pas générées par ce modèle.

## Ce qui a été fait à la main

- Lecture visuelle des 8 captures d'écran (l'OCR a été corrigé à la main : « TODO », « À compléter », « --- », etc.).
- Choix de qui décide quoi et résolution des contradictions : jugement humain, expliqué dans l'onglet Contradictions.
- Rédaction des actions « recommandation » (séparées des engagements documentés) et des dates « à confirmer ».
- Intégration de la nouvelle information : l'aide rapide (règles) ou le modèle local proposent un brouillon, mais les passages « À COMPLÉTER », la vérification, la correction et l'enregistrement sont faits à la main dans l'onglet Mise à jour, puis export dans updates.js.

## Limites

- L'assistant IA est optionnel et local : sans Ollama ou LM Studio, il ne répond pas, et tout le reste fonctionne (recherche par mots-clés, onglet Questions, fiche à remplir à la main).
- Testé sur un MacBook Pro sans GPU avec qwen2.5:7b : environ 7 minutes par fiche, et le brouillon contenait des erreurs graves (un ticket « fermé » par une personne qui n'avait rien validé, un livrable « livré » qui n'était qu'annoncé, une action qui suivait la demande du fournisseur). C'est pour cela que l'aide rapide par règles est le chemin recommandé en direct, et que le modèle sert surtout aux questions préparées d'avance.
- Un modèle local peut se tromper, surtout sur qui a le pouvoir de décider. C'est pour ça qu'il cite ses sources, que les citations sont cliquables, et qu'un contrôle de forme signale les références ou lignes qui n'existent pas. La réponse du modèle est toujours marquée « brouillon, à vérifier ».
- La recherche de passages est par mots-clés (pas de base vectorielle) : une question formulée avec d'autres mots que le dossier peut rater un passage. Reformulez avec les mots du projet (SEC-210, runbook, CR-04…).
- Les montants sont comparés en CAD hors taxes, tels qu'écrits. Aucun calcul de taxes.
- Les PDF sont affichés en texte extrait (mise en page approximative). L'original est accessible par lien.
- Les heures des transcriptions sont celles des documents. Les fuseaux horaires ne sont pas normalisés.

## Ce qu'on ne sait pas (au 30 sept.)

- Dates inconnues : re-test SEC-210; « prochaine build » (correctif ACC-303); livraison du runbook final; go/no-go.
- Auteur du rapport de statut du 21 sept. inconnu. Plafond budgétaire qu'il utilise non précisé.
- Pas de réponse écrite de Nicolas à Finances (INV-003) ni à Alex (communication) dans le dossier. Compte rendu du comité du 26 sept. annoncé mais absent.
- Livraison réelle du jalon 3 (36 000 $) non documentée. Date exacte de la build de stabilisation non documentée.
- Date à laquelle la transition Élodie vers Nicolas a été « convenue » (le plan v3 du 12 sept. l'anticipe).
- Rôle exact de Boréal dans la rédaction du runbook (déduit de « je relance notre équipe ops »).

## Ajouter la nouvelle information (l'événement)

1. Déposer le fichier reçu dans `corpus/09_Evenement/`.
2. Ouvrir `index.html`, onglet **Mise à jour**. Remplir le formulaire (statut du problème, décision antérieure, nouvelle proposition, faits et actions touchés, nouvelles actions, ce qui ne change pas, ce qu'on ne sait pas). Cliquer **Enregistrer dans ce navigateur**, puis **Télécharger updates.js**.
3. Remplacer le fichier `updates.js` à côté de `index.html` par celui téléchargé (ou le modifier à la main : le modèle est en commentaire).
4. Passer à la vue **Mis à jour (événement)** : le brief, les questions, les décisions, les contradictions, les actions et la chronologie montrent les changements par-dessus le baseline (badge ↻). La vue **Baseline** reste intacte.

Modèle d'une mise à jour (JSON) :

```json
{
  "id": "U-01",
  "received_at": "AAAA-MM-JJTHH:MM (heure réelle de réception pendant le défi)",
  "event_date": "AAAA-MM-JJ (date fictive de l'événement, si elle est donnée)",
  "source": {
    "file": "nom du fichier reçu (à déposer dans corpus/09_Evenement/)",
    "loc": "repère précis (ligne, page, heure)",
    "quote": "citation mot pour mot"
  },
  "summary": "Ce qui vient de changer, en une phrase, sans interprétation.",
  "problem_status": "Statut du PROBLÈME concerné (ex. : SEC-210 toujours EN VALIDATION; ACC-303 fermé par Mélissa le …; runbook livré mais pas approuvé).",
  "prior_decision": "Décision ANTÉRIEURE qui reste en vigueur tant qu'une instance ne l'a pas changée (ex. : 22 octobre approuvé le 10 sept., sous les trois conditions du 26 sept.).",
  "new_proposal": "Nouvelle PROPOSITION, s'il y en a une : qui la fait, à qui, et le fait qu'elle n'est PAS approuvée tant qu'une décision n'est pas documentée.",
  "affected_facts": [
    {
      "ref": "Q01 / D-01 / C-03 …",
      "before": "valeur du baseline",
      "after": "valeur mise à jour",
      "evidence": "fichier + repère"
    }
  ],
  "affected_actions": [
    {
      "ref": "A-0x",
      "change": "fermée / modifiée / date précisée / nouvelle",
      "evidence": "fichier + repère"
    }
  ],
  "new_actions": [
    {
      "id": "A-14",
      "title": "…",
      "owner": "… (confirmé ou proposé)",
      "due": "date connue ou « à confirmer »",
      "evidence": "fichier + repère"
    }
  ],
  "unchanged": "Ce qui ne change PAS : les autres conditions de go-live restent ouvertes; aucune approbation n'est inventée; le baseline du 30 sept. est conservé.",
  "uncertainty": "Ce que l'événement ne dit pas."
}
```

## Assistant IA local (optionnel)

Ce qu'il fait : répondre à une question en langage naturel en citant fichier et ligne (onglet **Assistant IA**), et pré-remplir la fiche d'événement (onglet **Mise à jour**, bloc « Pré-remplir avec l'IA locale »). Il rédige un brouillon; vous vérifiez. Il ne touche jamais au baseline.

Installation (une fois, sur l'ordinateur de démonstration) :

1. Installer Ollama (https://ollama.com), gratuit, sans compte.
2. Télécharger un modèle : `ollama pull qwen2.5:7b` (bon en français, environ 5 Go). Autres choix : `llama3.1:8b`, `mistral`. Avec 8 Go de mémoire vive, prendre `qwen2.5:3b`.
3. Ouvrir la page par le serveur local : double-cliquer `Ouvrir_avec_serveur_local.command` (à côté de `index.html`). La page s'ouvre sur http://localhost:8765 et Ollama accepte ses appels sans réglage. Une page ouverte en file:// (double-clic sur index.html) est bloquée par Safari et par Ollama (« Load failed »). Autre solution : quitter l'application Ollama de la barre de menu, puis `OLLAMA_ORIGINS="*" ollama serve` dans un terminal laissé ouvert.
4. Onglet Assistant IA, ouvrir « Réglages du modèle local », cliquer « Tester la connexion ». Le nom du modèle doit être celui de `ollama list`.

Avec LM Studio ou llama.cpp : choisir « Compatible OpenAI » dans les réglages, adresse `http://localhost:1234`, et activer CORS dans le serveur.

Version terminal (même logique) : `python3 outils/ia/assistant_nova.py question "…"` ou `python3 outils/ia/assistant_nova.py evenement corpus/09_Evenement/E13.eml` (écrit un brouillon `.brouillon.json` et liste les points à vérifier).

Limites : le modèle peut se tromper, surtout sur qui a le pouvoir de décider; la recherche de passages est par mots-clés; une réponse sans source cliquable ne vaut rien. Sans serveur local, tout le reste du rendu fonctionne.

## Contenu du dossier

- `index.html` : mémoire interactive autonome (à ouvrir dans un navigateur)
- `updates.js` : couches de mise à jour (vide au départ)
- `nova_memory.json` : mémoire structurée (questions, chronologie, décisions, contradictions, actions, sources avec texte extrait et empreintes SHA-256)
- `Brief_reprise_NOVA.pdf` et `.md` : brief d'une page
- `Reponses_Q01-Q10.md` : les dix réponses avec leurs preuves
- `Memoire_NOVA.md` : chronologie, décisions, contradictions, actions, liste des sources (texte)
- `Mode_emploi.md` : ce document
- `corpus/Projet360_NOVA_ETUDIANTS/` : copie complète du dossier reçu; `corpus/09_Evenement/` : la nouvelle information
- `outils/` : scripts Python d'extraction et de construction, pour refaire la mémoire; `outils/ia/assistant_nova.py` : assistant IA local en version terminal