Scripts pour refaire la mémoire (à lancer depuis un dossier qui contient Projet360_NOVA_ETUDIANTS/) :
  python3 extract_sources.py   # produit sources.json
  python3 build.py             # produit NOVA_Memoire_360/index.html, nova_memory.json, updates.js, et copie le corpus
  python3 export_docs.py       # produit les fichiers Markdown
Il faut : python3, openpyxl, poppler-utils (pdftotext), tesseract (langue fra).
Données : data_*.py. Interface : app_js.js. Aide à la fiche par règles : app_aide.js. Assistant IA local : app_ia.js et ia/assistant_nova.py.
