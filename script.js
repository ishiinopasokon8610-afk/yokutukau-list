window.onload = function() {
    playPiRone();
    setTimeout(() => {
        speakMessage();
    }, 600);
};

// 本物のピンポーン♪というチャイム音
function playPiRone() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        
        // 1音目：「ピン」という高い音（短くスパッと鳴る）
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, ctx.currentTime); // 高い音
        gain1.gain.setValueAtTime(0.1, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.2);

        // 2音目：「ポーン」という低い音（少し長めに余韻を残す）
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(587.33, ctx.currentTime + 0.2); // 1音目より低い音
        gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.2);
        osc2.stop(ctx.currentTime + 0.7);
    } catch(e) {}
}

// 小さな声で読み上げる機能
function speakMessage() {
    if ('speechSynthesis' in window) {
        const uttr = new SpeechSynthesisUtterance("リンクを えらんでください");
        uttr.lang = "ja-JP";
        uttr.volume = 0.3; // 音量を小さめに設定
        speechSynthesis.speak(uttr);
    }
}