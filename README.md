# Advokatfirmaet Torgersen – nettsted

Statisk nettsted for Advokatfirmaet Torgersen, bygget i ren HTML/CSS/JS.

Stilen er et rolig, profesjonelt advokatuttrykk med sort og krem/beige,
serif-overskrifter, luftige seksjoner og en varm gull-aksent. Innholdet
(tekst og struktur) er hentet fra
[advokattorgersen.no](https://advokattorgersen.no).

## Sider

Nettstedet har 43 sider per språk:

- **Hovedsider:** `index`, `fagomrader`, `ansatte`, `om-firmaet`, `priser`,
  `karriere`, `resultater-og-artikler`, `kontakt`
- **Fagområder (hub + undersider):** `personskade`, `bistandsadvokat`,
  `voldsoffererstatning`, `nav-saker`, `familierett` – hver med tilhørende
  underordnede saksider (f.eks. `trafikkskade`, `yrkesskade`, `voldtekt`,
  `uforetrygd`, `samvaer` osv.)

## Språk

Nettstedet finnes på fem språk, med språkvelger (NO / EN / PL / RU / DE) i menyen:

| Språk | Mappe | Eksempel |
| --- | --- | --- |
| Norsk (bokmål) | rot | `index.html` |
| Engelsk | `en/` | `en/index.html` |
| Polsk | `pl/` | `pl/index.html` |
| Russisk | `ru/` | `ru/index.html` |
| Tysk | `de/` | `de/index.html` |

Alle språkversjonene deler samme `css/`, `js/` og `images/`.
Skjemameldinger i `js/main.js` tilpasses sidens `<html lang>` automatisk.

## Struktur

```
.
├── index.html … (43 norske sider i rot)
├── en/         # engelsk versjon (43 sider)
├── pl/         # polsk versjon (43 sider)
├── ru/         # russisk versjon (43 sider)
├── de/         # tysk versjon (43 sider)
├── css/style.css
├── js/main.js
├── images/                  # portretter (8 ansatte) + medlemslogo
└── partials/tpl-fag.html    # delt sidemal (ikke lenket)
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

Siden publiseres direkte fra en branch (statiske filer i rot):

1. På GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Velg branchen (f.eks. `claude/torgersen-nettsted`) og mappe **/(root)**.
3. Siden publiseres på `https://<bruker>.github.io/<repo>/`.

Oppdateringer på den valgte branchen publiseres automatisk på nytt.

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
