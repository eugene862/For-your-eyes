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

  utterance = new SpeechSynthesisUtterance(fullText);
    
    // --- ROMANTIC PACE CONFIGURATION ---
    utterance.rate = 0.80;  // Dropped to 0.80 so it reads slow, intimate, and breathless
    utterance.pitch = 0.92; // Slightly lowered pitch to make the voice sound warmer and deeper

    // --- ACCENT & QUALITY FILTER ---
    const voices = synth.getVoices();
    
    // This searches for the highest quality voices available on iOS or Android
    const romanticVoice = voices.find(voice => 
      // Looks for high-quality English voices first
      (voice.lang.startsWith('en') && (
        voice.name.includes("Natural") || 
        voice.name.includes("Premium") || 
        voice.name.includes("Google") || 
        voice.name.includes("Siri")
      ))
    );
    
    // Fallback: If it finds a British or Australian accent, those often sound incredibly elegant and romantic for prose
    const accentFallback = voices.find(voice => voice.lang === 'en-GB' || voice.lang === 'en-AU');

    if (romanticVoice) {
      utterance.voice = romanticVoice;
    } else if (accentFallback) {
      utterance.voice = accentFallback;
    }
