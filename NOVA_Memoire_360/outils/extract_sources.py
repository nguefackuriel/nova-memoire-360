#!/usr/bin/env python3
"""Extract every file of the NOVA corpus into a JSON index (sources.json).
Each source: id, path, category, kind, title, date, text (for display with line numbers),
image (base64) for screenshots, attachments info for emails.
"""
import base64, csv, email, hashlib, json, os, subprocess, sys
from email import policy
from pathlib import Path

ROOT = Path("Projet360_NOVA_ETUDIANTS")
OUT = Path("sources.json")

CATEGORIES = {
    "01_Courriels": "Courriels",
    "02_Reunions": "Réunions",
    "03_Tickets": "Tickets",
    "04_Documents_projet": "Documents projet",
    "05_Contrats_et_finances": "Contrats et finances",
    "06_Architecture_et_decisions": "Architecture et décisions",
    "07_Conversations_Teams": "Conversations Teams",
    "08_Archives_et_documents_connexes": "Archives et documents connexes",
}

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True).stdout

def read_eml(p):
    with open(p, "rb") as fh:
        msg = email.message_from_binary_file(fh, policy=policy.default)
    lines = []
    for h in ["From", "To", "Cc", "Date", "Subject", "Message-ID"]:
        if msg[h]:
            lines.append(f"{h}: {msg[h]}")
    lines.append("")
    atts = []
    for part in msg.walk():
        if part.is_multipart():
            continue
        fn = part.get_filename()
        if fn:
            payload = part.get_payload(decode=True)
            atts.append({"name": fn, "bytes": len(payload), "sha256": hashlib.sha256(payload).hexdigest()})
        elif part.get_content_type().startswith("text/"):
            lines.extend(part.get_content().rstrip("\n").split("\n"))
    if atts:
        lines.append("")
        for a in atts:
            lines.append(f"[Pièce jointe] {a['name']} ({a['bytes']} octets)")
    return "\n".join(lines), {"subject": msg["Subject"], "date": msg["Date"], "from": msg["From"], "attachments": atts}

def read_xlsx(p):
    import openpyxl
    wb = openpyxl.load_workbook(p)
    lines = []
    for ws in wb.worksheets:
        lines.append(f"[Feuille « {ws.title} », plage {ws.dimensions}]")
        for row in ws.iter_rows():
            cells = []
            for c in row:
                if c.value is not None and str(c.value) != "":
                    cells.append(f"{c.coordinate}={c.value}")
            if cells:
                lines.append(" | ".join(cells))
    return "\n".join(lines)

def read_pdf(p):
    txt = run(["pdftotext", "-layout", str(p), "-"])
    # collapse runs of blank lines
    out, blank = [], 0
    for l in txt.split("\n"):
        if l.strip() == "":
            blank += 1
            if blank > 1:
                continue
        else:
            blank = 0
        out.append(l.rstrip())
    return "\n".join(out).strip("\n")

def read_png(p):
    ocr = run(["tesseract", str(p), "-", "-l", "fra+eng"])
    ocr = "\n".join([l for l in ocr.split("\n") if l.strip()])
    b64 = base64.b64encode(p.read_bytes()).decode()
    return ocr, b64

sources = []
for dirpath, _, files in os.walk(ROOT):
    for f in sorted(files):
        p = Path(dirpath) / f
        rel = str(p.relative_to(ROOT))
        cat_key = rel.split("/")[0] if "/" in rel else "racine"
        cat = CATEGORIES.get(cat_key, "Racine")
        sid = f.rsplit(".", 1)[0]
        kind = p.suffix.lower().lstrip(".")
        rec = {"id": sid, "path": rel, "file": f, "category": cat, "kind": kind}
        if kind == "eml":
            text, meta = read_eml(p)
            rec.update(meta)
        elif kind == "xlsx":
            text = read_xlsx(p)
        elif kind == "pdf":
            text = read_pdf(p)
        elif kind == "png":
            text, b64 = read_png(p)
            rec["image"] = "data:image/png;base64," + b64
            rec["ocr"] = True
        else:
            text = p.read_text(encoding="utf-8", errors="replace").rstrip("\n")
        rec["text"] = text
        rec["sha256"] = hashlib.sha256(p.read_bytes()).hexdigest()
        rec["bytes"] = p.stat().st_size
        sources.append(rec)

# Hash-based duplicate detection (attachments present as separate files, archive copies)
by_hash = {}
for s in sources:
    by_hash.setdefault(s["sha256"], []).append(s["path"])
for s in sources:
    for a in s.get("attachments", []):
        dup = by_hash.get(a["sha256"], [])
        a["same_as"] = dup
# archive email duplicate
for s in sources:
    same = [x["path"] for x in sources if x["sha256"] == s["sha256"] and x["path"] != s["path"]]
    if same:
        s["duplicate_of"] = same

OUT.write_text(json.dumps(sources, ensure_ascii=False, indent=1))
print(len(sources), "sources ->", OUT, OUT.stat().st_size, "bytes")
for s in sources:
    if s.get("attachments") or s.get("duplicate_of"):
        print(s["path"], "att:", [(a["name"], a["same_as"]) for a in s.get("attachments", [])], "dup:", s.get("duplicate_of"))
