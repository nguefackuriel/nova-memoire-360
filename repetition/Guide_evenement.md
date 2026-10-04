# Se préparer à la nouvelle information (l'événement)

Ce dossier `_repetition/` est pour vous entraîner. Il ne fait pas partie du rendu.

Pendant la présentation finale, on va vous donner une nouvelle information (un courriel, un ticket, un compte rendu, une facture…). Le jury veut trois choses, et il note sur 10 points avec deux critères de 5 points :

- **Critère 1** : vous distinguez le **statut du problème**, la **décision antérieure** et la **nouvelle proposition**.
- **Critère 2** : vous gardez le **baseline**, vous donnez les **impacts et actions avec leurs preuves**, et vous **n'inventez pas d'approbation** et vous **ne fermez pas les autres conditions**.

L'outil est déjà construit pour ça. Ce qu'il faut préparer, c'est votre réflexe.

## 1. Les rôles dans l'équipe (à décider avant)

- **Le lecteur** : lit le document reçu, le dépose dans `corpus/09_Evenement/`, sort les citations mot pour mot avec leur repère (ligne, heure).
- **Le scribe** : remplit le formulaire de l'onglet **Mise à jour** pendant que le lecteur dicte.
- **Le présentateur** : parle au jury avec la fiche « Réponse aux trois questions du jury » (vue « Mis à jour »).

Si vous êtes deux : le lecteur présente, le scribe saisit. Si vous êtes seul : lisez, saisissez, puis présentez. Ne présentez jamais de mémoire : lisez la fiche à l'écran.

## 2. La procédure en 10 minutes

1. **Lire deux fois** le document. La première fois pour comprendre, la deuxième pour repérer les pièges (voir le point 4).
2. **Classer** l'événement en un mot : fait, proposition, décision, validation, livraison, communication ou contradiction. Posez-vous la question : **qui parle, et a-t-il le pouvoir de décider ça?**
3. **Déposer** le fichier dans `NOVA_Memoire_360/corpus/09_Evenement/`.
4. **Remplir** le formulaire (onglet Mise à jour) avec l'**aide rapide** : collez le texte, « 1. Analyser le texte », vérifiez qui parle, la nature et les sujets cochés, puis « 2. Générer la fiche ». La fiche se remplit avec la bonne règle pour chaque sujet. Il ne reste qu'à écrire les passages « À COMPLÉTER » (ce que dit le document, en une phrase chacun) et à effacer ce qui ne s'applique pas. N'utilisez pas le modèle local pour la fiche en direct : testé sur ce Mac, il met 7 minutes et il invente des validations. Si vous remplissez tout à la main, dans cet ordre :
   - Résumé : une phrase, sans interpréter.
   - Source : fichier, repère, citation mot pour mot.
   - Statut du problème : où en est le ticket ou le sujet, vraiment (livré? validé? fermé par qui?).
   - Décision antérieure : ce qui tient toujours (presque toujours : « 22 octobre approuvé le 10 sept., sous les trois conditions du 26 sept. »).
   - Nouvelle proposition : s'il y en a une, qui la fait, et écrire « NON approuvée ».
   - Faits touchés : une ligne par réponse ou décision touchée (Q01, Q08, D-07, C-04…), avec avant, après, preuve.
   - Actions touchées : une ligne par action existante (A-01 à A-13).
   - Nouvelles actions : A-14, A-15… avec responsable (confirmé ou proposé) et date (ou « À confirmer »).
   - Ce qui ne change pas : listez les conditions qui restent ouvertes, nommément.
   - Ce qu'on ne sait pas.
5. **Enregistrer dans ce navigateur**, puis **Télécharger updates.js** et remplacer le fichier à côté de `index.html`.
6. **Passer à la vue « Mis à jour (événement) »** (bouton en haut). Ouvrir l'onglet Mise à jour : la fiche « Réponse aux trois questions du jury » est en haut.
7. **Montrer le baseline** : revenir sur la vue « Baseline » une seconde pour prouver qu'il est intact, puis revenir à « Mis à jour ».

Chronométrez-vous. Le but : moins de 10 minutes entre la réception et la fiche affichée (moins de 5 avec l'aide rapide).

Si vous voulez montrer l'assistant IA au jury (onglet Assistant IA, questions en langage naturel) : ouvrez la page avec `Ouvrir_avec_serveur_local.command` (pas par double-clic sur index.html, sinon Safari et Ollama bloquent), testez la connexion **avant** d'entrer dans la salle, et lancez une question d'avance (2 à 3 minutes par réponse sur ce Mac) pour avoir une réponse à l'écran. Présentez-le comme un bonus, pas comme le cœur du système.

## 3. Ce que vous dites au jury (script, 2 minutes)

Parlez dans l'ordre des trois questions, en lisant la fiche :

> « **Ce qui vient de changer** : [résumé]. La preuve est ici : [fichier, ligne]. Le statut réel du problème est [statut]. La décision antérieure, c'est le 22 octobre approuvé le 10 septembre, sous trois conditions : elle tient toujours. Il y a une nouvelle proposition : [qui propose quoi]. Elle n'est pas approuvée, parce que [qui a le pouvoir de décider] ne s'est pas prononcé. »
>
> « **Les informations touchées** : [lire le tableau avant / après]. Le baseline reste affiché tel quel, avec un badge. »
>
> « **Les actions** : [actions modifiées], et [nouvelles actions] avec responsable et date, ou “à confirmer” quand le document ne donne pas de date. »
>
> « **Ce qui ne change pas** : [les conditions encore ouvertes, une par une]. Et **ce qu'on ne sait pas** : [liste]. »

Finissez par : « Nous n'avons fermé aucune condition et inventé aucune approbation. »

## 4. Les pièges probables (le dossier en est plein, l'événement le sera aussi)

| Si le document dit… | Le réflexe |
|---|---|
| « correctif livré », « déployé », « nos tests passent » | Livré n'est pas validé. Le ticket reste ouvert jusqu'au retest de la bonne personne (Sophie pour SEC-210, Mélissa pour ACC-303, Olivier pour le runbook). |
| « nous proposons », « nous recommandons », « nous considérons que » | C'est une proposition. Elle n'est approuvée que si le comité de direction (date) ou le chargé de projet (portée) le dit noir sur blanc. |
| une nouvelle date (29 octobre, 5 novembre…) | Le 22 reste la date approuvée tant qu'un comité n'a pas décidé. Action : convoquer le comité, Nicolas décide avec les validateurs. Ne pas changer le plan avant la décision. Vérifier la fin du contrat (31 octobre). |
| « la condition X est réglée » écrit par Boréal | Boréal ne peut fermer aucune condition. Dire qui peut. |
| une condition est vraiment fermée (ex. : Sophie accepte SEC-210) | Bravo, mais les deux autres restent ouvertes. Dites-le. La date reste sous conditions. |
| un montant (facture, note de crédit, nouveau CR) | Recalculez autorisé (204 000 $), facturé, payé. Un CR n'ajoute au montant autorisé que s'il est approuvé, avec l'instance et la date. |
| quelqu'un « approuve » sans en avoir le pouvoir (Alex, Julien, un stagiaire…) | Notez-le comme avis, pas comme décision. Dites qui aurait dû approuver. |
| une date d'événement avant le 30 sept. 9 h | Vérifiez si elle contredit le baseline. Une information ancienne découverte tard ne change pas une décision plus récente. |
| un document sans auteur ou sans date | Aucun poids. Le dire. |
| un changement de responsable | Nouveau responsable à partir de la date écrite dans l'annonce officielle, pas avant. |

## 5. Scénarios à répéter (un par passage, 10 minutes chacun)

1. **Fourni dans ce dossier** : Boréal livre le correctif ACC-303, annonce le runbook, propose une date « ferme » et demande le paiement complet de INV-003 (`E13_exemple_fictif.eml`, traité dans `exemple_updates.js`).
2. Sophie annonce que le re-test SEC-210 a **échoué** : l'objet est présent mais pas le résultat. Statut : toujours EN VALIDATION. Nouvelle action : nouveau correctif Boréal, nouveau re-test. Risque R-02 monte. Date toujours le 22, sous conditions. Pensez au 31 octobre (fin du contrat).
3. Boréal propose de reporter au **29 octobre** parce que la build corrective ACC-303 a glissé. Proposition, pas décision. Action : comité de direction à convoquer; Nicolas décide avec Sophie, Mélissa, Olivier. Pas de pénalité (contrat jusqu'au 31 octobre), mais la marge devient nulle.
4. Olivier reçoit le runbook et **approuve** le retour arrière, mais l'étape 5 manque encore. Condition 3 toujours ouverte (il a dit « procédure exécutable » complète). Ou bien il approuve tout : condition 3 fermée, les deux autres restent ouvertes.
5. Boréal envoie une **note de crédit** de 18 000 $ sur INV-003. INV-003 passe à 36 000 $. Facturé 168 000 $, marge 36 000 $. Vérifier le jalon 3 avant de payer. CR-04 reste reporté en phase 2.
6. Un courriel d'Alex dit que la communication « NOVA au vert » **a été envoyée** à toute l'organisation. Statut : communication fausse envoyée. Actions : rectificatif validé par Nicolas; ne change rien aux conditions.

Pour chaque scénario, écrivez d'avance sur papier : statut du problème, décision antérieure, nouvelle proposition, ce qui ne change pas. Le jour J, vous n'aurez qu'à adapter.

## 6. Fiche papier de secours (si l'ordinateur est pris)

Événement reçu le ______ · fichier ______ · repère ______ · type ______

- Ce qui vient de changer (une phrase) :
- Citation mot pour mot :
- Statut réel du problème :
- Décision antérieure qui tient toujours :
- Nouvelle proposition (qui, à qui) : ______ NON approuvée parce que ______
- Faits touchés (réf, avant, après, preuve) :
- Actions touchées (réf, changement) :
- Nouvelles actions (titre, responsable, date ou à confirmer, preuve) :
- Ce qui ne change pas (nommer les conditions ouvertes) :
- Ce qu'on ne sait pas :

## 7. Vérification avant de parler (30 secondes)

- [ ] La vue « Baseline » est intacte (aucun badge).
- [ ] La vue « Mis à jour » montre les badges ↻ sur les bonnes entrées.
- [ ] Chaque ligne « après » a une preuve avec un repère.
- [ ] Le mot « approuvé » n'apparaît que si une instance habilitée l'a écrit.
- [ ] Les conditions non touchées sont nommées dans « Ce qui ne change pas ».
- [ ] `updates.js` a été remplacé (sinon la mise à jour n'existe que dans ce navigateur).
- [ ] Plus aucun « À COMPLÉTER » dans la fiche; vous avez relu « nouvelle proposition » et « ce qui ne change pas ».
