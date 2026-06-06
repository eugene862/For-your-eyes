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

  utterance = new SpeechSynthesisUtterance(fullText);
    
    // --- SOOTHING & INTENSE ROMANTIC PACE ---
    utterance.rate = 0.78;  // Slightly slower (0.78) for a calm, deeply reassuring, and steady reading rhythm
    utterance.pitch = 0.88; // Lowered pitch to make the voice sound deeper, warmer, and more comforting

    // --- MALE ACCENT & QUALITY FILTER ---
    const voices = synth.getVoices();
    
    // First priority: Look for premium, natural-sounding MALE English voices
    const soothingMaleVoice = voices.find(voice => 
      voice.lang.startsWith('en') && (
        voice.name.toLowerCase().includes("male") || 
        voice.name.includes("Google UK English M") || 
        voice.name.includes("en-us-x-sfg#male") || 
        voice.name.includes("Siri Male") ||
        voice.name.includes("wavenet")
      )
    );
    
    // Elegant fallback: If a specific male tag isn't exposed, grab a British or Australian profile which reads beautifully
    const elegantFallback = voices.find(voice => voice.lang === 'en-GB' || voice.lang === 'en-AU');

    if (soothingMaleVoice) {
      utterance.voice = soothingMaleVoice;
    } else if (elegantFallback) {
      utterance.voice = elegantFallback;
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
