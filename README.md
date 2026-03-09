<div align="center">

<img src="public/favicon.svg" alt="VIO-IT Logo" width="80" height="80" />

# VIO-IT

### Digitale Lösungen für moderne Unternehmen

**Professionelle Business-Website · React 18 · Vite 6 · Tailwind CSS 3 · Firebase · EmailJS**

[![Deploy](https://github.com/viorelghiurca/vio-it/actions/workflows/deploy.yml/badge.svg)](https://github.com/viorelghiurca/vio-it/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.4-FFCA28?logo=firebase&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-4.4-FF6B35?logo=minutemailer&logoColor=white)
![License](https://img.shields.io/badge/Lizenz-Privat-red)

[🌐 Live ansehen](https://it.ghiurcaviorel.de) &nbsp;·&nbsp; [📅 Termin buchen](https://it.ghiurcaviorel.de/termin) &nbsp;·&nbsp; [📬 Kontakt](https://it.ghiurcaviorel.de/kontakt)

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
| **Seiten** | Start · Über mich · Leistungen (5 Bereiche) · Terminbuchung · Kontakt · Rechtliches |
| **Terminbuchung** | 4-stufiger Buchungsprozess · Echtzeit-Kalender · Slot-Sperrung · Firebase-Speicherung |
| **E-Mail-System** | Kunden-Bestätigungsmail · Admin-Benachrichtigung · Stornierungs-Bestätigung (EmailJS) |
| **Stornierung** | Self-Service-Stornierungsseite per Link-in-Mail · automatische Firestore-Aktualisierung |
| **Backend** | Firebase Firestore für Kontaktanfragen & Terminbuchungen |
| **SEO** | Semantisches HTML · Meta-Tags · Structured Data (JSON-LD) · Canonical URLs |
| **DSGVO** | Cookie-Banner mit Opt-in/Opt-out · DSGVO-Einwilligungen in Formularen |
| **Deployment** | Automatisch via GitHub Actions → GitHub Pages |
| **Performance** | Code-Splitting · Lazy-loaded Chunks · Optimierte Ladezeiten |

---

## Tech Stack

```
Frontend        React 18 · React Router 6 · Framer Motion
Styling         Tailwind CSS 3 · Lucide Icons · Inter Typeface
Formulare       React Hook Form · React Hot Toast
Backend         Firebase 11 (Firestore + Analytics)
E-Mail          EmailJS 4 (kein Backend erforderlich)
Build           Vite 6 · PostCSS · Autoprefixer
CI/CD           GitHub Actions → GitHub Pages
```

---

## Schnellstart

### Voraussetzungen

- [Node.js](https://nodejs.org) ≥ 18
- npm ≥ 9
- Firebase-Projekt (kostenlos auf [console.firebase.google.com](https://console.firebase.google.com))
- EmailJS-Account (kostenlos auf [emailjs.com](https://www.emailjs.com))

### Installation

```bash
# 1. Repository klonen
git clone https://github.com/viorelghiurca/vio-it.git
cd vio-it

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen anlegen
cp .env.example .env
# → .env mit echten Firebase- und EmailJS-Werten befüllen (siehe unten)

# 4. Dev-Server starten
npm run dev
# → http://localhost:5173
```

---

## Umgebungsvariablen

Alle Konfigurationswerte werden über `.env` eingebunden.  
Die `.env`-Datei wird **niemals committed** (ist in `.gitignore`).

```env
# Firebase – Werte aus Firebase Console
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# EmailJS – Werte aus EmailJS Dashboard
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_BESTAETIGUNG=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_STORNIERUNG=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_ADMIN=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# Basis-URL (für Stornierungs-Links in E-Mails)
VITE_BASE_URL=https://it.ghiurcaviorel.de
```

> **Firebase:** Console → Projekteinstellungen → Deine Apps → Webkonfiguration  
> **EmailJS:** Dashboard → Email Services / Email Templates / Account → API Keys

---

## Firebase einrichten

### 1. Firestore aktivieren

Firebase Console → **Firestore Database** → „Datenbank erstellen" → Produktionsmodus.

### 2. Sicherheitsregeln setzen

Firebase Console → Firestore → **Regeln** → folgenden Code einfügen und veröffentlichen:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── Kontaktanfragen: nur Erstellen, kein Lesen/Ändern/Löschen ──
    match /kontaktanfragen/{id} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'betreff', 'nachricht'])
                    && request.resource.data.name is string
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read, update, delete: if false;
    }

    // ── Terminbuchungen: enthält personenbezogene Daten ──
    // get = Einzeldokument lesen (für Stornierungsseite, Authentifizierung via geheimer Dokument-ID)
    // list = GESPERRT (kein Massen-Auslesen aller Kundendaten!)
    match /terminbuchungen/{id} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'terminArt', 'datum', 'uhrzeit'])
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow get:    if true;
      allow list:   if false;
      allow update: if request.resource.data.diff(resource.data)
                         .affectedKeys().hasOnly(['status', 'cancelledAt'])
                    && request.resource.data.status == 'storniert';
      allow delete: if false;
    }

    // ── Belegte Slots: NUR Datum + Uhrzeit, KEINE personenbezogenen Daten ──
    // Darf öffentlich gelesen werden (Kalender-Anzeige).
    match /belegteSlots/{slotId} {
      allow read:   if true;
      allow create: if request.resource.data.keys().hasAll(['datum', 'uhrzeit', 'bookingId'])
                    && request.resource.data.datum is string
                    && request.resource.data.uhrzeit is string;
      allow delete: if true;
      allow update: if false;
    }

  }
}
```

### 3. Analytics (optional)

Firebase Console → **Analytics** aktivieren.  
Analytics wird automatisch erst nach Cookie-Einwilligung des Nutzers geladen.

---

## EmailJS einrichten

EmailJS ermöglicht das Versenden von E-Mails direkt aus dem Browser – **ohne eigenen Server**.

### 1. Account & Service anlegen

1. Kostenlosen Account auf [emailjs.com](https://www.emailjs.com) erstellen
2. **Email Services** → „Add New Service" → Gmail / eigene Domain verbinden
3. Notierten **Service ID** (z.B. `service_abc1234`)

### ⚠️ Sicherheit: Domain-Restriction aktivieren

Da der EmailJS Public Key im Browser sichtbar ist, **unbedingt** eine Domain-Beschränkung setzen:

1. [emailjs.com](https://www.emailjs.com) → **Account** → **Security**
2. **Allowed Origins** → `https://it.ghiurcaviorel.de` eintragen
3. Speichern

Damit können E-Mails nur noch von eurer Domain aus versendet werden – auch wenn jemand den Public Key kennt.

### 2. Drei E-Mail-Templates anlegen

Die fertigen HTML-Templates liegen im Ordner `email-templates/` und können direkt in EmailJS eingefügt werden.

| Template-Datei | Verwendung | Empfänger | Betreff (Beispiel) |
|---|---|---|---|
| `template-kunde-bestaetigung.html` | Nach Buchung | Kunde | `Terminbestätigung – {{booking_date}} um {{booking_time}}` |
| `template-kunde-stornierung.html` | Nach Stornierung | Kunde | `Ihr Termin wurde storniert` |
| `template-admin.html` | Nach jeder Buchung | Sie (Admin) | `🔔 Neue Buchung: {{customer_name}} – {{booking_date}}` |

**Vorgehen pro Template:**
- EmailJS → Email Templates → „Create New Template"
- Tab „Settings": Name & Subject eintragen
- Tab „Content": Auf „HTML Editor" umschalten → Inhalt aus der jeweiligen Datei einfügen
- Speichern → **Template ID** notieren

### 3. Template-Variablen Übersicht

**Kunden-Bestätigung** (`template-kunde-bestaetigung.html`):

| Variable | Beschreibung |
|---|---|
| `{{to_name}}` | Name des Kunden |
| `{{to_email}}` | E-Mail des Kunden |
| `{{booking_id}}` | Buchungs-ID (8 Zeichen) |
| `{{booking_type}}` | Terminart (ausgeschrieben) |
| `{{booking_date}}` | Datum (DD.MM.YYYY) |
| `{{booking_time}}` | Uhrzeit (z.B. 10:00 Uhr) |
| `{{cancel_url}}` | Link zur Stornierungsseite |

**Kunden-Stornierung** (`template-kunde-stornierung.html`): Wie oben, ohne `cancel_url`.

**Admin-Benachrichtigung** (`template-admin.html`):

| Variable | Beschreibung |
|---|---|
| `{{to_email}}` | Admin-E-Mail (fest im Code) |
| `{{booking_id}}` | Buchungs-ID (8 Zeichen) |
| `{{booking_id_full}}` | Vollständige Firestore-ID |
| `{{booking_type}}` | Terminart |
| `{{booking_date}}` | Datum |
| `{{booking_time}}` | Uhrzeit |
| `{{customer_name}}` | Name des Kunden |
| `{{customer_email}}` | E-Mail des Kunden |
| `{{customer_phone}}` | Telefon |
| `{{customer_company}}` | Firma |
| `{{customer_concern}}` | Anliegen / Beschreibung |
| `{{cancel_url}}` | Link zur Stornierungsseite |

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

**Schritt 2 – GitHub Secrets hinterlegen**

Repository → **Settings** → **Secrets and variables** → **Actions** → *New repository secret*:

| Secret | Wert |
|---|---|
| `VITE_FIREBASE_API_KEY` | aus `.env` |
| `VITE_FIREBASE_AUTH_DOMAIN` | aus `.env` |
| `VITE_FIREBASE_PROJECT_ID` | aus `.env` |
| `VITE_FIREBASE_STORAGE_BUCKET` | aus `.env` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | aus `.env` |
| `VITE_FIREBASE_APP_ID` | aus `.env` |
| `VITE_FIREBASE_MEASUREMENT_ID` | aus `.env` |
| `VITE_EMAILJS_SERVICE_ID` | aus EmailJS Dashboard |
| `VITE_EMAILJS_TEMPLATE_BESTAETIGUNG` | Template ID Bestätigung |
| `VITE_EMAILJS_TEMPLATE_STORNIERUNG` | Template ID Stornierung |
| `VITE_EMAILJS_TEMPLATE_ADMIN` | Template ID Admin |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Account → API Keys |

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
├── email-templates/                    # Fertige HTML-E-Mail-Templates für EmailJS
│   ├── template-kunde-bestaetigung.html  # Buchungsbestätigung an Kunden
│   ├── template-kunde-stornierung.html   # Stornierungsbestätigung an Kunden
│   └── template-admin.html               # Admin-Benachrichtigung (neue Buchung)
│
├── public/
│   ├── favicon.svg                     # SVG-Logo (skalierbar)
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
│   │       ├── CookieBanner.jsx        # DSGVO-Cookie-Banner mit Opt-in/Opt-out
│   │       ├── CustomCalendar.jsx      # Eigener Buchungskalender mit Slot-Sperrung
│   │       └── SEOHead.jsx             # Dynamische Meta-Tags und OG-Tags pro Seite
│   │
│   ├── context/
│   │   └── CookieContext.jsx           # Globaler Cookie-Einwilligungsstatus (React Context)
│   │
│   ├── lib/
│   │   ├── firebase.js                 # Firebase App-Initialisierung & Analytics-Lazy-Load
│   │   ├── firestore.js                # CRUD: Kontaktanfragen, Terminbuchungen, Stornierung
│   │   └── emailService.js             # EmailJS: Bestätigungs-, Stornierungs- & Admin-Mails
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                # Startseite: Hero · Services · Why VIO-IT · FAQ · CTA
│   │   ├── UeberMichPage.jsx           # Über mich: Bio · Skills · Werte
│   │   ├── LeistungenPage.jsx          # 5 Leistungsbereiche mit Anchor-Navigation
│   │   ├── TerminPage.jsx              # 4-stufiger Buchungsprozess + E-Mail-Versand
│   │   ├── StornierungPage.jsx         # Self-Service-Stornierung per Link-in-Mail
│   │   ├── KontaktPage.jsx             # Kontaktformular mit Firebase-Speicherung
│   │   ├── NotFoundPage.jsx            # 404-Fehlerseite
│   │   └── legal/
│   │       ├── ImpressumPage.jsx       # Impressum gemäß § 5 TMG
│   │       ├── DatenschutzPage.jsx     # Datenschutzerklärung gemäß DSGVO
│   │       └── CookiePage.jsx          # Cookie-Richtlinie mit Live-Einwilligungsstatus
│   │
│   ├── App.jsx                         # Router-Setup: alle Routen inkl. /stornierung/:id
│   ├── main.jsx                        # React-Einstiegspunkt mit HelmetProvider
│   └── index.css                       # Tailwind Directives · Component-Layer · Utilities
│
├── .env.example                        # Vorlage für alle Umgebungsvariablen
├── .env                                # Lokale Werte (wird NICHT committed)
├── .gitignore
├── index.html                          # HTML-Shell: SEO-Meta · Structured Data · Fonts
├── tailwind.config.js                  # Design-System: Farben · Typo · Shadows · Animations
├── vite.config.js                      # Vite: React-Plugin · Code-Splitting (vendor/firebase)
├── postcss.config.js
└── package.json
```

---

## Firebase Datenmodell

### `kontaktanfragen`

```jsonc
{
  "name":      "Max Mustermann",        // string, Pflichtfeld
  "firma":     "Muster GmbH",           // string, optional
  "email":     "max@firma.de",          // string, Pflichtfeld
  "telefon":   "+49 123 456789",        // string, optional
  "betreff":   "Website-Erstellung",    // string, Pflichtfeld
  "nachricht": "Ich benötige ...",      // string, Pflichtfeld
  "status":    "neu",                   // "neu" | "bearbeitet" | "abgeschlossen"
  "createdAt": "<Firestore Timestamp>"
}
```

### `terminbuchungen`

```jsonc
{
  "name":        "Max Mustermann",      // string, Pflichtfeld
  "firma":       "Muster GmbH",         // string, optional
  "email":       "max@firma.de",        // string, Pflichtfeld
  "telefon":     "+49 123 456789",      // string, optional
  "terminArt":   "erstgespraech",       // "erstgespraech" | "beratung" | "it-analyse"
  "datum":       "2026-04-01",          // string ISO-Datum, Pflichtfeld
  "uhrzeit":     "10:00 Uhr",           // string, Pflichtfeld
  "anliegen":    "KI-Automatisierung",  // string, optional
  "status":      "ausstehend",          // "ausstehend" | "bestaetigt" | "storniert"
  "createdAt":   "<Firestore Timestamp>",
  "cancelledAt": "<Firestore Timestamp>" // nur gesetzt wenn status == "storniert"
}
```

---

## E-Mail-Flow

```
Kunde bucht Termin
    │
    ├─► Firestore: Dokument anlegen (status: "ausstehend")
    ├─► EmailJS: Bestätigungsmail an Kunden (inkl. Stornierungs-Link)
    └─► EmailJS: Benachrichtigung an Admin (inkl. Stornierungs-Link)

Kunde klickt Stornierungs-Link → /stornierung/:bookingId
    │
    ├─► Firestore: status → "storniert", cancelledAt setzen
    └─► EmailJS: Stornierungsbestätigung an Kunden
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

**Firebase & Backend**
- [ ] Echte Firebase-Konfigurationswerte in `.env` hinterlegen
- [ ] Firestore-Sicherheitsregeln (wie oben) setzen und veröffentlichen
- [ ] Firebase Analytics aktivieren (optional)

**EmailJS**
- [ ] EmailJS-Account erstellen und E-Mail-Service verbinden
- [ ] 3 Templates anlegen (HTML aus `email-templates/` einfügen)
- [ ] EmailJS-Werte in `.env` eintragen

**Inhalte**
- [ ] Impressum: Adresse & Steuernummer in `ImpressumPage.jsx` eintragen
- [ ] Datenschutz: Adresse & E-Mail in `DatenschutzPage.jsx` eintragen
- [ ] Profilfoto: Platzhalter in `UeberMichPage.jsx` durch echtes Foto ersetzen
- [ ] Referenzen: Platzhalterkarten in `HomePage.jsx` mit echten Projekten befüllen
- [ ] OG-Bild: `public/og-image.png` (1200×630 px) für Social-Media-Vorschau hinzufügen

**Deployment**
- [ ] Alle Werte als GitHub Secrets hinterlegen (Firebase + EmailJS)
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
├── /termin                 Terminbuchung (4 Schritte)
├── /stornierung/:id        Self-Service-Stornierung per Link
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
