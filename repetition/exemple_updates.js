/* EXEMPLE DE RÉPÉTITION (événement fictif E13, inventé pour s'entraîner). Ne pas livrer tel quel.
   Pour s'entraîner : copier ce fichier par-dessus NOVA_Memoire_360/updates.js, recharger index.html,
   choisir la vue « Mis à jour (événement) », puis remettre le updates.js vide. */
window.NOVA_UPDATES = [
  {
    "id": "U-01",
    "received_at": "2026-10-04T14:05",
    "event_date": "2026-10-01",
    "event_type": "proposition",
    "theme": "gouvernance",
    "source": {
      "file": "09_Evenement/E13_exemple_fictif.eml",
      "loc": "courriel du 1er oct. 08:40, lignes 10 à 16",
      "quote": "Elle inclut le correctif ACC-303 : nos tests clavier passent […] Le runbook final […] vous sera envoyé vendredi. […] Nous proposons de confirmer le 22 octobre comme date ferme […] le jalon 3 est livré : merci de libérer INV-003 au complet."
    },
    "summary": "Boréal livre une build avec le correctif ACC-303, annonce le runbook pour vendredi, propose de confirmer le 22 octobre comme date ferme et demande le paiement complet de INV-003.",
    "problem_status": "ACC-303 : correctif LIVRÉ en validation (build 2026.10.01), tests du fournisseur OK; le ticket reste OUVERT tant que Mélissa n'a pas retesté. Runbook : toujours PAS livré (annoncé pour vendredi), OPS-601 reste OUVERT. SEC-210 : inchangé, EN VALIDATION. INV-003 : la ligne CR-04 de 18 000 $ reste non approuvée; Boréal affirme que le jalon 3 est livré, sans preuve côté client.",
    "prior_decision": "22 octobre approuvé par le comité de direction le 10 sept. (M04 15:25), sous les trois conditions du 26 sept. (M06 10:09). Cette décision tient toujours : aucune instance n'a changé quoi que ce soit.",
    "new_proposal": "Boréal propose de confirmer le 22 octobre comme « date ferme » et considère deux conditions réglées. NON approuvée : Boréal n'a pas le pouvoir de fermer une condition. Seule Mélissa ferme ACC-303, seul Olivier approuve le runbook, et seul le comité peut lever le caractère conditionnel de la date.",
    "affected_facts": [
      {"ref": "Q09 C-04", "before": "ACC-303 ouvert, correctif annoncé pour la prochaine build", "after": "Correctif livré dans la build 2026.10.01, tests fournisseur OK; ticket toujours ouvert, en attente du retest de Mélissa", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 10"},
      {"ref": "Q10 D-07", "before": "Runbook : version finale pas reçue au 29 sept.", "after": "Version finale annoncée pour vendredi, toujours pas reçue; étapes 4 et 5 pas vérifiées", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 12"},
      {"ref": "Q01 D-01", "before": "22 octobre, approuvé, sous trois conditions", "after": "Inchangé : 22 octobre, toujours sous trois conditions. S'ajoute une proposition de Boréal de le rendre « ferme », non approuvée", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 14"},
      {"ref": "Q06", "before": "Livraison du jalon 3 non documentée", "after": "Boréal affirme que le jalon 3 est livré; aucune confirmation côté client; les 18 000 $ CR-04 restent refusés", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 16"}
    ],
    "affected_actions": [
      {"ref": "A-02", "change": "Faite par Boréal (livraison du correctif dans la build 2026.10.01). Reste à valider côté client.", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 10"},
      {"ref": "A-03", "change": "Devient urgente : Mélissa doit retester ACC-303 sur la build 2026.10.01 (Chrome et Edge, Tab jusqu'à Enregistrer).", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 10"},
      {"ref": "A-04", "change": "Date annoncée par Boréal : vendredi 2 oct. (à confirmer par la réception réelle). Vérifier les étapes 4 et 5 à la réception.", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 12"},
      {"ref": "A-06", "change": "Avant tout paiement du jalon 3, demander la preuve de livraison. Les 18 000 $ CR-04 restent refusés.", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 16"}
    ],
    "new_actions": [
      {"id": "A-14", "title": "Répondre à Boréal : le 22 octobre reste sous conditions; Boréal ne peut pas fermer une condition; rappeler qui valide quoi", "owner": "Nicolas Perron (proposé)", "due": "À confirmer (dès que possible)", "evidence": "09_Evenement/E13_exemple_fictif.eml, l. 14; M06 10:09 à 10:16"},
      {"id": "A-15", "title": "Vérifier le runbook à sa réception : étape 4 (retour arrière) et étape 5 (validation après déploiement), exécutable sans l'équipe projet", "owner": "Olivier Côté (confirmé pour l'approbation)", "due": "À confirmer (après réception, annoncée vendredi)", "evidence": "OPS-601, l. 14; OPS-601_runbook.png"}
    ],
    "unchanged": "SEC-210 reste EN VALIDATION (condition 1 ouverte). ACC-303 reste OUVERT tant que Mélissa n'a pas validé (condition 2 ouverte). Le runbook n'est ni reçu ni approuvé (condition 3 ouverte). Le 22 octobre reste une cible sous conditions, pas une date ferme. La ligne CR-04 de 18 000 $ reste refusée. Le baseline du 30 sept. est conservé.",
    "uncertainty": "Résultat du retest de Mélissa. Contenu réel du runbook (l'étape 5 sera-t-elle incluse?). Preuve de livraison du jalon 3. Date réelle de réception du runbook."
  }
];
