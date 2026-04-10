/* ============================================
   Chilicuil · abue ep
   js/player.js
   ============================================ */

/* ── Tracks ──
   Para agregar o cambiar una canción edita este arreglo.
   - name: nombre que aparece en la UI
   - sub:  subtítulo debajo del nombre
   - file: ruta al archivo de audio (relativa a index.html)
            Deja file: "" si la canción aún no está lista.
   ─────────────────────────────────────────── */
const tracks = [
  {
    name: 'madoka',
    sub:  'primer sencillo',
    file: 'audio/MIXBUSS_C_02.mp3',
  },
  {
    name: 'abue',
    sub:  'segundo lanzamiento',
    file: 'audio/ABUE-CHILICUIL-REC_ROUGH.mp3',
  },
  {
    name: 'sofá',
    sub:  'tercer lanzamiento',
    file: '',
  },
];

/* ── DOM references ── */
const audio        = document.getElementById('audioPlayer');
const fill         = document.getElementById('progressFill');
const nowPlaying   = document.getElementById('nowPlaying');
const timeCurrent  = document.getElementById('timeCurrent');
const timeDuration = document.getElementById('timeDuration');
const progressBar  = document.getElementById('progressBar');
const list         = document.getElementById('trackList');

let activeIdx = null;
const trackEls = [];

/* ── Helpers ── */
function formatTime(s) {
  if (isNaN(s) || s < 0) return '0:00';
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function deactivateAll() {
  trackEls.forEach(el => {
    el.classList.remove('active');
    el.querySelector('.play-icon').innerHTML = '&#9654;';
  });
}

/* ── Build track list ── */
tracks.forEach((t, i) => {
  const div = document.createElement('div');
  div.className = 'track';
  div.innerHTML = `
    <span class="track-num">${i + 1}</span>
    <div class="play-icon" id="icon-${i}">&#9654;</div>
    <div class="track-info">
      <div class="track-name">${t.name}</div>
      <div class="track-sub">${t.sub}</div>
    </div>
    <span class="track-time" id="dur-${i}">—</span>
  `;
  div.addEventListener('click', () => toggleTrack(i, div));
  list.appendChild(div);
  trackEls.push(div);
});

/* ── Player logic ── */
function toggleTrack(idx, el) {
  // Mismo track: pausar / reanudar
  if (activeIdx === idx) {
    if (audio.paused) {
      audio.play();
      el.querySelector('.play-icon').innerHTML = '&#9646;&#9646;';
    } else {
      audio.pause();
      el.querySelector('.play-icon').innerHTML = '&#9654;';
    }
    return;
  }

  // Nuevo track
  deactivateAll();
  activeIdx = idx;
  el.classList.add('active');
  el.querySelector('.play-icon').innerHTML = '&#9646;&#9646;';
  nowPlaying.innerHTML = `reproduciendo · <span>${tracks[idx].name}</span>`;

  if (tracks[idx].file) {
    audio.src = tracks[idx].file;
    audio.play();
  } else {
    audio.src = '';
    nowPlaying.innerHTML = `próximamente · <span>${tracks[idx].name}</span>`;
  }
}

/* ── Audio events ── */
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  fill.style.width   = `${(audio.currentTime / audio.duration) * 100}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeDuration.textContent = formatTime(audio.duration);
  if (activeIdx !== null) {
    document.getElementById(`dur-${activeIdx}`).textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('ended', () => {
  deactivateAll();
  activeIdx = null;
  fill.style.width        = '0%';
  timeCurrent.textContent = '0:00';
  nowPlaying.innerHTML    = '— selecciona una canción —';
});

/* ── Seek on click ── */
progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});
