const textarea = document.querySelector("textarea");
const convertBtn = document.getElementById("convertBtn");
const stopBtn = document.getElementById("stopBtn");

let speechSynth = window.speechSynthesis;

convertBtn.addEventListener("click", () => {
    const text = textarea.value.trim();

    if (!text) {
        alert("Please enter some text to convert to speech.");
        return;
    }

    if (speechSynth.speaking) {
        alert("Speech is already in progress.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynth.speak(utterance);

    convertBtn.textContent = "Speaking...";
    convertBtn.disabled = true;
    stopBtn.disabled = false;

    utterance.onend = () => {
        convertBtn.textContent = "Convert to Speech";
        convertBtn.disabled = false;
        stopBtn.disabled = true;
    };
});

stopBtn.addEventListener("click", () => {
    if (speechSynth.speaking) {
        speechSynth.cancel();
        convertBtn.textContent = "Convert to Speech";
        convertBtn.disabled = false;
        stopBtn.disabled = true;
    }
});