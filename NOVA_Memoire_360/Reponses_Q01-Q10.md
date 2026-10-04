# NOVA : réponses aux dix questions (état au 30 septembre 2026, 9 h)

Chaque réponse cite un fichier du dossier et un repère précis. Les numéros de ligne renvoient au texte tel qu'il s'affiche dans `index.html` (visualiseur de sources). Pour un .eml, le corps commence à la ligne 7. Pour un .xlsx, la ligne N du tableur est la ligne N+1. Pour un PDF, c'est le texte extrait de la page 1. Pour une capture, c'est la transcription vérifiée.

## Q01. Quelle est la date de mise en production actuellement approuvée, et avec quelle réserve?

**Réponse.** Le 22 octobre 2026. Le comité de direction l'a approuvée le 10 septembre 2026. La réserve : cette date dépend de trois validations fixées par le comité du 26 septembre. 1) La sécurité accepte SEC-210. 2) Le ticket ACC-303 est fermé. 3) Le runbook est approuvé, avec la procédure de retour arrière. Tant que ce n'est pas fait, le 22 n'est pas un « go garanti ».

**Preuves.**

- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, lignes 17 à 23 (15:22 à 15:25) : « La date cible de mise en production NOVA est déplacée du 15 octobre au **22 octobre 2026**. […] Donc **approuvé**. Le 22 devient la date officielle. » _(La décision et son approbation (c'est le comité de direction qui décide).)_
- `02_Reunions/M06_Transcript_Comite_26sept.txt`, lignes 11 à 16 (10:09 à 10:15) : « Donc trois conditions concrètes : validation sécurité de SEC-210, fermeture de ACC-303 et approbation du runbook incluant rollback. […] c'est conditionnel à ces trois éléments. » _(La réserve : les trois conditions de go-live.)_
- `01_Courriels/E09_Rappel_mise_en_production.eml`, courriel du 27 sept. 17:02, lignes 9 à 13 : « la cible approuvée demeure le 22 octobre. Cette date est toutefois conditionnelle aux validations restantes […] ne pas communiquer le 22 comme un go garanti » _(Confirmation écrite du chargé de projet (autre source que le comité).)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, ligne 24 (15:27) : « le 22 n'est pas un go automatique. Les critères de sécurité, accessibilité et exploitation restent. » _(La réserve existait déjà le jour de l'approbation.)_
- `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, feuille « Plan projet », cellules E7 et F7 = 2026-10-15, G7 = « Cible de planification » : « A7=P-06 | B7=Mise en production | … | E7=2026-10-15 | F7=2026-10-15 | G7=Cible de planification » _(CONTRADICTION : plan périmé (voir C-01).)_
- `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt`, ligne 5 (09:18) : « le comité a approuvé le 22 octobre le 10 septembre. Le plan projet n'a visiblement pas encore été corrigé. » _(Explique pourquoi le plan v3 est faux.)_

**Nuances et pièges à éviter.**

- Au 30 septembre, aucune des trois conditions n'est remplie. SEC-210 est EN VALIDATION (re-test prévu, sans date). ACC-303 est OUVERT (correctif promis pour la « prochaine build »). OPS-601 est OUVERT (le 29 septembre, Olivier n'avait toujours pas reçu la version finale du runbook).
- Le plan projet v3 du 12 septembre affiche encore le 15 octobre (cellules E7 et F7, note « Cible de planification »). Il est périmé : il n'a pas intégré la décision du 10 septembre. Nicolas l'a dit sur Teams le 15 septembre, et la note de transition demande de corriger tous les plans.
- La charte v1 et le plan v2 (15 octobre) sont des documents anciens. La charte dit elle-même qu'elle n'est pas mise à jour après les décisions de comité.

**Sources croisées.** Transcriptions des comités (M04, M06), courriel du chargé de projet (E09) et clavardage Teams. Le plan v3 est écarté : le comité a plus de poids, et la décision est plus récente que le contenu du plan.

**Ce qu'on ne sait pas.** Aucune date de go/no-go n'est documentée. On ne connaît pas non plus la date du re-test SEC-210, de la « prochaine build » (ACC-303) ni de la livraison du runbook final.

## Q02. Pourquoi la date a-t-elle changé, et quel est l'état actuel de la cause initiale?

**Réponse.** La date a changé à cause du connecteur interne (ticket INT-101). En septembre, les recherches renvoyaient des erreurs 401 : le jeton de service avait expiré après un changement de secret, puis il restait des erreurs par moments. Boréal a perdu plus de temps que prévu et a recommandé le 22 octobre pour stabiliser le connecteur, refaire les tests intégrés et garder une marge pour les anomalies bloquantes. La sécurité et l'accessibilité préféraient aussi ne pas raccourcir leurs tests. Aujourd'hui, cette cause est RÉGLÉE : correctif déployé le 17 septembre (rotation du secret et correction du renouvellement du jeton), 120 recherches sur 120 réussies, ticket fermé et validé par Marc Gervais le 17 septembre. Les logs montrent une réponse 200 OK ce jour-là.

**Preuves.**

- `01_Courriels/E05_Retard_integration.eml`, courriel du 8 sept. 11:16, lignes 9 à 13 : « Le problème du connecteur interne nous a fait perdre davantage de temps que prévu. […] très peu de marge pour la stabilisation. Notre recommandation est de déplacer la mise en production au **22 octobre**. » _(La cause et la proposition.)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, lignes 6 à 10 (15:02 à 15:08) : « Stabilisation du connecteur, reprise des tests intégrés et une marge pour corriger les anomalies bloquantes. […] Je confirme que le connecteur est le chemin critique en ce moment. » _(Les raisons retenues par le comité.)_
- `03_Tickets/INT-101.txt`, commentaires des 5, 8 et 17 sept. (lignes 14 à 20) : « On voit des 401 sur l'appel vers le service interne. Le jeton de service semble expiré […] 17 sept 14:23 - Boréal : Correctif déployé. 120 recherches rejouées, 120 réponses valides. 17 sept 16:10 - Marc : Validé côté intégration. Je ferme. » _(Le problème et sa fermeture.)_
- `01_Courriels/E12_Resolution_integration.eml`, courriel du 17 sept. 16:22, lignes 9 à 11 : « 120/120 recherches ont retourné les résultats attendus. INT-101 est fermé. Le problème d'intégration qui avait déclenché le risque d'échéancier est considéré résolu. » _(Confirmation côté client (autre source que le ticket).)_
- `03_Tickets/INT-101_extrait_logs.txt`, lignes 1 à 3 : « 2026-09-05T11:15:03Z … -> 401 Unauthorized … exp=2026-09-04T23:00:00Z … 2026-09-17T14:20:11Z … -> 200 OK 187ms » _(Preuve technique avant et après.)_
- `02_Reunions/M05_CR_Suivi_18sept.txt`, ligne 6 : « INT-101 : le connecteur interne a été validé et fermé le 17 septembre. » _(État d'ensemble au 18 sept.)_
- `04_Documents_projet/Registre_Risques_29sept.xlsx`, feuille « Risques », ligne R-01 : F2 = « Ouvert », H2 = « Suivi au 9 septembre 2026 » : « A2=R-01 | B2=Retard du connecteur interne | … | F2=Ouvert | … | H2=Suivi au 9 septembre 2026 » _(CONTRADICTION : registre périmé sur R-01 (voir C-02).)_

**Nuances et pièges à éviter.**

- Le problème est réglé, mais la date n'est pas revenue au 15 octobre. Le 22 octobre reste la cible approuvée (suivi du 18 sept., comité du 26 sept., courriel E09 du 27 sept.). Elle dépend maintenant de trois autres sujets : sécurité, accessibilité, exploitation.
- Le registre de risques du 29 septembre affiche encore R-01 « Retard du connecteur interne » comme « Ouvert », avec le commentaire « Suivi au 9 septembre 2026 ». Cette ligne est périmée : le ticket, le courriel E12 et le suivi du 18 septembre disent le contraire (voir C-02).
- Les tickets DATA-401 (doublons, fermé le 9 sept.) et PERF-501 (lenteur, fermé le 7 sept.) ne sont pas la cause du report. Camille a confirmé le 10 sept. que la migration ne bloquait pas le 15.

**Sources croisées.** Courriel du fournisseur (E05), transcription du comité (M04), ticket INT-101, courriel de validation client (E12) et logs. Le registre de risques (R-01) est écarté parce que les faits qu'il décrit sont plus anciens.

**Ce qu'on ne sait pas.** Le registre du 29 septembre n'a pas été corrigé sur R-01. Personne n'a décidé de revenir au 15 octobre.

## Q03. Qui a approuvé le changement et quand? Distinguez proposition et approbation.

**Réponse.** La PROPOSITION vient de Julien Moreau (Boréal Numérique), par courriel le 8 septembre 2026 à 11:16. Il précise lui-même que c'est une proposition du fournisseur et que la décision revient au client. Il la répète au comité le 10 septembre à 15:02. L'APPROBATION vient du comité de direction NOVA, le 10 septembre 2026 entre 15:22 et 15:25. Élodie Caron (alors chargée de projet) formule la décision. Personne ne s'oppose : Sophie Lambert, Marc Gervais et Olivier Côté disent « Non » à la question « quelqu'un s'oppose? », Nicolas Perron dit « D'accord ». Élodie conclut : « approuvé », le 22 octobre devient la date officielle.

**Preuves.**

- `01_Courriels/E05_Retard_integration.eml`, courriel du 8 sept. 11:16, ligne 13 : « À ce stade, il s'agit d'une proposition de notre part. À vous de confirmer la décision de gouvernance. » _(La proposition (fournisseur).)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, ligne 6 (15:02) : « Comme écrit mardi […] Notre recommandation est de déplacer le lancement du 15 au 22 octobre. » _(Proposition répétée en comité.)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, lignes 17 à 23 (15:22 à 15:25) : « Je vais formuler la décision. […] Est-ce que quelqu'un s'oppose? [silence] Sophie : Non. Marc : Non. Olivier : Non. Nicolas : D'accord. Élodie : Donc **approuvé**. » _(L'approbation (comité de direction, 10 sept. 15:25).)_
- `07_Conversations_Teams/Teams_15sept_ProjetNOVA.txt`, ligne 5 (09:18) : « le comité a approuvé le 22 octobre le 10 septembre. » _(Autre source qui confirme la date d'approbation.)_
- `04_Documents_projet/Note_transition_Elodie_16sept.txt`, ligne 7 : « faire mettre à jour la date dans tous les plans (le comité a approuvé le 22 octobre) » _(Confirmation par la chargée sortante.)_

**Nuances et pièges à éviter.**

- La proposition vient du fournisseur, l'approbation vient du client. Il ne faut pas dire que Boréal a approuvé.
- Les rappels qui suivent ne sont pas l'approbation, seulement des confirmations : Teams du 15 sept. (Nicolas), note de transition du 16 sept., suivi du 18 sept., comité du 26 sept., courriel E09 du 27 sept.
- Le comité du 26 septembre n'a pas ré-approuvé la date. Il a précisé les conditions de go-live. Nicolas y annonce un compte rendu, mais ce compte rendu n'est pas dans le dossier (on a seulement la transcription).

**Sources croisées.** Courriel du fournisseur (E05), transcription du comité (M04), Teams du 15 sept. et note de transition.

**Ce qu'on ne sait pas.** Il n'y a pas de compte rendu officiel du comité du 10 septembre dans le dossier. La transcription en tient lieu.

## Q04. Qui est responsable du projet et depuis quand?

**Réponse.** Nicolas Perron est chargé de projet NOVA depuis le 16 septembre 2026. Élodie Caron l'a annoncé par courriel ce jour-là à 8 h 35, et sa note de transition et un rappel Teams (8 h 45) le confirment. Avant lui, Élodie Caron a été chargée de projet du 7 juillet (charte v1, compte rendu de démarrage, courriel E01) au 15 septembre 2026.

**Preuves.**

- `01_Courriels/E06_Transition_charge_projet.eml`, courriel du 16 sept. 08:35, ligne 9 : « Comme convenu, Nicolas Perron prend officiellement la charge du projet NOVA à compter d'aujourd'hui, 16 septembre. » _(L'annonce officielle.)_
- `04_Documents_projet/Note_transition_Elodie_16sept.txt`, ligne 4 : « À compter d'aujourd'hui, Nicolas Perron reprend le rôle de chargé de projet NOVA. » _(Document de transition (autre source).)_
- `07_Conversations_Teams/Teams_16sept_Transition.txt`, lignes 4 et 5 (08:45, 08:47) : « à partir d'aujourd'hui, Nicolas reprend officiellement NOVA. […] Je reprends aussi le comité du vendredi. » _(Troisième source.)_
- `04_Documents_projet/Charte_Projet_NOVA_v1.txt`, lignes 4 et 20 : « Chargée de projet : Élodie Caron […] Cette charte […] n'est pas mise à jour automatiquement après chaque décision de comité. » _(Responsable de départ (7 juillet). Document non mis à jour.)_
- `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, cellule D7 = « Nicolas Perron » (plan daté du 12 sept.) : « A7=P-06 | B7=Mise en production | … | D7=Nicolas Perron » _(Petit écart de date (12 contre 16 sept.).)_

**Nuances et pièges à éviter.**

- La charte v1 nomme encore Élodie. C'est normal : elle n'est pas mise à jour après les décisions (elle le dit à la ligne 20). Le plan v2 donne aussi la mise en production (P-06) à Élodie.
- Le plan v3, daté du 12 septembre, donne déjà P-06 à Nicolas Perron (cellule D7), soit quatre jours avant l'annonce. La transition était « comme convenu » (E06), mais la date officielle reste le 16 septembre.
- Élodie reste disponible « quelques jours » pour le transfert. Nicolas reprend aussi le comité du vendredi (Teams 16 sept., 8 h 47).

**Sources croisées.** Courriel (E06), note de transition et Teams. La charte et le plan v2 sont anciens.

**Ce qu'on ne sait pas.** On ne sait pas à quelle date la transition a été « convenue ». Le plan v3 du 12 sept. l'anticipe.

## Q05. Quel est le montant contractuel autorisé et comment se calcule-t-il?

**Réponse.** 204 000 $ CAD, hors taxes. Calcul : 180 000 $ (montant maximal initial du contrat avec Boréal, période du 7 juillet au 31 octobre 2026; même chiffre dans la charte et le compte rendu de démarrage) + 24 000 $ (demande de changement CR-01 « rapports avancés », APPROUVÉE par le comité de projet le 14 août 2026). CR-04 (18 000 $, optimisation mobile) est un BROUILLON sans approbation : il ne compte pas.

**Preuves.**

- `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, page 1, tableau « Valeur contractuelle », ligne « Montant maximal initial » = 180 000 $; ligne « Période » : « Montant maximal initial 180 000 $ … Devise CAD … Période 7 juillet au 31 octobre 2026 » _(La base du contrat.)_
- `05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf`, page 1, tableau « Impact financier » : Montant 24 000 $, Décision APPROUVÉE, Date 14 août 2026, Autorité Comité de projet : « Montant 24 000 $ / Décision APPROUVÉE / Date de décision 14 août 2026 / Autorité Comité de projet » _(Changement approuvé : il s'ajoute.)_
- `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, page 1, « Statut : BROUILLON - APPROBATION REQUISE »; note : aucun numéro d'approbation ni signature : « Montant estimé 18 000 $ / Statut BROUILLON - APPROBATION REQUISE […] Aucun numéro d'approbation ni signature de comité n'est présent » _(Ne s'ajoute PAS.)_
- `04_Documents_projet/Charte_Projet_NOVA_v1.txt`, ligne 6 : « Budget initial : 180 000 $ CAD » _(Deuxième source pour le 180 000 $.)_
- `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, page 1, section « Gestion des changements » : « Tout travail hors portée doit faire l'objet d'une demande de changement écrite et approuvée avant exécution et facturation. » _(La règle : seuls les changements approuvés s'ajoutent.)_
- `05_Contrats_et_finances/INV-002.pdf`, page 1, ligne « Rapports avancés - CR-01 » 24 000 $, Statut Payée : « Statut Payée … Développement phase 1 - jalon 2 48 000 $ … Rapports avancés - CR-01 24 000 $ … TOTAL 72 000 $ » _(CR-01 déjà facturé et payé.)_

**Nuances et pièges à éviter.**

- Où en est-on au 30 sept. : facturé 186 000 $ (INV-001 60 000 $ payée, INV-002 72 000 $ payée, INV-003 54 000 $ en validation). Payé : 132 000 $. Sur ces 186 000 $, 18 000 $ (la ligne CR-04 de INV-003) ne sont pas autorisés.
- Facturation valable (sans la ligne CR-04) : 168 000 $. Il reste donc 36 000 $ sous le plafond de 204 000 $. Si INV-003 était payée telle quelle, 186 000 $ resteraient sous 204 000 $. C'est sans doute ce que veut dire le « Budget VERT, sous le plafond contractuel » du rapport du 21 sept. Mais ce vert cache une ligne non autorisée.
- INV-778 (41 000 $, projet ORION, 20 sept.) concerne un autre projet. Elle ne compte pas dans NOVA.
- Le contrat demande une demande de changement écrite et approuvée avant tout travail hors portée, et avant de le facturer.

**Sources croisées.** Contrat, CR-01, charte et factures. CR-04 est écarté à cause de son statut de brouillon.

**Ce qu'on ne sait pas.** Le rapport de statut ne dit pas quel plafond il utilise (180 000 $ ou 204 000 $). Aucun bon de commande n'est documenté, seulement des factures.

## Q06. Quel problème présente INV-003? Précisez le montant concerné et le traitement à prévoir.

**Réponse.** INV-003 (facture Boréal du 22 septembre 2026, total 54 000 $, statut « En validation ») contient une ligne « Optimisation interface mobile - CR-04 » de 18 000 $. Or CR-04 est un brouillon qui n'a jamais été approuvé (aucun numéro d'approbation, aucune signature). Le comité du 10 septembre n'a pris « aucune décision de dépense ». Le 24 septembre, Nicolas Perron a écrit que CR-04 est reporté en phase 2 et qu'aucune dépense liée ne doit être engagée ni facturée. Le contrat interdit de facturer un travail hors portée sans demande de changement écrite et approuvée. Montant concerné : 18 000 $. L'autre ligne, « Développement phase 1 - jalon 3 » (36 000 $), fait partie de la portée. Traitement à prévoir : ne pas payer les 18 000 $; contester la ligne auprès de Boréal et demander une facture corrigée (ou une note de crédit) qui ramène INV-003 à 36 000 $; répondre à Amélie Fortin (Finances), qui retient la facture; payer le jalon 3 seulement quand sa livraison est confirmée.

**Preuves.**

- `05_Contrats_et_finances/INV-003.pdf`, page 1 : Date 2026-09-22, Statut « En validation », ligne « Optimisation interface mobile - CR-04 » 18 000 $, TOTAL 54 000 $ : « Statut En validation … Développement phase 1 - jalon 3 36 000 $ … Optimisation interface mobile - CR-04 18 000 $ … TOTAL 54 000 $ … La référence CR-04 apparaît sur la ligne mobile. » _(La facture elle-même.)_
- `01_Courriels/E07_Facture_003_question.eml`, courriel du 23 sept. 10:18, lignes 9 à 11 : « Il y a une ligne de 18 000 $ « Optimisation interface mobile - CR-04 ». Peux-tu me transmettre l'approbation correspondante? Je trouve un brouillon de CR-04, mais rien qui indique qu'il a été approuvé. » _(Finances retient la facture. La pièce jointe est le même fichier INV-003.pdf : ce n'est pas une deuxième preuve.)_
- `05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf`, page 1, Statut « BROUILLON - APPROBATION REQUISE »; note finale : « Statut BROUILLON - APPROBATION REQUISE […] Aucun numéro d'approbation ni signature de comité n'est présent dans ce document. » _(Pas d'approbation.)_
- `01_Courriels/E10_Fonction_mobile.eml`, courriel du 24 sept. 13:42, lignes 9 à 11 : « les optimisations mobiles avancées proposées dans CR-04 ne font pas partie de la phase 1 approuvée. Nous les reportons à la phase 2. Aucune dépense liée à CR-04 ne doit être engagée ou facturée sans nouvelle approbation. » _(Position officielle du chargé de projet, envoyée à Boréal et à Finances.)_
- `05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf`, page 1, section « Gestion des changements » : « Tout travail hors portée doit faire l'objet d'une demande de changement écrite et approuvée avant exécution et facturation. » _(La règle du contrat qui justifie le refus.)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, lignes 30 à 35 (15:34 à 15:40) : « autour de 18 000 $ […] Pas selon la portée actuelle. On va traiter ça séparément, aucune approbation aujourd'hui. […] Mobile : aucune décision de dépense. » _(Le comité n'a rien approuvé.)_
- `02_Reunions/M06_Transcript_Comite_26sept.txt`, lignes 22 à 24 (10:24 à 10:27) : « Regarder, oui. Facturer du CR-04, non. Il n'est pas approuvé. » _(Rappel au fournisseur après la facture.)_

**Nuances et pièges à éviter.**

- Ce qui est documenté : « Aucune dépense liée à CR-04 ne doit être engagée ou facturée » (E10, décision de portée). Ce qui n'est pas documenté : la façon de régulariser (facture corrigée ou paiement partiel). C'est une RECOMMANDATION de notre équipe, à confirmer par Nicolas et Finances.
- Boréal avait été prévenu avant même la facture. Nicolas a rappelé sur Teams le 22 sept. que le package CR-04 à 18 k n'est pas approuvé. Au comité du 26 sept. : « Regarder, oui. Facturer du CR-04, non. »
- Le dossier ne contient pas de réponse de Nicolas à Amélie (E07), ni de preuve que le jalon 3 est livré. À vérifier avant de payer.

**Sources croisées.** Facture, courriel de Finances, CR-04 (brouillon), courriel E10, contrat et transcriptions (M04, M06).

**Ce qu'on ne sait pas.** Pas de trace d'une note de crédit, d'une facture corrigée ni d'une réponse écrite à Finances. Livraison du jalon 3 non documentée.

## Q07. Où les données de production doivent-elles être hébergées? Quelle preuve confirme la mise en œuvre?

**Réponse.** Au Canada, dans la région Canada Central. La décision a été prise en atelier d'architecture le 23 juillet 2026 (Élodie, Marc, Sophie et Julien d'accord), à la demande de la sécurité (Sophie Lambert). Elle est formalisée dans l'ADR-007 (statut « Acceptée »). L'architecture v1 (East US, 18 juillet) est remplacée sur ce point. Preuves que c'est fait : 1) courriel de Boréal du 26 août 9 h 05 : « migration des ressources […] vers Canada Central est complétée », test de déploiement et de connectivité la veille sans blocage, schéma v2 joint; 2) schéma Architecture_NOVA_v2 (25 août, « Version révisée après ADR-007 », Données : Canada Central); 3) comité du 27 août : migration « déclarée terminée par Boréal et vérifiée par l'équipe architecture »; 4) plan projet : activité P-02 Architecture « Terminé », note « Migration Canada requise ».

**Preuves.**

- `06_Architecture_et_decisions/ADR-007_Localisation_donnees.md`, lignes 3, 4, 9 et 10 (Décision) : « L'environnement de production de NOVA sera déployé dans **Canada Central**. L'architecture v1 doit être considérée comme remplacée sur ce point. » _(La décision formelle (acceptée le 23 juillet).)_
- `02_Reunions/M02_Transcript_Architecture_23juillet.txt`, lignes 11 à 17 (09:06 à 09:12) : « Les données de production NOVA doivent demeurer au Canada. […] Donc on tranche Canada Central? Marc : Oui. Sophie : Oui. Julien : Oui de notre côté. […] La v1 devient donc obsolète pour la localisation des données. » _(D'où vient l'exigence, et l'accord de tous.)_
- `01_Courriels/E03_Confirmation_Canada_Central.eml`, courriel du 26 août 09:05, lignes 9 à 11 : « La migration des ressources prévues pour NOVA vers Canada Central est complétée. […] test de déploiement et de connectivité hier soir. Aucun blocage identifié. » _(Le fournisseur dit que c'est fait.)_
- `02_Reunions/M03_CR_Comite_27aout.txt`, ligne 5 : « La migration de l'architecture vers Canada Central est déclarée terminée par Boréal et vérifiée par l'équipe architecture. » _(Vérification côté client (autre source).)_
- `06_Architecture_et_decisions/Architecture_NOVA_v2.pdf`, page 1 : titre « v2 - 25 août 2026 », « Version révisée après ADR-007 », bloc « Données / Canada Central » : « Architecture NOVA - v2 - 25 août 2026 / Version révisée après ADR-007. … Données Canada Central » _(Le schéma en vigueur.)_
- `04_Documents_projet/Plan_Projet_NOVA_v3_12sept.xlsx`, ligne P-02 : C3 = « Terminé », G3 = « Migration Canada requise » : « A3=P-02 | B3=Architecture | C3=Terminé | … | G3=Migration Canada requise » _(Cohérent avec la migration terminée.)_
- `06_Architecture_et_decisions/Architecture_NOVA_v1.pdf`, page 1 : « v1 - 18 juillet 2026 », bloc « Données / East US » : « Version initiale préparée avant la décision de localisation des données. … Données East US » _(Version dépassée (pour le contexte).)_

**Nuances et pièges à éviter.**

- La pièce jointe de E03 est le même fichier que 06_Architecture_et_decisions/Architecture_NOVA_v2.pdf (même empreinte). Il ne faut pas la compter deux fois. La vraie confirmation indépendante, c'est le comité du 27 août (vérification côté client).
- L'ADR-007 demandait une validation technique avant les tests de production. Le compte rendu du 27 août en tient lieu (« vérifiée par l'équipe architecture »). Il n'y a pas de rapport de validation détaillé dans le dossier.
- Le schéma v2 est un dessin simplifié. Il ne liste pas les ressources migrées.

**Sources croisées.** ADR, transcription de l'atelier, courriel du fournisseur, compte rendu de comité, schéma v2 et plan.

**Ce qu'on ne sait pas.** Pas de rapport de validation technique détaillé. La liste exacte des ressources migrées n'est pas documentée.

## Q08. La sécurité est-elle acceptée? Distinguez livraison et validation.

**Réponse.** Non. LIVRAISON : Boréal a déployé un correctif pour SEC-210 (la journalisation des exports CSV administrateur est incomplète : la ligne EXPORT_CSV existe, mais sans objet ni résultat) sur l'environnement de validation le 19 septembre. Ses tests automatisés passent. VALIDATION : c'est Sophie Lambert qui accepte, et elle ne l'a pas fait. Le 19 sept. : « “déployé” != “accepté” ». Au comité du 26 sept. : « Nous n'avons pas encore donné l'acceptation sécurité de SEC-210 ». Re-test prévu, statut gardé EN VALIDATION le 26 septembre à 15 h 40. Le ticket est « Bloquante avant production ». Cette validation est la condition de go-live numéro 1. Le risque R-02 « Validation sécurité incomplète » est ouvert, avec une probabilité élevée.

**Preuves.**

- `03_Tickets/SEC-210.txt`, en-tête (Priorité « Bloquante avant production », Statut « EN VALIDATION ») et commentaires du 19 sept. 10:22, 19 sept. 14:05, 26 sept. 15:40 (lignes 23 à 25) : « Boréal : Fix déployé sur l'environnement de validation. Pour nous c'est réglé. / Sophie : […] Ne pas fermer avant validation sécurité. / Sophie : Re-test planifié. Statut maintenu EN VALIDATION. » _(Livraison et validation, dans le ticket.)_
- `03_Tickets/SEC-210.txt`, lignes 17 et 18 (Attendu / Observé) : « Observé : une ligne EXPORT_CSV existe avec utilisateur et horodatage, mais l'objet (identifiant du dossier) et le résultat sont absents. […] Le défaut est une journalisation d'export incomplète, pas l'absence totale d'une ligne d'export. » _(Le défaut exact.)_
- `03_Tickets/SEC-210_audit.png`, capture, tableau du journal, ligne 14:04:08 EXPORT_CSV : Objet « --- », Résultat « --- »; encadré « Observation QA » : « 14:04:08 | np.admin | EXPORT_CSV | --- | --- » _(Preuve visuelle du défaut.)_
- `01_Courriels/E08_Correctif_journalisation.eml`, courriel du 19 sept. 10:20, lignes 9 à 11 : « Le correctif pour SEC-210 est déployé en validation depuis ce matin. Nos tests automatisés passent et, pour nous, le problème est corrigé. Sophie, tu peux faire ton re-test » _(La livraison (fournisseur).)_
- `07_Conversations_Teams/Teams_19sept_Securite.txt`, ligne 5 (10:31) : « On garde le ticket en validation jusqu'à notre re-test. « déployé » != « accepté » :) » _(La position de la sécurité (autre source).)_
- `02_Reunions/M06_Transcript_Comite_26sept.txt`, lignes 6 à 8 (10:01 à 10:03) et 11 (10:09) : « Vous avez livré un fix. Nous n'avons pas encore donné l'acceptation sécurité de SEC-210. » _(État au dernier comité. Condition de go-live numéro 1.)_
- `04_Documents_projet/Rapport_Statut_21sept.pdf`, page 1, tableau Synthèse, ligne « Sécurité, VERT, Correctif SEC-210 livré »; « Commentaire de gestion » : « Sécurité VERT Correctif SEC-210 livré […] Le rapport a été préparé avant la dernière vérification détaillée de certains tickets. » _(CONTRADICTION (C-03) : livré n'est pas accepté.)_
- `04_Documents_projet/Registre_Risques_29sept.xlsx`, ligne R-02 : F3 = « Ouvert », C3 = « Élevée », G3 = « Re-test de SEC-210 avant go-live » : « A3=R-02 | B3=Validation sécurité incomplète | C3=Élevée | D3=Élevé | E3=Sophie Lambert | F3=Ouvert » _(Le registre est cohérent avec le ticket.)_

**Nuances et pièges à éviter.**

- Le rapport de statut du 21 septembre dit « Sécurité VERT, Correctif SEC-210 livré ». Il confond livraison et acceptation (et il admet avoir été écrit avant la vérification des tickets). Le brouillon d'Alex (« la sécurité […] complétée ») reprend cette erreur. À corriger (voir C-03).
- Le défaut n'est pas une absence totale de journal : la connexion, la consultation et la déconnexion sont bien tracées. C'est l'événement d'export qui est incomplet (capture SEC-210_audit : objet « --- », résultat « --- »).
- Sophie avait demandé dès le 23 juillet de journaliser les actions administrateur, « surtout consultation et export ». Le 27 août, elle a rappelé qu'il faudrait le vérifier en situation réelle.

**Sources croisées.** Ticket, capture, courriel du fournisseur, Teams sécurité, transcription du comité et registre. Le rapport de statut est écarté : c'est la sécurité qui décide, et les sources plus récentes le contredisent.

**Ce qu'on ne sait pas.** Date du re-test de Sophie inconnue (« planifié »). Résultat inconnu au 30 septembre.

## Q09. L'accessibilité est-elle complétée? Identifiez ce qui reste à corriger.

**Réponse.** Non. Deux anomalies sont corrigées et validées par Mélissa Gagnon : ACC-301 (champ sans étiquette, le lecteur d'écran dit « edit blank »), fermé le 15 août après validation avec NVDA et VoiceOver; ACC-302 (contraste 2,1:1 du texte de statut), fermé le 20 août après un re-test à 5,3:1. Il reste ACC-303 (créé le 17 septembre, priorité Haute, OUVERT) : dans la fenêtre « Modifier le dossier », le focus clavier tourne entre les champs Nom et Commentaire, et la touche Tab n'atteint jamais le bouton « Enregistrer » (reproduit sur Chrome et Edge). Boréal l'a reproduit le 18 sept. : le composant de fenêtre retient le focus avec une liste d'éléments incomplète. Au 26 septembre : « Toujours ouvert. Correctif annoncé pour la prochaine build. » Mélissa le juge bloquant avant la production. Sa fermeture est la condition de go-live numéro 2 (risque R-04 ouvert).

**Preuves.**

- `03_Tickets/ACC-303.txt`, en-tête (Priorité Haute, Statut OUVERT) et commentaires du 17 sept. 13:14, 18 sept. 09:50, 26 sept. 11:03 (lignes 14 à 16) : « le bouton Enregistrer n'est jamais atteint avec Tab. […] Le composant modal intercepte le focus avec une liste d'éléments focusables incomplète. […] 26 sept 11:03 - Mélissa : Toujours ouvert. Correctif annoncé pour la prochaine build. » _(Ce qui reste à corriger.)_
- `03_Tickets/ACC-303_focus.png`, capture Build 2026.09.17, bouton « Enregistrer » encadré, note « Le focus clavier ne rejoint pas ce bouton » : « Le focus clavier ne rejoint pas ce bouton » _(Preuve visuelle.)_
- `02_Reunions/M06_Transcript_Comite_26sept.txt`, lignes 9 et 15 (10:05, 10:12) : « Il reste ACC-303. La modale ne permet toujours pas d'atteindre Enregistrer au clavier. Pour moi c'est un bloquant d'accessibilité avant production. […] On vise le correctif ACC-303 dans la prochaine build. » _(État au dernier comité (autre source que le ticket).)_
- `03_Tickets/ACC-301.txt`, commentaire du 15 août (ligne 16) : « 15 août - Mélissa : Validé avec NVDA et VoiceOver. Fermé. » _(Corrigé et validé.)_
- `03_Tickets/ACC-302.txt`, commentaires des 13, 18 et 20 août (lignes 14 à 16) : « J'ai mesuré 2,1:1 […] 18 août - Boréal : Palette de statut corrigée. 20 août - Mélissa : Re-test OK à 5,3:1. Fermé. » _(Corrigé et validé.)_
- `01_Courriels/E04_Corrections_accessibilite.eml`, courriel du 20 août 15:44, ligne 9, et citation du 12 août (ligne 16) : « Tout devrait maintenant être conforme de notre côté. […] > Je veux aussi repasser les modales au clavier dans une prochaine build. » _(L'annonce du fournisseur ne couvre que les étiquettes et le contraste. Le passage clavier était déjà annoncé.)_
- `02_Reunions/M05_CR_Suivi_18sept.txt`, ligne 10 : « Accessibilité : ACC-301 et ACC-302 sont fermés. Un scénario de navigation clavier sur modal doit encore être vérifié. » _(État d'ensemble au 18 sept.)_
- `04_Documents_projet/Rapport_Statut_21sept.pdf`, page 1, ligne « Accessibilité, VERT, Correctifs appliqués » : « Accessibilité VERT Correctifs appliqués » _(CONTRADICTION (C-04) : ACC-303 est ouvert depuis le 17 sept.)_
- `04_Documents_projet/Registre_Risques_29sept.xlsx`, ligne R-04 : F5 = « Ouvert », G5 = « Fermer ACC-303 » : « A5=R-04 | B5=Accessibilité | … | F5=Ouvert | G5=Fermer ACC-303 » _(Le registre est cohérent.)_

**Nuances et pièges à éviter.**

- Le courriel de Boréal du 20 août (« Tout devrait maintenant être conforme ») ne parlait que des étiquettes et du contraste. Mélissa avait annoncé dès le 12 août un deuxième passage clavier sur les fenêtres (rappelé au comité du 27 août et au suivi du 18 sept.). Une correction annoncée par le fournisseur n'est pas une validation QA.
- Le rapport de statut du 21 septembre (« Accessibilité VERT, Correctifs appliqués ») est contredit par ACC-303, ouvert depuis le 17 septembre. Le brouillon d'Alex (« accessibilité complétée ») doit être corrigé (voir C-04).
- Les captures ACC-301_labels et ACC-302_contraste sont anciennes : elles ne prouvent pas que ces défauts sont encore là (ils sont fermés). La capture ACC-303_focus (Build 2026.09.17), elle, est confirmée par le commentaire du 26 sept.

**Sources croisées.** Tickets ACC-301, 302 et 303, capture, transcription M06, suivi M05, courriel E04 et registre. Le rapport de statut est écarté : c'est la QA qui valide, et les sources plus récentes le contredisent.

**Ce qu'on ne sait pas.** Date de la « prochaine build » inconnue. Aucun autre scénario clavier en attente n'est documenté (seul ACC-303 est ouvert).

## Q10. Quelles sont les trois conditions de go-live? Précisez les travaux manquants du runbook à partir de sa capture.

**Réponse.** Les trois conditions ont été fixées au comité de direction du 26 septembre par Nicolas Perron, et confirmées par Sophie, Mélissa et Olivier : 1) la sécurité valide SEC-210 (Sophie Lambert); 2) ACC-303 est fermé (Mélissa Gagnon, correctif Boréal dans la « prochaine build »); 3) le runbook est approuvé, avec la procédure de retour arrière (rollback) (Olivier Côté). Ce qui manque au runbook, d'après la capture OPS-601_runbook (« Version du 25 septembre ») : les étapes 1 à 3 sont « OK » (vérifier la santé des services, activer le mode maintenance, déployer la version approuvée); l'étape 4 « Procédure de retour arrière » est « TODO »; l'étape 5 « Validation fonctionnelle post-déploiement » est « À compléter ». Il manque donc le retour arrière ET la validation fonctionnelle après déploiement. Olivier veut en plus une procédure qu'une autre personne peut exécuter sans appeler l'équipe projet. Le 29 septembre, il n'avait toujours pas reçu la version finale.

**Preuves.**

- `02_Reunions/M06_Transcript_Comite_26sept.txt`, lignes 11 à 14 (10:09 à 10:10) et 16 (10:15) : « Donc trois conditions concrètes : validation sécurité de SEC-210, fermeture de ACC-303 et approbation du runbook incluant rollback. Exact? Sophie : Oui. Mélissa : Oui. Olivier : Oui. » _(Les conditions, telles que fixées.)_
- `03_Tickets/OPS-601_runbook.png`, capture « Version du 25 septembre », lignes 4 « Procédure de retour arrière : TODO » et 5 « Validation fonctionnelle post-déploiement : À compléter » : « 4. Procédure de retour arrière : TODO / 5. Validation fonctionnelle post-déploiement : À compléter » _(Les travaux manquants (la preuve demandée).)_
- `03_Tickets/OPS-601.txt`, commentaires des 25, 26 et 29 sept. (lignes 14 à 16) : « Il manque au minimum la procédure de rollback. La capture jointe identifie aussi une autre étape à compléter. J'ai besoin de quelque chose qu'une autre personne peut exécuter sans appeler l'équipe projet. […] 29 sept - Olivier : Toujours pas reçu la version finale. » _(L'exigence de l'exploitation et l'état au 29 sept.)_
- `01_Courriels/E09_Rappel_mise_en_production.eml`, courriel du 27 sept., ligne 11 : « conditionnelle aux validations restantes : sécurité, accessibilité et préparation exploitation. Le comité du 26 septembre a précisé les éléments à fermer. » _(Confirmation écrite (autre source).)_
- `02_Reunions/M06_Transcript_Comite_26sept.txt`, ligne 10 (10:07) : « Le runbook est encore incomplet. Il manque le rollback. Je ne donnerai pas mon go exploitation tant que je n'ai pas une procédure exécutable. » _(C'est Olivier Côté qui décide.)_
- `02_Reunions/M04_Transcript_Comite_direction_10sept.txt`, ligne 12 (15:12) : « je veux un runbook final au moins quelques jours avant. » _(Contrainte de délai (sans chiffre).)_
- `04_Documents_projet/Registre_Risques_29sept.xlsx`, lignes R-02, R-03, R-04 (F3 à F5 = « Ouvert ») : « R-02 Validation sécurité incomplète … R-03 Préparation exploitation incomplète … Finaliser le runbook et le rollback … R-04 Accessibilité … Fermer ACC-303 » _(Les trois conditions correspondent aux trois risques ouverts.)_

**Nuances et pièges à éviter.**

- Le ticket OPS-601 ne nomme que le rollback (« au minimum ») et renvoie à la capture pour « une autre étape à compléter » : c'est l'étape 5. Les deux doivent être livrées pour que le runbook puisse être approuvé.
- Ces conditions reprennent les « critères de sécurité, accessibilité et exploitation » posés par Nicolas dès le 10 septembre (15:27) et résumés dans E09 (27 sept.). Olivier avait demandé dès le 10 septembre un runbook final « au moins quelques jours avant » la mise en production.
- Aucune des trois conditions n'a de date limite documentée : « à confirmer » pour les trois, avant le 22 octobre.

**Sources croisées.** Transcription M06, capture du runbook, ticket OPS-601, courriel E09 et registre de risques.

**Ce qu'on ne sait pas.** Pas de date de livraison du runbook final ni de date du re-test. « Quelques jours avant » n'est pas chiffré.
