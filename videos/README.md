# Videobakgrund för Game Case Study

## Hur du lägger till din egen video

1. Placera din videofil i denna mapp (`videos/`)
2. Öppna filen `index.html` och uppdatera sökvägen till din video:

```html
<video id="background-video" autoplay loop muted playsinline>
    <!-- Ändra sökvägen nedan till din egen videofil -->
    <source src="videos/din-video.mp4" type="video/mp4">
    Din webbläsare stöder inte video-taggen.
</video>
```

3. Ändra `din-video.mp4` till namnet på din videofil.

## Rekommendationer för videobakgrund

- **Filformat**: Använd MP4-format för bästa kompatibilitet
- **Upplösning**: Minst 1920x1080 för bästa kvalitet
- **Längd**: Kort video (10-30 sekunder) som loopar väl
- **Filstorlek**: Håll filstorleken under 10MB för bättre prestanda
- **Innehåll**: Välj en video med låg rörelse och bra kontrast mot text

## Prestanda-tips

- Komprimera din video för webben med verktyg som Handbrake eller online-tjänster
- Överväg att skapa flera versioner av videon för olika enheter (t.ex. en mindre version för mobiler)
- Om videon är för stor, överväg att använda en stillbild istället för mobila enheter