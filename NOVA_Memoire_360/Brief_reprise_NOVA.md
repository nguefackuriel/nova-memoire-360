# NOVA : brief de reprise

_État au 30 septembre 2026, 9 h (Montréal). C'est le baseline du dossier de départ._

## Responsable
- Nicolas Perron est chargé de projet depuis le 16 septembre 2026 (E06, note de transition, Teams du 16 sept.). Élodie Caron l'a précédé du 7 juillet au 15 septembre. Elle reste joignable quelques jours.
- Fournisseur : Boréal Numérique Inc. (Julien Moreau). Qui valide quoi : Sophie Lambert (sécurité), Mélissa Gagnon (accessibilité et QA), Olivier Côté (exploitation), Marc Gervais (architecture et intégration), Camille Beaulieu (données), Amélie Fortin (finances).

## Date approuvée et conditions
- Mise en production : 22 octobre 2026. Proposée par Boréal le 8 sept. (E05), approuvée par le comité de direction le 10 sept. à 15:25 (M04). Cause du report : le connecteur interne INT-101, réglé et fermé le 17 sept. (E12). La date reste le 22.
- La date dépend de trois validations (comité du 26 sept., M06; rappel E09 du 27 sept.). Aucune n'est faite au 30 sept. : 1) la sécurité accepte SEC-210 (Sophie); 2) ACC-303 est fermé (Mélissa; correctif Boréal « prochaine build »); 3) le runbook est approuvé avec le retour arrière (Olivier; étapes 4 TODO et 5 à compléter dans la capture du 25 sept.).
- Attention : le plan v3 (12 sept.) affiche encore le 15 octobre. Il est périmé. Aucune date de go/no-go n'est documentée.

## Portée
- Phase 1 (charte v1, contrat) : SSO (seul mode en production), création et suivi de demandes, pièces jointes, workflow, tableau de suivi, rapports standards. Plus CR-01, rapports avancés (approuvé le 14 août).
- Hors portée : l'optimisation mobile avancée CR-04 (18 000 $, brouillon), reportée en phase 2 le 24 sept. (E10, décision de portée). La compatibilité mobile de base reste due. Données de production hébergées en Canada Central (ADR-007; migration vérifiée le 27 août).

## Budget
- Autorisé : 204 000 $ CAD hors taxes = 180 000 $ (contrat, 7 juil. au 31 oct.) + 24 000 $ (CR-01). CR-04 non compris.
- Facturé : 186 000 $. Payé : 132 000 $. En validation : 54 000 $ (INV-003). Facturation valable (sans CR-04) : 168 000 $, donc 36 000 $ de marge. INV-778 (41 000 $) = projet ORION, exclue.

## Situation des factures
- INV-001 (31 juil.) 60 000 $ payée. INV-002 (31 août) 72 000 $ payée (jalon 2 + CR-01). INV-003 (22 sept.) 54 000 $ EN VALIDATION, retenue par Finances (E07) : la ligne CR-04 de 18 000 $ n'a pas d'approbation. À contester; demander une facture corrigée à 36 000 $ (recommandation); payer le jalon 3 après confirmation de sa livraison.

## Priorités (ordre proposé)
- 1. Remplir les trois conditions de go-live (A-01 à A-05), dates à confirmer, avant le 22 oct. 2. Régler INV-003 (A-06). 3. Publier le plan v4 au 22 oct. et corriger le registre (R-01) (A-07, A-08). 4. Corriger le message de statut et le rapport du 21 sept.; ne pas annoncer « au vert » (A-09, A-10). 5. Planifier le go/no-go et publier le compte rendu du 26 sept. (A-11). 6. Surveiller la fin du contrat le 31 oct. (A-13).

## Conditions de go-live : actions, responsables, échéances
| # | Condition | Action | Responsable | Échéance | Preuve |
|---|---|---|---|---|---|
| 1 | Sécurité SEC-210 | A-01 Refaire le test de SEC-210 (le journal doit montrer l'objet et le résultat de l'export CSV), puis donner ou refuser l'acceptation sécurité | Sophie Lambert (sécurité) (confirmé) | À confirmer (re-test « planifié » le 26 sept., sans date; à faire avant le 22 oct.) | `03_Tickets/SEC-210.txt`, commentaires du 19 sept. 14:05 et du 26 sept. 15:40 |
| 2 | Accessibilité ACC-303 | A-02 Livrer le correctif ACC-303 (le focus clavier bloqué dans la fenêtre « Modifier le dossier ») dans la prochaine build | Boréal Numérique (Julien Moreau) (confirmé) | À confirmer (« prochaine build », date non documentée) | `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:12 |
| 2 | Accessibilité ACC-303 | A-03 Retester ACC-303 au clavier (Chrome et Edge, Tab jusqu'à « Enregistrer ») et fermer le ticket | Mélissa Gagnon (QA et accessibilité) (confirmé) | À confirmer (après la build corrective; avant le 22 oct.) | `03_Tickets/ACC-303.txt`, Statut OUVERT |
| 3 | Runbook + rollback | A-04 Livrer le runbook final : écrire l'étape 4 « Procédure de retour arrière » (TODO) et l'étape 5 « Validation fonctionnelle post-déploiement » (À compléter). Une autre personne doit pouvoir l'exécuter sans l'équipe projet | Boréal Numérique (équipe ops relancée par Julien) (confirmé) | À confirmer (version finale toujours attendue le 29 sept.; Olivier la veut « quelques jours » avant la mise en production) | `03_Tickets/OPS-601_runbook.png`, capture du 25 sept., étapes 4 et 5 |
| 3 | Runbook + rollback | A-05 Approuver le runbook et donner le go exploitation | Olivier Côté (exploitation) (confirmé) | À confirmer (avant le 22 oct.) | `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:07 |

_Chaque affirmation renvoie à un fichier et à un repère dans la mémoire consultable (index.html). « À confirmer » veut dire qu'aucune date n'est documentée dans le dossier._