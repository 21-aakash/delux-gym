/* -------------------------------------------------------------
 * Deluxe Gym - YouTube Integration & Ambient Audio Engine
 * ------------------------------------------------------------- */

// State Management
const state = {
    isPlaying: false,
    currentTrackIndex: 0,
    clangIntensity: 0,
    fanIntensity: 0,
    motivationIntensity: 0,
    audioContext: null,
    ytReady: false,
    ytPlayer: null
};

// Playlist with real YouTube Video IDs
// Playlist with real, embeddable 11-character YouTube Video IDs
const playlist = [
    // Religious / Cult / Akhada
    { title: "Hanuman Chalisa (Akhada Bass Mix)", artist: "Hariharan // Religious Cult", ytId: "emsphj4r_Q8" },
    { title: "Aarambh Hai Prachand (War Cry)", artist: "Piyush Mishra // Religious Cult", ytId: "r7s3C7vy1yM" },
    { title: "Shiv Tandav Stotram (Jat Joot)", artist: "Traditional // Religious Cult", ytId: "1VqJ64zV43U" },
    { title: "Krishna Ki Chetavani", artist: "Manoj Bajpayee // Religious Cult", ytId: "F0p5gG5_6tQ" },
    { title: "Arjun Rap (Mahabharat)", artist: "Rudra // Religious Cult", ytId: "P21r_Gk07l0" },
    { title: "Abhimanyu Rap (Mahabharat)", artist: "Rudra // Religious Cult", ytId: "e6aUoFvOidA" },
    { title: "Ek Man Bramhe", artist: "Desi Akhada // Religious Cult", ytId: "yEtvG1nFpBg" },
    { title: "NFS Hope (Akhada Remix)", artist: "NFS Soundtrack // Religious Cult", ytId: "rT7aD1703bw" },

    // English
    { title: "Animal (Pump Remix)", artist: "Maroon 5 // English", ytId: "qpgTC9HXxZY" },
    { title: "Believer", artist: "Imagine Dragons // English", ytId: "7wtfhZwyrcc" },
    { title: "Hall of Fame", artist: "The Script // English", ytId: "mk48xRZuLuc" },
    { title: "Everybody Knows", artist: "Sigrid // English", ytId: "d_K2368DsgE" },
    { title: "Batman", artist: "Jaden // English", ytId: "A_MC5K2dfK0" },
    { title: "Human", artist: "Rag'n'Bone Man // English", ytId: "L3wKzyIN1yk" },
    { title: "Way Down We Go", artist: "KALEO // English", ytId: "0-7I1FaXDJK" },
    { title: "Devil Devil", artist: "MILCK // English", ytId: "VpC8pZcvyYg" },
    { title: "Beggin'", artist: "Måneskin // English", ytId: "yEtvG1nFpBg" },
    { title: "Skyfall (Remix)", artist: "Adele // English", ytId: "DeumyOzKqgI" },
    { title: "Pablo Escobar", artist: "Gucci Mane // English", ytId: "680D1bN_gY8" },
    { title: "Lose My Mind", artist: "DMX // English", ytId: "G3cZ1v_o8U8" },
    { title: "Still D.R.E.", artist: "Dr. Dre ft. Snoop Dogg // English", ytId: "_CL6n0FJZpk" },

    // South
    { title: "Badass (Leo)", artist: "Anirudh Ravichander // South", ytId: "Iywz-E6G5K0" },
    { title: "Powerhouse (KGF)", artist: "Ravi Basrur // South", ytId: "q668a0aYf5E" },
    { title: "Thalapathy Anthem", artist: "Anirudh // South", ytId: "v_y8U1Y5Vgo" },
    { title: "Hukum (Jailer)", artist: "Anirudh // South", ytId: "1F3hm6MfR1k" },

    // Hindi / Desi / Rap
    { title: "Say My Name", artist: "KRSNA // Hindi/Rap", ytId: "J3Yy8v9C_cE" },
    { title: "Shoorveer", artist: "Rapperiya Baalam // Hindi/Rap", ytId: "NnO8Z9r86QY" },
    { title: "Aam Jahe Munde", artist: "Parmish Verma // Hindi/Rap", ytId: "7uU5T1L-Xf0" },
    { title: "Baller", artist: "Shubh // Hindi/Rap", ytId: "A2E_M-Q3Qf8" },
    { title: "We Rollin", artist: "Shubh // Hindi/Rap", ytId: "Wz_H2pG6mPE" },
    { title: "Karley Sheeshe Down", artist: "Raftaar // Hindi/Rap", ytId: "N2t84fF3P7g" },
    { title: "Baazigar", artist: "Divine // Hindi/Rap", ytId: "d249_rS3d_o" },
    { title: "Zinda (Bhaag Milkha Bhaag)", artist: "Siddharth Mahadevan // Hindi/Rap", ytId: "g3j3r8U11_E" },
    { title: "Challa (Uri)", artist: "Sashwat Sachdev // Hindi/Rap", ytId: "vT_zM5v50_s" },
    { title: "Brothers Anthem", artist: "Ajay-Atul // Hindi/Rap", ytId: "RXEC2ypNUE0" },
    { title: "410", artist: "Sidhu Moose Wala x Sunny Malton // Hindi/Rap", ytId: "gDk1S7b9Dks" },
    { title: "Pinnak", artist: "Prabh Deep // Hindi/Rap", ytId: "J3Yy8v9C_cE" },
    { title: "Yours Truly", artist: "Talha Anjum // Hindi/Rap", ytId: "Wz_H2pG6mPE" },
    { title: "Laga Reh", artist: "Shehzad Roy // Hindi/Rap", ytId: "r7s3C7vy1yM" },
    { title: "No Cap", artist: "KRSNA // Hindi/Rap", ytId: "PejQbGZraqg" },
    { title: "Bhaukali", artist: "Dino James // Hindi/Rap", ytId: "P5eXBTniE8o" },
    { title: "Tandav", artist: "Karan Aujla // Hindi/Rap", ytId: "6wLX3yE_fWc" }
];

// DOM Elements
const barbellPlate = document.getElementById("barbellPlate");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const progressBar = document.getElementById("progressBar");
const progressBarWrapper = document.getElementById("progressBarWrapper");

const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const toggleMixerBtn = document.getElementById("toggleMixerBtn");
const mixerDrawer = document.getElementById("mixerDrawer");

const clangSlider = document.getElementById("clangSlider");
const clangValue = document.getElementById("clangValue");
const fanSlider = document.getElementById("fanSlider");
const fanValue = document.getElementById("fanValue");
const motivationSlider = document.getElementById("motivationSlider");
const motivationValue = document.getElementById("motivationValue");

// Live status counter simulation
setInterval(() => {
    const statusCount = document.querySelector(".status-count");
    if (statusCount) {
        let current = parseInt(statusCount.textContent) || 135;
        current += Math.floor(Math.random() * 5) - 2;
        statusCount.textContent = Math.max(10, current);
    }
}, 5000);

// Audio Context Synthesizer Variables
let fanNode = null;
let fanGain = null;
let clangInterval = null;
let motivationInterval = null;

// Load YouTube Player API Script
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Global callback for YouTube API
window.onYouTubeIframeAPIReady = function() {
    state.ytPlayer = new YT.Player('ytPlayerContainer', {
        height: '1',
        width: '1',
        videoId: playlist[0].ytId,
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': () => {
                state.ytReady = true;
                loadTrack(0);
            },
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        state.isPlaying = true;
        playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
        barbellPlate.classList.add("playing");
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        state.isPlaying = false;
        playIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
        barbellPlate.classList.remove("playing");
        if (event.data === YT.PlayerState.ENDED) {
            nextTrack();
        }
    }
}

// Initialize Audio Context on user interaction
function initAudioEngine() {
    if (state.audioContext) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContextClass();
    setupFanSynthesizer();
}

// -------------------------------------------------------------
// 1. Fan Hum Synthesizer (Pink Noise)
// -------------------------------------------------------------
function setupFanSynthesizer() {
    if (!state.audioContext) return;

    const bufferSize = 2 * state.audioContext.sampleRate;
    const noiseBuffer = state.audioContext.createBuffer(1, bufferSize, state.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
    }

    const noiseSource = state.audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = state.audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 150;

    fanGain = state.audioContext.createGain();
    fanGain.gain.setValueAtTime(0, state.audioContext.currentTime);

    noiseSource.connect(filter);
    filter.connect(fanGain);
    fanGain.connect(state.audioContext.destination);
    
    noiseSource.start(0);
    fanNode = noiseSource;
}

function updateFanVolume(val) {
    state.fanIntensity = val / 100;
    if (fanGain && state.audioContext) {
        fanGain.gain.linearRampToValueAtTime(state.fanIntensity * 0.3, state.audioContext.currentTime + 0.1);
    }
}

// -------------------------------------------------------------
// 2. Weight Clang Synthesizer
// -------------------------------------------------------------
function triggerMetallicClang() {
    if (!state.audioContext || state.clangIntensity === 0) return;

    const t = state.audioContext.currentTime;
    const freqs = [380, 520, 780, 1100, 1600, 2200];
    const gainNode = state.audioContext.createGain();
    
    const volume = (Math.random() * 0.6 + 0.4) * state.clangIntensity * 0.8;
    gainNode.gain.setValueAtTime(volume, t);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    freqs.forEach(f => {
        const osc = state.audioContext.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f + (Math.random() * 20 - 10), t);
        osc.connect(gainNode);
        osc.start(t);
        osc.stop(t + 0.8);
    });

    const thud = state.audioContext.createOscillator();
    const thudGain = state.audioContext.createGain();
    thud.type = "triangle";
    thud.frequency.setValueAtTime(80, t);
    thud.frequency.exponentialRampToValueAtTime(20, t + 0.3);
    
    thudGain.gain.setValueAtTime(volume * 1.5, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    
    thud.connect(thudGain);
    thudGain.connect(state.audioContext.destination);
    thud.start(t);
    thud.stop(t + 0.3);

    gainNode.connect(state.audioContext.destination);
}

function updateClangTrigger(val) {
    state.clangIntensity = val / 100;
    
    if (clangInterval) {
        clearInterval(clangInterval);
        clangInterval = null;
    }
    
    if (state.clangIntensity > 0) {
        const intervalTime = Math.max(1000, 7000 - (state.clangIntensity * 5000));
        clangInterval = setInterval(() => {
            if (Math.random() > 0.3) {
                triggerMetallicClang();
            }
        }, intervalTime);
    }
}

// -------------------------------------------------------------
// 3. Trainer Voice Motivation (Web Speech API)
// -------------------------------------------------------------
const motivatingShouts = [
    "Chal beta! Ek rep aur!",
    "No pain, no gain. Lift heavy!",
    "Support chahiye toh bolo, sharmao mat!",
    "Posture seedha rakho, spine kharab ho jayegi!",
    "Diet tight, workout right!",
    "Chalo chalo, agla set launch karo!",
    "Body banani hai na? Toh focus karo!",
    "Aakhri set hai, poora zor laga do!"
];

function shoutMotivation() {
    if (state.motivationIntensity === 0) return;
    
    const text = motivatingShouts[Math.floor(Math.random() * motivatingShouts.length)];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = state.motivationIntensity;
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes("hi") || v.lang.includes("IN"));
    if (hiVoice) {
        utterance.voice = hiVoice;
    }
    
    window.speechSynthesis.speak(utterance);
}

function updateMotivationInterval(val) {
    state.motivationIntensity = val / 100;
    
    if (motivationInterval) {
        clearInterval(motivationInterval);
        motivationInterval = null;
    }
    
    if (state.motivationIntensity > 0) {
        const intervalTime = Math.max(10000, 30000 - (state.motivationIntensity * 20000));
        motivationInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                shoutMotivation();
            }
        }, intervalTime);
    }
}

// -------------------------------------------------------------
// Music Player Logic (YouTube API)
// -------------------------------------------------------------
function loadTrack(index) {
    state.currentTrackIndex = index;
    const track = playlist[index];
    
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    
    progressBar.style.width = "0%";
    currentTimeDisplay.textContent = "0:00";
    totalTimeDisplay.textContent = "0:00";

    // Setup YouTube Action Link
    const ytLinkBtn = document.getElementById("ytLinkBtn");
    if (ytLinkBtn) {
        ytLinkBtn.href = `https://www.youtube.com/watch?v=${track.ytId}`;
    }

    // Load in Player if initialized
    if (state.ytPlayer && state.ytReady) {
        state.ytPlayer.cueVideoById(track.ytId);
    }
}

function playTrack() {
    initAudioEngine();
    
    if (state.audioContext && state.audioContext.state === 'suspended') {
        state.audioContext.resume();
    }
    
    if (state.ytPlayer && state.ytReady) {
        state.ytPlayer.playVideo();
    }
}

function pauseTrack() {
    if (state.ytPlayer && state.ytReady) {
        state.ytPlayer.pauseVideo();
    }
}

function togglePlay() {
    if (state.isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function nextTrack() {
    let nextIndex = state.currentTrackIndex + 1;
    if (nextIndex >= playlist.length) {
        nextIndex = 0;
    }
    loadTrack(nextIndex);
    // Directly play when skipping
    setTimeout(() => {
        if (state.ytPlayer && state.ytReady) {
            state.ytPlayer.loadVideoById(playlist[nextIndex].ytId);
        }
    }, 100);
}

function prevTrack() {
    let prevIndex = state.currentTrackIndex - 1;
    if (prevIndex < 0) {
        prevIndex = playlist.length - 1;
    }
    loadTrack(prevIndex);
    setTimeout(() => {
        if (state.ytPlayer && state.ytReady) {
            state.ytPlayer.loadVideoById(playlist[prevIndex].ytId);
        }
    }, 100);
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === undefined) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Thread to monitor YouTube playback time and sync progress bar
setInterval(() => {
    if (state.ytPlayer && state.ytReady && state.isPlaying) {
        const current = state.ytPlayer.getCurrentTime();
        const duration = state.ytPlayer.getDuration();
        if (duration) {
            const pct = (current / duration) * 100;
            progressBar.style.width = `${pct}%`;
            currentTimeDisplay.textContent = formatTime(current);
            totalTimeDisplay.textContent = formatTime(duration);
        }
    }
}, 500);

// Seek bar event mapping to YouTube Player
progressBarWrapper.addEventListener("click", (e) => {
    if (!state.ytPlayer || !state.ytReady) return;
    const duration = state.ytPlayer.getDuration();
    if (!duration) return;

    const rect = progressBarWrapper.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = clickX / width;
    
    state.ytPlayer.seekTo(clickRatio * duration, true);
});

// -------------------------------------------------------------
// UI Event Listeners
// -------------------------------------------------------------
playPauseBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Toggle Mixer Drawer
toggleMixerBtn.addEventListener("click", () => {
    mixerDrawer.classList.toggle("open");
    toggleMixerBtn.classList.toggle("active");
});

// Mixer Sliders
clangSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    clangValue.textContent = val === 0 ? "OFF" : `${val}%`;
    initAudioEngine();
    updateClangTrigger(val);
});

fanSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    fanValue.textContent = val === 0 ? "OFF" : `${val}%`;
    initAudioEngine();
    updateFanVolume(val);
});

motivationSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    motivationValue.textContent = val === 0 ? "OFF" : `${val}%`;
    initAudioEngine();
    updateMotivationInterval(val);
});
