// Register Service Worker for PWA compliance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered successfully.'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Robust Scroll Animations ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.90;
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.classList.add("active");
      }
    });
  };

  // Run scroll reveal logic
  setTimeout(revealOnScroll, 150);
  window.addEventListener("scroll", revealOnScroll, { passive: true });

  // SAFETY ACCESSIBILITY FALLBACK: If elements are still invisible due to mobile sizing, show them
  setTimeout(() => {
    revealElements.forEach(el => {
      if (!el.classList.contains('active')) {
        el.classList.add('active');
      }
    });
  }, 1000);

  // --- 2. Romantic Text-to-Speech Implementation ---
  const voiceBtn = document.getElementById("voice-btn");
  const letterTarget = document.getElementById("readable-letter");
  
  let synth = window.speechSynthesis;
  let utterance = null;
  let isPlaying = false;

  voiceBtn.addEventListener("click", () => {
    // If already reading, pressing it again stops the speech cleanly
    if (isPlaying) {
      synth.cancel();
      voiceBtn.innerText = "🔊";
      voiceBtn.classList.remove("playing");
      isPlaying = false;
      return;
    }

    // Compile the text content
    const paragraphs = Array.from(letterTarget.querySelectorAll("h1, p"));
    const fullText = paragraphs.map(p => p.innerText).join(". ");

    utterance = new SpeechSynthesisUtterance(fullText);
    
    // --- ROMANTIC PACE CONFIGURATION ---
    utterance.rate = 0.82;  // Deliberate, deep pacing
    utterance.pitch = 0.95; // Slightly lower, warmer tone

    // --- ACCENT & QUALITY FILTER ---
    const voices = synth.getVoices();
    
    const romanticVoice = voices.find(voice => 
      (voice.lang.startsWith('en') && (
        voice.name.includes("Natural") || 
        voice.name.includes("Premium") || 
        voice.name.includes("Google") || 
        voice.name.includes("Siri")
      ))
    );
    
    const accentFallback = voices.find(voice => voice.lang === 'en-GB' || voice.lang === 'en-AU');

    if (romanticVoice) {
      utterance.voice = romanticVoice;
    } else if (accentFallback) {
      utterance.voice = accentFallback;
    }

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

    synth.speak(utterance);
    voiceBtn.innerText = "⏸️";
    voiceBtn.classList.add("playing");
    isPlaying = true;
  });

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = synth.getVoices;
  }
});
