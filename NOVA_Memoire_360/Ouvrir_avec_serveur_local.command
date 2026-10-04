#!/bin/bash
# Ouvre la memoire NOVA par un petit serveur local (http://localhost:8765) au lieu du double-clic sur index.html.
# Utile pour l assistant IA : Ollama accepte les appels venant de http://localhost sans reglage, et Safari ne bloque pas.
# Laisser cette fenetre ouverte pendant la demonstration. Fermer avec Ctrl+C.
cd "$(dirname "$0")"
PORT=8765
echo "NOVA Memoire 360 : serveur local sur http://localhost:$PORT/index.html"
echo "Laissez cette fenetre ouverte. Ctrl+C pour arreter."
( sleep 1; open "http://localhost:$PORT/index.html" ) &
python3 -m http.server "$PORT" --bind 127.0.0.1
