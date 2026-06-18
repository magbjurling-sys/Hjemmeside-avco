# Advokatfirmaet Torgersen – nettsted

Statisk nettsted for Advokatfirmaet Torgersen, bygget i ren HTML/CSS/JS.

Stilen er inspirert av [avco.no](https://avco.no) – et rolig, profesjonelt
advokatuttrykk med sort og krem/beige, serif-overskrifter, luftige seksjoner
og en varm gull-aksent. Innholdet (tekst og struktur) er hentet fra
[advokattorgersen.no](https://advokattorgersen.no).

## Sider

| Fil | Innhold |
| --- | --- |
| `index.html` | Forside med intro, fagområder og kontakt-CTA |
| `om-firmaet.html` | Om firmaet og CV for advokat Anette Torgersen |
| `fagomrader.html` | Personskade, voldsoffererstatning, trygderett, mekling |
| `kontakt.html` | Kontaktinfo, kontaktskjema og kart |

## Struktur

```
.
├── index.html
├── om-firmaet.html
├── fagomrader.html
├── kontakt.html
├── css/style.css
├── js/main.js
├── images/                  # portrett + medlemslogo
└── .github/workflows/pages.yml   # auto-publisering til GitHub Pages
```

## Kjøre lokalt

Åpne `index.html` direkte i nettleser, eller server lokalt:

```bash
python3 -m http.server 8000
# Åpne http://localhost:8000
```

Nettstedet er salgsorientert med tillitsbyggende seksjoner: tillitsstripe,
nøkkeltall, «hvorfor velge oss», kostnadsdekning, prosess-steg,
kundeuttalelser, FAQ og tydelige call-to-action (gratis vurdering / ring).

## Plassholdere som bør byttes ut før lansering

- **Kundeuttalelser** på forsiden er illustrative/anonymiserte og må erstattes
  med ekte, samtykkede sitater (eller fjernes). Se seksjonen merket
  `KUNDEUTTALELSER (plassholder ...)` i `index.html`.
- **Nøkkeltall** (f.eks. «15+ års erfaring») er anslag og bør verifiseres.
- **Kostnads-/dekningstekst** er generell informasjon og bør kvalitetssikres
  juridisk for det enkelte firma.

## Publisering (GitHub Pages)

`.github/workflows/pages.yml` publiserer siden automatisk ved push til `main`.
Slik aktiverer du det én gang:

1. Merge denne branchen til `main`.
2. På GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Workflowen kjører og publiserer på `https://<bruker>.github.io/hjemmeside-avco/`.

## Kontaktskjema (Formspree)

Skjemaet på `kontakt.html` er koblet mot [Formspree](https://formspree.io):

1. Opprett et gratis skjema på formspree.io og kopier skjema-ID-en.
2. I `kontakt.html`, bytt `REPLACE_WITH_YOUR_ID` i `<form action="…">` med ID-en.

Inntil ID er satt, kjører skjemaet i «demo-modus» (viser bekreftelse uten å
sende). `js/main.js` sender via `fetch` til Formspree når ID er på plass.

## Merknader

- Portrettet (`images/anette-torgersen.jpg`) og medlemslogoen er hentet fra
  advokattorgersen.no. Bekreft bruksrett før publisering.
- Markedsføringen er holdt edruelig i tråd med advokaters
  markedsføringsregler – unngå å love bestemte resultater.
