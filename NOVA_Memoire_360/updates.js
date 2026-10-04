/* NOVA Mémoire 360 : MISES À JOUR après la nouvelle information.
   Ce fichier est chargé par index.html. Le baseline (30 sept. 2026, 9 h) n'est jamais modifié :
   chaque événement est une couche datée ajoutée à la liste ci-dessous.
   Modèle d'un élément (copier, remplir, respecter la syntaxe JSON) :
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
   Champ 'ref' : Q01 à Q10, D-01 à D-08, C-01 à C-10, A-01 à A-13. Plusieurs refs possibles, séparées par des espaces.
*/
window.NOVA_UPDATES = [];
