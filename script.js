// Initialisera AOS (Animate On Scroll) biblioteket
document.addEventListener('DOMContentLoaded', function() {
    // Lägg till en händelselyssnare för att spela musik efter användarinteraktion
    document.addEventListener('click', function userInteractionHandler() {
        // Försök spela bakgrundsmusiken efter användarinteraktion
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            // Avmuta ljudet först
            backgroundMusic.muted = false;
            
            // Uppdatera volymikonen om den finns
            const volumeIcon = document.querySelector('.volume-icon');
            if (volumeIcon) {
                volumeIcon.textContent = '🔊';
            }
            
            // Sätt volymen baserat på slider om den finns
            const volumeSlider = document.getElementById('volume-slider');
            if (volumeSlider) {
                backgroundMusic.volume = volumeSlider.value / 100;
            } else {
                backgroundMusic.volume = 0.3; // Standard 30% volym
            }
            
            backgroundMusic.play().then(() => {
                console.log('Bakgrundsmusik startade efter användarinteraktion');
            }).catch(error => {
                console.log('Kunde inte starta bakgrundsmusik efter interaktion:', error);
                // Visa en knapp för att starta musiken manuellt
                const musicButton = document.createElement('button');
                musicButton.textContent = 'Spela bakgrundsmusik';
                musicButton.className = 'music-play-button';
                musicButton.addEventListener('click', function() {
                    backgroundMusic.muted = false;
                    backgroundMusic.play();
                    this.remove(); // Ta bort knappen efter klick
                });
                
                // Lägg till knappen i DOM
                document.body.appendChild(musicButton);
            });
        }
        // Ta bort händelselyssnaren efter första klicket
        document.removeEventListener('click', userInteractionHandler);
    }, { once: true });

    // Hantera bakgrundsmusik
    const backgroundMusic = document.getElementById('background-music');
    const volumeSlider = document.getElementById('volume-slider');
    const toggleMuteButton = document.getElementById('toggle-mute');
    const volumeIcon = document.querySelector('.volume-icon');
    let isMuted = false;
    
    // Funktion för att spela bakgrundsmusik
    const playBackgroundMusic = function() {
        backgroundMusic.volume = volumeSlider.value / 100; // Sätt volymen baserat på slider
        backgroundMusic.loop = true; // Aktivera loopning
        
        const musicPromise = backgroundMusic.play();
        
        if (musicPromise !== undefined) {
            musicPromise.then(_ => {
                console.log('Bakgrundsmusik startade');
            }).catch(error => {
                console.log('Kunde inte starta bakgrundsmusik automatiskt:', error);
                
                // Skapa en knapp för att starta musiken manuellt (krävs i vissa webbläsare)
                const musicButton = document.createElement('button');
                musicButton.textContent = 'Spela bakgrundsmusik';
                musicButton.className = 'music-play-button';
                musicButton.addEventListener('click', function() {
                    backgroundMusic.play();
                    this.remove(); // Ta bort knappen efter klick
                });
                
                // Lägg till knappen i DOM
                document.body.appendChild(musicButton);
            });
        }
    };
    
    // Hantera volymkontroll
    volumeSlider.addEventListener('input', function() {
        const volumeValue = this.value / 100;
        backgroundMusic.volume = volumeValue;
        
        // Uppdatera ikonen baserat på volym
        updateVolumeIcon(volumeValue);
        
        // Om volymen är 0, markera som muted
        isMuted = volumeValue === 0;
    });
    
    // Funktion för att uppdatera volymikonen
    function updateVolumeIcon(volumeValue) {
        if (volumeValue === 0) {
            volumeIcon.textContent = '🔇'; // Muted
        } else if (volumeValue < 0.5) {
            volumeIcon.textContent = '🔉'; // Låg volym
        } else {
            volumeIcon.textContent = '🔊'; // Hög volym
        }
    }
    
    // Hantera mute-knappen
    toggleMuteButton.addEventListener('click', function() {
        if (isMuted) {
            // Om redan muted, återställ till tidigare volym
            const previousVolume = volumeSlider.value / 100;
            backgroundMusic.volume = previousVolume;
            updateVolumeIcon(previousVolume);
        } else {
            // Om inte muted, sätt volym till 0
            backgroundMusic.volume = 0;
            updateVolumeIcon(0);
        }
        
        // Växla muted-status
        isMuted = !isMuted;
    });
    
    // Starta bakgrundsmusiken
    playBackgroundMusic();
    
    // Hantera när musiken tar slut (som backup om loop-attributet inte fungerar)
    backgroundMusic.addEventListener('ended', function() {
        this.currentTime = 0; // Återställ till början
        this.play(); // Spela igen
    }, false);

    // Initialisera AOS med anpassade inställningar
    AOS.init({
        duration: 1000,        // Animationens varaktighet i millisekunder
        easing: 'ease-in-out', // Typ av easing-funktion
        once: false,           // Om animationen ska köras endast en gång
        mirror: true,          // Om element ska animeras ut när man scrollar förbi dem
        offset: 120,           // Offset (i pixlar) från elementets position
        delay: 0,              // Standardfördröjning för alla animationer
    });

    // Hantera videobakgrund
    const video = document.getElementById('background-video');
    
    // Försök spela upp videon automatiskt
    const playVideo = function() {
        // Vissa webbläsare tillåter inte autoplay utan användarinteraktion
        // Vi försöker spela upp videon och hanterar eventuella fel
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay startade!
                console.log('Video autoplay lyckades');
            }).catch(error => {
                // Autoplay misslyckades, visa en knapp för att spela upp manuellt
                console.log('Video autoplay misslyckades:', error);
                
                // Skapa en knapp för manuell uppspelning
                const playButton = document.createElement('button');
                playButton.textContent = 'Spela bakgrundsvideo';
                playButton.className = 'video-play-button';
                playButton.addEventListener('click', function() {
                    video.play();
                    this.remove(); // Ta bort knappen efter klick
                });
                
                // Lägg till knappen i DOM
                document.querySelector('.video-background').appendChild(playButton);
            });
        }
    };
    
    // Spela upp videon när den är redo
    video.addEventListener('canplaythrough', playVideo, { once: true });
    
    // Försök spela upp igen om videon pausas av någon anledning
    video.addEventListener('pause', function() {
        // Vänta en kort stund innan vi försöker spela upp igen
        // för att undvika loopar om uppspelning inte är tillåten
        setTimeout(() => {
            if (document.visibilityState === 'visible') {
                video.play().catch(err => console.log('Kunde inte återuppta video:', err));
            }
        }, 300);
    });
    
    // Hantera när användaren kommer tillbaka till fliken
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            video.play().catch(err => console.log('Kunde inte spela upp video vid återkomst:', err));
        }
    });

    // Parallax scrolleffekt för header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        // Justera opacitet baserat på scroll-position
        if (scrollPosition < window.innerHeight) {
            const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
            header.style.opacity = Math.max(opacity, 0);
            
            // Parallax-effekt för header-innehåll
            const headerContent = header.querySelector('h1');
            headerContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });

    // Smooth scroll för länkar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading för bilder
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback för webbläsare som inte stöder IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Hantera videokvalitet baserat på enhetens prestanda
    function adjustVideoQuality() {
        // Enkel detektering av mobila enheter
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Sänk videokvaliteten på mobila enheter för bättre prestanda
            video.setAttribute('playbackQuality', 'low');
        }
    }
    
    adjustVideoQuality();

    // Återställ AOS-animationer vid fönsterändring
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
});