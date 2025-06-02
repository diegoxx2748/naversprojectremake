// DOM Elements
const darkToggle = document.getElementById('dark-toggle');
const ctaButton = document.getElementById('cta-button');
const loadingScreen = document.getElementById('loading-screen');
const sections = document.querySelectorAll('.section');
const naversTitle = document.getElementById('navers-title');

// --------- Dark Mode Toggle with Animation & Sound ---------
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.classList.add('clicked');
  playSound('toggle');
  setTimeout(() => darkToggle.classList.remove('clicked'), 600);
});

// --------- CTA Button Action with Sound ---------
ctaButton.addEventListener('click', () => {
  alert('Terima kasih telah mendaftar! Kami akan segera menghubungi Anda.');
  playSound('click');
});

// --------- Loading Screen Handling (smooth fade out) ---------
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Enable scrolling after loading
    document.body.style.overflow = 'auto';
  }, 2200);
});

// Disable scroll during loading
document.body.style.overflow = 'hidden';

// --------- Scroll Animations ---------
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

// --------- Particle Background Setup ---------
window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
  script.onload = () => {
    tsParticles.load('tsparticles', {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: true,
        },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        color: { value: '#00ffc3' },
        links: {
          color: '#00ffc3',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 2,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 60 },
        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { random: true, value: 4 },
      },
      detectRetina: true,
    });
  };
  document.body.appendChild(script);
});

// --------- Make Title Clickable with Scroll to Top & Sound ---------
if (naversTitle) {
  naversTitle.style.cursor = 'pointer';
  naversTitle.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click');
  });
}

// --------- Add Emojis to Features ---------
const featureTitles = document.querySelectorAll('.feature-item h4');
const emojis = ['🚀', '🧠', '🔮', '🌐', '📊', '🤖'];
featureTitles.forEach((title, i) => {
  const cleanText = title.textContent.replace(/^[🚀🧠🔮🌐📊🤖]\s*/, '');
  if (!title.textContent.startsWith(emojis[i % emojis.length])) {
    title.textContent = `${emojis[i % emojis.length]} ${cleanText}`;
  }
});

// --------- Sound Effects ---------
function playSound(type) {
  const sounds = {
    click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_95434b1386.mp3',
    toggle: 'https://cdn.pixabay.com/audio/2023/03/24/audio_f4a35b12e2.mp3',
  };
  if (!sounds[type]) return;
  const audio = new Audio(sounds[type]);
  audio.volume = 0.25;
  audio.play();
}
