# Game Case Study - Webbsida med Videobakgrund

En modern webbsida för game case study med en videobakgrund och scrollbart innehåll. Videon spelas i bakgrunden medan användaren kan scrolla genom text och bilder.

## Funktioner

- Fullskärms videobakgrund som spelas kontinuerligt
- Scrollbart innehåll med text och bilder ovanpå videobakgrunden
- Responsiv design som fungerar på olika skärmstorlekar
- Animationseffekter när användaren scrollar (med AOS-biblioteket)
- Parallax scrolleffekter för en mer dynamisk upplevelse

## Använda bibliotek

- **HTML5 och CSS3** - För grundläggande struktur och styling
- **Bootstrap 5** - För responsiv design och layout
- **AOS (Animate On Scroll)** - För animationseffekter när användaren scrollar
- **jQuery** - För enklare DOM-manipulation

## Filstruktur

- `index.html` - Huvudfilen med HTML-struktur
- `styles.css` - CSS-stilar för webbsidan
- `script.js` - JavaScript-funktionalitet
- `images/` - Mapp för bildresurser
- `videos/` - Mapp för videofiler (lägg din egen video här)

## Användning

1. Öppna `index.html` i en modern webbläsare
2. Scrolla nedåt för att se innehållet med animationseffekter
3. Videon fortsätter spela i bakgrunden medan du scrollar

## Anpassning

### Byta videobakgrund

För att byta videobakgrund:

1. Lägg din videofil i `videos/`-mappen
2. Uppdatera sökvägen i `index.html`:

```html
<video id="background-video" autoplay loop muted playsinline>
    <source src="videos/din-video.mp4" type="video/mp4">
    <!-- Fallback till SVG-animation om video inte kan spelas upp -->
</video>
```

Om du inte har en egen video, kommer en SVG-animation att användas som fallback. Se `videos/README.md` för mer information om videorekommendationer.

### Lägga till eget innehåll

Redigera sektionerna i `index.html` för att lägga till ditt eget innehåll för game case study. Varje sektion är strukturerad med Bootstrap-klasser för enkel anpassning.

### Ändra animationseffekter

Animationseffekterna styrs av AOS-attribut i HTML-elementen. Du kan ändra dessa attribut för att få olika effekter:

```html
<div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
    <!-- Innehåll -->
</div>
```

Tillgängliga animationer inkluderar: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `flip-left`, `flip-right`, `zoom-in`, med flera.

## Prestanda

Videobakgrunder kan vara resurskrävande, särskilt på mobila enheter. Webbsidan inkluderar kod för att automatiskt justera videokvaliteten baserat på enhetstyp för att optimera prestandan.

## Webbläsarstöd

Webbsidan fungerar bäst i moderna webbläsare som stöder HTML5 video och CSS3-funktioner:
- Chrome (senaste versionen)
- Firefox (senaste versionen)
- Safari (senaste versionen)
- Edge (senaste versionen)