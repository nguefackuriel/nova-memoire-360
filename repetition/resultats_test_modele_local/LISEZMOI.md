# Traces du test du modèle local (3 octobre 2026, MacBook Pro sans GPU, Ollama, qwen2.5:7b)

On a gardé ces fichiers tels quels. Ils montrent ce que le modèle local a vraiment produit, et pourquoi on ne lui confie pas la fiche d'événement en direct.

- `resultat_bench.txt` : vitesse mesurée. 21 jetons lus par seconde, 4,6 écrits par seconde. Environ 5 minutes par fiche.
- `resultat_evenement.txt` : la commande et sa durée (7 min 28 s).
- `E13_exemple_fictif.brouillon.json` : le brouillon produit pour le faux événement E13. Il contient quatre erreurs graves : « ACC-303 fermé par Mélissa » (personne n'a validé), « runbook livré » (seulement annoncé), une action « libérer INV-003 au complet » (obéit au fournisseur), et un « avant : 15 octobre » (le baseline est au 22).

La bonne réponse attendue est dans `../exemple_updates.js`. C'est cette comparaison qui a mené à l'aide par règles (sans modèle) dans l'onglet Mise à jour.
