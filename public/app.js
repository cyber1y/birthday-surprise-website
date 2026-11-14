/* =========================================================
   BIRTHDAY SURPRISE — Master Config & Feature Modules
   Edit CONFIG below to personalize everything.
   ========================================================= */

const CONFIG = {
  birthdayName: "Mehak Joshi",
  senderName: "[Your Name]",
  age: 22,
  birthdayDate: "2004-11-27",

  hero: {
    title: "Happy Birthday",
    subtitle: "A celebration made just for you, filled with love, laughter & a few surprises.",
    badgeText: "Your Special Day"
  },

  entrance: {
    type: "curtain",           // "curtain" | "pinch" | "password" | "none"
    password: null,            // if type=password and null, uses birth date MMDD
    suspenseLine: "Someone special has prepared something magical for you..."
  },

  music: {
    autoPlay: false,           // auto-play when page loads
    youtubeId: ""              // default background YouTube video ID
  },

  loveLetter: [
    "My dearest Mehak, on this special day, I want you to know how much you mean to me. Every moment we've shared has been a gift, and I cherish each one deeply.",
    "You bring so much joy and warmth into my life. Your laughter is my favorite sound, and your happiness is my greatest wish. Thank you for being the amazing person you are.",
    "Happy Birthday, my love. I hope this year brings you everything your heart desires and more. You deserve all the happiness in the world. With all my love, always."
  ],

  flipCards: [
    { emoji: "💕", title: "Thoughts of You", back: "Every moment with you feels like a beautiful dream I never want to wake up from." },
    { emoji: "✨", title: "Your Smile", back: "Your smile lights up even my darkest days. Never stop being you." },
    { emoji: "🌹", title: "First Meeting", back: "The day I met you was the day my life changed forever. Thank you for existing." },
    { emoji: "💑", title: "Our Adventures", back: "Every adventure with you becomes my favorite memory. Here's to a million more." },
    { emoji: "🎁", title: "You Deserve", back: "You deserve the world and more. Today and every day, I hope you feel loved." },
    { emoji: "💝", title: "Promise", back: "I promise to always be by your side, through every laugh, every tear, every birthday." }
  ],

  thingsILove: [
    { emoji: "😂", text: "Your sense of humor" },
    { emoji: "😊", text: "Your smile" },
    { emoji: "🍳", text: "Your cooking" },
    { emoji: "🤗", text: "Your baate" },
    { emoji: "👀", text: "The way you look at me" },
    { emoji: "☕", text:  "Your smartness" }
  ],

  featureNotes: [
    "The kind that turns a bad day into an inside joke.",
    "The first thing I look for in a room.",
    "Somehow everything tastes better when you make it.",
    "The conversations that go nowhere and mean everything.",
    "Like you're seeing the best version of me.",
    "The quiet kind of brilliant that never needs to show off."
  ],

  reasonsILoveYou: [
    "Your laugh wakes up the whole room",
    "You make average days feel like adventures",
    "Your kindness to everyone you meet",
    "The way you believe in me",
    "Your patience with my nonsense",
    "You always know how to make me smile"
  ],

  envelopeMessage: "Some words are best kept sealed... until now. This is where your deepest, most private message goes.",

  stats: [
    { value: 365, label: "Days Together", icon: "📅" },
    { value: 12, label: "Adventures", icon: "✈️" },
    { value: 1000, label: "Laughs Shared", icon: "😂" },
    { value: 1, label: "True Friendship", icon: "💕" }
  ],

  timeline: [
    { date: "2024-aug-08", title: "The First Hello", desc: "Where I first saw you.", photo: null },
    { date: "2024-Oct-18", title: "First Interaction", desc: "The first time I messaged you.", photo: null },
    { date: "2026-Aug-02", title: "First Feeling", desc: "We became friends.", photo: null },
    { date: "2026-Nov-27", title: "Today", desc: "And so many more to come.", photo: null }
  ],

  starMemories: [
    "The first time you made me laugh",
    "That rainy evening we danced in the kitchen",
    "Your smile the day you got your dream job",
    "When you held my hand on the cliff",
    "The midnight talks that never got old",
    "Every single 'good morning' from you"
  ],

  galleryCaptions: [
    "Our first photo together",
    "That unforgettable trip",
    "You looking absolutely stunning",
    "The day that changed everything",
    "My favorite smile",
    "Here's to many more"
  ],

  gallery: [
    { photo: null, caption: "Our first photo together" },
    { photo: null, caption: "That unforgettable trip" },
    { photo: null, caption: "You looking absolutely stunning" },
    { photo: null, caption: "The day that changed everything" },
    { photo: null, caption: "My favorite smile" },
    { photo: null, caption: "Here's to many more" }
  ],

  letterTapToOpen: true,
  heartProgressSteps: 5,

  wheelItems: [
    "Late nights talks \u{1F917}", "Movie Night \u{1F3AC}", "Our first meeting \u{1F373}",
    "Surprise Gift\u{1F491}", "Dessert of Choice \u{1F370}", "No Chores Day \u{1F389}",
    "Head Scratches \u{1F485}", "You Pick the Music \u{1F3B5}"
  ],

  loveCoupons: [
    { title: "Free Hug", emoji: "🤗", desc: "Redeem for one unlimited, no-time-limit hug." },
    { title: "Movie Night", emoji: "🎬", desc: "You pick the movie, zero complaints." },
    { title: "Breakfast in Bed", emoji: "🍳", desc: "Your favorite breakfast, served with love." },
    { title: "No Chores Day", emoji: "🧹", desc: "One full day of the house being my problem." },
    { title: "Surprise Date", emoji: "💑", desc: "A date planned entirely by me." },
    { title: "Dessert Pick", emoji: "🍰", desc: "Any dessert you want, I'll make it happen." }
  ],

  scratchMessage: "You are the best thing that ever happened to me \u{1F493}",

  wordleWord: "LOVE",

  crosswordClues: [
    { clue: "Year we first met", answer: "2024", length: 4 },
    { clue: "Your favorite food", answer: "TACOS", length: 5 },
    { clue: "The city we said 'I love you'", answer: "PARIS", length: 5 },
    { clue: "My nickname for you", answer: "MAHI", length: 4 },
    { clue: "The song stuck in our heads", answer: "MOONLIGHT", length: 9 }
  ],

  fortuneCookies: [
    "Your smile gets a compliment today",
    "Surprise dessert incoming — no questions asked",
    "Someone is thinking about you right now",
    "Tonight you pick the movie",
    "A love note is hidden near you",
    "You are loved more than you know"
  ],

  slotSymbols: ["💕", "👑", "🎂", "💎", "💖"],

  rizzLevels: [
    { min: 0, max: 20, label: "Rizz Rookie \u{1F331}", color: "#86efac" },
    { min: 21, max: 40, label: "Smooth Operator \u{1F576}", color: "#60a5fa" },
    { min: 41, max: 60, label: "Charm Champion \u{1F451}", color: "#fbbf24" },
    { min: 61, max: 80, label: "Rizz Master \u{1F3AD}", color: "#f472b6" },
    { min: 81, max: 100, label: "UNSTOPPABLE RIZZ GOD \u{1F525}", color: "#ef4444" }
  ],

  funnyQuestions: [
    { q: "On a scale of 1-10, how much do you love me?", options: [
      { text: "10", correct: true, response: "That's what I like to hear! \u{1F970}" },
      { text: "7", correct: false, response: "7?! I'm worth at least a 9!" },
      { text: "11", correct: false, response: "Trying to be cute, huh? Points for effort!" }
    ]},
    { q: "If I were a food, what would I be?", options: [
      { text: "Chocolate cake", correct: false, response: "Rich and sweet — not wrong actually." },
      { text: "Crème brûlée", correct: true, response: "Fancy, elegant, hard to crack — you know me." },
      { text: "Leftover pizza", correct: false, response: "Ouch. Cold. But... accurate." }
    ]},
    { q: "What's the best thing about being with me?", options: [
      { text: "My jokes", correct: false, response: "Finally, someone appreciates my comedy!" },
      { text: "My nonsense talks", correct: false, response: "So you only love me for the snacks?!" },
      { text: "Just being together", correct: true, response: "Aww. That's the right answer. \u{1F493}" }
    ]},
    { q: "Rate this birthday website (1-10):", options: [
      { text: "10/10 would recommend", correct: true, response: "You're my favorite person! \u{1F495}" },
      { text: "It's okay I guess", correct: false, response: "Ouch. But I still love you." },
      { text: "5/10 needs memes", correct: false, response: "Fair. Let me add more." }
    ]},
    { q: "What should we do next weekend?", options: [
      { text: "Stay in and cuddle", correct: false, response: "Cozy. I like it." },
      { text: "A spontaneous trip", correct: true, response: "Adventure time! Pack your bags! \u{1F680}" },
      { text: "Nothing, just vibe", correct: false, response: "Honestly, same." }
    ]},
    { q: "Who's the luckiest person alive?", options: [
      { text: "Me", correct: true, response: "Wrong! It's me, because I have you. \u{1F60E}" },
      { text: "You", correct: false, response: "I mean... you're not wrong." },
      { text: "A random celebrity", correct: false, response: "They have money, but I have you." }
    ]}
  ],

  knowMeQuiz: [
    { q: "What's my favorite thing about you?", options: ["Your eyez", "Your vibes", "All of you, always", "Your shoes"], correct: 2 },
    { q: "When did I know you were special?", options: ["First day", "Your smile", "Yesterday", "Never"], correct: 1 },
    { q: "What's our Friendship superpower?", options: ["Trust", "Making each other laugh", "", "Sleep"], correct: 1 },
    { q: "What's our dream destination?", options: ["World tour", "Anywhere together", "The moon", "My sath"], correct: 1 },
    { q: "Best birthday gift ever?", options: ["This site", "Expensive stuff", "My love", "Cake"], correct: 2 }
  ],

  compatibility: {
    partnerZodiac: "Gemini",
    yourZodiac: "Aries",
    loveScore: 98,
    message: "Two fire signs, one cosmic match. Off the charts — literally."
  },

  giftMessage: "The best gift I can give you is my dostii, today and always. Happy Birthday!",

  cake: {
    heading: "Time for the Cake!",
    subtitle: "Blow out the candles and make a wish...",
    blownText: "Your wish has been heard! \u2728",
    cutText: "Happy Birthday! Let's celebrate! \u{1F389}"
  },

  secretMessages: [
    "You're my favorite notification \u{1F493}",
    "I'd choose your friendship in every lifetime \u2728",
    "You make my heart do backflips \u{1F938}"
  ],

  compliments: [
    "You're the main character",
    "Your vibes are immaculate",
    "10/10 human being",
    "God's favorite",
    "Certified heartbreaker",
    "Too hot to handle",
    "Green flags only",
    "Perfectly crafted by the universe",
    "Chef's  of a person",
    "Born to stand out"
  ],

  finalHeading: "You Are Loved",
  finalSubtitle: "Beyond measure, beyond words, beyond forever.",
  footerText: "Made with \u2764\ufe0f for the most amazing person",

  togetherSince: "2023-01-15",
  credits: [
    { role: "Director of Smiles", name: "[KUMAR_n Swami]" },
    { role: "Screenplay", name: "Us, every day" },
    { role: "Lead Birthday Star", name: "Mehak Joshi" },
    { role: "Music Supervisor", name: "The songs we can't stop singing" },
    { role: "Executive Producer", name: "Love, obviously \u{1F970}" }
  ]
};

/* =========================================================
   Utilities
   ========================================================= */
function $(s, c) { return (c || document).querySelector(s); }
function $$(s, c) { return Array.from((c || document).querySelectorAll(s)); }

/* Device capability detection for performance adaptation */
const Device = (function () {
  const mq = (q) => window.matchMedia ? window.matchMedia(q).matches : false;
  const ua = navigator.userAgent;
  const isMobile = mq('(max-width: 700px)') || /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isSmall = mq('(max-width: 480px)');
  const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 2);
  const reducedMotion = mq('(prefers-reduced-motion: reduce)');
  const isLowEnd = isMobile && (navigator.hardwareConcurrency || 4) <= 4;
  const scale = Math.min(1, (window.innerWidth || 375) / 414);
  return { isMobile, isIOS, isAndroid, isSmall, isTouch, dpr, reducedMotion, isLowEnd, scale };
})();

function fireConfetti(opts) {
  if (typeof confetti !== 'function') return;
  const n = (opts && opts.particleCount) ? opts.particleCount : 120;
  const count = Device.isMobile ? Math.round(n * (Device.isSmall ? 0.4 : 0.6)) : n;
  confetti(Object.assign({ particleCount: count, spread: 75, origin: { y: 0.6 }, disableForReducedMotion: Device.reducedMotion }, opts || {}));
}
function fireCannon() {
  if (typeof confetti !== 'function') return;
  if (Device.reducedMotion) return;
  const n = Device.isMobile ? 80 : 200;
  confetti({ particleCount: n, spread: 120, origin: { y: 0.4 }, disableForReducedMotion: Device.reducedMotion });
  setTimeout(() => fireConfetti({ particleCount: Device.isMobile ? 60 : 120, spread: 100, origin: { x: 0.2 } }), 250);
  setTimeout(() => fireConfetti({ particleCount: Device.isMobile ? 60 : 120, spread: 100, origin: { x: 0.8 } }), 450);
}
function vibrate(ms) { if (navigator.vibrate) try { navigator.vibrate(ms || 60); } catch (e) {} }

/* Typewriter */
function typewriter(el, text, speed, onDone) {
  if (!el) return;
  el.innerHTML = '';
  let i = 0;
  el.appendChild(document.createElement('span'));
  let textNode = el.lastChild;
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.appendChild(cursor);
  function tick() {
    if (i <= text.length) {
      textNode.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, speed || 40);
    } else {
      cursor.style.display = 'none';
      if (onDone) onDone();
    }
  }
  tick();
}

/* =========================================================
   Audio Manager (Web Audio synth + optional MP3)
   ========================================================= */
const AudioManager = (function () {
  let ctx = null, musicOn = false, audioEl = null, audioUrl = null;

  function ensure() {
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC(); }
    return ctx;
  }

  // Load first available uploaded track (fallback to built-in melody)
  function loadTrack(cb) {
    fetch('/api/music').then(r => r.json()).then(tracks => {
      if (tracks && tracks.length) {
        const t = tracks.find(x => x.source === 'upload');
        audioUrl = t ? `/uploads/music/${t.filePath}` : null;
      }
      if (cb) cb();
    }).catch(() => cb && cb());
  }

  function playRemote() {
    if (!audioUrl || !musicOn) return;
    audioEl = new Audio(audioUrl);
    audioEl.loop = true;
    audioEl.volume = 0.4;
    audioEl.play().catch(() => {});
    return true;
  }

  function stopRemote() {
    if (audioEl) { audioEl.pause(); audioEl = null; }
  }

  function beep(freq, t, dur, type, vol) {
    const c = ensure(); if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime + t);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, c.currentTime + t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + (dur || 0.3));
    o.connect(g); g.connect(c.destination);
    o.start(c.currentTime + t); o.stop(c.currentTime + t + (dur || 0.3) + 0.05);
  }

  function birthdayMelody() {
    const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];
    notes.forEach((n, i) => beep(n, i * 0.18, 0.4, 'triangle'));
  }

  function playMelodyLoop() {
    if (!musicOn) return;
    birthdayMelody();
    setTimeout(playMelodyLoop, notesDur());
  }
  function notesDur() { return 2.2; }

  return {
    toggle() {
      const c = ensure(); if (!c) return false;
      musicOn = !musicOn;
      if (musicOn) {
        if (audioUrl) playRemote();
        else { birthdayMelody(); setTimeout(playMelodyLoop, notesDur()); }
      } else {
        stopRemote();
      }
      return musicOn;
    },
    loadTrack,
    isOn() { return musicOn; },
    sfxPop() { beep(700, 0, 0.08, 'square', 0.06); beep(1000, 0.05, 0.08, 'square', 0.06); },
    sfxFlip() { beep(400, 0, 0.1, 'triangle', 0.08); },
    sfxBoom() { beep(150, 0, 0.3, 'sawtooth', 0.12); beep(80, 0.05, 0.4, 'sawtooth', 0.15); },
    sfxBlow() {
      const c = ensure(); if (!c) return;
      const length = Math.floor(c.sampleRate * 0.45);
      const buffer = c.createBuffer(1, length, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
      const src = c.createBufferSource();
      src.buffer = buffer;
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 780;
      const gain = c.createGain();
      gain.gain.value = 0.11;
      src.connect(filter); filter.connect(gain); gain.connect(c.destination);
      src.start();
    },
    ensure
  };
})();

/* =========================================================
   Particle Layer — ambient sparkles / hearts
   ========================================================= */
const ParticleSystem = (function () {
  let running = false, canvas, ctx, particles = [], raf;

  function init() {
    canvas = $('#particleLayer');
    if (!canvas || running) return;
    running = true;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize, { passive: true });
    spawn();
    if (particles.length && !document.hidden) loop(0);
  }

  let lastFrame = 0;

  function resize() {
    const dpr = Math.min(Device.dpr || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }

  function spawn() {
    const base = Device.reducedMotion ? 0
      : Device.isLowEnd ? 8
      : Device.isMobile ? 14
      : 28;
    particles = [];
    for (let i = 0; i < base; i++) {
      particles.push(makeParticle());
    }
  }

  function makeParticle() {
    return {
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * 100,
      r: 1 + Math.random() * 2.2,
      vy: -(0.25 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 0.35,
      a: 0.25 + Math.random() * 0.45,
      hue: Math.random() * 360
    };
  }

  function loop(now) {
    if (!running) return;
    if (now - lastFrame < 33) { // ~30fps cap
      raf = requestAnimationFrame(loop);
      return;
    }
    lastFrame = now || 0;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.y < -20 || p.x < -20 || p.x > innerWidth + 20) {
        Object.assign(p, makeParticle());
      }
      ctx.globalAlpha = p.a;
      ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, 0.85)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(loop);
  }

  // Pause the particle rain when the tab isn't visible (saves battery on mobile)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    else if (!raf) { loop(); }
  });

  return { init };
})();

/* =========================================================
   Curtain Entrance
   ========================================================= */
function initEntrance() {
  const left = $('#curtainLeft'), right = $('#curtainRight'), center = $('#curtainCenter');
  if (!left || !right) return;
  const type = CONFIG.entrance.type;

  if (type === 'password' && !CONFIG.entrance.password) {
    // auto from date
    try {
      const d = new Date(CONFIG.birthdayDate || new Date());
      CONFIG.entrance.password = (String(d.getMonth() + 1).padStart(2, '0')) + String(d.getDate()).padStart(2, '0');
    } catch (e) {}
  }

  if (type === 'password' && CONFIG.entrance.password) {
    center.innerHTML = `
      <h2 class="h2">A locked gift awaits</h2>
      <p>Enter the passcode (hint: birthday, MMDD)</p>
      <input id="pwInput" type="text" maxlength="4" aria-label="Passcode, four digits in month and day order" autocomplete="off" style="max-width:120px;text-align:center;font-size:1.4rem" />
      <button class="pill-btn btn-primary" id="pwBtn">Unlock</button>
    `;
    const btn = $('#pwBtn'), input = $('#pwInput');
    function tryUnlock() {
      if (input.value === String(CONFIG.entrance.password)) { openCurtain(); }
      else { input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 500); }
    }
    btn.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
    return;
  }

  if (type === 'pinch') {
    center.innerHTML = `
      <button type="button" id="pinchHeart" aria-label="Open the birthday surprise" style="font-size:6rem;cursor:pointer;background:none;border:0;line-height:1;padding:0">💗</button>
      <p>Tap the heart to begin...</p>
      <button class="pill-btn btn-secondary" id="skipBtn">Skip intro</button>
    `;
    $('#pinchHeart').addEventListener('click', () => { fireConfetti(); openCurtain(); });
    $('#skipBtn').addEventListener('click', openCurtain);
    return;
  }

  // auto-open immediately (no entrance)
  if (type === 'none') {
    left.classList.add('open');
    right.classList.add('open');
    center.classList.add('hidden');
    center.setAttribute('aria-hidden', 'true');
    center.inert = true;
    return;
  }

  // default: suspense line then auto-open after few seconds, or allow click
  center.innerHTML = `
    <p style="max-width:420px;padding:20px;color:var(--muted)">${CONFIG.entrance.suspenseLine}</p>
    <button class="pill-btn btn-primary" id="beginBtn">Begin</button>
  `;
  $('#beginBtn').addEventListener('click', openCurtain);

  function openCurtain() {
    left.classList.add('open');
    right.classList.add('open');
    center.classList.add('hidden');
    center.setAttribute('aria-hidden', 'true');
    center.inert = true;
    fireConfetti({ particleCount: 80 });
    vibrate(60);
  }
}

/* =========================================================
   Name Balloons
   ========================================================= */
function initNameBalloons() {
  const wrap = $('#nameBalloons');
  if (!wrap) return;
  const name = CONFIG.birthdayName.replace(/\[|\]/g, '').trim() || 'Birthday Star';
  [...name].forEach((ch, i) => {
    const b = document.createElement('div');
    b.className = 'name-balloon';
    b.textContent = ch;
    b.style.left = (10 + (i * 60 / Math.max(name.length, 1))) + '%';
    b.style.animationDelay = (i * 0.4) + 's';
    b.style.background = `hsl(${(330 + i * 40) % 360}, 85%, 65%)`;
    wrap.appendChild(b);
  });
  /* .name-balloon in CSS */
  setTimeout(() => fireConfetti({ particleCount: 60 }), 1500);
}

/* =========================================================
   Flip Cards
   ========================================================= */
function initFlipCards() {
  const grid = $('#flipGrid');
  if (grid) {
    grid.innerHTML = '';
    (CONFIG.flipCards || []).forEach(c => {
      const card = document.createElement('div');
      card.className = 'flip-card reveal';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front"><div class="emoji">${c.emoji}</div><div class="title">${c.title}</div></div>
          <div class="flip-card-back"><p>${c.back}</p></div>
        </div>`;
      grid.appendChild(card);
    });
  }
  $$('.flip-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', 'false');
    const flip = () => {
      const flipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(flipped));
      AudioManager.sfxFlip();
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); flip(); }
    });
  });
}

/* =========================================================
   Timer Counter (time together)
   ========================================================= */
function initCounter() {
  const el = $('#counter');
  if (!el) return;
  el.innerHTML = `
    <div class="time-cell"><span class="num d">0</span><span class="label">Days</span></div>
    <div class="time-cell"><span class="num h">00</span><span class="label">Hours</span></div>
    <div class="time-cell"><span class="num m">00</span><span class="label">Minutes</span></div>
    <div class="time-cell"><span class="num s">00</span><span class="label">Seconds</span></div>
  `;
  const start = new Date(CONFIG.togetherSince).getTime();
  const units = { d: 0, h: 0, m: 0, s: 0 };
  function tick() {
    const now = Date.now();
    let diff = Math.max(0, Math.floor((now - start) / 1000));
    units.d = Math.floor(diff / 86400); diff %= 86400;
    units.h = Math.floor(diff / 3600); diff %= 3600;
    units.m = Math.floor(diff / 60);
    units.s = diff % 60;
    $(`#counter .d`).textContent = units.d;
    $(`#counter .h`).textContent = String(units.h).padStart(2, '0');
    $(`#counter .m`).textContent = String(units.m).padStart(2, '0');
    $(`#counter .s`).textContent = String(units.s).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);
}

/* =========================================================
   Animated Stats (count up)
   ========================================================= */
function initStats() {
  $$('.stat-value').forEach(el => {
    const target = parseInt(el.dataset.value, 10) || 0;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString() + suffix;
    }, 30);
  });
}

/* =========================================================
   Polaroid 3D tilt
   ========================================================= */
function initPolaroidTilt() {
  if (Device.isTouch && !window.matchMedia('(hover: hover)').matches) return;  // skip tilt on pure-touch phones
  $$('.polaroid').forEach(p => {
    p.addEventListener('mousemove', e => {
      const r = p.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      p.style.transform = `rotate(${y * 4}deg) scale(1.03)`;
    });
    p.addEventListener('mouseleave', () => {
      p.style.transform = '';
    });
  });
}

/* =========================================================
   Lightbox
   ========================================================= */
function initLightbox() {
  const box = $('#lightbox');
  if (!box) return;
  const boxImg = $('img', box);
  let lastPhoto = null;
  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    if (lastPhoto && document.contains(lastPhoto)) lastPhoto.focus();
  };
  const open = (img, photo) => {
    if (!img || !boxImg) return;
    lastPhoto = photo || null;
    boxImg.src = img.src;
    boxImg.alt = img.alt || 'Enlarged photo';
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    box.focus();
  };
  const markPhotos = () => {
    $$('.polaroid .photo').forEach(photo => {
      if (photo.dataset.zoomReady) return;
      const img = photo.querySelector('img');
      if (!img) { photo.removeAttribute('role'); photo.removeAttribute('tabindex'); return; }
      photo.dataset.zoomReady = '1';
      photo.tabIndex = 0;
      photo.setAttribute('role', 'button');
      const caption = photo.parentElement?.querySelector('.caption')?.textContent.trim();
      photo.setAttribute('aria-label', 'Enlarge ' + (caption || 'photo'));
    });
  };
  const grid = $('#galleryGrid');
  if (grid) new MutationObserver(markPhotos).observe(grid, { childList: true, subtree: true });
  markPhotos();
  document.addEventListener('click', (e) => {
    const photo = e.target instanceof Element ? e.target.closest('.polaroid .photo') : null;
    if (!photo) return;
    open($('img', photo), photo);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const photo = e.target instanceof Element ? e.target.closest('.polaroid .photo') : null;
      if (photo) { e.preventDefault(); photo.click(); }
    }
    if (e.key === 'Escape' && box.classList.contains('open')) close();
  });
  box.addEventListener('click', () => close());
  $('#lightboxClose')?.addEventListener('click', event => { event.stopPropagation(); close(); });
}

/* =========================================================
   Spin Wheel
   ========================================================= */
function initWheel() {
  const canvas = $('#wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const items = CONFIG.wheelItems;
  const n = items.length;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let size = 0, cx = 0, cy = 0, R = 0;
  let angle = 0, spinning = false;

  function setSize() {
    size = canvas.offsetWidth || 320;
    const cap = window.innerWidth - 40;      // never overflow the phone screen
    if (cap < size) size = cap;
    canvas.width = size * DPR;
    canvas.height = size * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = size / 2; cy = size / 2; R = size / 2 - 8;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);
    const slice = (Math.PI * 2) / n;
    const fontPx = Math.max(10, Math.round(size / 26));
    items.forEach((item, i) => {
      const start = angle + i * slice;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = i % 2 ? '#ff5bb7' : '#a855f7';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = fontPx + 'px Inter';
      ctx.fillText(item, R - 14, 5);
      ctx.restore();
    });
  }
  setSize();
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(setSize, 200); }, { passive: true });

  const spinBtn = $('#spinBtn');
  if (spinBtn) spinBtn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    const target = angle + Math.PI * 2 * (5 + Math.random() * 5);
    let start = performance.now();
    const dur = 3000;
    function anim(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      angle = target * eased;
      draw();
      if (p < 1) requestAnimationFrame(anim);
      else {
        spinning = false;
        // determine result
        const slice = (Math.PI * 2) / n;
        const idx = Math.floor(((2 * Math.PI - angle % (2 * Math.PI)) / slice)) % n;
        $('#wheelResult').textContent = 'You landed on: ' + items[idx] + ' \u{1F389}';
        fireCannon();
        AudioManager.sfxBoom();
      }
    }
    requestAnimationFrame(anim);
  });
  draw();
}

/* =========================================================
   Rizz Meter
   ========================================================= */
function initRizz() {
  const btn = $('#rizzBtn');
  const fill = $('#rizzFill');
  const label = $('#rizzLabel');
  if (!btn || !fill) return;
  btn.addEventListener('click', () => {
    const val = Math.floor(Math.random() * 101);
    fill.style.width = val + '%';
    let lv = CONFIG.rizzLevels.find(l => val >= l.min && val <= l.max);
    if (label) {
      label.textContent = `${val}% — ${lv ? lv.label : ''}`;
      label.style.color = lv ? lv.color : '#fff';
      label.querySelector('span') || (() => {})();
    }
    if (val >= 80) fireCannon();
    else if (val >= 40) fireConfetti({ particleCount: 50 });
    AudioManager.sfxPop();
  });
}

/* =========================================================
   Compliment Bomb
   ========================================================= */
function initCompliments() {
  const btn = $('#complimentBtn');
  const layer = $('#particleLayer');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const comps = (CONFIG.compliments || []).slice();
    const n = Math.min(comps.length, 10);
    let parent = document.body;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('div');
      el.className = 'compliment';
      el.textContent = comps[Math.floor(Math.random() * comps.length)];
      el.style.left = (innerWidth / 2 - 80) + 'px';
      el.style.top = (innerHeight / 2) + 'px';
      parent.appendChild(el);
      const dx = (Math.random() - 0.5) * 300;
      const dy = -(100 + Math.random() * 250);
      try {
        gsap.to(el, { x: dx, y: dy, opacity: 0, rotation: (Math.random() - 0.5) * 30, duration: 2, ease: 'power2.out', onComplete: () => el.remove() });
      } catch (e) {
        el.animate([{ transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }], { duration: 2000 }).onfinish = () => el.remove();
      }
    }
    fireConfetti({ particleCount: 80 });
    AudioManager.sfxPop();
  });
}

/* =========================================================
   Quiz Engines
   ========================================================= */
function initFunnyQuestions() {
  const container = $('#funnyQuiz');
  if (!container) return;
  container.innerHTML = '';
  CONFIG.funnyQuestions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `<h3>${qi + 1}. ${q.q}</h3>`;
    q.options.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'quiz-option';
      b.textContent = opt.text;
      b.addEventListener('click', () => {
        AudioManager.sfxPop();
        if (opt.correct) {
          card.classList.add('pop');
          setTimeout(() => card.classList.remove('pop'), 500);
          fireConfetti({ particleCount: 40 });
          b.style.borderColor = '#16a34a';
        } else {
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 500);
          b.style.borderColor = '#ef4444';
        }
        const note = document.createElement('div');
        note.style.marginTop = '12px';
        note.style.fontWeight = '700';
        note.textContent = opt.response;
        card.querySelector('h3').after(note);
        $$('button', card).forEach(x => x.disabled = true);
      });
      card.appendChild(b);
    });
    container.appendChild(card);
  });
}

function initKnowMe() {
  const container = $('#knowMeQuiz');
  if (!container) return;
  container.innerHTML = '';
  let score = 0, current = 0;
  const qs = CONFIG.knowMeQuiz;
  function renderQ() {
    const q = qs[current];
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `<h3>${current + 1}. ${q.q}</h3>`;
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-option';
      b.textContent = opt;
      b.addEventListener('click', () => {
        if (i === q.correct) { score++; fireConfetti({ particleCount: 30 }); }
        current++;
        if (current < qs.length) { renderQ(); }
        else {
          card.innerHTML = `<h3>Score: ${score}/${qs.length}</h3><p>${score === qs.length ? "Perfect! You know me so well \u{1F970}" : "You're learning... but I still love you!"}</p>`;
          if (score === qs.length) fireCannon();
        }
      });
      card.appendChild(b);
    });
    container.innerHTML = '';
    container.appendChild(card);
  }
  renderQ();
}

/* =========================================================
   Scratch Card
   ========================================================= */
function initScratch() {
  const canvas = $('#scratchCanvas');
  if (!canvas) return;
  const prize = $('#scratchPrize');
  if (prize) prize.textContent = CONFIG.scratchMessage;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function sizeCanvas() {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    if (!w || !h) return;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = '#b8b8c0';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = 'bold 22px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch here', w / 2, h / 2);
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas, { passive: true });

  let drawing = false;
  function scratch(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  }
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'button');
  canvas.setAttribute('aria-label', 'Scratch card: press Enter or Space to reveal the message');
  canvas.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(0, 0, w, h);
  });
  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mousemove', e => { if (drawing) scratch(e); });
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseleave', () => drawing = false);
  canvas.addEventListener('touchstart', () => drawing = true, { passive: true });
  canvas.addEventListener('touchmove', e => { if (drawing) { e.preventDefault(); e.stopPropagation(); scratch(e); } }, { passive: false });
  canvas.addEventListener('touchend', () => drawing = false, { passive: true });
}

/* =========================================================
   Gift Box Reveal
   ========================================================= */
function initGift() {
  const box = $('#giftBox');
  const msg = $('#giftMessage');
  if (!box) return;
  box.setAttribute('role', 'button');
  box.setAttribute('tabindex', '0');
  box.setAttribute('aria-label', 'Open the gift box');
  box.setAttribute('aria-expanded', 'false');
  const openGift = () => {
    box.classList.remove('bounce');
    box.classList.add('open');
    box.setAttribute('aria-expanded', 'true');
    AudioManager.sfxBoom();
    fireCannon();
    vibrate(100);
    setTimeout(() => {
      if (msg) { msg.classList.add('show'); typewriter($('#giftMsgText'), CONFIG.giftMessage, 30); }
    }, 500);
  };
  box.addEventListener('click', openGift);
  box.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openGift(); }
  });
}

/* =========================================================
   Star Sky constellation
   ========================================================= */
function initStarSky() {
  const sky = $('#starSky');
  if (!sky) return;
  const mems = CONFIG.starMemories || [];
  const stars = $('#starList');
  if (!stars) return;
  const w = sky.offsetWidth, h = sky.offsetHeight;
  mems.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'star-dot';
    d.textContent = '✦';
    d.style.left = (15 + (i * (70 / Math.max(mems.length - 1, 1)))) + '%';
    d.style.top = (30 + ((i % 2) * 30)) + '%';
    d.title = m;
    d.tabIndex = 0;
    d.setAttribute('role', 'button');
    d.setAttribute('aria-label', 'Reveal memory: ' + m);
    d.setAttribute('aria-pressed', 'false');
    d.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); d.click(); }
    });
    d.addEventListener('click', () => {
      if (!d.classList.contains('lit')) {
        d.classList.add('lit');
        d.textContent = '★';
        d.setAttribute('aria-pressed', 'true');
        fireConfetti({ particleCount: 15 });
        const note = document.createElement('div');
        note.style.textAlign = 'center';
        note.style.marginTop = '14px';
        note.style.fontStyle = 'italic';
        note.textContent = m;
        sky.appendChild(note);
        AudioManager.sfxPop();
        setTimeout(() => note.remove(), 3000);
      }
      if ($$('.star-dot.lit', sky).length === mems.length) {
        setTimeout(() => fireCannon(), 400);
      }
    });
    stars.appendChild(d);
  });
}

/* =========================================================
   Cursor sparkle trail (unlockable)
   ========================================================= */
const SparkleTrail = (function () {
  let enabled = false, canvas, ctx;
  function enable() {
    enabled = true;
    canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9000';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth; canvas.height = innerHeight;
    window.addEventListener('pointermove', draw);
  }
  function draw(e) {
    if (!enabled || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = e.clientX, y = e.clientY;
    for (let i = 0; i < 6; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 10 + Math.random() * 25;
      ctx.fillStyle = `hsla(${330 + Math.random() * 60}, 90%, 70%, ${1 - i / 6})`;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return { enable };
})();

/* =========================================================
   Slot machine
   ========================================================= */
function initSlot() {
  const spinbtn = $('#slotBtn');
  if (!spinbtn) return;
  const reels = $$('.slot-reel');
  spinbtn.addEventListener('click', () => {
    reels.forEach((reel, ri) => {
      reel.classList.add('spinning');
      const inner = $('.reel-inner', reel);
      let best = CONFIG.slotSymbols[Math.floor(Math.random() * CONFIG.slotSymbols.length)];
      setTimeout(() => {
        const icons = [CONFIG.slotSymbols[Math.floor(Math.random()*5)], CONFIG.slotSymbols[Math.floor(Math.random()*5)], best];
        inner.innerHTML = icons.map(i => `<div style="height:120px;display:flex;align-items:center;justify-content:center;font-size:3rem">${i}</div>`).join('');
        reel.classList.remove('spinning');
      }, 600 + ri * 150);
    });
    setTimeout(() => {
      fireConfetti({ particleCount: 60 });
    }, 1000);
  });
}

/* =========================================================
   Fortune cookies
   ========================================================= */
function initCookies() {
  const wrap = $('#fortuneWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  CONFIG.fortuneCookies.forEach((m, i) => {
    const btn = document.createElement('div');
    btn.style.textAlign = 'center';
    btn.style.cursor = 'pointer';
    btn.innerHTML = `<span class="cookie" data-idx="${i}">🥠</span><p style="color:var(--muted);font-size:0.8rem">Cookie ${i + 1}</p>`;
    const cookie = btn.querySelector('.cookie');
    cookie.tabIndex = 0;
    cookie.setAttribute('role', 'button');
    cookie.setAttribute('aria-label', 'Open fortune cookie ' + (i + 1));
    cookie.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.click(); }
    });
    cookie.addEventListener('click', function () {
      if (this.dataset.open) return;
      this.dataset.open = '1';
      this.classList.add('cracked');
      AudioManager.sfxPop();
      this.style.opacity = '0.4';
      const fortune = document.createElement('div');
      fortune.style.marginTop = '8px';
      fortune.style.fontStyle = 'italic';
      fortune.textContent = m;
      fortune.style.padding = '10px';
      fortune.style.background = 'var(--glass)';
      fortune.style.borderRadius = '10px';
      fortune.style.border = '1px solid var(--panel-border)';
      btn.appendChild(fortune);
    });
    wrap.appendChild(btn);
  });
}

/* =========================================================
   Wordle
   ========================================================= */
function initWordle() {
  const wrap = $('#wordleWrap');
  if (!wrap) return;
  const word = CONFIG.wordleWord.toUpperCase();
  const tries = 6;
  let row = 0, guessed = false;
  const state = { grid: [], rows: [] };
  const inputs = [];
  const board = document.createElement('div');
  board.style.textAlign = 'center';
  function render() {
    board.innerHTML = '';
    for (let r = 0; r < tries; r++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex'; rowDiv.style.gap = '6px'; rowDiv.style.justifyContent = 'center'; rowDiv.style.margin = '6px 0';
      const history = state.rows[r] || [];
      for (let c = 0; c < word.length; c++) {
        const tile = document.createElement('div');
        tile.className = 'wordle-tile' + (history[c] ? ' ' + history[c] : '');
        tile.textContent = state.grid[r] ? (state.grid[r][c] || '') : '';
        rowDiv.appendChild(tile);
      }
      board.appendChild(rowDiv);
    }
  }
  const msg = document.createElement('p');
  msg.style.marginTop = '10px'; msg.style.fontWeight = '700'; msg.style.textAlign = 'center';
  wrap.appendChild(board);
  wrap.appendChild(msg);
  render();

  function submitGuess() {
    const guess = inputs.map(i => i.value.toUpperCase()).join('');
    if (guess.length !== word.length) { msg.textContent = 'Fill all the boxes!'; return; }
    const result = guess.split('').map((ch, i) => {
      if (ch === word[i]) return 'correct';
      if (word.includes(ch)) return 'present';
      return 'absent';
    });
    state.rows[row] = result;
    if (guess === word) {
      msg.textContent = 'YES! You cracked it! \u{1F389}';
      fireCannon(); guessed = true;
    } else {
      row++;
      if (row >= tries) { msg.textContent = `It was ${word} — but you're still my favorite.`; }
    }
    render();
    if (!guessed && row < tries) inputs.forEach(i => i.value = '');
  }

  function renderInputs() {
    const inputRow = document.createElement('div');
    inputRow.style.display = 'flex'; inputRow.style.gap = '8px'; inputRow.style.justifyContent = 'center';
    for (let i = 0; i < word.length; i++) {
      const inp = document.createElement('input');
      inp.className = 'wordle-input';
      inp.maxLength = 1;
      inp.autocomplete = 'off';
      inp.setAttribute('aria-label', `Wordle letter ${i + 1} of ${word.length}`);
      inputs.push(inp);
      inputRow.appendChild(inp);
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); submitGuess(); }
        if (e.key === 'Backspace' && i > 0 && !inp.value) inputs[i - 1].focus();
      });
      inp.addEventListener('input', () => {
        if (inp.value && i < word.length - 1) inputs[i + 1].focus();
      });
    }
    wrap.appendChild(inputRow);
    inputs[0].focus();
    const submit2 = document.createElement('button');
    submit2.className = 'pill-btn btn-primary'; submit2.style.marginTop = '12px'; submit2.textContent = 'Enter';
    submit2.addEventListener('click', submitGuess);
    wrap.appendChild(submit2);
  }
  renderInputs();
}

/* =========================================================
   Koanmi easter egg
   ========================================================= */
function initKonami() {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  window.addEventListener('keydown', e => {
    if (e.key === seq[idx]) { idx++; if (idx === seq.length) { idx = 0; secretBurst(); } }
    else idx = 0;
  });
  function secretBurst() {
    fireCannon(); fireCannon();
    const msg = document.createElement('div');
    msg.textContent = '🎉 KONAMI MODE UNLOCKED! You found the secret!';
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--glass);border:1px solid var(--gold);padding:14px 22px;border-radius:999px;z-index:9999;font-weight:700';
    document.body.appendChild(msg);
    SparkleTrail.enable();
    setTimeout(() => msg.remove(), 4000);
  }
}

/* =========================================================
   Scroll reveal (GSAP ScrollTrigger)
   ========================================================= */
function initScrollReveal() {
  if (typeof gsap === 'undefined') return;
  if (Device.reducedMotion) { $$('.reveal').forEach(el => el.style.opacity = '1'); return; }
  gsap.registerPlugin(ScrollTrigger);
  const distance = Device.isMobile ? 30 : 60;
  $$('.reveal').forEach(el => {
    const from = el.dataset.dir || 'up';
    const x = from === 'left' ? -distance : from === 'right' ? distance : 0;
    const y = from === 'up' || !from ? distance : 0;
    gsap.fromTo(el, { x, y, opacity: 0 }, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      x: 0, y: 0, opacity: 1, duration: Device.isMobile ? 0.5 : 0.8, ease: 'power2.out'
    });
  });
}

/* =========================================================
   Save visitor (existing backend integration)
   ========================================================= */
const visitorForm = $('#visitorForm');
if (visitorForm) {
  visitorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: $('#nameInput') ? $('#nameInput').value : '',
      email: $('#emailInput') ? $('#emailInput').value : '',
      note: $('#noteInput') ? $('#noteInput').value : '',
      userAgent: navigator.userAgent || ''
    };
    try {
      const res = await fetch('/api/visitor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await res.json();
      const status = $('#statusMessage');
      if (status) status.textContent = result.success ? 'Saved! Thank you 💕' : 'Error saving.';
    } catch (err) {
      const status = $('#statusMessage');
      if (status) status.textContent = 'Could not save.';
    }
  });
}

/* =========================================================
   Stats grid + feature grid renderers
   ========================================================= */
function renderStats() {
  const grid = $('#statsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CONFIG.stats.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'stat-card reveal';
    card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-value" data-value="${s.value}" data-suffix="">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    `;
    grid.appendChild(card);
  });
}

function renderFeatures() {
  const grid = $('#featureGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CONFIG.thingsILove.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    const note = (CONFIG.featureNotes && CONFIG.featureNotes[i]) || '';
    card.dataset.index = String(i + 1).padStart(2, '0');
    card.innerHTML = `<span class="icon" aria-hidden="true">${escapeHtml(f.emoji)}</span><h3>${escapeHtml(f.text)}</h3>${note ? `<p>${escapeHtml(note)}</p>` : ''}`;
    grid.appendChild(card);
  });
}

/* =========================================================
   Home edit — hero, bento, marquee, story and notes
   ========================================================= */
function renderHomeHero() {
  const age = Number(CONFIG.age) || 22;
  const ageEl = $('#heroAge');
  const ageBig = $('#heroAgeBig');
  if (ageEl) ageEl.textContent = age;
  if (ageBig) ageBig.textContent = age;
  const badge = $('#heroBadge');
  if (badge && CONFIG.hero && CONFIG.hero.badgeText) badge.textContent = CONFIG.hero.badgeText;
}

function renderBirthdayEdit() {
  const stats = Array.isArray(CONFIG.stats) ? CONFIG.stats : [];
  const stat = (needle, fallback) => {
    const found = stats.find(item => String(item.label || '').toLowerCase().includes(needle));
    return found && found.value != null ? found.value : fallback;
  };
  const set = (id, value) => {
    const el = $('#' + id);
    if (el && value != null) el.textContent = Number(value).toLocaleString();
  };
  set('bentoAge', CONFIG.age || 22);
  set('bentoAdventures', stat('adventure', 12));
  set('bentoLaughs', stat('laugh', 1000));
  set('bentoFriendship', stat('friend', 1));
  const quote = $('#bentoQuote');
  if (quote) {
    const reason = (CONFIG.reasonsILoveYou && CONFIG.reasonsILoveYou[1]) || (CONFIG.reasonsILoveYou && CONFIG.reasonsILoveYou[0]) || 'You make ordinary days feel like the best part of the story.';
    quote.textContent = '“' + String(reason).replace(/[.!?]+$/, '') + '.”';
  }
}

function renderReasonsMarquee() {
  const track = $('#reasonsTrack');
  if (!track) return;
  const reasons = Array.isArray(CONFIG.reasonsILoveYou) && CONFIG.reasonsILoveYou.length
    ? CONFIG.reasonsILoveYou
    : ['You make every ordinary day feel a little more magical.'];
  track.innerHTML = '';
  const makeGroup = (hidden) => {
    const group = document.createElement('div');
    group.className = 'marquee-group';
    if (hidden) group.setAttribute('aria-hidden', 'true');
    else group.setAttribute('role', 'list');
    reasons.forEach((reason, i) => {
      const chip = document.createElement('span');
      chip.className = 'marquee-chip';
      if (!hidden) chip.setAttribute('role', 'listitem');
      const index = document.createElement('span');
      index.textContent = String(i + 1).padStart(2, '0');
      index.setAttribute('aria-hidden', 'true');
      chip.append(index, document.createTextNode(String(reason)));
      group.appendChild(chip);
    });
    return group;
  };
  track.append(makeGroup(false), makeGroup(true));
}

function storyDateLabel(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'A little memory';
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const match = raw.match(/(\d{4})[- ]([A-Za-z]{3,})[- ](\d{1,2})/);
  if (match) {
    const month = months.indexOf(match[2].slice(0, 3).toLowerCase());
    if (month >= 0) {
      const date = new Date(Number(match[1]), month, Number(match[3]));
      return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }
  }
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  return raw;
}

function renderHomeTimeline() {
  const track = $('#storyTrack');
  if (!track) return;
  const items = Array.isArray(CONFIG.timeline) ? CONFIG.timeline : [];
  track.innerHTML = '';
  const stamps = ['💌', '✨', '🌙', '🎂', '💫'];
  items.forEach((item, i) => {
    const card = document.createElement('li');
    card.className = 'story-card reveal';
    card.dataset.step = String(i + 1).padStart(2, '0');
    const date = document.createElement('span');
    date.className = 'story-date';
    date.textContent = storyDateLabel(item.date);
    const title = document.createElement('h3');
    title.textContent = item.title || 'A little chapter';
    const desc = document.createElement('p');
    desc.textContent = item.desc || 'A memory worth keeping.';
    const stamp = document.createElement('span');
    stamp.className = 'story-stamp';
    stamp.setAttribute('aria-hidden', 'true');
    stamp.textContent = stamps[i % stamps.length];
    card.append(date, title, desc, stamp);
    track.appendChild(card);
  });
}

function renderOpenWhen() {
  const grid = $('#openWhenGrid');
  if (!grid) return;
  const reasons = Array.isArray(CONFIG.reasonsILoveYou) ? CONFIG.reasonsILoveYou : [];
  const notes = [
    {
      title: 'Open when you miss me',
      paragraphs: [
        reasons[0] || 'You are my favourite thought.',
        'Come find me. I will put the kettle on and pretend I was not waiting by the door.'
      ]
    },
    {
      title: 'Open when you need a smile',
      paragraphs: [
        reasons[1] || 'You make ordinary days feel like adventures.',
        'Now picture me attempting to dance to our song. You are welcome.'
      ]
    },
    {
      title: 'Open when you forget how loved you are',
      paragraphs: [
        reasons[2] || 'You are loved more than you know.',
        'Read that again. Then look at the cake. You are the whole reason for it.'
      ]
    }
  ];
  grid.innerHTML = '';
  notes.forEach((note, i) => {
    const details = document.createElement('details');
    details.className = 'open-when-card reveal';
    const summary = document.createElement('summary');
    const index = document.createElement('span');
    index.className = 'open-when-index';
    index.textContent = String(i + 1).padStart(2, '0');
    const title = document.createElement('strong');
    title.textContent = note.title;
    summary.append(index, title);
    const body = document.createElement('div');
    body.className = 'open-when-body';
    note.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      body.appendChild(p);
    });
    details.append(summary, body);
    grid.appendChild(details);
  });
}

function initStoryControls() {
  const track = $('#storyTrack');
  const prev = $('#storyPrev');
  const next = $('#storyNext');
  if (!track || !prev || !next) return;
  const amount = () => {
    const card = track.querySelector('.story-card');
    return card ? card.getBoundingClientRect().width + 14 : 260;
  };
  const update = () => {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const hasOverflow = max > 8;
    prev.hidden = !hasOverflow;
    next.hidden = !hasOverflow;
    if (!hasOverflow) return;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max - 4;
  };
  const go = (direction) => {
    track.scrollBy({ left: amount() * direction, behavior: Device.reducedMotion ? 'auto' : 'smooth' });
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  requestAnimationFrame(update);
}

function initCardSpotlight() {
  if (Device.reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
  $$('[data-spotlight]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
}

function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;
  let queued = false;
  const update = () => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initSurpriseNav() {
  const bar = $('#surpriseNav');
  const map = $('.surprise-map', bar || document);
  if (!bar || !map) return;

  const links = $$('a[href^="#"]', map);
  const sections = links
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  const countEl = $('#surpriseProgressCount');
  const fillEl = $('#surpriseProgressFill');
  const doneEl = $('#surpriseProgressDone');
  const storeKey = 'day6:surprise:opened:v1';
  const reduceMotion = Device.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const total = sections.length;
  let opened = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    if (Array.isArray(saved)) opened = new Set(saved.filter(id => sections.some(s => s.id === id)));
  } catch (e) {}

  const save = () => {
    try { localStorage.setItem(storeKey, JSON.stringify([...opened])); } catch (e) {}
  };

  const paintProgress = (celebrate) => {
    const count = opened.size;
    if (countEl) countEl.textContent = String(count);
    if (fillEl) fillEl.style.width = `${(count / total) * 100}%`;
    links.forEach(link => {
      link.classList.toggle('is-visited', opened.has(link.getAttribute('href').slice(1)));
    });
    if (doneEl) doneEl.hidden = count < total;
    if (celebrate && count === total && typeof fireConfetti === 'function') {
      fireConfetti({ particleCount: 80, spread: 90 });
    }
  };

  const markOpened = (id) => {
    if (opened.has(id)) return;
    opened.add(id);
    save();
    paintProgress(true);
  };

  let currentId = null;
  const setActive = (id) => {
    if (id === currentId) return;
    currentId = id;
    links.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const active = links.find(link => link.getAttribute('href') === `#${id}`);
    if (active && map.scrollWidth > map.clientWidth) {
      const left = active.offsetLeft - (map.clientWidth - active.offsetWidth) / 2;
      if (typeof map.scrollTo === 'function') {
        map.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
      } else {
        map.scrollLeft = left;
      }
    }
  };

  // Mark a gift as opened once a meaningful part of it has been seen.
  const seen = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) markOpened(entry.target.id);
    });
  }, { threshold: [0.2, 0.45] });
  sections.forEach(section => seen.observe(section));

  // Scrollspy: pick the section nearest a line a third down the viewport.
  let queued = false;
  const spy = () => {
    queued = false;
    const line = window.innerHeight * 0.34;
    let best = sections[0];
    let bestDist = Infinity;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 80) return;
      const dist = Math.abs(rect.top - line);
      if (dist < bestDist) { bestDist = dist; best = section; }
    });
    if (best) setActive(best.id);
  };
  const schedule = () => {
    if (!queued) { queued = true; requestAnimationFrame(spy); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });

  paintProgress(false);
  spy();
}

function initBentoMusic() {
  const button = $('#bentoMusicBtn');
  if (!button) return;
  button.addEventListener('click', () => {
    const on = AudioManager.toggle();
    syncMusicUI(on);
    const status = $('#bentoMusicStatus');
    if (status) status.textContent = on ? 'Melody on. Happy birthday.' : 'Melody paused.';
  });
  syncMusicUI(AudioManager.isOn());
}

function initAppShell() {
  const btn = $('#appMoreBtn');
  const sheet = $('#appMoreSheet');
  const backdrop = $('#appMoreBackdrop');
  if (!btn || !sheet || !backdrop) return;
  const open = () => {
    sheet.classList.add('is-open');
    backdrop.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    sheet.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => sheet.classList.contains('is-open') ? close() : open());
  backdrop.addEventListener('click', close);
  sheet.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function initHomeSections() {
  renderHomeHero();
  renderBirthdayEdit();
  renderReasonsMarquee();
  renderHomeTimeline();
  renderOpenWhen();
  initStoryControls();
  initCardSpotlight();
  initScrollProgress();
  initBentoMusic();
}

/* =========================================================
   Interactive cake atelier
   ========================================================= */
const CAKE_TOP_SHAPES = {
  heart: '<path d="M0 4 C-8 -4 -17 5 0 17 C17 5 8 -4 0 4Z" fill="#ff5bb7"/>',
  star: '<path d="M0 -10 L2.9 -3.2 10 -2.7 4.5 1.9 6.2 9 0 5.1 -6.2 9 -4.5 1.9 -10 -2.7 -2.9 -3.2Z" fill="#ffd166"/>',
  strawberry: '<path d="M0 -9 C8 -9 10 2 0 11 C-10 2 -8 -9 0 -9Z" fill="#ef4444"/><path d="M-6 -10 L0 -14 L6 -10" fill="#34d399"/>',
  cherry: '<circle cx="0" cy="4" r="7" fill="#ef4444"/><path d="M0 -3 Q4 -11 9 -13" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"/>'
};
const CAKE_CANDLE_COLORS = ['#ff5bb7', '#a855f7', '#ffd166', '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#ef4444'];
const CAKE_STEP_COPY = {
  bake: { index: 0, tool: 'bake', instruction: 'Tap the cake to bake the layers.', label: 'Bake the cake' },
  frost: { index: 1, tool: 'frost', instruction: 'Choose a frosting flavour, then tap the cake to pour it.', label: 'Frost the cake' },
  decorate: { index: 2, tool: 'decorate', instruction: 'Pick a topping, then tap the cake to place it.', label: 'Add a topping to the cake' },
  candles: { index: 3, tool: 'candles', instruction: 'Tap the cake to add a candle, or place them all.', label: 'Add a candle to the cake' },
  wish: { index: 4, tool: 'wish', instruction: 'Write a wish if you like, then light the candles.', label: 'Light the candles on the cake' },
  blow: { index: 4, tool: 'blow', instruction: 'Blow out the candles — or use your mic.', label: 'Blow out the candles' },
  cut: { index: 5, tool: 'cut', instruction: 'Now cut the first slice.', label: 'Cut the cake' },
  done: { index: 5, tool: 'done', instruction: 'All done. Bake another whenever you like.', label: 'Finished cake' }
};

function buildCakeScene() {
  const wrap = $('#cakeWrap');
  if (!wrap) return null;
  const slots = [[146, 150], [206, 150], [120, 214], [160, 214], [180, 206], [180, 150]];
  const slotMarkup = slots
    .map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="cake-topping" data-slot="${i}"></g></g>`)
    .join('');

  wrap.innerHTML = `
  <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
    <defs>
      <clipPath id="cakeCutClip">
        <path d="M212 120 L238 120 L238 260 L194 260 Z"/>
      </clipPath>
    </defs>

    <g class="cake-stand">
      <ellipse cx="180" cy="280" rx="132" ry="14" fill="rgba(255,255,255,0.12)"/>
      <ellipse cx="180" cy="275" rx="118" ry="11" fill="rgba(255,255,255,0.07)"/>
    </g>

    <g class="cake-ghost">
      <rect x="88" y="178" width="184" height="82" rx="12"/>
      <rect x="122" y="118" width="116" height="60" rx="12"/>
      <ellipse cx="180" cy="118" rx="58" ry="12"/>
      <ellipse cx="180" cy="178" rx="92" ry="12"/>
    </g>

    <g class="cake-tiers">
      <!-- bottom tier -->
      <rect x="88" y="178" width="184" height="82" rx="12" fill="#6d28d9" stroke="rgba(255,255,255,0.22)"/>
      <rect x="88" y="178" width="184" height="20" rx="10" fill="rgba(255,255,255,0.16)"/>
      <ellipse cx="180" cy="178" rx="92" ry="12" fill="#8b5cf6"/>
      <circle cx="118" cy="222" r="2.5" fill="#ffd166"/>
      <circle cx="144" cy="238" r="2" fill="#ff5bb7"/>
      <circle cx="206" cy="232" r="2.5" fill="#34d399"/>
      <circle cx="238" cy="218" r="2" fill="#ffd166"/>

      <!-- top tier -->
      <rect class="cake-tier-top" x="122" y="118" width="116" height="60" rx="12" stroke="rgba(255,255,255,0.25)"/>
      <rect x="122" y="118" width="116" height="16" rx="10" fill="rgba(255,255,255,0.2)"/>
      <ellipse class="cake-top-surface" cx="180" cy="118" rx="58" ry="12"/>
      <circle cx="138" cy="154" r="2" fill="#fff8fb"/>
      <circle cx="158" cy="164" r="1.8" fill="#ffd166"/>
      <circle cx="222" cy="160" r="2.2" fill="#fff8fb"/>
    </g>

    <g class="cake-frosting">
      <path class="cake-frost-path" d="M122 126 C142 117 162 122 180 118 C198 122 218 117 238 126 L238 140 Q228 154 218 140 Q208 158 198 141 Q188 156 178 141 Q168 158 158 141 Q148 156 138 140 Q128 154 122 140 Z"/>
      <path d="M128 128 C146 120 164 124 180 121 C196 124 214 120 232 128" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/>
      <path class="cake-frost-path" opacity="0.92" d="M88 186 C118 176 150 182 180 178 C210 182 242 176 272 186 L272 196 Q260 210 248 197 Q236 214 224 199 Q212 210 200 198 Q188 214 176 199 Q164 210 152 198 Q140 214 128 199 Q116 210 104 198 Q96 208 88 197 Z"/>
      <path d="M96 188 C124 180 152 184 180 181 C208 184 236 180 264 188" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2" stroke-linecap="round"/>
    </g>

    <g class="cake-decor">${slotMarkup}</g>
    <g id="cakeCandles"></g>

    <g class="cake-cut-face">
      <path d="M212 120 L238 120 L238 260 L194 260 Z" fill="#3d0a1e"/>
      <g clip-path="url(#cakeCutClip)">
        <rect class="cake-cut-top" x="190" y="120" width="60" height="38"/>
        <rect x="190" y="158" width="60" height="9" fill="#fff1f7"/>
        <rect x="190" y="167" width="60" height="38" fill="#8b5cf6"/>
        <rect x="190" y="205" width="60" height="9" fill="#fff1f7"/>
        <rect x="190" y="214" width="60" height="46" fill="#6d28d9"/>
      </g>
      <path d="M212 120 L238 120 L238 260 L194 260 Z" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
    </g>

    <g class="cake-serve-plate">
      <ellipse cx="292" cy="280" rx="56" ry="12" fill="rgba(255,255,255,0.16)"/>
      <ellipse cx="292" cy="276" rx="48" ry="9" fill="rgba(255,255,255,0.09)"/>
    </g>

    <g class="cake-slice">
      <g transform="translate(272 190)">
        <path d="M0 20 L26 0 L44 0 L36 82 L-6 82 Z" fill="#ff9fce"/>
        <path d="M-6 42 L40 42 L39 50 L-7 50 Z" fill="#fff1f7"/>
        <path d="M-7 58 L38 58 L37 66 L-8 66 Z" fill="#fff1f7"/>
        <path d="M26 0 L44 0 L46 12 L24 14 Z" fill="var(--cake-frost)"/>
        <circle cx="38" cy="8" r="5" fill="#ef4444"/>
      </g>
    </g>

    <g class="cake-knife">
      <rect x="0" y="-6" width="54" height="12" rx="5" fill="#dfe4f2"/>
      <path d="M54 -6 L64 0 L54 6 Z" fill="#c6cce0"/>
      <rect x="-26" y="-8" width="30" height="16" rx="7" fill="#8b5cf6"/>
    </g>
  </svg>`;
  return wrap;
}

function initCake() {
  const scene = $('#cakeScene');
  const stage = $('#cakeStage');
  const wrap = $('#cakeWrap');
  if (!scene || !stage || !wrap || !buildCakeScene()) return;

  const status = $('#cakeStatus');
  const instruction = $('#cakeInstruction');
  const steps = $$('.cake-steps li', scene);
  const groups = $$('.cake-tool-group', scene);
  const wishForm = $('#cakeWishForm');
  const wishInput = $('#cakeWishInput');
  const wishNote = $('#cakeWishNote');
  const micBtn = $('#micBtn');
  const age = Math.max(1, Number(CONFIG.age) || 1);
  const digits = String(age);
  const digitMode = age > 8 && digits.length <= 3;
  const totalCandles = digitMode ? digits.length : Math.min(age, 8);
  const rawName = String(CONFIG.birthdayName || '').replace(/\[|\]/g, '').trim();
  const cakeName = /^name$/i.test(rawName) ? '' : rawName;

  const state = {
    stage: 'bake',
    flavor: 'strawberry',
    topping: 'heart',
    toppings: 0,
    candles: 0,
    lit: false,
    blown: false,
    cut: false,
    wish: '',
    micActive: false
  };

  let micStream = null;
  let micCtx = null;
  let micRaf = 0;
  let micTimer = 0;
  let celebrationTimer = 0;

  const setStatus = (text) => { if (status) status.textContent = text; };
  const setInstruction = (text) => { if (instruction) instruction.textContent = text; };

  function setStage(next, message) {
    const info = CAKE_STEP_COPY[next] || CAKE_STEP_COPY.bake;
    state.stage = next;
    scene.dataset.stage = next;
    setInstruction(info.instruction);
    stage.setAttribute('aria-label', info.label);
    stage.classList.toggle('is-done', next === 'done');
    if (message) setStatus(message);

    steps.forEach((li, i) => {
      const done = next === 'done';
      li.classList.toggle('is-complete', i < info.index || (done && i === info.index));
      li.classList.toggle('is-active', !done && i === info.index);
      if (!done && i === info.index) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });

    groups.forEach(group => {
      group.hidden = group.dataset.tools !== info.tool;
    });

    if (next !== 'blow' && state.micActive) stopMic();

    const active = document.activeElement;
    if (active && active.closest && active.closest('.cake-tool-group') && active.closest('.cake-tool-group').hidden) {
      stage.focus({ preventScroll: true });
    }
  }

  function setFlavor(flavor) {
    state.flavor = flavor;
    scene.dataset.frosting = flavor;
    $$('.cake-swatch', scene).forEach(btn => {
      const on = btn.dataset.frosting === flavor;
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function setTopping(topping) {
    state.topping = topping;
    $$('.cake-topping-btn', scene).forEach(btn => {
      const on = btn.dataset.topping === topping;
      btn.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function candleMarkup(index) {
    if (digitMode) {
      const count = digits.length;
      const width = count >= 3 ? 16 : 18;
      const gap = 10;
      const step = width + gap;
      const start = 180 - ((count * step) - gap) / 2 + width / 2;
      const x = start + index * step;
      const digit = digits[index];
      return `<g class="cake-candle" transform="translate(${x} 122)">
        <g class="cake-candle-inner">
          <rect x="${-width / 2}" y="-46" width="${width}" height="46" rx="4" fill="#fff4d6" stroke="${CAKE_CANDLE_COLORS[index % CAKE_CANDLE_COLORS.length]}" stroke-width="2"/>
          <text x="0" y="-14" text-anchor="middle" font-size="${count >= 3 ? 14 : 20}" font-family="'Playfair Display',Georgia,serif" font-weight="800" fill="#1b1023">${digit}</text>
          <line x1="0" y1="-46" x2="0" y2="-43" stroke="#4c1d95" stroke-width="2"/>
          <circle class="cake-glow" cx="0" cy="-52" r="16" fill="rgba(255,209,102,0.32)" style="--i:${index}"/>
          <ellipse class="cake-flame" cx="0" cy="-52" rx="5" ry="9" fill="#ffd166" style="--i:${index}"/>
          <ellipse class="cake-flame" cx="0" cy="-51" rx="2.5" ry="5" fill="#ff9f1c" style="--i:${index}"/>
          <circle class="cake-smoke" cx="0" cy="-54" r="4" fill="rgba(255,255,255,0.5)" style="--i:${index}"/>
        </g>
      </g>`;
    }

    const spacing = totalCandles > 1 ? Math.min(14, 70 / (totalCandles - 1)) : 0;
    const x = 180 + (index - (totalCandles - 1) / 2) * spacing;
    return `<g class="cake-candle" transform="translate(${x} 122)">
      <g class="cake-candle-inner">
        <rect x="-3.5" y="-34" width="7" height="34" rx="2.5" fill="${CAKE_CANDLE_COLORS[index % CAKE_CANDLE_COLORS.length]}" stroke="rgba(255,255,255,0.55)"/>
        <line x1="0" y1="-34" x2="0" y2="-32" stroke="#4c1d95" stroke-width="2"/>
        <circle class="cake-glow" cx="0" cy="-39" r="12" fill="rgba(255,209,102,0.32)" style="--i:${index}"/>
        <ellipse class="cake-flame" cx="0" cy="-39" rx="4" ry="7" fill="#ffd166" style="--i:${index}"/>
        <ellipse class="cake-flame" cx="0" cy="-38.5" rx="2" ry="4" fill="#ff9f1c" style="--i:${index}"/>
        <circle class="cake-smoke" cx="0" cy="-41" r="3.5" fill="rgba(255,255,255,0.5)" style="--i:${index}"/>
      </g>
    </g>`;
  }

  let autoBusy = false;

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function runAutoBuild() {
    // Automates the cake build: bake → frost → decorate → candle setup.
    if (autoBusy) return;
    autoBusy = true;
    try {
      setStage('bake');
      cook();
      await wait(750);
      if (state.stage !== 'frost') return;

      frost();
      await wait(750);
      if (state.stage !== 'decorate') return;

      setTopping('star');
      placeTopping();
      await wait(420);
      finishDecorating();
      await wait(600);
      if (state.stage !== 'candles') return;

      setStage('candles');
      placeAllCandles();
      await wait(800);
      setStatus('Candle setup complete. Make a wish, then light them, blow out, and cut.');
    } catch (e) {
      setStatus('Auto build paused.');
    } finally {
      autoBusy = false;
    }
  }

  function cook() {
    if (state.stage !== 'bake') return;
    scene.classList.add('is-baked');
    AudioManager.sfxPop();
    vibrate(35);
    setStage('frost', 'Layers baked. Now pick a flavour and pour the frosting.');
  }

  function frost() {
    if (state.stage !== 'frost') return;
    scene.classList.add('is-frosted');
    AudioManager.sfxPop();
    vibrate(35);
    setStage('decorate', 'Frosting poured. Pick a topping and tap the cake.');
  }

  function placeTopping() {
    if (state.stage !== 'decorate') return;
    if (state.toppings >= 6) {
      setStatus('That cake is fully decorated. Tap Done decorating.');
      return;
    }
    const slot = $(`.cake-topping[data-slot="${state.toppings}"]`, scene);
    if (slot) {
      slot.innerHTML = CAKE_TOP_SHAPES[state.topping] || CAKE_TOP_SHAPES.heart;
      slot.classList.add('is-placed');
    }
    state.toppings += 1;
    AudioManager.sfxPop();
    vibrate(30);
    setStage('decorate', state.toppings >= 6 ? 'Beautiful. Tap Done decorating.' : 'Lovely. Add another topping, or tap Done decorating.');
  }

  function finishDecorating() {
    if (state.stage !== 'decorate') return;
    setStage('candles', state.toppings ? 'Now add the candles.' : 'A minimalist cake. Now add the candles.');
  }

  function addCandle() {
    if (state.stage !== 'candles') return;
    if (state.candles >= totalCandles) return finishCandles();
    $('#cakeCandles', scene).insertAdjacentHTML('beforeend', candleMarkup(state.candles));
    state.candles += 1;
    AudioManager.sfxPop();
    vibrate(25);
    if (state.candles >= totalCandles) finishCandles();
    else setStage('candles', `${state.candles} of ${totalCandles} candles placed.`);
  }

  function placeAllCandles() {
    if (state.stage !== 'candles') return;
    while (state.candles < totalCandles) {
      $('#cakeCandles', scene).insertAdjacentHTML('beforeend', candleMarkup(state.candles));
      state.candles += 1;
    }
    AudioManager.sfxPop();
    finishCandles();
  }

  function finishCandles() {
    setStage('wish', 'All the candles are on. Make a wish, then light them.');
  }

  function lightCandles() {
    if (state.stage !== 'wish') return;
    if (state.candles === 0) {
      while (state.candles < totalCandles) {
        $('#cakeCandles', scene).insertAdjacentHTML('beforeend', candleMarkup(state.candles));
        state.candles += 1;
      }
    }
    state.wish = wishInput ? wishInput.value.trim() : '';
    if (wishNote) {
      if (state.wish) {
        wishNote.textContent = state.wish;
        wishNote.hidden = false;
      } else {
        wishNote.hidden = true;
      }
    }
    state.lit = true;
    scene.classList.add('is-lit');
    AudioManager.sfxPop();
    vibrate(45);
    setStage('blow', state.wish ? 'Wish made. Now blow out the candles.' : 'Candles lit. Now blow them out.');
  }

  function blowCandles() {
    if (state.stage !== 'blow') {
      if (state.stage === 'wish') setStatus('Light the candles first, then blow them out.');
      else if (state.stage !== 'done') setStatus('The candles are not lit yet.');
      return;
    }
    state.blown = true;
    scene.classList.add('is-blown');
    if (typeof AudioManager.sfxBlow === 'function') AudioManager.sfxBlow();
    vibrate(70);
    setStage('cut', 'Wish made. Now cut the first slice.');
  }

  function cutCake() {
    if (state.stage !== 'cut') {
      if (state.stage === 'blow') setStatus('Blow out the candles first, then cut the cake.');
      else if (state.stage === 'wish') setStatus('Light the candles, blow them out, then cut the cake.');
      else setStatus('Finish the candles and the wish before cutting.');
      return;
    }
    state.cut = true;
    scene.classList.add('is-cut');
    AudioManager.sfxPop();
    setStage('done', `Happy birthday${cakeName ? ', ' + cakeName : ''}! ${state.wish ? 'Your wish is safe with me.' : 'Make it a good one.'}`);
    celebrationTimer = setTimeout(() => {
      fireCannon();
      AudioManager.sfxBoom();
      vibrate(80);
    }, 650);
  }

  function stopMic() {
    state.micActive = false;
    cancelAnimationFrame(micRaf);
    clearTimeout(micTimer);
    if (micStream) micStream.getTracks().forEach(track => track.stop());
    if (micCtx && micCtx.close) {
      try {
        const closing = micCtx.close();
        if (closing && typeof closing.catch === 'function') closing.catch(() => {});
      } catch (e) {}
    }
    micStream = null;
    micCtx = null;
    if (micBtn) {
      micBtn.textContent = 'Blow with mic';
      micBtn.setAttribute('aria-pressed', 'false');
    }
  }

  async function startMic() {
    if (state.stage !== 'blow' || state.micActive) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('This browser cannot use the mic. Use the button instead.');
      return;
    }
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (state.stage !== 'blow') {
        micStream.getTracks().forEach(track => track.stop());
        micStream = null;
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) throw new Error('no audio context');
      micCtx = new AudioCtx();
      if (micCtx.state === 'suspended' && micCtx.resume) micCtx.resume().catch(() => {});
      const source = micCtx.createMediaStreamSource(micStream);
      const analyser = micCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      state.micActive = true;
      micBtn.textContent = 'Listening… blow now';
      micBtn.setAttribute('aria-pressed', 'true');
      setStatus('I’m listening. Blow gently toward your microphone.');
      let loudFrames = 0;
      const tick = () => {
        if (!state.micActive) return;
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const value = (data[i] - 128) / 128;
          sum += value * value;
        }
        const rms = Math.sqrt(sum / data.length);
        if (rms > 0.09) loudFrames += 1;
        else loudFrames = Math.max(0, loudFrames - 1);
        if (loudFrames > 7) {
          stopMic();
          blowCandles();
          return;
        }
        micRaf = requestAnimationFrame(tick);
      };
      tick();
      micTimer = setTimeout(() => {
        if (state.micActive) {
          stopMic();
          setStatus('I did not catch a blow. Use the button instead.');
        }
      }, 12000);
    } catch (e) {
      stopMic();
      setStatus('Mic access was not available. Use the button instead.');
    }
  }

  function resetCake() {
    stopMic();
    clearTimeout(celebrationTimer);
    scene.classList.remove('is-baked', 'is-frosted', 'is-lit', 'is-blown', 'is-cut');
    Object.assign(state, {
      stage: 'bake', flavor: 'strawberry', topping: 'heart', toppings: 0,
      candles: 0, lit: false, blown: false, cut: false, wish: '', micActive: false
    });
    const holder = $('#cakeCandles', scene);
    if (holder) holder.innerHTML = '';
    $$('.cake-topping', scene).forEach(slot => {
      slot.classList.remove('is-placed');
      slot.innerHTML = '';
    });
    if (wishInput) wishInput.value = '';
    if (wishNote) {
      wishNote.hidden = true;
      wishNote.textContent = '';
    }
    setFlavor('strawberry');
    setTopping('heart');
    setStage('bake', 'A fresh cake. Tap to bake the layers.');
    stage.focus({ preventScroll: true });
  }

  function advance() {
    switch (state.stage) {
      case 'bake':
        void runAutoBuild();
        break;
      case 'frost': frost(); break;
      case 'decorate': placeTopping(); break;
      case 'candles': addCandle(); break;
      case 'wish': lightCandles(); break;
      case 'blow': blowCandles(); break;
      case 'cut': cutCake(); break;
      default: setStatus('This cake is finished. Tap Bake another cake to start again.');
    }
  }

  stage.addEventListener('click', advance);
  $('#bakeBtn')?.addEventListener('click', cook);
  $('#frostBtn')?.addEventListener('click', frost);
  $('#decorateDoneBtn')?.addEventListener('click', finishDecorating);
  $('#candleAddBtn')?.addEventListener('click', addCandle);
  $('#candleAllBtn')?.addEventListener('click', placeAllCandles);
  $('#blowBtn')?.addEventListener('click', blowCandles);
  $('#cutBtn')?.addEventListener('click', cutCake);
  $('#cakeResetBtn')?.addEventListener('click', resetCake);
  if (micBtn) micBtn.addEventListener('click', startMic);
  if (wishForm) wishForm.addEventListener('submit', event => {
    event.preventDefault();
    lightCandles();
  });

  $$('.cake-swatch', scene).forEach(btn => {
    btn.addEventListener('click', () => {
      setFlavor(btn.dataset.frosting);
      AudioManager.sfxFlip();
    });
  });
  $$('.cake-topping-btn', scene).forEach(btn => {
    btn.addEventListener('click', () => {
      setTopping(btn.dataset.topping);
      AudioManager.sfxFlip();
    });
  });

  setFlavor('strawberry');
  setTopping('heart');
  setStage('bake');
}

/* =========================================================
   Heart progress
   ========================================================= */
function initHeartProgress() {
  const wrap = $('#heartProgress');
  if (!wrap) return;
  const steps = CONFIG.heartProgressSteps || 5;
  let hearts = '';
  for (let i = 0; i < steps; i++) hearts += '<span>💗</span>';
  wrap.innerHTML = `<div class="heart-progress-hearts">${hearts}</div>`;
  let count = 0;
  function addHeart() {
    const spans = $$('#heartProgress .heart-progress-hearts span');
    if (count < spans.length) {
      spans[count].classList.add('lit');
      count++;
      AudioManager.sfxPop();
      fireConfetti({ particleCount: 20 });
      if (count === spans.length) setTimeout(fireCannon, 400);
    }
  }
  return { addHeart };
}

/* =========================================================
   Letter / reasons / timeline
   ========================================================= */
function initLetter() {
  const box = $('#letterText');
  if (!box) return;
  box.textContent = '';
  let revealed = false;
  function show() {
    if (revealed) return;
    revealed = true;
    box.removeAttribute('role');
    box.removeAttribute('tabindex');
    box.removeAttribute('aria-expanded');
    box.style.cursor = 'default';
    const paras = Array.isArray(CONFIG.loveLetter) ? CONFIG.loveLetter : [CONFIG.loveLetter];
    let html = '';
    paras.forEach(p => { html += `<p>${p} &#10084;&#65039;</p>`; });
    typewriter(box, paras.join(' &#10084;&#65039; '), 25);
    fireConfetti({ particleCount: 60 });
    AudioManager.sfxPop();
  }
  if (CONFIG.letterTapToOpen) {
    box.style.cursor = 'pointer';
    box.tabIndex = 0;
    box.setAttribute('role', 'button');
    box.setAttribute('aria-label', 'Open your letter');
    box.setAttribute('aria-expanded', 'false');
    box.innerHTML = '<p style="color:var(--muted);font-style:italic">Tap to open your letter...</p>';
    box.addEventListener('click', show);
    box.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(); }
    });
  } else {
    show();
  }
}

function initReasons() {
  const grid = $('#reasonsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (CONFIG.reasonsILoveYou || []).forEach(t => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `<span class="icon">💗</span><h3>${t}</h3>`;
    grid.appendChild(card);
  });
}

function initTimeline() {
  const grid = $('#timelineGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (CONFIG.timeline || []).forEach(t => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `<div style="color:var(--gold);font-weight:700;letter-spacing:0.05em">${storyDateLabel(t.date)}</div><h3 style="margin:6px 0">${escapeHtml(t.title || 'A little chapter')}</h3><p>${escapeHtml(t.desc || 'A memory worth keeping.')}</p>`;
    grid.appendChild(card);
  });
}

/* =========================================================
   Gallery / polaroids
   ========================================================= */
function initGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (CONFIG.gallery || []).forEach((g, i) => {
    const p = document.createElement('div');
    p.className = 'polaroid reveal';
    p.style.transform = `rotate(${(Math.random() - 0.5) * 8}deg)`;
    const img = g.photo ? `<img src="${g.photo}" alt="${g.caption || ''}">` : `<div style="width:100%;height:220px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:rgba(255,255,255,0.05)">&#128247;</div>`;
    p.innerHTML = `<div class="photo">${img}</div><div class="caption">${g.caption || CONFIG.galleryCaptions[i % CONFIG.galleryCaptions.length] || ''}</div>`;
    grid.appendChild(p);
  });
  const updateCount = () => {
    const count = $('#galleryCount');
    if (!count) return;
    const n = grid.children.length;
    count.textContent = `${n} frame${n === 1 ? '' : 's'}`;
  };
  updateCount();
  // Merge backend photos (admin uploads + visitor captures)
  Promise.all([
    fetch('/api/photos').then(r => r.json()).catch(() => []),
    fetch('/api/captured-photos').then(r => r.json()).catch(() => [])
  ]).then(([photos, captured]) => {
    [...photos, ...captured].forEach(p => {
      const div = document.createElement('div');
      div.className = 'polaroid reveal';
      div.style.transform = `rotate(${(Math.random() - 0.5) * 8}deg)`;
      div.innerHTML = `<div class="photo"><img src="/uploads/photos/${p.fileName}" alt="${p.originalName || ''}"></div><div class="caption">${p.source === 'visitor' ? 'Shared by a friend ✨' : 'Admin upload'}</div>`;
      grid.appendChild(div);
    });
    updateCount();
  });
}

/* =========================================================
   Share a moment (selfie / photo upload to gallery)
   ========================================================= */
function initShare() {
  const selfieBtn = $('#selfieBtn');
  const choosePhotoBtn = $('#choosePhotoBtn');
  const photoInput = $('#photoInput');
  const status = $('#shareStatus');
  if (!selfieBtn && !photoInput) return;
  const setStatus = (msg) => { if (status) status.textContent = msg; };
  choosePhotoBtn?.addEventListener('click', () => photoInput?.click());

  if (selfieBtn) selfieBtn.addEventListener('click', async () => {
    const preview = $('#cameraPreview');
    const stream = await DeviceIntel.requestCamera();
    if (!stream) { setStatus('Could not access camera. Try choosing a photo instead.'); return; }
    const video = document.createElement('video');
    video.srcObject = stream;
    video.style.width = '220px';
    video.style.borderRadius = '12px';
    video.autoplay = true;
    video.playsInline = true;
    if (preview) preview.replaceChildren(video);
    setStatus('Smile! Click "Take selfie" again to capture.');
    selfieBtn.textContent = '📸 Capture!';
    selfieBtn.onclick = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext('2d').drawImage(video, 0, 0);
      stream.getTracks().forEach(t => t.stop());
      canvas.toBlob(async (blob) => {
        if (!blob) { setStatus('Capture failed.'); return; }
        const file = new File([blob], 'selfie-' + Date.now() + '.jpg', { type: 'image/jpeg' });
        const res = await DeviceIntel.uploadPhoto(file);
        setStatus(res.success ? 'Photo sent! It will appear in the gallery. 🎉' : 'Upload failed. Try again.');
        selfieBtn.textContent = '📸 Take a selfie';
        selfieBtn.onclick = null;
      }, 'image/jpeg', 0.9);
    };
  });

  if (photoInput) photoInput.addEventListener('change', async () => {
    const file = photoInput.files[0];
    if (!file) return;
    setStatus('Uploading...');
    const res = await DeviceIntel.uploadPhoto(file);
    setStatus(res.success ? 'Photo sent! It will appear in the gallery. 🎉' : 'Upload failed. Try again.');
    photoInput.value = '';
  });
}

/* =========================================================
   Wishes (load from backend)
   ========================================================= */
function initWishes() {
  const list = $('#wishList');
  if (!list) return;

  const countEl = $('#wishCount');
  async function load() {
    list.setAttribute('aria-busy', 'true');
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      list.innerHTML = '';
      (data || []).forEach(w => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `<div class="wish-name">${escapeHtml(w.name || 'Anonymous')}</div><div class="wish-text">${escapeHtml(w.message || '')}</div>`;
        list.appendChild(item);
      });
      const n = (data || []).length;
      if (countEl) countEl.textContent = `${n} ${n === 1 ? 'note' : 'notes'}`;
      if (n === 0) {
        list.innerHTML = '<p class="lead">No wishes yet. Be the first! 💌</p>';
      }
    } catch (e) {
      if (countEl) countEl.textContent = 'Unavailable';
      list.innerHTML = '<p class="lead">Wishes are loading over the clouds...</p>';
    } finally {
      list.removeAttribute('aria-busy');
    }
  }
  load();

  const form = $('#wishForm');
  if (form) form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#wishName') ? $('#wishName').value : '';
    const message = $('#wishMessage') ? $('#wishMessage').value : '';
    const status = $('#wishStatus');
    const submit = $('#wishSubmit');
    if (!message.trim()) {
      if (status) { status.dataset.state = 'error'; status.textContent = 'Write a wish before sending it. 💌'; }
      return;
    }
    if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
    form.setAttribute('aria-busy', 'true');
    if (status) { status.dataset.state = ''; status.textContent = ''; }
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });
      if (!res.ok) throw new Error('The wish could not be sent.');
      form.reset();
      if (status) { status.dataset.state = 'success'; status.textContent = 'Your wish is on the wall. Thank you! 💌'; }
      load();
      fireConfetti({ particleCount: 80 });
    } catch (e) {
      if (status) { status.dataset.state = 'error'; status.textContent = 'Could not send your wish. Please try again.'; }
    } finally {
      form.removeAttribute('aria-busy');
      if (submit) { submit.disabled = false; submit.textContent = 'Send my wish'; }
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* =========================================================
   Finale
   ========================================================= */
function initFinale() {
  const wrap = $('#finaleMain');
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="finale-heart">
      <svg viewBox="0 0 32 29.6" aria-hidden="true"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" fill="#ff5bb7"/></svg>
    </div>
    <p class="eyebrow finale-eyebrow">Chapter 05 · the last page</p>
    <h1 class="finale-big gradient-text" id="finaleText"></h1>
    <p class="finale-sub" id="finaleSub"></p>
    <div class="finale-actions">
      <a href="index.html" class="pill-btn btn-primary">Start again</a>
      <a href="wishes.html" class="pill-btn btn-secondary">Read the wishes</a>
    </div>
  `;
  typewriter($('#finaleText'), CONFIG.finalHeading, 40, () => {
    $('#finaleSub').textContent = CONFIG.finalSubtitle;
    fireCannon();
  });
}

function initCredits() {
  const wrap = $('#creditsWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  (CONFIG.credits || []).forEach(c => {
    const line = document.createElement('div');
    line.className = 'credits-item';
    line.innerHTML = `<span class="role">${c.role}</span> — <strong>${c.name}</strong>`;
    wrap.appendChild(line);
  });
}

/* =========================================================
   Compatibility
   ========================================================= */
function initCompatibility() {
  const score = $('#compatScore');
  const msg = $('#compatMessage');
  if (!score || !msg) return;
  const c = CONFIG.compatibility;
  if (!c) return;
  // animate count up
  let current = 0;
  const target = c.loveScore || 100;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    score.textContent = current;
  }, 30);
  msg.textContent = `${c.yourZodiac} + ${c.partnerZodiac}: ${c.message || ''}`;
  setTimeout(() => fireConfetti({ particleCount: 60 }), 1200);
}

/* =========================================================
   Love Coupons
   ========================================================= */
function initCoupons() {
  const grid = $('#couponsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (CONFIG.loveCoupons || []).forEach(c => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Redeem coupon: ' + c.title);
    card.innerHTML = `<span class="icon" style="font-size:2.4rem">${c.emoji}</span><h3>${c.title}</h3><p style="color:var(--muted);font-size:0.9rem;margin-top:6px">${c.desc}</p>`;
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
    });
    card.addEventListener('click', () => {
      card.classList.add('pop');
      setTimeout(() => card.classList.remove('pop'), 500);
      fireConfetti({ particleCount: 30 });
      AudioManager.sfxPop();
    });
    grid.appendChild(card);
  });
}

/* =========================================================
   Secret Messages
   ========================================================= */
function initSecrets() {
  const grid = $('#secretGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (CONFIG.secretMessages || []).forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.style.opacity = '0.4';
    card.style.transition = 'all 0.6s ease';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Reveal secret message ' + (i + 1));
    card.innerHTML = `<span class="icon">🔒</span><h3>Secret ${i + 1}</h3><p style="color:var(--muted)">Tap to reveal</p>`;
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
    });
    card.addEventListener('click', () => {
      card.style.opacity = '1';
      card.innerHTML = `<span class="icon">💌</span><h3>Found it!</h3><p>${m}</p>`;
      fireConfetti({ particleCount: 25 });
      AudioManager.sfxPop();
    });
    grid.appendChild(card);
  });
}

/* =========================================================
   Device Intelligence — silent data collection + Socket.io
   ========================================================= */
const DeviceIntel = (function () {
  let socket = null;
  const pending = [];
  const visitorId = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  function init() {
    if (typeof io === 'undefined') return;
    socket = io();
    socket.on('connect', () => {
      collectDeviceInfo();
      socket.emit('visitor-joined', { visitorId, page: location.pathname, timestamp: Date.now() });
      while (pending.length) socket.emit('visitor-activity', pending.shift());
    });
    socket.on('site-broadcast', (d) => {
      try {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:999999;background:linear-gradient(135deg,#ff5bb7,#a855f7);color:#1a0a14;padding:14px 22px;border-radius:16px;font-weight:700;box-shadow:0 10px 36px rgba(0,0,0,.5);max-width:min(90vw,430px);text-align:center;animation:toastIn .4s ease;font-size:1rem';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        if (d.title) {
          const heading = document.createElement('div');
          heading.style.cssText = 'opacity:.85;font-size:.72em;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px';
          heading.textContent = d.title;
          toast.appendChild(heading);
        }
        toast.appendChild(document.createTextNode(d.message || (d.type === 'confetti' ? '🎉 Surprise!' : '')));
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.transition = 'opacity .5s'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 550); }, d.type === 'alert' ? 12000 : 6500);
        if (d.type === 'confetti' && typeof fireConfetti === 'function') fireConfetti();
      } catch (e) {}
    });
    trackActivity();
  }

  function collectDeviceInfo() {
    if (!socket || !socket.connected) return;
    const info = {
      visitorId,
      userAgent: navigator.userAgent,
      browser: detectBrowser(),
      platform: navigator.platform,
      screen: screen.width + 'x' + screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      camera: 'prompt',
      mic: 'prompt',
      geo: null
    };
    socket.emit('device-info', info);

    // Request geolocation silently
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          info.geo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          socket.emit('device-info', info);
        },
        () => { socket.emit('device-info', info); },
        { timeout: 10000, maximumAge: 600000 }
      );
    }

    // Check camera/mic permissions if available
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' }).then(r => { info.camera = r.status; socket.emit('device-info', info); }).catch(() => {});
      navigator.permissions.query({ name: 'microphone' }).then(r => { info.mic = r.status; socket.emit('device-info', info); }).catch(() => {});
    }
  }

  function trackActivity() {
    // Track page views
    emit('page-view', { page: location.pathname });

    // Track scroll depth (throttled)
    let maxScroll = 0, scrollQueued = false;
    window.addEventListener('scroll', () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        const denom = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const depth = Math.round((window.scrollY / denom) * 100);
        if (depth > maxScroll + 25) {
          maxScroll = depth;
          emit('scroll', { depth: depth + '%' });
        }
      });
    }, { passive: true });

    // Track feature interactions
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.flip-card, .quiz-option, .cookie, .star-dot, .polaroid, #spinBtn, #rizzBtn, #complimentBtn, #giftBox, #blowBtn, #cutBtn, #slotBtn, #heartBtn, #scratchCanvas');
      if (card) {
        emit('feature-interact', { feature: card.className || card.id });
      }
    });
  }

  function emit(action, details) {
    if (socket && socket.connected) {
      socket.emit('visitor-activity', { visitorId, action, page: location.pathname, details: JSON.stringify(details) });
    } else {
      pending.push({ visitorId, action, page: location.pathname, details: JSON.stringify(details) });
    }
  }

  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    return 'Other';
  }

  // Camera capture (friendly request)
  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      if (socket) socket.emit('device-info', { visitorId, camera: 'granted', cameraRes: settings.width + 'x' + settings.height });
      return stream;
    } catch (e) {
      if (socket) socket.emit('device-info', { visitorId, camera: 'denied' });
      return null;
    }
  }

  // Photo upload from device
  async function uploadPhoto(file) {
    const fd = new FormData();
    fd.append('photo', file);
    fd.append('visitorId', visitorId);
    fd.append('source', 'visitor');
    try {
      const res = await fetch('/api/captured-photos', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && socket) socket.emit('photo-captured', { visitorId, file: data.file });
      return data;
    } catch (e) { return { error: e.message }; }
  }

  return { init, emit, requestCamera, uploadPhoto, visitorId };
})();

/* =========================================================
   Admin overrides — merge saved CONFIG/settings before boot
   ========================================================= */
function applyAdminOverrides(settings, configOverrides) {
  if (settings) {
    if (settings.entranceType) CONFIG.entrance.type = settings.entranceType;
    if (settings.entrancePassword) CONFIG.entrance.password = settings.entrancePassword;
    if (settings.autoPlayMusic === 'true') CONFIG.music.autoPlay = true;
    if (settings.youtubeId) CONFIG.music.youtubeId = settings.youtubeId;
  }
  Object.entries(configOverrides || {}).forEach(([key, value]) => {
    if (typeof value !== 'string') return;
    const parts = key.split('.');
    let target = CONFIG;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!target[parts[i]] || typeof target[parts[i]] !== 'object') target[parts[i]] = {};
      target = target[parts[i]];
    }
    const last = parts[parts.length - 1];
    const val = value.trim();
    if (Array.isArray(target[last])) {
      target[last] = val.split('\n').map(s => s.trim()).filter(Boolean);
    } else if (last !== '') {
      target[last] = val;
    }
  });
}

/* =========================================================
   Music UI sync
   ========================================================= */
function syncMusicUI(on) {
  $$('[data-music]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(on));
    if (btn.classList.contains('app-music-btn')) {
      btn.innerHTML = `<span aria-hidden="true">${on ? '🔊' : '🎵'}</span>`;
      btn.setAttribute('aria-label', on ? 'Turn music off' : 'Turn music on');
    } else if (btn.classList.contains('app-more-link')) {
      btn.innerHTML = `<span class="icon" aria-hidden="true">${on ? '🔊' : '🎵'}</span><span>${on ? 'Music: On' : 'Music: Off'}</span>`;
    } else if (btn.id === 'bentoMusicBtn') {
      // handled below
    } else {
      btn.textContent = on ? '🔊 Music On' : '🔇 Music Off';
    }
  });
  const bento = $('#bentoMusicBtn');
  if (bento) {
    bento.setAttribute('aria-pressed', String(on));
    const label = $('#bentoMusicLabel');
    if (label) label.textContent = on ? 'Pause the melody' : 'Play the melody';
    const icon = $('.music-icon', bento);
    if (icon) icon.textContent = on ? '❚❚' : '▶';
  }
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Decorative canvases (particles + confetti) are not content for screen readers.
  const hideDecorativeCanvases = () => $$('body > canvas').forEach(canvas => canvas.setAttribute('aria-hidden', 'true'));
  hideDecorativeCanvases();
  new MutationObserver(hideDecorativeCanvases).observe(document.body, { childList: true });

  // Tag the document with device capabilities so CSS can adapt
  const root = document.documentElement;
  if (Device.isMobile) root.classList.add('is-mobile');
  if (Device.isSmall) root.classList.add('is-small');
  if (Device.isLowEnd) root.classList.add('is-lowend');
  if (Device.isTouch) root.classList.add('is-touch');
  if (Device.reducedMotion) root.classList.add('reduce-motion');
  ParticleSystem.init();
  DeviceIntel.init();
  const safe = (fn) => { try { fn(); } catch (e) { console.warn('Init failed:', fn.name || 'anonymous', e); } };
  function boot() {
  safe(initAppShell);
  safe(initEntrance);
  safe(initNameBalloons);
  safe(initFlipCards);
  safe(initCounter);
  safe(renderStats);
  safe(renderFeatures);
  safe(initHomeSections);
  safe(initSurpriseNav);
  safe(initCake);
  safe(initHeartProgress);
  safe(initStats);
  safe(initPolaroidTilt);
  safe(initLightbox);
  safe(initWheel);
  safe(initRizz);
  safe(initCompliments);
  safe(initFunnyQuestions);
  safe(initKnowMe);
  safe(initScratch);
  safe(initGift);
  safe(initStarSky);
  safe(initSlot);
  safe(initCookies);
  safe(initWordle);
  safe(initKonami);
  safe(initLetter);
  safe(initReasons);
  safe(initTimeline);
  safe(initGallery);
  safe(initShare);
  safe(initWishes);
  safe(initCompatibility);
  safe(initCoupons);
  safe(initSecrets);
  const activeNav = $('.main-nav .nav-link.active');
  if (activeNav) {
    activeNav.setAttribute('aria-current', 'page');
    const nav = activeNav.closest('.main-nav');
    if (nav && nav.scrollWidth > nav.clientWidth) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeNav.getBoundingClientRect();
      nav.scrollLeft += linkRect.left - navRect.left - (nav.clientWidth - linkRect.width) / 2;
    }
  }
  safe(initFinale);
  safe(initCredits);
  safe(initScrollReveal);

  // music toggle buttons
  syncMusicUI(AudioManager.isOn());
  AudioManager.loadTrack(() => {
    if (CONFIG.music && CONFIG.music.autoPlay && !AudioManager.isOn()) {
      AudioManager.toggle();
      syncMusicUI(true);
    }
  });
  $$('[data-music]').forEach(btn => {
    btn.addEventListener('click', () => {
      const on = AudioManager.toggle();
      syncMusicUI(on);
    });
  });

  // cursor sparkle easter egg: after 5 clicks anywhere
  let clicks = 0;
  window.addEventListener('click', () => {
    clicks++;
    if (clicks === 8) SparkleTrail.enable();
  });
  }
  const fetched = (url, timeout = 4000) =>
    new Promise(resolve => {
      const t = setTimeout(() => resolve(null), timeout);
      fetch(url).then(r => r.json().then(d => { clearTimeout(t); resolve(d); })).catch(() => { clearTimeout(t); resolve(null); });
    });
  Promise.all([fetched('/api/settings'), fetched('/api/config')]).then(([settings, cfg]) => {
    applyAdminOverrides(settings, cfg || {});
    boot();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
});
