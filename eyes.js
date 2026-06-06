// Register Service Worker for PWA compliance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered successfully.'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Scroll Animations ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add("active");
      }
    });
  };

  setTimeout(revealOnScroll, 150);
  window.addEventListener("scroll", revealOnScroll);

  // --- 2. Text-to-Speech Implementation ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  let synth = window.speechSynthesis;
  let utterance = null;
  let isPlaying = false;

  voiceBtn.addEventListener("click", () => {
    // If speaking, clicking again will pause/stop
    if (isPlaying) {
      synth.cancel();
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isPlaying = false;
      return;
    }

    // Grab all readable text inside the container, filtering out spacers
    const paragraphs = Array.from(letterTarget.querySelectorAll("h1, p"));
    const fullText = paragraphs.map(p => p.innerText).join(". ");

    utterance = new SpeechSynthesisUtterance(fullText);
    
    // Configurations for a smooth, warm tone
    utterance.rate = 0.90;  // Slightly slower pace for emotional delivery
    utterance.pitch = 1.0; // Normal pitch range

    // Select a pleasant natural voice if available (defaults to system fallback)
    const voices = synth.getVoices();
    const premiumVoice = voices.find(voice => voice.name.includes("Google") || voice.name.includes("Natural"));
    if (premiumVoice) utterance.voice = premiumVoice;

    // Handle speech states
    utterance.onend = () => {
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isPlaying = false;
    };

    utterance.onerror = () => {
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isPlaying = false;
    };

    // Begin Playback
    synth.speak(utterance);
    voiceBtn.innerText = "⏸️";
    voiceBtn.classList.add("playing");
    isPlaying = true;
  });

  // Required fix for some mobile browsers that load voices asynchronously
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = synth.getVoices;
  }
});