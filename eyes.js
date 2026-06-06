Here is the fully unified, production-ready `eyes.js` file. It merges the clean stability fixes (like the background music element null-check protection) with the aggressive, multi-layered voice-matching engine.

This engine is specifically prioritized to look for premium desktop and mobile profiles—ensuring you get that exact deep, theatrical comic delivery you want without the browser dropping back to a generic flat voice.

### Your Updated `eyes.js` File:

```javascript
// Register Service Worker for PWA compliance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered successfully.'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Ambient Background Music Player ---
  const musicBtn = document.getElementById("music-btn");
  const bgMusic = document.getElementById("bg-music");
  let isMusicPlaying = false;

  musicBtn.addEventListener("click", () => {
    // Structural Guard: Prevents script crashes if the audio tag isn't rendered yet
    if (!bgMusic) {
      console.warn("Background audio element (#bg-music) not found in the DOM.");
      return;
    }

    if (isMusicPlaying) {
      bgMusic.pause();
      musicBtn.innerHTML = '<span class="icon">🎵</span>';
      musicBtn.classList.remove("playing");
    } else {
      bgMusic.play().catch(err => console.log("Audio playback user gesture check:", err));
      musicBtn.innerHTML = '<span class="icon">⏸️</span>';
      musicBtn.classList.add("playing");
    }
    isMusicPlaying = !isMusicPlaying;
  });

  // --- 2. Hilarious Theatrical Voice Engine ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  let synth = window.speechSynthesis;
  let utterance = null;
  let isSpeechPlaying = false;

  // Global voice tracker array to stay loaded
  let activeVoices = [];
  const loadVoices = () => {
    if (typeof synth !== 'undefined' && synth.getVoices) {
      activeVoices = synth.getVoices();
    }
  };

  const getFunnyAccentVoice = () => {
    // Refresh voice registry dynamically on execution
    loadVoices();
    
    // PRIORITY 1: Precise string matches for elite theatrical profiles
    const premiumTargets = ["microsoft david", "google uk english male", "united kingdom", "scotland"];
    
    // PRIORITY 2: Secondary keyword mapping fallback arrays
    const fallbackKeywords = ["uk", "scotland", "english", "david", "male"];
    
    let bestVoice = null;
    let highestScore = -1;

    // First Pass: Lock down a deep premium voice directly if available on the system hardware
    for (let voice of activeVoices) {
      const nameLower = voice.name.toLowerCase();
      if (premiumTargets.some(target => nameLower.includes(target))) {
        return voice; 
      }
    }

    // Second Pass: Fallback scoring metric if explicit premium profiles aren't installed
    activeVoices.forEach(voice => {
      if (voice.lang.startsWith("en")) {
        let score = 0;
        const voiceNameLower = voice.name.toLowerCase();

        fallbackKeywords.forEach((keyword, index) => {
          if (voiceNameLower.includes(keyword)) {
            score += (fallbackKeywords.length - index);
          }
        });

        // Aggressive filter to prevent high-pitched or feminine profiles from hijacking the role
        if (voiceNameLower.includes("female") || voiceNameLower.includes("zira") || voiceNameLower.includes("siri female")) {
          score = -20;
        }

        if (score > highestScore) {
          highestScore = score;
          bestVoice = voice;
        }
      }
    });

    // Safety net fallback to basic British English or default English profiles
    if (!bestVoice || highestScore <= 0) {
      bestVoice = activeVoices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en'));
    }

    return bestVoice;
  };

  voiceBtn.addEventListener("click", () => {
    if (isSpeechPlaying) {
      synth.cancel();
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isSpeechPlaying = false;
      return;
    }

    const paragraphs = Array.from(letterTarget.querySelectorAll("h1, p"));
    let fullText = paragraphs.map(p => p.innerText).join(". ");

    // --- THE ROYAL BUTLER COMEDY REWRITER ---
    // Swaps vocabulary strings before processing to force maximum comedic effect
    fullText = fullText
      .replace(/My Dearest/gi, "Halt! Hear ye, hear ye! Most esteemed, regal, and precious human companion,")
      .replace(/Your eyes/gi, "Behold! Your optical globes... yes, those magnificent eyeballs")
      .replace(/are my favorite place/gi, "are my absolute favorite coordinates in the entire universe to get utterly lost in")
      .replace(/I can't/gi, "I simply cannot pull my gaze away! Good heavens, it is completely impossible!")
      .replace(/beautiful/gi, "tremendously dazzling, top-tier, ultra-shiny")
      .replace(/captured my heart/gi, "completely hijacked my central processing unit... and captured my heart!");

    utterance = new SpeechSynthesisUtterance(fullText);
    
    // Low, dramatic bass modifier overrides
    utterance.rate = 0.80;  
    utterance.pitch = 0.45; 

    const selectedVoice = getFunnyAccentVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isSpeechPlaying = false;
    };

    utterance.onerror = () => {
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isSpeechPlaying = false;
    };

    // Synchronous execution call to bypass modern mobile browser audio blockers
    synth.speak(utterance);
    voiceBtn.innerText = "⏸️";
    voiceBtn.classList.add("playing");
    isSpeechPlaying = true;
  });

  // --- 2.5 Voice List Pre-Loader Fix ---
  const primeVoices = () => {
    loadVoices();
  };
  
  primeVoices();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = primeVoices;
  }

  // --- 3. Falling Rose Petals Canvas Effect ---
  const canvas = document.getElementById("petal-canvas");
  const ctx = canvas.getContext("2d");

  let maxPetals = 25; 
  if (window.innerWidth < 600) maxPetals = 12;

  const petalsArray = [];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Petal {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height - canvas.height;
      this.size = Math.random() * 6 + 4;
      this.speedY = Math.random() * 1 + 0.6;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.4 + 0.2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1 - 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height) {
        this.y = -10;
        this.x = Math.random() * canvas.width;
        this.opacity = Math.random() * 0.4 + 0.2;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(240, 128, 128, ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const initPetals = () => {
    for (let i = 0; i < maxPetals; i++) {
      petalsArray.push(new Petal());
    }
  };

  const animatePetals = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalsArray.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animatePetals);
  };

  initPetals();
  animatePetals();
});
