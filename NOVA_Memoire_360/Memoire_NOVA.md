# NOVA : mémoire consultable (version texte)

Baseline : 30 septembre 2026, 9 h (Montréal). Version interactive : `index.html`.

## 1. Chronologie

| Date | Type | Thème | Événement | Valable au 30 sept. | Source |
|---|---|---|---|---|---|
| 2026-06 | fait | échéancier | Plan préliminaire de juin : mise en production visée le 15 octobre | ancien | `08_Archives_et_documents_connexes/Plan_NOVA_preliminaire_juin.xlsx`, l. 4 |
| 2026-07-07 | décision | gouvernance | Démarrage de NOVA : Élodie Caron chargée de projet, budget maximal 180 000 $, cible 15 octobre, portée de la phase 1 | ancien | `02_Reunions/M01_CR_Demarrage_07juillet.txt`, l. 8 à 12 |
| 2026-07-18 | livraison | architecture | Architecture v1 (East US) préparée par Boréal | ancien | `06_Architecture_et_decisions/Architecture_NOVA_v1.pdf`, l. 1 à 7 |
| 2026-07-22 | fait | architecture | Sophie Lambert conteste East US et demande que les données de production restent au Canada | ancien | `01_Courriels/E02_Question_hebergement.eml`, l. 9 à 11 |
| 2026-07-23 | décision | architecture | Atelier architecture : Canada Central choisi (09:10 à 09:12); SSO seulement en production; audit admin à valider | oui | `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, l. 11 à 17 |
| 2026-07-31 | fait | finances | INV-001 : 60 000 $ (acompte phase 1), payée | oui | `05_Contrats_et_finances/INV-001.pdf`, l. 12 à 21 |
| 2026-08-11 | fait | accessibilité | ACC-301 créé (champ sans étiquette pour le lecteur d'écran) | ancien | `03_Tickets/ACC-301.txt`, l. 1 à 9 |
| 2026-08-12 | fait | accessibilité | ACC-302 créé (contraste 2,1:1). Mélissa annonce un passage clavier des fenêtres dans une prochaine build | ancien | `03_Tickets/ACC-302.txt`, l. 1 à 14 |
| 2026-08-14 | décision | finances | CR-01 « rapports avancés » APPROUVÉE : +24 000 $ (comité de projet), sans changement de date | oui | `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf`, l. 5 à 15 |
| 2026-08-15 | validation | accessibilité | ACC-301 fermé, validé avec NVDA et VoiceOver (Mélissa) | oui | `03_Tickets/ACC-301.txt`, l. 16 |
| 2026-08-20 | validation | accessibilité | ACC-302 fermé, re-test OK à 5,3:1 (Mélissa). Boréal écrit « tout devrait être conforme » | oui | `03_Tickets/ACC-302.txt`, l. 16 |
| 2026-08-25 | livraison | architecture | Architecture v2 (Canada Central), « version révisée après ADR-007 » | oui | `06_Architecture_et_decisions/Architecture_NOVA_v2.pdf`, l. 1 à 7 |
| 2026-08-26 | livraison | architecture | Boréal : migration vers Canada Central terminée; test de déploiement et de connectivité sans blocage | oui | `01_Courriels/E03_Confirmation_Canada_Central.eml`, l. 9 à 11 |
| 2026-08-27 | validation | architecture | Comité : migration Canada Central vérifiée par l'équipe architecture; anomalies d'accessibilité en partie corrigées; connecteur à surveiller, aucun retard approuvé | oui | `02_Reunions/M03_CR_Comite_27aout.txt`, l. 5 à 13 |
| 2026-08-31 | fait | finances | INV-002 : 72 000 $ (jalon 2 48 000 $ + CR-01 24 000 $), payée | oui | `05_Contrats_et_finances/INV-002.pdf`, l. 12 à 23 |
| 2026-09-02 | fait | données | DATA-401 créé : doublons dans le lot MIG-09-02 (dossiers 8401 et 8402) | ancien | `03_Tickets/DATA-401.txt`, l. 1 à 16 |
| 2026-09-03 | fait | performance | PERF-501 créé : recherche de dossiers lente (6 à 8 s) | ancien | `03_Tickets/PERF-501.txt`, l. 1 à 14 |
| 2026-09-04 | proposition | portée | CR-04 (optimisation mobile avancée, 18 000 $) : demande de Boréal, BROUILLON | oui | `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, l. 6 à 15 |
| 2026-09-05 | fait | intégration | INT-101 créé : recherches vides en intégration, erreurs 401, jeton de service expiré après un changement de secret | ancien | `03_Tickets/INT-101.txt`, l. 14 à 15 |
| 2026-09-07 | validation | performance | PERF-501 fermé : index ajouté, moyenne de 620 ms sur 50 essais | oui | `03_Tickets/PERF-501.txt`, l. 15 à 16 |
| 2026-09-08 | fait | intégration | INT-101 : secret remplacé, mais erreurs par moments. Marc : « met en risque le 15 octobre » | ancien | `03_Tickets/INT-101.txt`, l. 16 |
| 2026-09-08 | proposition | échéancier | PROPOSITION de Boréal (Julien Moreau, 11:16) : déplacer la mise en production au 22 octobre | oui | `01_Courriels/E05_Retard_integration.eml`, l. 9 à 13 |
| 2026-09-09 | validation | données | DATA-401 fermé : rejeu de 15 000 événements sans doublon (clé external_request_id) | oui | `03_Tickets/DATA-401.txt`, l. 18 à 19 |
| 2026-09-10 | décision | échéancier | APPROBATION par le comité de direction (15:22 à 15:25) : la date officielle passe du 15 au 22 octobre 2026 | oui | `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, l. 17 à 25 |
| 2026-09-12 | fait | sécurité | SEC-210 créé par Sophie : journalisation des exports CSV incomplète, « Bloquante avant production » | oui | `03_Tickets/SEC-210.txt`, l. 1 à 18 |
| 2026-09-12 | contradiction | échéancier | Plan projet v3 publié avec P-06 toujours au 15 octobre (« Cible de planification »), responsable Nicolas Perron | ancien | `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 8 |
| 2026-09-15 | communication | échéancier | Teams : Alex prépare une communication au 15 octobre. Nicolas corrige (22 octobre approuvé le 10) et note que le plan n'a pas été corrigé | oui | `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt`, l. 4 à 6 |
| 2026-09-16 | décision | gouvernance | Transition : Nicolas Perron chargé de projet à partir du 16 septembre (Élodie reste quelques jours) | oui | `01_Courriels/E06_Transition_charge_projet.eml`, l. 9 à 11 |
| 2026-09-17 | validation | intégration | INT-101 : correctif déployé (14:23), 120 recherches sur 120 réussies; validé et fermé par Marc (16:10); courriel E12 (16:22) | oui | `03_Tickets/INT-101.txt`, l. 17 à 20 |
| 2026-09-17 | fait | accessibilité | ACC-303 créé (13:14) : dans la fenêtre de modification, Tab n'atteint jamais « Enregistrer » (Chrome et Edge). Priorité haute | oui | `03_Tickets/ACC-303.txt`, l. 1 à 14 |
| 2026-09-18 | fait | accessibilité | Boréal reproduit ACC-303 : liste d'éléments incomplète dans le composant de fenêtre | oui | `03_Tickets/ACC-303.txt`, l. 15 |
| 2026-09-18 | fait | gouvernance | Suivi livraison : INT-101 fermé, DATA-401 validé, PERF-501 sous 1 s, SEC-210 correctif en préparation, ACC-301 et 302 fermés, scénario clavier à vérifier, runbook pas final. Le 22 octobre reste approuvé | oui | `02_Reunions/M05_CR_Suivi_18sept.txt`, l. 6 à 13 |
| 2026-09-19 | livraison | sécurité | Boréal déploie le correctif SEC-210 en validation (10:20 et 10:22). Sophie : « déployé » n'est pas « accepté », ticket gardé EN VALIDATION (14:05) | oui | `01_Courriels/E08_Correctif_journalisation.eml`, l. 9 à 11 |
| 2026-09-20 | hors-sujet | finances | INV-778 (41 000 $) : projet ORION, pas NOVA | ancien | `08_Archives_et_documents_connexes/INV-778_Projet_ORION.pdf`, l. 10 à 24 |
| 2026-09-21 | contradiction | gouvernance | Rapport de statut : tout VERT sauf Exploitation JAUNE. Sécurité « correctif livré », Accessibilité « correctifs appliqués » | ancien | `04_Documents_projet/Rapport_Statut_21sept.pdf`, l. 6 à 18 |
| 2026-09-21 | communication | gouvernance | Alex (16:28) propose un brouillon : « NOVA est au vert. La sécurité et l'accessibilité sont complétées ». Il se base sur le rapport | ancien | `01_Courriels/E11_Communication_statut.eml`, l. 9 à 13 |
| 2026-09-22 | fait | finances | INV-003 : 54 000 $ (jalon 3 36 000 $ + CR-04 18 000 $), en validation | oui | `05_Contrats_et_finances/INV-003.pdf`, l. 12 à 26 |
| 2026-09-22 | fait | portée | Teams : Julien pensait le mobile avancé inclus. Nicolas : la compatibilité de base oui, le package CR-04 à 18 k non | oui | `07_Conversations_Teams/Teams_22sept_Mobile.txt`, l. 4 à 6 |
| 2026-09-23 | fait | finances | Amélie Fortin (Finances) retient INV-003 et demande l'approbation de CR-04 | oui | `01_Courriels/E07_Facture_003_question.eml`, l. 9 à 11 |
| 2026-09-24 | décision | portée | Nicolas : CR-04 hors phase 1, reporté en phase 2. Aucune dépense CR-04 à engager ni facturer sans nouvelle approbation | oui | `01_Courriels/E10_Fonction_mobile.eml`, l. 9 à 11 |
| 2026-09-25 | fait | exploitation | OPS-601 créé par Olivier : runbook pas prêt. Retour arrière manquant (étape 4 TODO) et validation après déploiement à compléter (étape 5) | oui | `03_Tickets/OPS-601.txt`, l. 1 à 14 |
| 2026-09-26 | décision | gouvernance | Comité de direction : le 22 octobre dépend de TROIS conditions : validation sécurité SEC-210, fermeture ACC-303, approbation du runbook avec rollback | oui | `02_Reunions/M06_Transcript_Comite_26sept.txt`, l. 5 à 25 |
| 2026-09-26 | fait | accessibilité | ACC-303 toujours ouvert (Mélissa, 11:03). Correctif annoncé pour la prochaine build | oui | `03_Tickets/ACC-303.txt`, l. 16 |
| 2026-09-26 | fait | sécurité | SEC-210 : re-test prévu, statut gardé EN VALIDATION (Sophie, 15:40) | oui | `03_Tickets/SEC-210.txt`, l. 25 |
| 2026-09-27 | communication | échéancier | E09 : Nicolas rappelle que la cible approuvée est le 22 octobre, sous conditions. Ne pas annoncer un go garanti | oui | `01_Courriels/E09_Rappel_mise_en_production.eml`, l. 9 à 13 |
| 2026-09-29 | fait | exploitation | OPS-601 : Olivier n'a toujours pas reçu la version finale du runbook | oui | `03_Tickets/OPS-601.txt`, l. 16 |
| 2026-09-29 | contradiction | gouvernance | Registre de risques du 29 septembre : R-01 connecteur « Ouvert » (suivi au 9 sept.) alors que INT-101 est fermé depuis le 17. R-02, R-03, R-04 ouverts (justes). R-05 fermé | oui | `04_Documents_projet/Registre_Risques_29sept.xlsx`, l. 3 à 7 |
| 2026-09-30 | fait | gouvernance | Date de référence du dossier : 30 septembre 2026, 9 h (Montréal) | oui | `README.txt`, l. 6 |
| 2026-09-30 | fait | échéancier | Fin prévue du développement de la phase 1 (P-03) selon le plan v3 | oui | `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 5 |
| 2026-10-05 | fait | échéancier | Fin prévue des tests intégrés (P-04, Mélissa) dans le plan v3, encore calé sur le 15 octobre | oui | `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 6 |
| 2026-10-10 | fait | échéancier | Fin prévue de la préparation exploitation (P-05, Olivier) dans le plan v3 | oui | `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 7 |
| 2026-10-22 | décision | échéancier | CIBLE APPROUVÉE de mise en production (sous conditions) | oui | `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, l. 23 |
| 2026-10-31 | fait | finances | Fin de la période du contrat avec Boréal | oui | `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, l. 16 |

## 2. Décisions (qui propose, qui décide, qui confirme)

### D-01. Date de mise en production : 22 octobre 2026 (au lieu du 15)
_Statut : Approuvée, sous conditions_

- **Proposition :** Julien Moreau (Boréal), 8 sept. 2026, 11:16 (répétée le 10 sept. à 15:02). Source : `01_Courriels/E05_Retard_integration.eml`, l. 9 à 13
- **Décision :** Comité de direction NOVA. Formulée par Élodie Caron, 10 sept. 2026, 15:22 à 15:25. Source : `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, l. 17 à 23
- **Validation ou confirmation :** Confirmée par Nicolas (Teams 15 sept., E09 27 sept.), par le suivi du 18 sept. et par le comité du 26 sept., 15 au 27 sept.. Source : `01_Courriels/E09_Rappel_mise_en_production.eml`, l. 9 à 13
- **Pourquoi :** Connecteur interne (INT-101) : temps perdu, pas assez de marge pour stabiliser; reprise des tests intégrés; ne pas raccourcir les tests de sécurité et d'accessibilité; pas de pénalité au contrat.
- **Conditions :** Trois conditions de go-live (D-07). Pas un go automatique (M04 15:27).
- **Documents touchés :** Plan projet (v3 toujours au 15 octobre), communications.

### D-02. Hébergement des données de production : Canada Central
_Statut : Acceptée. Mise en œuvre vérifiée_

- **Proposition :** Sophie Lambert (sécurité), comme exigence, 22 juil. 2026 (courriel), 23 juil. 09:06 (atelier). Source : `01_Courriels/E02_Question_hebergement.eml`, l. 9 à 11
- **Décision :** Atelier architecture (Élodie, Marc, Sophie, Julien). ADR-007, 23 juil. 2026, 09:10 à 09:12. Source : `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, l. 11 à 17
- **Validation ou confirmation :** Boréal (migration terminée, 26 août), puis comité du 27 août (vérifiée par l'équipe architecture), 26 et 27 août 2026. Source : `02_Reunions/M03_CR_Comite_27aout.txt`, l. 5
- **Pourquoi :** Les données de production doivent rester au Canada. Pour la sécurité, ce n'est « pas juste une préférence ».
- **Conditions :** ADR-007 : une validation technique avant les tests de production.
- **Documents touchés :** Architecture v1 dépassée; v2 en vigueur.

### D-03. Authentification : SSO seulement en production
_Statut : Décidée_

- **Proposition :** Marc Gervais (question), 23 juil. 09:14. Source : `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, l. 18
- **Décision :** Sophie Lambert (sécurité), confirmé par Boréal, 23 juil. 09:15 à 09:17. Source : `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, l. 19 à 20
- **Validation ou confirmation :** Résumé de l'atelier (09:43), 23 juil.. Source : `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, l. 30
- **Pourquoi :** Exigence de la sécurité. C'était déjà prévu par Boréal.

### D-04. CR-01, rapports avancés et export de synthèse : +24 000 $
_Statut : Approuvée_

- **Proposition :** Boréal (demande de changement), avant le 14 août 2026 (date non précisée). Source : `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf`, l. 2 à 3
- **Décision :** Comité de projet, 14 août 2026. Source : `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf`, l. 5 à 12
- **Validation ou confirmation :** Facturée sur INV-002 et payée, 31 août 2026. Source : `05_Contrats_et_finances/INV-002.pdf`, l. 14 à 23
- **Pourquoi :** Ajout de rapports avancés, hors portée de départ.
- **Conditions :** Aucun changement de date annoncé.
- **Documents touchés :** Montant autorisé : 204 000 $.

### D-05. CR-04, optimisation mobile avancée (18 000 $) : NON approuvée, reportée en phase 2
_Statut : Refusée pour la phase 1. La demande reste un brouillon_

- **Proposition :** Boréal (Julien Moreau), 4 sept. 2026 (brouillon); estimation évoquée au comité du 10 sept. à 15:35. Source : `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, l. 6 à 15
- **Décision :** Comité du 10 sept. : « aucune approbation aujourd'hui ». Nicolas Perron (chargé de projet) : reporté en phase 2, 10 sept. 15:37, puis 24 sept. 2026. Source : `01_Courriels/E10_Fonction_mobile.eml`, l. 9 à 11
- **Validation ou confirmation :** Document de décision de portée; rappel au comité du 26 sept. (« Facturer du CR-04, non »), 24 au 26 sept.. Source : `06_Architecture_et_decisions/Decision_Portee_Phase2.md`, l. 3 à 6
- **Pourquoi :** Hors portée de la phase 1 (charte, contrat, compte rendu de démarrage). Ne pas mélanger avec les corrections d'accessibilité obligatoires.
- **Conditions :** Aucune dépense CR-04 engagée ni facturée sans nouvelle approbation.
- **Documents touchés :** INV-003 à corriger (ligne de 18 000 $).

### D-06. Changement de chargé de projet : Élodie Caron, puis Nicolas Perron
_Statut : En vigueur depuis le 16 septembre 2026_

- **Proposition :** « Comme convenu » : accord antérieur non documenté (le plan v3 du 12 sept. nomme déjà Nicolas sur P-06), avant le 16 sept.. Source : `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 8
- **Décision :** Élodie Caron (annonce officielle), 16 sept. 2026, 08:35. Source : `01_Courriels/E06_Transition_charge_projet.eml`, l. 9 à 11
- **Validation ou confirmation :** Note de transition; rappel Teams; Nicolas anime les comités suivants, 16 sept. et après. Source : `04_Documents_projet/Note_transition_Elodie_16sept.txt`, l. 4 à 10
- **Pourquoi :** Non documenté.
- **Conditions :** Élodie reste disponible quelques jours.
- **Documents touchés :** Charte v1 (pas mise à jour, c'est voulu).

### D-07. Trois conditions de go-live pour le 22 octobre
_Statut : Décidée. Aucune condition remplie au 30 sept._

- **Proposition :** Nicolas Perron (10 sept. 15:27 : critères sécurité, accessibilité, exploitation), puis synthèse au comité, 10 sept., puis 26 sept. 10:09. Source : `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, l. 24
- **Décision :** Comité de direction (Nicolas; confirmé par Sophie, Mélissa, Olivier), 26 sept. 2026, 10:09 à 10:16. Source : `02_Reunions/M06_Transcript_Comite_26sept.txt`, l. 11 à 16
- **Validation ou confirmation :** Courriel E09 à toute l'équipe, 27 sept. 2026, 17:02. Source : `01_Courriels/E09_Rappel_mise_en_production.eml`, l. 9 à 13
- **Pourquoi :** Sécurité : SEC-210 pas encore accepté. Accessibilité : ACC-303 bloquant. Exploitation : runbook sans retour arrière.
- **Conditions :** 1) validation sécurité SEC-210 (Sophie); 2) fermeture ACC-303 (Mélissa); 3) approbation du runbook avec rollback (Olivier).
- **Documents touchés :** Compte rendu du 26 sept. annoncé par Nicolas (absent du dossier).

### D-08. Correction des doublons de migration : clé d'idempotence sur external_request_id
_Statut : Faite et validée (DATA-401 fermé)_

- **Proposition :** Analyse DATA-401, 2 sept. 2026. Source : `03_Tickets/DATA-401.txt`, l. 13 à 16
- **Décision :** Équipe migration (Camille Beaulieu), sept. 2026. Source : `03_Tickets/DATA-401.txt`, l. 16
- **Validation ou confirmation :** Rejeu de 15 000 événements sans doublon; confirmé au comité du 10 sept., 9 sept. 2026. Source : `03_Tickets/DATA-401.txt`, l. 18 à 19
- **Pourquoi :** Les dossiers 8401 et 8402 étaient créés en double (deux messages Kafka presque en même temps).
- **Documents touchés :** Registre R-05 fermé (cohérent).

## 3. Contradictions résolues

### C-01. Date de mise en production : 15 octobre (plan v3 du 12 sept., charte, plan v2) contre 22 octobre (comité du 10 sept.) _(plan ou registre)_
- **Version A (écartée) :** P-06 Mise en production = 2026-10-15, note « Cible de planification ». Source : `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, cellules E7, F7, G7
- **Version B (retenue) :** « Le 22 devient la date officielle », approuvé par le comité de direction. Source : `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, 15:22 à 15:25
- **Ce qu'on retient (critère : qui décide + date des faits) :** Le 22 octobre l'emporte. Qui décide : le comité de direction a plus de poids qu'un document de planification. Dates : la décision (10 sept.) est plus récente que la charte (7 juil.) et que le plan v2. Le plan v3 (12 sept.) est postérieur à la décision, mais il ne l'a pas intégrée. Nicolas le constate sur Teams le 15 sept. (« le plan projet n'a visiblement pas encore été corrigé ») et la note de transition demande de « faire mettre à jour la date dans tous les plans ». La charte dit elle-même qu'elle n'est pas mise à jour après les décisions.
- **État au 30 sept. :** Pas corrigée au 30 sept. Le plan v3 reste le dernier plan disponible. Voir l'action A-07.
- **Autres preuves :** `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt`, l. 5; `04_Documents_projet/Note_transition_Elodie_16sept.txt`, l. 7; `04_Documents_projet/Charte_Projet_NOVA_v1.txt`, l. 20

### C-02. Risque R-01 « Retard du connecteur interne » OUVERT dans le registre du 29 sept., alors que INT-101 est fermé et validé depuis le 17 sept. _(plan ou registre)_
- **Version A (écartée) :** R-01 : Statut « Ouvert », commentaire « Suivi au 9 septembre 2026 ». Source : `04_Documents_projet/Registre_Risques_29sept.xlsx`, cellules F2 et H2
- **Version B (retenue) :** « INT-101 est fermé. Le problème d'intégration qui avait déclenché le risque d'échéancier est considéré résolu. ». Source : `01_Courriels/E12_Resolution_integration.eml`, courriel du 17 sept. 16:22
- **Ce qu'on retient (critère : date des faits + qui décide) :** Le ticket est fermé : la ligne R-01 est périmée. Date des faits : le fichier est daté du 29 sept., mais sa ligne R-01 n'a pas été revue depuis le 9 sept. (le commentaire le dit), alors que la fermeture date du 17 sept. (ticket, courriel du responsable architecture, suivi du 18 sept., logs 200 OK). Qui décide : le propriétaire du risque (Marc Gervais) est justement celui qui a validé la fermeture.
- **État au 30 sept. :** Registre à corriger (fermer R-01). Voir l'action A-08. Une date de fichier récente ne garantit pas une information à jour.
- **Autres preuves :** `03_Tickets/INT-101.txt`, l. 17 à 18; `02_Reunions/M05_CR_Suivi_18sept.txt`, l. 6; `03_Tickets/INT-101_extrait_logs.txt`, l. 3

### C-03. Sécurité « VERT, correctif livré » (rapport du 21 sept.) et « complétée » (brouillon d'Alex), contre SEC-210 EN VALIDATION, acceptation non donnée
- **Version A (écartée) :** Sécurité VERT. Correctif SEC-210 livré. Source : `04_Documents_projet/Rapport_Statut_21sept.pdf`, tableau Synthèse, ligne Sécurité
- **Version B (retenue) :** « Vous avez livré un fix. Nous n'avons pas encore donné l'acceptation sécurité de SEC-210. ». Source : `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:02
- **Ce qu'on retient (critère : qui décide + date des faits) :** La sécurité n'est pas acceptée. Qui décide : Sophie Lambert (sécurité). Le rapport confond livraison (par le fournisseur, 19 sept.) et validation (par le client), et il reconnaît avoir été écrit « avant la dernière vérification détaillée de certains tickets ». Dates : les positions de Sophie du 19 sept. (14:05) et du 26 sept. (15:40), et le comité du 26 sept., sont plus récents que le rapport du 21 sept. Le registre du 29 sept. (R-02 ouvert, probabilité élevée) est cohérent avec le ticket.
- **État au 30 sept. :** Rapport et brouillon de communication à corriger. Voir les actions A-09 et A-10.
- **Autres preuves :** `03_Tickets/SEC-210.txt`, l. 23 à 25; `07_Conversations_Teams/Teams_19sept_Securite.txt`, l. 5; `01_Courriels/E11_Communication_statut.eml`, l. 11 à 13; `04_Documents_projet/Registre_Risques_29sept.xlsx`, l. 4

### C-04. Accessibilité « VERT, correctifs appliqués » (rapport du 21 sept.) et « conforme » (Boréal, 20 août), contre ACC-303 OUVERT (bloquant) depuis le 17 sept.
- **Version A (écartée) :** Accessibilité VERT. Correctifs appliqués. Source : `04_Documents_projet/Rapport_Statut_21sept.pdf`, tableau Synthèse, ligne Accessibilité
- **Version B (retenue) :** « Il reste ACC-303. La modale ne permet toujours pas d'atteindre Enregistrer au clavier. Pour moi c'est un bloquant d'accessibilité avant production. ». Source : `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:05
- **Ce qu'on retient (critère : qui décide + date des faits) :** L'accessibilité n'est pas terminée. Qui décide : Mélissa Gagnon (QA et accessibilité) valide les tickets. Une correction annoncée par le fournisseur (E04, « tout devrait être conforme ») ne vaut pas validation, et elle ne portait que sur ACC-301 et 302. Dates : ACC-303 est créé le 17 sept., avant le rapport du 21 sept., et il est toujours ouvert le 26 sept. Les captures ACC-301 et 302 sont anciennes (défauts fermés les 15 et 20 août) et ne prouvent rien d'ouvert. La capture ACC-303 est confirmée par le ticket.
- **État au 30 sept. :** ACC-303 ouvert. Condition de go-live numéro 2. Voir les actions A-02 et A-03.
- **Autres preuves :** `03_Tickets/ACC-303.txt`, l. 14 à 16; `01_Courriels/E04_Corrections_accessibilite.eml`, l. 9 à 16; `02_Reunions/M05_CR_Suivi_18sept.txt`, l. 10; `04_Documents_projet/Registre_Risques_29sept.xlsx`, l. 6

### C-05. Portée mobile : Boréal pense que l'optimisation mobile avancée est incluse (Teams 22 sept.) et la facture (INV-003), contre la portée de la phase 1 et la décision de report en phase 2
- **Version A (écartée) :** « Je pensais que le mobile était inclus dans le scope initial, au moins l'optimisation avancée. » Plus la ligne « Optimisation interface mobile - CR-04 » de 18 000 $. Source : `07_Conversations_Teams/Teams_22sept_Mobile.txt`, 13:03
- **Version B (retenue) :** « les optimisations mobiles avancées proposées dans CR-04 ne font pas partie de la phase 1 approuvée. Nous les reportons à la phase 2. ». Source : `01_Courriels/E10_Fonction_mobile.eml`, courriel du 24 sept.
- **Ce qu'on retient (critère : qui décide (contrat + gouvernance)) :** Hors portée. Qui décide : le contrat (la portée incluse ne mentionne pas le mobile; tout travail hors portée demande une demande de changement écrite et approuvée), la charte v1, le compte rendu de démarrage (mobile avancé jamais discuté comme livrable), le comité du 10 sept. (aucune approbation) et la décision du chargé de projet (24 sept.). CR-04 est resté un brouillon. Seule la « compatibilité de base » mobile fait partie de la phase 1 (Nicolas, Teams 22 sept.).
- **État au 30 sept. :** INV-003 à corriger (18 000 $). Voir l'action A-06.
- **Autres preuves :** `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, l. 18 à 24; `02_Reunions/M01_CR_Demarrage_07juillet.txt`, l. 19 à 20; `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, l. 30 à 35; `05_Contrats_et_finances/INV-003.pdf`, l. 21; `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, l. 8 à 15

### C-06. Responsable du projet : Élodie Caron (charte v1, plan v2) contre Nicolas Perron (plan v3 du 12 sept., annonce du 16 sept.) _(plan ou registre)_
- **Version A (écartée) :** Chargée de projet : Élodie Caron. P-06 responsable Élodie Caron. Source : `04_Documents_projet/Charte_Projet_NOVA_v1.txt`, ligne 4; plan v2 cellule D7
- **Version B (retenue) :** « Nicolas Perron prend officiellement la charge du projet NOVA à compter d'aujourd'hui, 16 septembre. ». Source : `01_Courriels/E06_Transition_charge_projet.eml`, courriel du 16 sept. 08:35
- **Ce qu'on retient (critère : date des faits + nature du document) :** Nicolas Perron, depuis le 16 septembre. Dates : l'annonce officielle, la note de transition et le rappel Teams (16 sept.) sont plus récents que la charte (7 juil.) et que le plan v2. Nature du document : la charte n'est pas mise à jour après les décisions (ligne 20). Petit écart : le plan v3 daté du 12 sept. nomme déjà Nicolas (D7). La transition avait donc été convenue avant l'annonce, mais la date officielle reste le 16 sept.
- **État au 30 sept. :** Résolue.
- **Autres preuves :** `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, l. 8; `04_Documents_projet/Plan_Projet_NOVA_v2.xlsx`, l. 8; `04_Documents_projet/Note_transition_Elodie_16sept.txt`, l. 4

### C-07. Budget « VERT, sous le plafond contractuel » (rapport du 21 sept.) contre la facture INV-003 qui contient 18 000 $ non autorisés
- **Version A (écartée) :** Budget VERT. Sous le plafond contractuel. Source : `04_Documents_projet/Rapport_Statut_21sept.pdf`, tableau Synthèse, ligne Budget
- **Version B (retenue) :** Ligne « Optimisation interface mobile - CR-04 » de 18 000 $ sur une facture en validation, sans approbation. Source : `05_Contrats_et_finances/INV-003.pdf`, ligne CR-04
- **Ce qu'on retient (critère : qui décide (contrat)) :** Sur les chiffres, 186 000 $ facturés restent sous 204 000 $ (le rapport ne dit pas quel plafond il utilise; avec 180 000 $ on serait au-dessus). Mais ce « vert » cache une facturation non autorisée de 18 000 $. Qui décide : le contrat (changement écrit et approuvé obligatoire) et le chargé de projet (E10). Le bon statut budgétaire : sous le plafond, avec une facture contestée à régulariser.
- **État au 30 sept. :** INV-003 retenue par Finances. Voir l'action A-06.
- **Autres preuves :** `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, l. 12 à 24; `01_Courriels/E07_Facture_003_question.eml`, l. 9 à 11; `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf`, l. 6 à 12

### C-08. INV-778 (41 000 $, 20 sept.) : même fournisseur, mais projet ORION. À exclure de NOVA
- **Version A (écartée) :** Facture Boréal INV-778, 41 000 $, « Migration données - projet ORION ». Source : `08_Archives_et_documents_connexes/INV-778_Projet_ORION.pdf`, ligne Projet = ORION; note
- **Version B (retenue) :** Factures NOVA : INV-001, INV-002, INV-003 (champ Projet = NOVA). Source : `05_Contrats_et_finances/INV-003.pdf`, ligne Projet
- **Ce qu'on retient (critère : nature du document) :** Nature du document : la facture indique « Projet : ORION » et une note « Cette facture concerne un autre projet ». Elle est rangée dans le dossier « documents connexes ». Rien à imputer à NOVA.
- **État au 30 sept. :** Exclue (piège du dossier).

### C-09. Notes personnelles non officielles (« vérifier si 15 oct encore date? probablement », « mobile nice to have ») contre les décisions documentées
- **Version A (écartée) :** « vérifier si 15 oct encore date? probablement ». Auteur inconnu. Source : `08_Archives_et_documents_connexes/Notes_personnelles_quelquun.txt`, lignes 3 et 4
- **Version B (retenue) :** Date officielle 22 octobre; mobile avancé hors phase 1. Source : `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, 15:25
- **Ce qu'on retient (critère : qui décide) :** Aucun poids : notes personnelles, auteur inconnu, sans date. Les décisions de comité l'emportent. (De même, l'invitation à la formation Excel et l'infolettre Boréal ne disent rien sur NOVA.)
- **État au 30 sept. :** Écartée.
- **Autres preuves :** `08_Archives_et_documents_connexes/Invitation_Formation_Excel.txt`, l. 1 à 3; `08_Archives_et_documents_connexes/Newsletter_Boreal_Septembre.txt`, l. 1 à 2

### C-10. Architecture v1 (East US) contre ADR-007 et architecture v2 (Canada Central)
- **Version A (écartée) :** Données : East US (v1, 18 juillet). Source : `06_Architecture_et_decisions/Architecture_NOVA_v1.pdf`, page 1
- **Version B (retenue) :** Données : Canada Central (v2, 25 août, révisée après ADR-007). Source : `06_Architecture_et_decisions/Architecture_NOVA_v2.pdf`, page 1
- **Ce qu'on retient (critère : date des faits + qui décide) :** Dates et qui décide : l'ADR-007 (23 juillet, acceptée) remplace la v1 sur ce point, la v2 est plus récente et la migration a été vérifiée le 27 août. La pièce jointe de E02 (v1) et celle de E03 (v2) sont les mêmes fichiers que ceux du dossier 06 : pas de preuves supplémentaires.
- **État au 30 sept. :** Résolue. La v1 est gardée comme historique.
- **Autres preuves :** `06_Architecture_et_decisions/ADR-007_Localisation_donnees.md`, l. 9 à 10; `02_Reunions/M03_CR_Comite_27aout.txt`, l. 5

## 4. Actions restantes

| ID | Cond. | Action | Responsable | Nature | Échéance | Preuves |
|---|---|---|---|---|---|---|
| A-01 | 1 | Refaire le test de SEC-210 (le journal doit montrer l'objet et le résultat de l'export CSV), puis donner ou refuser l'acceptation sécurité | Sophie Lambert (sécurité) (confirmé) | engagement documenté | À confirmer (re-test « planifié » le 26 sept., sans date; à faire avant le 22 oct.) | `03_Tickets/SEC-210.txt`, commentaires du 19 sept. 14:05 et du 26 sept. 15:40; `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:02 et 10:09; `04_Documents_projet/Registre_Risques_29sept.xlsx`, R-02 |
| A-02 | 2 | Livrer le correctif ACC-303 (le focus clavier bloqué dans la fenêtre « Modifier le dossier ») dans la prochaine build | Boréal Numérique (Julien Moreau) (confirmé) | engagement documenté | À confirmer (« prochaine build », date non documentée) | `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:12; `03_Tickets/ACC-303.txt`, 18 sept. 09:50 et 26 sept. 11:03 |
| A-03 | 2 | Retester ACC-303 au clavier (Chrome et Edge, Tab jusqu'à « Enregistrer ») et fermer le ticket | Mélissa Gagnon (QA et accessibilité) (confirmé) | engagement documenté | À confirmer (après la build corrective; avant le 22 oct.) | `03_Tickets/ACC-303.txt`, Statut OUVERT; `04_Documents_projet/Registre_Risques_29sept.xlsx`, R-04 : Fermer ACC-303; `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:05 à 10:10 |
| A-04 | 3 | Livrer le runbook final : écrire l'étape 4 « Procédure de retour arrière » (TODO) et l'étape 5 « Validation fonctionnelle post-déploiement » (À compléter). Une autre personne doit pouvoir l'exécuter sans l'équipe projet | Boréal Numérique (équipe ops relancée par Julien) (confirmé) | engagement documenté | À confirmer (version finale toujours attendue le 29 sept.; Olivier la veut « quelques jours » avant la mise en production) | `03_Tickets/OPS-601_runbook.png`, capture du 25 sept., étapes 4 et 5; `03_Tickets/OPS-601.txt`, 25, 26 et 29 sept.; `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:12 : « je relance notre équipe ops »; `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, 15:12 |
| A-05 | 3 | Approuver le runbook et donner le go exploitation | Olivier Côté (exploitation) (confirmé) | engagement documenté | À confirmer (avant le 22 oct.) | `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:07; `04_Documents_projet/Registre_Risques_29sept.xlsx`, R-03; `04_Documents_projet/Note_transition_Elodie_16sept.txt`, « obtenir le go sécurité et exploitation avant production » |
| A-06 |  | Régler INV-003 : ne pas payer les 18 000 $ « Optimisation interface mobile - CR-04 »; répondre à Finances; demander à Boréal une facture corrigée (36 000 $) ou une note de crédit; payer le jalon 3 seulement quand sa livraison est confirmée | Nicolas Perron (chargé de projet) avec Amélie Fortin (Finances) (proposé) | recommandation | À confirmer (facture du 22 sept., retenue depuis le 23 sept.) | `01_Courriels/E07_Facture_003_question.eml`, question de Finances, sans réponse dans le dossier; `01_Courriels/E10_Fonction_mobile.eml`, « Aucune dépense liée à CR-04 ne doit être engagée ou facturée »; `05_Contrats_et_finances/INV-003.pdf`, lignes jalon 3, CR-04 et total; `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, Gestion des changements |
| A-07 |  | Publier un plan projet v4 : P-06 au 22 octobre, recaler P-04 (tests intégrés) et P-05 (préparation exploitation), responsable Nicolas | Nicolas Perron (proposé) | engagement documenté (la mise à jour est demandée), responsable proposé | À confirmer | `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, « On doit mettre les plans et communications à jour »; `04_Documents_projet/Note_transition_Elodie_16sept.txt`, « faire mettre à jour la date dans tous les plans »; `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, P-04, P-05, P-06; `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt`, plan non corrigé |
| A-08 |  | Mettre à jour le registre de risques : fermer R-01 (INT-101 fermé le 17 sept.); ajouter le risque « glissement après le 31 octobre (fin du contrat) » et le risque « facture contestée » | Nicolas Perron (registre) et Marc Gervais (propriétaire de R-01) (proposé) | recommandation | À confirmer | `04_Documents_projet/Registre_Risques_29sept.xlsx`, R-01 ouvert, suivi au 9 sept.; `03_Tickets/INT-101.txt`, fermé le 17 sept.; `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, période jusqu'au 31 octobre |
| A-09 |  | Corriger le brouillon d'Alex : ne pas écrire « au vert » ni « sécurité et accessibilité complétées »; présenter le 22 octobre comme une cible sous conditions | Alex Deschamps, validé par Nicolas Perron (proposé) | engagement documenté (consigne E09), rédaction proposée | À confirmer (brouillon du 21 sept. toujours sans réponse) | `01_Courriels/E11_Communication_statut.eml`, le brouillon; `01_Courriels/E09_Rappel_mise_en_production.eml`, « ne pas communiquer le 22 comme un go garanti »; `04_Documents_projet/Rapport_Statut_21sept.pdf`, statuts VERT contredits |
| A-10 |  | Corriger ou annoter le rapport de statut du 21 sept. (Sécurité et Accessibilité ne sont pas VERT; Budget : facture contestée) et trouver son auteur | Nicolas Perron (proposé) | recommandation | À confirmer | `04_Documents_projet/Rapport_Statut_21sept.pdf`, synthèse et commentaire de gestion; `03_Tickets/SEC-210.txt`, EN VALIDATION; `03_Tickets/ACC-303.txt`, OUVERT |
| A-11 |  | Planifier le go/no-go formel avant le 22 octobre (vérifier les trois conditions) et publier le compte rendu du comité du 26 sept. | Nicolas Perron (proposé) | recommandation (le compte rendu du 26 sept. est un engagement documenté) | À confirmer (avant le 22 oct.) | `02_Reunions/M06_Transcript_Comite_26sept.txt`, 10:30 : « Je publie le compte rendu »; `01_Courriels/E09_Rappel_mise_en_production.eml`, conditions restantes |
| A-12 |  | Traiter CR-04 (optimisation mobile avancée, 18 000 $) pour la phase 2 : décision formelle d'approbation ou de refus, avec l'instance qui décide et la date | Nicolas Perron et comité de projet (proposé) | recommandation | À confirmer (phase 2) | `06_Architecture_et_decisions/Decision_Portee_Phase2.md`, reporté en phase 2; `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, BROUILLON - APPROBATION REQUISE |
| A-13 |  | Vérifier la marge du contrat : il court jusqu'au 31 octobre. Si le 22 octobre glisse, prévoir un avenant (dates) et surveiller le plafond de 204 000 $ | Nicolas Perron avec Finances (proposé) | recommandation | À confirmer | `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, montant et période; `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, « le contrat court jusqu'à fin octobre » |

### Engagements déjà tenus

- Boréal : fournir le premier schéma d'architecture. Fermé : 18 juil. (v1), remplacé par la v2 le 25 août. Source : `02_Reunions/M01_CR_Demarrage_07juillet.txt`, l. 15
- Boréal : migrer les ressources vers Canada Central; architecture : publier le schéma v2. Fermé : 26 et 27 août (E03, M03). Source : `06_Architecture_et_decisions/ADR-007_Localisation_donnees.md`, l. 13 à 15
- Boréal : build de stabilisation début septembre. Fermé : Build déclarée stable au comité du 26 sept. (M06 10:01). Date de livraison non documentée. Source : `02_Reunions/M03_CR_Comite_27aout.txt`, l. 13
- Marc : suivre le connecteur interne jusqu'à la fermeture formelle (INT-101). Fermé : 17 sept. (INT-101, E12). Source : `04_Documents_projet/Note_transition_Elodie_16sept.txt`, l. 9
- Camille : corriger les doublons de migration (DATA-401). Fermé : 9 sept.. Source : `03_Tickets/DATA-401.txt`, l. 16 à 19
- Dév : corriger la lenteur de la recherche (PERF-501). Fermé : 7 sept.. Source : `03_Tickets/PERF-501.txt`, l. 15 à 16
- Boréal : corriger les étiquettes et le contraste (ACC-301, ACC-302). Fermé : 15 et 20 août (validés par Mélissa). Source : `03_Tickets/ACC-302.txt`, l. 15 à 16

## 5. Personnes et rôles

- **Nicolas Perron** (Organisation Démo) : Chargé de projet NOVA depuis le 16 septembre 2026. Il anime les comités depuis cette date.
- **Élodie Caron** (Organisation Démo) : Chargée de projet du 7 juillet au 15 septembre 2026. C'est elle qui a formulé la décision du 10 septembre. Elle reste disponible quelques jours pour la transition.
- **Marc Gervais** (Organisation Démo) : Architecture. Responsable du connecteur interne (INT-101) et du risque R-01.
- **Sophie Lambert** (Organisation Démo) : Sécurité. C'est elle qui accepte ou refuse SEC-210. Elle a exigé que les données restent au Canada.
- **Mélissa Gagnon** (Organisation Démo) : QA et accessibilité. C'est elle qui valide les tickets ACC. Responsable des tests intégrés (P-04).
- **Olivier Côté** (Organisation Démo) : Exploitation. C'est lui qui donne le go exploitation et approuve le runbook (OPS-601, P-05, R-03).
- **Camille Beaulieu** (Organisation Démo) : Migration des données (DATA-401, R-05).
- **Amélie Fortin** (Organisation Démo, Finances) : Valide les factures. Elle retient INV-003 tant qu'elle n'a pas l'approbation de CR-04.
- **Alex Deschamps** (Organisation Démo, Communications) : Prépare les messages de statut. Son brouillon du 21 septembre est à corriger.
- **Julien Moreau** (Boréal Numérique Inc. (fournisseur)) : Contact du fournisseur : architecture, correctifs, proposition de report, demande CR-04.

## 6. Liste des sources (lecture et qui décide)

| Fichier | Catégorie | Lecture | Qui décide, comment lire |
|---|---|---|---|
| `MANIFEST.csv` | Racine du dossier | inventaire | Liste des fichiers |
| `README.txt` | Racine du dossier | consigne | Consignes du défi (pas une pièce du projet) |
| `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt` | Conversations Teams | primaire | Clavardage. Confirme que le plan n'a pas été corrigé. |
| `07_Conversations_Teams/Teams_16sept_Transition.txt` | Conversations Teams | primaire | Clavardage. Rappel de la transition. |
| `07_Conversations_Teams/Teams_19sept_Securite.txt` | Conversations Teams | primaire | Clavardage. « déployé » n'est pas « accepté ». |
| `07_Conversations_Teams/Teams_22sept_Mobile.txt` | Conversations Teams | primaire | Clavardage. Désaccord sur la portée mobile. |
| `06_Architecture_et_decisions/ADR-007_Localisation_donnees.md` | Architecture et décisions | primaire | ADR acceptée. Décision formelle sur l'hébergement. |
| `06_Architecture_et_decisions/Architecture_NOVA_v1.pdf` | Architecture et décisions | primaire | Schéma v1 (18 juillet, East US). DÉPASSÉ pour l'hébergement. |
| `06_Architecture_et_decisions/Architecture_NOVA_v2.pdf` | Architecture et décisions | primaire | Schéma v2 (25 août, Canada Central). Version en vigueur. |
| `06_Architecture_et_decisions/Decision_Portee_Phase2.md` | Architecture et décisions | primaire | Décision de portée (24 sept.). CR-04 reporté en phase 2. |
| `01_Courriels/E01_Lancement_NOVA.eml` | Courriels | primaire | Chargée de projet. Confirme le démarrage. |
| `01_Courriels/E02_Question_hebergement.eml` | Courriels | primaire | Sécurité. Pose l'exigence, avant la décision du 23 juillet. |
| `01_Courriels/E03_Confirmation_Canada_Central.eml` | Courriels | primaire | Fournisseur. Dit que la migration est finie (à croiser avec M03). |
| `01_Courriels/E04_Corrections_accessibilite.eml` | Courriels | primaire | Fournisseur. Une correction annoncée n'est pas une validation QA. |
| `01_Courriels/E05_Retard_integration.eml` | Courriels | primaire | Fournisseur. C'est une PROPOSITION, pas une décision (il le dit lui-même). |
| `01_Courriels/E06_Transition_charge_projet.eml` | Courriels | primaire | Chargée de projet sortante. Annonce officielle du changement de responsable. |
| `01_Courriels/E07_Facture_003_question.eml` | Courriels | primaire | Finances. Question avant de payer une facture. |
| `01_Courriels/E08_Correctif_journalisation.eml` | Courriels | primaire | Fournisseur. Un correctif livré n'est pas une acceptation sécurité. |
| `01_Courriels/E09_Rappel_mise_en_production.eml` | Courriels | primaire | Chargé de projet. Rappel officiel : la date dépend de conditions. |
| `01_Courriels/E10_Fonction_mobile.eml` | Courriels | primaire | Chargé de projet. Fixe la portée (mobile en phase 2) et interdit de facturer CR-04. |
| `01_Courriels/E11_Communication_statut.eml` | Courriels | primaire | Communications. BROUILLON basé sur le rapport du 21 sept. À corriger. |
| `01_Courriels/E12_Resolution_integration.eml` | Courriels | primaire | Architecture. Confirme côté client que INT-101 est fermé. |
| `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf` | Contrats et finances | primaire | Contrat. Fait foi pour le montant maximal et la règle des changements. |
| `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf` | Contrats et finances | primaire | Demande de changement APPROUVÉE (comité de projet, 14 août). |
| `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf` | Contrats et finances | primaire | BROUILLON. Aucune approbation, aucune signature. |
| `05_Contrats_et_finances/INV-001.pdf` | Contrats et finances | primaire | Facture payée. |
| `05_Contrats_et_finances/INV-002.pdf` | Contrats et finances | primaire | Facture payée (inclut CR-01). |
| `05_Contrats_et_finances/INV-003.pdf` | Contrats et finances | primaire | Facture EN VALIDATION. Contient une ligne CR-04 non approuvée. |
| `08_Archives_et_documents_connexes/Courriel_archive_17sept.eml` | Archives et documents connexes | doublon | Copie exacte de E12. Ne compte pas comme une deuxième preuve. |
| `08_Archives_et_documents_connexes/INV-778_Projet_ORION.pdf` | Archives et documents connexes | hors sujet | Facture d'un AUTRE projet (ORION). Hors budget NOVA. |
| `08_Archives_et_documents_connexes/Invitation_Formation_Excel.txt` | Archives et documents connexes | hors sujet | Rien à voir avec NOVA. |
| `08_Archives_et_documents_connexes/Newsletter_Boreal_Septembre.txt` | Archives et documents connexes | hors sujet | Infolettre du fournisseur. Aucune valeur de preuve. |
| `08_Archives_et_documents_connexes/Notes_personnelles_quelquun.txt` | Archives et documents connexes | non officiel | Notes personnelles, auteur inconnu. Aucun poids. |
| `08_Archives_et_documents_connexes/Plan_NOVA_preliminaire_juin.xlsx` | Archives et documents connexes | historique | Plan préliminaire de juin, avant la charte. Dépassé. |
| `03_Tickets/ACC-301.txt` | Tickets | primaire | Ticket QA. Fermé le 15 août (validé NVDA et VoiceOver). |
| `03_Tickets/ACC-301_labels.png` | Tickets | capture | Capture ancienne (Test accessibilité). Le défaut est corrigé depuis. |
| `03_Tickets/ACC-302.txt` | Tickets | primaire | Ticket QA. Fermé le 20 août (5,3:1). |
| `03_Tickets/ACC-302_contraste.png` | Tickets | capture | Capture ancienne (Build 2026.08.12). Le défaut est corrigé depuis. |
| `03_Tickets/ACC-303.txt` | Tickets | primaire | Ticket QA. OUVERT, priorité haute. Dernier commentaire le 26 sept. |
| `03_Tickets/ACC-303_focus.png` | Tickets | capture | Capture Build 2026.09.17. Le défaut est toujours ouvert au 26 sept. (voir le ticket). |
| `03_Tickets/DATA-401.txt` | Tickets | primaire | Ticket migration. Fermé le 9 sept. |
| `03_Tickets/DATA-401_doublons.png` | Tickets | capture | Capture ancienne, lot MIG-09-02. Corrigé depuis. |
| `03_Tickets/DATA-401_echantillon.csv` | Tickets | pièce jointe | Extrait CSV des doublons (même preuve que la capture). |
| `03_Tickets/INT-101.txt` | Tickets | primaire | Ticket intégration. Fermé le 17 sept., validé par Marc Gervais. |
| `03_Tickets/INT-101_aucun_resultat.png` | Tickets | capture | Capture ancienne (environnement intégration). Corrigé depuis. |
| `03_Tickets/INT-101_extrait_logs.txt` | Tickets | pièce jointe | Logs : erreur 401 le 5 sept., réponse 200 OK le 17 sept. |
| `03_Tickets/OPS-601.txt` | Tickets | primaire | Ticket exploitation. OUVERT. Olivier Côté donne le go exploitation. |
| `03_Tickets/OPS-601_runbook.png` | Tickets | capture | Capture « Version du 25 septembre ». Dernier état connu du runbook. |
| `03_Tickets/PERF-501.txt` | Tickets | primaire | Ticket performance. Fermé le 7 sept. |
| `03_Tickets/PERF-501_lenteur.png` | Tickets | capture | Capture ancienne. Corrigé depuis (620 ms). |
| `03_Tickets/SEC-210.txt` | Tickets | primaire | Ticket sécurité. EN VALIDATION. Sophie Lambert décide de l'acceptation. |
| `03_Tickets/SEC-210_audit.png` | Tickets | capture | Capture en environnement de validation. Montre le défaut (ligne EXPORT_CSV incomplète). |
| `02_Reunions/M01_CR_Demarrage_07juillet.txt` | Réunions | primaire | Compte rendu de démarrage. Décisions de départ. |
| `02_Reunions/M02_Transcript_Architecture_23juillet.txt` | Réunions | primaire | Transcription. Décision Canada Central prise ensemble en atelier. |
| `02_Reunions/M03_CR_Comite_27aout.txt` | Réunions | primaire | Comité projet. Vérifie la migration. État de fin août. |
| `02_Reunions/M04_Transcript_Comite_direction_10sept.txt` | Réunions | primaire | Comité de direction. C'est ici que le 22 octobre est APPROUVÉ. C'est l'instance qui décide. |
| `02_Reunions/M05_CR_Suivi_18sept.txt` | Réunions | primaire | Suivi livraison. État d'ensemble au 18 sept. |
| `02_Reunions/M06_Transcript_Comite_26sept.txt` | Réunions | primaire | Comité de direction. Fixe les trois conditions de go-live. Source la plus récente. |
| `04_Documents_projet/Charte_Projet_NOVA_v1.txt` | Documents projet | primaire | Charte v1 (7 juillet). Point de départ. Elle dit elle-même qu'elle n'est PAS mise à jour après les décisions. |
| `04_Documents_projet/Note_transition_Elodie_16sept.txt` | Documents projet | primaire | Note de transition. Consignes de la chargée sortante. |
| `04_Documents_projet/Plan_Projet_NOVA_v2.xlsx` | Documents projet | primaire | Plan v2. Avant la décision du 10 sept. |
| `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx` | Documents projet | primaire | Plan v3 (12 sept.). PÉRIMÉ sur la date : il n'a pas intégré la décision du 10 sept. |
| `04_Documents_projet/Rapport_Statut_21sept.pdf` | Documents projet | primaire | Rapport de statut. Auteur inconnu. Il admet avoir été écrit avant de vérifier les tickets. Ses « VERT » sécurité et accessibilité sont faux. |
| `04_Documents_projet/Registre_Risques_29sept.xlsx` | Documents projet | primaire | Registre de risques (29 sept.). R-01 est périmé (suivi au 9 sept.). R-02 à R-04 sont justes. |