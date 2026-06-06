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

  // --- 2. Hilarous Theatrical Voice Engine ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  let synth = window.speechSynthesis;
  let utterance = null;
  let isSpeechPlaying = false;

  const getFunnyAccentVoice = () => {
    const voices = synth.getVoices();
    
    // We target strong accents (British, Scottish, or explicit older male systems) 
    // because forcing them to drop in pitch sounds incredibly funny.
    const targetKeywords = ["uk", "scotland", "english", "david", "male"];
    
    let bestVoice = null;
    let highestScore = -1;

    voices.forEach(voice => {
      if (voice.lang.startsWith("en")) {
        let score = 0;
        const voiceNameLower = voice.name.toLowerCase();

        targetKeywords.forEach((keyword, index) => {
          if (voiceNameLower.includes(keyword)) {
            score += (targetKeywords.length - index);
          }
        });

        if (voiceNameLower.includes("female") || voiceNameLower.includes("zira")) {
          score = -10;
        }

        if (score > highestScore) {
          highestScore = score;
          bestVoice = voice;
        }
      }
    });

    if (!bestVoice || highestScore <= 0) {
      bestVoice = voices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en'));
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

    // --- PHONETIC ACCENT REWRITER ---
    // This forces ANY mobile device voice engine to sound completely funny
    // by changing the actual text phonetics right before it reads it out loud!
    fullText = fullText
      .replace(/My Dearest/gi, "Greetings, humahn creature! My Dearest,")
      .replace(/Your eyes/gi, "Ah, yes! Vun! Two! Three! Your absolute eyes")
      .replace(/are my favorite place/gi, "are my mahg-nificent, most spooky favorite location")
      .replace(/I can't/gi, "I simply cannot pull away! Ah, ha, ha!")
      .replace(/beautiful/gi, "splendidly red, glorious")
      .replace(/captured my heart/gi, "bitten my neck... electrocuted my circuits... and captured my heart!");

    utterance = new SpeechSynthesisUtterance(fullText);
    
    // Attempt standard device scale reduction shifts
    utterance.rate = 0.80;  
    utterance.pitch = 0.50; 

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

    synth.speak(utterance);
    voiceBtn.innerText = "⏸️";
    voiceBtn.classList.add("playing");
    isSpeechPlaying = true;
  });
  // --- 2.5 Voice List Pre-Loader Fix ---
  const primeVoices = () => {
    if (typeof synth !== 'undefined' && synth.getVoices) {
      synth.getVoices();
    }
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
