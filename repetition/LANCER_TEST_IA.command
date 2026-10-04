#!/bin/bash
# Double-cliquer ce fichier : il teste la vitesse du modèle local, puis fait traiter l'événement fictif E13.
# Les résultats sont écrits dans _repetition/resultat_bench.txt et _repetition/resultat_evenement.txt
cd "$(dirname "$0")/.."
echo "Dossier : $(pwd)"
echo "=== 1/3 Ollama répond ? ===" | tee _repetition/resultat_bench.txt
curl -s --max-time 5 http://localhost:11434/api/tags | head -c 400 | tee -a _repetition/resultat_bench.txt
echo | tee -a _repetition/resultat_bench.txt
echo "=== 2/3 Test de vitesse (qwen2.5:7b) ===" | tee -a _repetition/resultat_bench.txt
python3 NOVA_Memoire_360/outils/ia/assistant_nova.py bench x 2>&1 | tee -a _repetition/resultat_bench.txt
echo "=== 3/3 Événement fictif E13 ===" | tee _repetition/resultat_evenement.txt
python3 NOVA_Memoire_360/outils/ia/assistant_nova.py evenement _repetition/E13_exemple_fictif.eml 2>&1 | tee -a _repetition/resultat_evenement.txt
echo
echo "Terminé. Vous pouvez fermer cette fenêtre."
