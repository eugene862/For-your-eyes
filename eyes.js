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

  // --- 2. Dynamic Mid-Stream Accent Switching Engine ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  let synth = window.speechSynthesis;
  let isSpeechPlaying = false;
  let speechQueue = [];

  let systemVoices = [];
  const loadVoices = () => {
    if (typeof synth !== 'undefined' && synth.getVoices) {
      systemVoices = synth.getVoices();
    }
  };

  // Dedicated Voice Matchers
  const getIndianVoice = () => {
    return systemVoices.find(v => v.lang.startsWith("en-IN") || v.name.toLowerCase().includes("india")) || 
           systemVoices.find(v => v.lang.startsWith("en"));
  };

  const getScottishOrBritishVoice = () => {
    return systemVoices.find(v => v.name.toLowerCase().includes("scotland") || v.lang === "en-GB" || v.name.toLowerCase().includes("david")) || 
           systemVoices.find(v => v.lang.startsWith("en"));
  };

  const stopAllSpeech = () => {
    synth.cancel();
    voiceBtn.innerText = "🔊";
    voiceBtn.classList.remove("playing");
    isSpeechPlaying = false;
    speechQueue = [];
  };

  voiceBtn.addEventListener("click", () => {
    if (isSpeechPlaying) {
      stopAllSpeech();
      return;
    }

    loadVoices(); 
    const paragraphs = Array.from(letterTarget.querySelectorAll("h1, p"));
    speechQueue = [];

    paragraphs.forEach((p, index) => {
      let text = p.innerText;

      // --- THE UNIFIED COMEDY REWRITER ---
      // This applies the silly vocabulary alterations across BOTH engine shifts
      if (index % 2 === 0) {
        // Indian Voice Layer (Even paragraphs) - Highly formal & technical comedy
        text = text
          .replace(/My Dearest/gi, "Halt! Hello, hello! Hear ye, hear ye! Most esteemed, regal, and precious human companion,")
          .replace(/Your eyes/gi, "Listen to me, your beautiful optical globes... yes, those magnificent eyeballs")
          .replace(/are my favorite place/gi, "are my number-one absolute favorite coordinates in the entire universe to get utterly lost in, indexing at maximum priority,")
          .replace(/I can't/gi, "I am trying to look away, but I simply cannot, hundred percent! Good heavens, it is completely impossible!")
          .replace(/beautiful/gi, "tremendously dazzling, top-tier, ultra-shiny")
          .replace(/captured my heart/gi, "completely hijacked my central processing unit... and captured my heart, items successfully saved!");
      } else {
        // Scottish Voice Layer (Odd paragraphs) - Deep, dramatic, structural comedy
        text = text
          .replace(/My Dearest/gi, "Och! Right then, hear ye, hear ye! Me absolute grand companion,")
          .replace(/Your eyes/gi, "Behold! Yer magnificent optical globes... yes, those bonnie eyeballs")
          .replace(/are my favorite place/gi, "are me absolute favorite place in the whole wide world to get utterly lost in")
          .replace(/I can't/gi, "I've tried lookin' away but I cannot, lassy, no I cannae! It is completely impossible!")
          .replace(/beautiful/gi, "right grand, top-tier, ultra-shiny")
          .replace(/captured my heart/gi, "stolen me wee heart right out o' me chest... and captured my heart completely!");
      }

      let utterance = new SpeechSynthesisUtterance(text);
      
      // Assign physical hardware accents and fine-tune pacing for maximum comedic impact
      if (index % 2 === 0) {
        utterance.voice = getIndianVoice();
        utterance.rate = 0.85; 
        utterance.pitch = 1.05; // Slightly bouncier tone
      } else {
        utterance.voice = getScottishOrBritishVoice();
        utterance.rate = 0.78; 
        utterance.pitch = 0.45; // Deep, rolling theatrical bass register
      }

      // Cleanup UI execution at the end of the line array
      if (index === paragraphs.length - 1) {
        utterance.onend = () => stopAllSpeech();
      }
      utterance.onerror = () => stopAllSpeech();

      speechQueue.push(utterance);
    });

    isSpeechPlaying = true;
    voiceBtn.innerText = "⏸️";
    voiceBtn.classList.add("playing");
    
    // Inject all formatted lines sequentially into browser audio stream
    speechQueue.forEach(line => {
      synth.speak(line);
    });
  });

  // --- 2.5 Voice List Pre-Loader Fix ---
  const primeVoices = () => { loadVoices(); };
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
