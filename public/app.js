const soundBtn = document.getElementById('soundBtn');
const visitorForm = document.getElementById('visitorForm');
const statusMessage = document.getElementById('statusMessage');
const deviceInfo = document.getElementById('deviceInfo');
const photoInput = document.getElementById('photoInput');
const cameraBtn = document.getElementById('cameraBtn');
const captureBtn = document.getElementById('captureBtn');
const cameraPreview = document.getElementById('cameraPreview');
const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');

let stream = null;
let mediaRecorder = null;
let userLocation = { latitude: null, longitude: null, country: '', city: '' };

function getDeviceInfo() {
  const info = {
    platform: navigator.platform || 'Unknown',
    browser: navigator.userAgent || 'Unknown',
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'Unknown',
    userAgent: navigator.userAgent || 'Unknown',
    ip: 'Client IP via backend request'
  };

  const entries = [
    ['Platform', info.platform],
    ['Browser', info.browser],
    ['Screen', info.screen],
    ['Language', info.language],
    ['User Agent', info.userAgent]
  ];

  deviceInfo.innerHTML = entries
    .map(([label, value]) => `<div class="device-item"><strong>${label}</strong><span>${value}</span></div>`)
    .join('');

  return info;
}

async function getLocation() {
  if (!navigator.geolocation) {
    return userLocation;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          country: '',
          city: ''
        };
        resolve(userLocation);
      },
      () => resolve(userLocation),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? '#ffd1d1' : '#fff2b8';
}

function playBirthdayTune() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const audioCtx = new AudioCtx();
  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];

  notes.forEach((note, index) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.value = note;

    gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime + index * 0.18);
    gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + index * 0.18 + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + index * 0.18 + 0.36);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(audioCtx.currentTime + index * 0.18);
    oscillator.stop(audioCtx.currentTime + index * 0.18 + 0.36);
  });
}

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    playBirthdayTune();
  });
}

if (visitorForm) {
  visitorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const device = getDeviceInfo();
    await getLocation();

    const payload = {
      name: document.getElementById('nameInput').value.trim(),
      email: document.getElementById('emailInput').value.trim(),
      note: document.getElementById('noteInput').value.trim(),
      userAgent: device.userAgent,
      browser: device.browser,
      platform: device.platform,
      screen: device.screen,
      language: device.language,
      ip: '',
      location: {
        country: userLocation.country,
        city: userLocation.city,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }
    };

    try {
      const response = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save visitor');

      showStatus('Details saved successfully.');
      visitorForm.reset();
    } catch (error) {
      showStatus(error.message || 'Unable to save details.', true);
    }
  });
}

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Camera access is not supported on this device/browser.');
    return;
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    cameraPreview.srcObject = stream;
    cameraPreview.style.display = 'block';
    captureBtn.classList.remove('hidden');
  } catch (error) {
    alert('Camera permission denied or unavailable.');
  }
}

if (cameraBtn) {
  cameraBtn.addEventListener('click', startCamera);
}

if (captureBtn) {
  captureBtn.addEventListener('click', async () => {
    if (!cameraPreview.srcObject) return;

    const video = cameraPreview;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('latitude', userLocation.latitude ?? '');
      formData.append('longitude', userLocation.longitude ?? '');
      formData.append('deviceInfo', JSON.stringify(getDeviceInfo()));

      try {
        const response = await fetch('/api/photo', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to save photo.');

        alert('Photo saved successfully!');
      } catch (error) {
        alert(error.message || 'Unable to save photo.');
      }
    }, 'image/png');
  });
}

if (photoInput) {
  photoInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('latitude', userLocation.latitude ?? '');
    formData.append('longitude', userLocation.longitude ?? '');
    formData.append('deviceInfo', JSON.stringify(getDeviceInfo()));

    try {
      const response = await fetch('/api/photo', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to upload photo.');
      alert('Photo uploaded successfully!');
    } catch (error) {
      alert(error.message || 'Unable to upload photo.');
    }
  });
}

getDeviceInfo();
getLocation();
