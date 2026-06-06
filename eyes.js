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

  // --- 2. Cross-Device Manly & Romantic Voice Engine ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  let synth = window.speechSynthesis;
  let utterance = null;
  let isSpeechPlaying = false;

  const getBestManlyVoice = () => {
    const voices = synth.getVoices();
    
    // Exact priority keywords for rich, deep male voices across platforms
    const targetKeywords = [
      "premium", "natural", "male", "google uk english m", 
      "en-us-x-sfg#male", "siri male", "microsoft david", "wavenet"
    ];

    let bestVoice = null;
    let highestScore = -1;

    voices.forEach(voice => {
      // We only want English profiles
      if (voice.lang.startsWith("en")) {
        let score = 0;
        const voiceNameLower = voice.name.toLowerCase();

        // Score based on romantic/masculine depth keywords
        targetKeywords.forEach((keyword, index) => {
          if (voiceNameLower.includes(keyword)) {
            // Higher keywords in our array get a heavier match weight
            score += (targetKeywords.length - index);
          }
        });

        // Filter out explicitly female identifiers to guarantee a manly profile
        if (voiceNameLower.includes("female") || voiceNameLower.includes("zira") || voiceNameLower.includes("siri female")) {
          score = -10;
        }

        if (score > highestScore) {
          highestScore = score;
          bestVoice = voice;
        }
      }
    });

    // Elegant Global Fallback: If no heavy masculine match is found, 
    // British or Australian system voices offer a highly premium cadence for prose.
    if (!bestVoice || highestScore <= 0) {
      bestVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en-AU' || v.lang.startsWith('en'));
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
    const fullText = paragraphs.map(p => p.innerText).join(". ");

    utterance = new SpeechSynthesisUtterance(fullText);
    
    // --- ROMANTIC CADENCE CONFIGURATION ---
    // Forces the device's vocal tract to slow down and compress into a deeper resonance bar
    utterance.rate = 0.76;  // Intentional, calm, and steady reading rhythm
    utterance.pitch = 0.85; // Drops the frequency register down for a warmer, deeper chest-vibe tone

    // Fetch and bind the customized voice profile
    const selectedVoice = getBestManlyVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`Successfully running romance profile: ${selectedVoice.name}`);
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

  // Critical for Chrome & Android: Voices load asynchronously, so we must trigger the fetcher
 // --- 2.5 Voice List Pre-Loader Fix ---
  // Forces Chrome & Android to cache and prime the voice array immediately on load
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
  if (window.innerWidth < 600) maxPetals = 12; // Fewer elements on small devices to prevent performance lag

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

      // Reset values once it drifts off-screen
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
      
      // Paint soft, abstract, glowing pink rose shapes
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
