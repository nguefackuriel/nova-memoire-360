# Texte pour Devpost : Projet 360 / NOVA (Loto-Québec, défi 2)

> Prix à choisir : « Loto-Québec : Projet 360 / NOVA ». Nom d'équipe : exactement celui affiché dans HxBuddy.

## D'où vient l'idée
Reprendre un projet dont la mémoire est éparpillée dans 64 fichiers (courriels, transcriptions, tickets, plans, contrats, captures), où le document le plus récent n'est pas toujours le bon. On voulait une mémoire qu'une personne peut ouvrir un lundi matin, et dans laquelle chaque phrase renvoie à sa preuve.

## Ce que fait NOVA Mémoire 360
- **Un brief de reprise d'une page** : responsable, date approuvée et ses trois conditions, portée, budget (autorisé, facturé, payé), situation des factures, priorités. Chaque condition de go-live est reliée à une action, un responsable et une date (ou « à confirmer »).
- **Dix réponses avec preuves** : chaque réponse cite un fichier et un repère précis (ligne, heure, cellule, page, capture), croise des sources différentes et explique les nuances, les pièges et ce qu'on ne sait pas.
- **Une mémoire consultable** : chronologie typée (proposition, décision, validation, contradiction; ancien ou encore valable), registre des décisions (qui propose, qui décide, qui confirme), 10 contradictions résolues selon qui décide et la date des faits (dont le plan v3 encore au 15 octobre et le risque R-01 périmé dans le registre), 13 actions avec responsable confirmé ou proposé, preuve et date.
- **Des preuves cliquables** : un visualiseur intégré ouvre le fichier source avec le passage surligné; les captures s'affichent avec une transcription vérifiée; les pièces jointes en double sont repérées (SHA-256) pour ne pas les compter deux fois.
- **Une recherche plein texte** sur la mémoire et sur tout le dossier.
- **Une aide à la fiche d'événement par règles** : l'outil reconnaît qui parle, la nature du document et les sujets touchés, puis applique les règles du projet (qui a le pouvoir de valider quoi, ce qui reste ouvert, identifiants touchés) pour pré-remplir la fiche en une seconde, sans modèle d'IA. L'humain complète les faits et vérifie.
- **Un assistant IA local, optionnel** : un modèle qui tourne sur l'ordinateur (Ollama, aucune donnée ne sort) répond aux questions en langage naturel en citant fichier et ligne, et pré-remplit la fiche d'événement. Il rédige, un humain vérifie : ses réponses sont marquées « brouillon », ses citations sont cliquables, et un contrôle signale les références ou lignes qui n'existent pas.
- **Une mise à jour qui garde le baseline** : chaque événement est une couche datée (statut du problème, décision antérieure, nouvelle proposition, faits et actions touchés, ce qui ne change pas). Un sélecteur permet de passer de la vue Baseline à la vue Mis à jour.

## Comment on l'a construit
Extraction automatique (Python : `email`, `openpyxl`, `pdftotext`, Tesseract). Lecture croisée et rédaction avec un assistant IA (Claude), puis vérification à la main de chaque citation dans le fichier source. Génération d'un `index.html` autonome (HTML, CSS, JavaScript, zéro dépendance, hors ligne), d'un `nova_memory.json` réutilisable et d'exports Markdown et PDF. Un contrôle automatique vérifie que chaque citation pointe vers un fichier qui existe et des lignes valides.

## Ce qui a été fait à la main, et les limites
Lecture visuelle des captures (OCR corrigé à la main), choix de qui décide quoi, résolution des contradictions, séparation entre engagement documenté et recommandation, ajout de l'événement à la main (formulaire ou fichier `updates.js`). L'assistant IA est local et optionnel : sans Ollama, tout le reste fonctionne. Testé avec qwen2.5:7b sur un portable sans GPU : lent (minutes) et peu fiable sur qui a le pouvoir de décider; d'où l'aide par règles pour la fiche, les citations obligatoires et la vérification humaine. La recherche de passages est par mots-clés. Ce qui manque dans le dossier (dates du re-test, de la prochaine build, du runbook final, du go/no-go; auteur du rapport de statut; réponse à Finances) est listé comme incertain, jamais inventé.

## Comment l'ouvrir
Télécharger l'archive et ouvrir `index.html` dans un navigateur. Pas de compte, pas d'abonnement. `README.md` et `Mode_emploi.md` expliquent la navigation.
