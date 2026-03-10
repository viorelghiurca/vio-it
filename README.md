<div align="center">

<img src="public/favicon.svg" alt="VIO-IT Logo" width="80" height="80" />

# VIO-IT

### Digitale Lösungen für moderne Unternehmen

**Professionelle Business-Website · React 18 · Vite 6 · Tailwind CSS 3**

[![Deploy](https://github.com/viorelghiurca/vio-it/actions/workflows/deploy.yml/badge.svg)](https://github.com/viorelghiurca/vio-it/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/Lizenz-Privat-red)

[🌐 Live ansehen](https://it.ghiurcaviorel.de) &nbsp;·&nbsp; [📬 Kontakt](https://it.ghiurcaviorel.de/kontakt)

</div>

---

## Überblick

VIO-IT ist die vollständige, produktionsreife Business-Website von **Viorel Ghiurca** — IHK-geprüfter Fachinformatiker mit Fokus auf KI-Automatisierung, Webentwicklung und IT-Support für kleine und mittelständische Unternehmen in Deutschland.

Die Website ist auf maximale **Conversion**, **SEO-Performance** und **DSGVO-Konformität** ausgelegt.

---

## Features

| Bereich | Details |
|---|---|
| **Design** | Premium-Design · Scroll-Animationen · Mobile First · Apple-inspirierte Ästhetik |
| **Seiten** | Start · Über mich · Leistungen (5 Bereiche) · Kontakt · Rechtliches |
| **Kontaktformular** | Web3Forms-Integration · E-Mail-Benachrichtigung · Spam-Schutz (Honeypot + Cooldown) |
| **SEO** | Semantisches HTML · Meta-Tags · Structured Data (JSON-LD) · Canonical URLs |
| **DSGVO** | Nur notwendige Cookies · DSGVO-Einwilligung im Formular · Datenschutzseite |
| **Deployment** | Automatisch via GitHub Actions → GitHub Pages |
| **Performance** | Code-Splitting · Lazy-loaded Chunks · Optimierte Ladezeiten |

---

## Tech Stack

```
Frontend        React 18 · React Router 6 · Framer Motion
Styling         Tailwind CSS 3 · Lucide Icons · Inter Typeface
Formulare       React Hook Form · React Hot Toast · Web3Forms
Build           Vite 6 · PostCSS · Autoprefixer
CI/CD           GitHub Actions → GitHub Pages
```

---

## Schnellstart

### Voraussetzungen

- [Node.js](https://nodejs.org) ≥ 18
- npm ≥ 9
- Web3Forms Access Key (kostenlos auf [web3forms.com](https://web3forms.com))

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/viorelghiurca/vio-it.git
cd vio-it

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen anlegen
cp .env.example .env
# → .env mit Web3Forms Access Key befüllen

# 4. Dev-Server starten
npm run dev
# → http://localhost:5173
```

---

## Umgebungsvariablen

Alle Konfigurationswerte werden über `.env` eingebunden.
Die `.env`-Datei wird **niemals committed** (ist in `.gitignore`).

```env
# Web3Forms – Access Key von https://web3forms.com
VITE_WEB3FORMS_KEY=YOUR_ACCESS_KEY
```

---

## Web3Forms einrichten

Web3Forms ermöglicht das Empfangen von Kontaktanfragen per E-Mail – **ohne eigenen Server, ohne Datenbank**.

1. Auf [web3forms.com](https://web3forms.com) die eigene E-Mail-Adresse eingeben
2. Bestätigungs-E-Mail bestätigen → Access Key wird angezeigt
3. Access Key in `.env` als `VITE_WEB3FORMS_KEY` eintragen
4. Fertig — bei jeder Kontaktanfrage erhalten Sie eine E-Mail

---

## Deployment auf GitHub Pages

### Einmalige Einrichtung

**Schritt 1 – Repo auf GitHub anlegen und pushen**

```bash
git init
git add .
git commit -m "feat: initial VIO-IT website"
git remote add origin https://github.com/viorelghiurca/vio-it.git
git push -u origin main
```

**Schritt 2 – GitHub Secret hinterlegen**

Repository → **Settings** → **Secrets and variables** → **Actions** → *New repository secret*:

| Secret | Wert |
|---|---|
| `VITE_WEB3FORMS_KEY` | Web3Forms Access Key |

**Schritt 3 – GitHub Pages aktivieren**

Repository → **Settings** → **Pages** → *Source: GitHub Actions*

**Schritt 4 – Fertig**

Jeder Push auf `main` triggert automatisch einen Build und deployt auf GitHub Pages.

---

### Custom Domain einrichten

**Schritt 1 – Domain in GitHub hinterlegen**

Repository → Settings → Pages → **Custom domain** → `it.ghiurcaviorel.de` → Speichern

**Schritt 2 – DNS-Einträge beim Provider setzen**

```
Typ     Host    Wert
────────────────────────────────────
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     viorelghiurca.github.io
```

**Schritt 3 – HTTPS erzwingen**

Repository → Settings → Pages → ✅ **Enforce HTTPS**

> DNS-Änderungen können bis zu 24 Stunden dauern.

---

## Projektstruktur

```
vio-it/
│
├── .github/
│   └── workflows/
│       └── deploy.yml                  # CI/CD: Build & Deploy auf GitHub Pages
│
├── public/
│   ├── favicon.svg                     # SVG-Logo (skalierbar)
│   ├── CNAME                           # Custom Domain für GitHub Pages
│   └── 404.html                        # SPA-Fallback-Redirect für GitHub Pages
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx              # Sticky Header mit transparentem Scroll-Effekt
│   │   │   ├── Footer.jsx              # Footer mit Navigation & Rechtliches
│   │   │   └── Layout.jsx              # Seitenlayout-Wrapper (Header + Outlet + Footer)
│   │   └── ui/
│   │       ├── AnimatedSection.jsx     # IntersectionObserver-basierte Scroll-Animationen
│   │       └── SEOHead.jsx             # Dynamische Meta-Tags und OG-Tags pro Seite
│   │
│   ├── context/
│   │   └── CookieContext.jsx           # Cookie-Einwilligungsstatus (React Context)
│   │
│   ├── lib/
│   │   └── spamProtection.js           # Honeypot + Cooldown-Schutz für Formulare
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                # Startseite: Hero · Services · Why VIO-IT · FAQ · CTA
│   │   ├── UeberMichPage.jsx           # Über mich: Bio · Skills · Werte
│   │   ├── LeistungenPage.jsx          # 5 Leistungsbereiche mit Anchor-Navigation
│   │   ├── KontaktPage.jsx             # Kontaktformular mit Web3Forms
│   │   ├── NotFoundPage.jsx            # 404-Fehlerseite
│   │   └── legal/
│   │       ├── ImpressumPage.jsx       # Impressum gemäß § 5 TMG
│   │       ├── DatenschutzPage.jsx     # Datenschutzerklärung gemäß DSGVO
│   │       └── CookiePage.jsx          # Cookie-Richtlinie mit Live-Einwilligungsstatus
│   │
│   ├── App.jsx                         # Router-Setup
│   ├── main.jsx                        # React-Einstiegspunkt mit HelmetProvider
│   └── index.css                       # Tailwind Directives · Component-Layer · Utilities
│
├── .env.example                        # Vorlage für Umgebungsvariablen
├── .gitignore
├── index.html                          # HTML-Shell: SEO-Meta · Structured Data · CSP
├── tailwind.config.js                  # Design-System: Farben · Typo · Shadows · Animations
├── vite.config.js                      # Vite: React-Plugin · Code-Splitting
├── postcss.config.js
└── package.json
```

---

## Verfügbare Befehle

```bash
npm run dev       # Dev-Server starten → http://localhost:5173
npm run build     # Produktions-Build → ./dist/
npm run preview   # Build lokal vorschauen → http://localhost:4173
npm run lint      # ESLint ausführen
```

---

## Vor dem Live-Gang – Checkliste

**Web3Forms**
- [ ] Access Key auf [web3forms.com](https://web3forms.com) erstellen
- [ ] `VITE_WEB3FORMS_KEY` in `.env` und als GitHub Secret hinterlegen

**Inhalte**
- [ ] Impressum: Adresse & Steuernummer in `ImpressumPage.jsx` prüfen
- [ ] Datenschutz: Angaben in `DatenschutzPage.jsx` prüfen
- [ ] Profilfoto: Platzhalter in `UeberMichPage.jsx` durch echtes Foto ersetzen
- [ ] OG-Bild: `public/og-image.png` (1200×630 px) für Social-Media-Vorschau hinzufügen

**Deployment**
- [ ] `VITE_WEB3FORMS_KEY` als GitHub Secret hinterlegen
- [ ] GitHub Pages aktivieren (*Source: GitHub Actions*)
- [ ] Custom Domain `it.ghiurcaviorel.de` in GitHub Pages konfigurieren
- [ ] DNS-Einträge beim Provider setzen
- [ ] HTTPS erzwingen aktivieren

---

## Seitenstruktur (Sitemap)

```
/                           Startseite
├── /ueber-mich             Über Viorel Ghiurca / VIO-IT
├── /leistungen             Leistungsübersicht
│   ├── #ki-automatisierung
│   ├── #website-erstellung
│   ├── #hardware-software
│   ├── #it-support
│   └── #digitalisierung
├── /kontakt                Kontaktformular
├── /impressum              Impressum § 5 TMG
├── /datenschutz            Datenschutzerklärung DSGVO
└── /cookie-richtlinie      Cookie-Richtlinie & Live-Einwilligungsstatus
```

---

<div align="center">

**VIO-IT · Viorel Ghiurca · IHK-geprüfter Fachinformatiker**

[it.ghiurcaviorel.de](https://it.ghiurcaviorel.de) · [viorelghiurca.de](https://www.viorelghiurca.de) · [mail@viorelghiurca.de](mailto:mail@viorelghiurca.de)

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/viorelghiurca)

Made in Germany 🇩🇪

</div>
