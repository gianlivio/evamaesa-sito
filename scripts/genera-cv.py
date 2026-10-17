"""Rigenera i PDF del curriculum (IT, EN, FR) da /cv/<lingua>.

Uso, a sito avviato su localhost:3000 (npx next start -p 3000):
    python3 scripts/genera-cv.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

DOCUMENTI = Path(__file__).resolve().parent.parent / "public" / "documenti"
NOMI = {"it": "eva-maesa-cv.pdf", "en": "eva-maesa-cv-en.pdf", "fr": "eva-maesa-cv-fr.pdf"}

with sync_playwright() as p:
    browser = p.chromium.launch()
    pagina = browser.new_page()
    for lingua, nome in NOMI.items():
        pagina.goto(f"http://localhost:3000/cv/{lingua}", wait_until="networkidle")
        pagina.evaluate("document.fonts.ready")
        pagina.pdf(path=str(DOCUMENTI / nome), prefer_css_page_size=True, print_background=True)
        print(nome)
    browser.close()
