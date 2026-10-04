# -*- coding: utf-8 -*-
"""Brief de reprise (une page), modèle de mise à jour après l'événement, mode d'emploi."""

BRIEF = {
 "title": "NOVA : brief de reprise",
 "asof": "État au 30 septembre 2026, 9 h (Montréal). C'est le baseline du dossier de départ.",
 "sections": [
  {"h": "Responsable", "items": [
    "Nicolas Perron est chargé de projet depuis le 16 septembre 2026 (E06, note de transition, Teams du 16 sept.). Élodie Caron l'a précédé du 7 juillet au 15 septembre. Elle reste joignable quelques jours.",
    "Fournisseur : Boréal Numérique Inc. (Julien Moreau). Qui valide quoi : Sophie Lambert (sécurité), Mélissa Gagnon (accessibilité et QA), Olivier Côté (exploitation), Marc Gervais (architecture et intégration), Camille Beaulieu (données), Amélie Fortin (finances).",
  ]},
  {"h": "Date approuvée et conditions", "items": [
    "Mise en production : 22 octobre 2026. Proposée par Boréal le 8 sept. (E05), approuvée par le comité de direction le 10 sept. à 15:25 (M04). Cause du report : le connecteur interne INT-101, réglé et fermé le 17 sept. (E12). La date reste le 22.",
    "La date dépend de trois validations (comité du 26 sept., M06; rappel E09 du 27 sept.). Aucune n'est faite au 30 sept. : 1) la sécurité accepte SEC-210 (Sophie); 2) ACC-303 est fermé (Mélissa; correctif Boréal « prochaine build »); 3) le runbook est approuvé avec le retour arrière (Olivier; étapes 4 TODO et 5 à compléter dans la capture du 25 sept.).",
    "Attention : le plan v3 (12 sept.) affiche encore le 15 octobre. Il est périmé. Aucune date de go/no-go n'est documentée.",
  ]},
  {"h": "Portée", "items": [
    "Phase 1 (charte v1, contrat) : SSO (seul mode en production), création et suivi de demandes, pièces jointes, workflow, tableau de suivi, rapports standards. Plus CR-01, rapports avancés (approuvé le 14 août).",
    "Hors portée : l'optimisation mobile avancée CR-04 (18 000 $, brouillon), reportée en phase 2 le 24 sept. (E10, décision de portée). La compatibilité mobile de base reste due. Données de production hébergées en Canada Central (ADR-007; migration vérifiée le 27 août).",
  ]},
  {"h": "Budget", "items": [
    "Autorisé : 204 000 $ CAD hors taxes = 180 000 $ (contrat, 7 juil. au 31 oct.) + 24 000 $ (CR-01). CR-04 non compris.",
    "Facturé : 186 000 $. Payé : 132 000 $. En validation : 54 000 $ (INV-003). Facturation valable (sans CR-04) : 168 000 $, donc 36 000 $ de marge. INV-778 (41 000 $) = projet ORION, exclue.",
  ]},
  {"h": "Situation des factures", "items": [
    "INV-001 (31 juil.) 60 000 $ payée. INV-002 (31 août) 72 000 $ payée (jalon 2 + CR-01). INV-003 (22 sept.) 54 000 $ EN VALIDATION, retenue par Finances (E07) : la ligne CR-04 de 18 000 $ n'a pas d'approbation. À contester; demander une facture corrigée à 36 000 $ (recommandation); payer le jalon 3 après confirmation de sa livraison.",
  ]},
  {"h": "Priorités (ordre proposé)", "items": [
    "1. Remplir les trois conditions de go-live (A-01 à A-05), dates à confirmer, avant le 22 oct. 2. Régler INV-003 (A-06). 3. Publier le plan v4 au 22 oct. et corriger le registre (R-01) (A-07, A-08). 4. Corriger le message de statut et le rapport du 21 sept.; ne pas annoncer « au vert » (A-09, A-10). 5. Planifier le go/no-go et publier le compte rendu du 26 sept. (A-11). 6. Surveiller la fin du contrat le 31 oct. (A-13).",
  ]},
 ],
 "footer": "Chaque affirmation renvoie à un fichier et à un repère dans la mémoire consultable (index.html). « À confirmer » veut dire qu'aucune date n'est documentée dans le dossier.",
}

# Modèle pour intégrer la nouvelle information (l'événement). Sa structure suit les vérifications du jury :
# statut du problème, décision antérieure, nouvelle proposition, impacts, actions touchées, ce qui ne change pas.
UPDATE_TEMPLATE = {
 "id": "U-01",
 "received_at": "AAAA-MM-JJTHH:MM (heure réelle de réception pendant le défi)",
 "event_date": "AAAA-MM-JJ (date fictive de l'événement, si elle est donnée)",
 "source": {"file": "nom du fichier reçu (à déposer dans corpus/09_Evenement/)", "loc": "repère précis (ligne, page, heure)", "quote": "citation mot pour mot"},
 "summary": "Ce qui vient de changer, en une phrase, sans interprétation.",
 "problem_status": "Statut du PROBLÈME concerné (ex. : SEC-210 toujours EN VALIDATION; ACC-303 fermé par Mélissa le …; runbook livré mais pas approuvé).",
 "prior_decision": "Décision ANTÉRIEURE qui reste en vigueur tant qu'une instance ne l'a pas changée (ex. : 22 octobre approuvé le 10 sept., sous les trois conditions du 26 sept.).",
 "new_proposal": "Nouvelle PROPOSITION, s'il y en a une : qui la fait, à qui, et le fait qu'elle n'est PAS approuvée tant qu'une décision n'est pas documentée.",
 "affected_facts": [{"ref": "Q01 / D-01 / C-03 …", "before": "valeur du baseline", "after": "valeur mise à jour", "evidence": "fichier + repère"}],
 "affected_actions": [{"ref": "A-0x", "change": "fermée / modifiée / date précisée / nouvelle", "evidence": "fichier + repère"}],
 "new_actions": [{"id": "A-14", "title": "…", "owner": "… (confirmé ou proposé)", "due": "date connue ou « à confirmer »", "evidence": "fichier + repère"}],
 "unchanged": "Ce qui ne change PAS : les autres conditions de go-live restent ouvertes; aucune approbation n'est inventée; le baseline du 30 sept. est conservé.",
 "uncertainty": "Ce que l'événement ne dit pas.",
}

USAGE = {
 "open": [
   "Ouvrir index.html dans un navigateur (Chrome, Edge, Firefox ou Safari). Pas de serveur, rien à installer, pas de compte, pas d'abonnement. Tout est dans le fichier : textes extraits, captures, données.",
   "Le dossier corpus/ contient la copie complète du dossier reçu (Projet360_NOVA_ETUDIANTS). Les liens « Ouvrir le fichier original » pointent vers ces fichiers. Selon le navigateur, un PDF ou un .eml peut s'ouvrir dans une autre application.",
   "Brief_reprise_NOVA.pdf (une page), Mode_emploi.md et Reponses_Q01-Q10.md sont les versions à imprimer. nova_memory.json est la mémoire structurée, réutilisable par un autre outil ou un chatbot.",
 ],
 "navigate": [
   "Onglets : Brief, Questions (Q01 à Q10), Chronologie, Décisions, Contradictions, Actions, Sources, Mise à jour, Mode d'emploi.",
   "Chaque affirmation porte une puce de preuve [fichier · repère]. Un clic ouvre le fichier avec les lignes citées surlignées. Pour une capture, l'image s'affiche avec sa transcription.",
   "Recherche (barre en haut) : cherche à la fois dans la mémoire (réponses, décisions, actions) et dans le texte complet des 64 fichiers. Exemples : « rollback », « 18 000 », « Canada Central », « déployé ».",
   "Filtres de la chronologie : par thème (sécurité, finances…) et par type (proposition, décision, validation, contradiction). Les entrées anciennes sont grisées. Le bouton « valable au 30 sept. seulement » les cache.",
   "Choix de vue (en haut) : « Baseline 30 sept. 9 h » ou « Mis à jour (événement) ». Le baseline n'est jamais modifié : les mises à jour sont des couches datées qui s'ajoutent par-dessus.",
 ],
 "tools": [
   "Extraction : Python 3 (module email pour les .eml, openpyxl pour les .xlsx, pdftotext pour les PDF, Tesseract pour lire les captures). Le fichier sources.json contient le texte extrait et les empreintes SHA-256 (pour repérer les pièces jointes en double).",
   "Analyse et rédaction : assistant IA (Claude) pour la lecture croisée, les réponses et les registres. Chaque fait a été vérifié à la main dans le fichier source avant d'être gardé.",
   "Rendu : HTML, CSS et JavaScript sans dépendance externe (fonctionne hors ligne, en file://).",
   "Aide rapide à la fiche d'événement (sans IA) : l'outil reconnaît par mots-clés qui parle, la nature du document et les sujets touchés, puis applique des règles fixes (qui a le pouvoir de valider quoi, ce qui reste ouvert, quels identifiants sont touchés) pour remplir la fiche. Instantané, vérifiable, et c'est le chemin recommandé pendant la présentation.",
   "Assistant IA local (optionnel) : un modèle de langage qui tourne sur l'ordinateur (Ollama ou LM Studio, aucune donnée ne sort). Il sert à deux choses : répondre à une question en langage naturel en citant fichier et ligne (onglet Assistant IA), et pré-remplir la fiche d'événement (onglet Mise à jour). Il ne décide rien : il rédige un brouillon, et un humain vérifie chaque ligne. Les dix réponses du baseline ont été vérifiées à la main, pas générées par ce modèle.",
 ],
 "manual": [
   "Lecture visuelle des 8 captures d'écran (l'OCR a été corrigé à la main : « TODO », « À compléter », « --- », etc.).",
   "Choix de qui décide quoi et résolution des contradictions : jugement humain, expliqué dans l'onglet Contradictions.",
   "Rédaction des actions « recommandation » (séparées des engagements documentés) et des dates « à confirmer ».",
   "Intégration de la nouvelle information : l'aide rapide (règles) ou le modèle local proposent un brouillon, mais les passages « À COMPLÉTER », la vérification, la correction et l'enregistrement sont faits à la main dans l'onglet Mise à jour, puis export dans updates.js.",
 ],
 "limits": [
   "L'assistant IA est optionnel et local : sans Ollama ou LM Studio, il ne répond pas, et tout le reste fonctionne (recherche par mots-clés, onglet Questions, fiche à remplir à la main).",
   "Testé sur un MacBook Pro sans GPU avec qwen2.5:7b : environ 7 minutes par fiche, et le brouillon contenait des erreurs graves (un ticket « fermé » par une personne qui n'avait rien validé, un livrable « livré » qui n'était qu'annoncé, une action qui suivait la demande du fournisseur). C'est pour cela que l'aide rapide par règles est le chemin recommandé en direct, et que le modèle sert surtout aux questions préparées d'avance.",
   "Un modèle local peut se tromper, surtout sur qui a le pouvoir de décider. C'est pour ça qu'il cite ses sources, que les citations sont cliquables, et qu'un contrôle de forme signale les références ou lignes qui n'existent pas. La réponse du modèle est toujours marquée « brouillon, à vérifier ».",
   "La recherche de passages est par mots-clés (pas de base vectorielle) : une question formulée avec d'autres mots que le dossier peut rater un passage. Reformulez avec les mots du projet (SEC-210, runbook, CR-04…).",
   "Les montants sont comparés en CAD hors taxes, tels qu'écrits. Aucun calcul de taxes.",
   "Les PDF sont affichés en texte extrait (mise en page approximative). L'original est accessible par lien.",
   "Les heures des transcriptions sont celles des documents. Les fuseaux horaires ne sont pas normalisés.",
 ],
 "uncertain": [
   "Dates inconnues : re-test SEC-210; « prochaine build » (correctif ACC-303); livraison du runbook final; go/no-go.",
   "Auteur du rapport de statut du 21 sept. inconnu. Plafond budgétaire qu'il utilise non précisé.",
   "Pas de réponse écrite de Nicolas à Finances (INV-003) ni à Alex (communication) dans le dossier. Compte rendu du comité du 26 sept. annoncé mais absent.",
   "Livraison réelle du jalon 3 (36 000 $) non documentée. Date exacte de la build de stabilisation non documentée.",
   "Date à laquelle la transition Élodie vers Nicolas a été « convenue » (le plan v3 du 12 sept. l'anticipe).",
   "Rôle exact de Boréal dans la rédaction du runbook (déduit de « je relance notre équipe ops »).",
 ],
}
