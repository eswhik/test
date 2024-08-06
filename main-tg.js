function loadFf(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadFf('https://cdn.jsdelivr.net/gh/eswhik/test/style-tg.css');

function loadJsBarcode(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true
    document.head.appendChild(script);
}

loadJsBarcode('https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js');

const openFormBtn = document.getElementById('openForm');
const formContainer = document.getElementById('formContainer');
const cancelButton = document.getElementById('cancelButton');
const submitButton = document.getElementById('submitButton');
const barcode = document.getElementById('barcode');
const textInput = document.getElementById('textInput');
const timeRemaining = document.getElementById('timeRemaining');
const dmDiv = document.querySelector('.dm');

const STORAGE_KEY = 'lastGenerationTime';
const NUMBER_KEY = 'generatedNumber';
const FF_CODE = parseInt(dmDiv.getAttribute('data-ff-code')) || 60;
const ONE_HOUR = FF_CODE * 60000;
const TIME_LEFT_TEXT = dmDiv.getAttribute('data-ff-txf') || 'Espere {minutes}min {seconds}seg';

function generateRandomCode(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function updateBarcode() {
    const code = generateRandomCode(10);
    JsBarcode(barcode, code, {
        format: "CODE39",
        displayValue: true,
        width: 2,
        height: 40,
        fontSize: 14
    });
}

function formatTimeLeft(minutes, seconds) {
    return TIME_LEFT_TEXT.replace('{minutes}', minutes).replace('{seconds}', seconds);
}

function updateUI() {
    const currentTime = Date.now();
    const lastGenerationTime = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    const timeLeft = Math.max(0, ONE_HOUR - (currentTime - lastGenerationTime));

    if (timeLeft === 0) {
        submitButton.style.display = 'block';
        cancelButton.style.display = 'none';
        timeRemaining.textContent = '';
        clearInterval(timerInterval);
    } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        timeRemaining.textContent = formatTimeLeft(minutes, seconds);
        submitButton.style.display = 'none';
        cancelButton.style.display = 'block';
    }
}

function handleGenerateClick() {
    const currentTime = Date.now();
    const lastGenerationTime = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;

    if (currentTime - lastGenerationTime >= ONE_HOUR) {
        const randomNumber = generateRandomCode(16);
        textInput.textContent = randomNumber;
        localStorage.setItem(STORAGE_KEY, currentTime);
        localStorage.setItem(NUMBER_KEY, randomNumber);
        submitButton.style.display = 'none';
        cancelButton.style.display = 'block';
        updateUI();
    }
}

function startTimer() {
    timerInterval = setInterval(updateUI, 1000);
}

function initialize() {
    const storedNumber = localStorage.getItem(NUMBER_KEY);
    if (storedNumber) {
        textInput.textContent = storedNumber;
    }

    const currentTime = Date.now();
    const lastGenerationTime = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    const timeLeft = Math.max(0, ONE_HOUR - (currentTime - lastGenerationTime));

    if (timeLeft === 0) {
        submitButton.style.display = 'block';
        cancelButton.style.display = 'none';
        timeRemaining.textContent = '';
    } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        timeRemaining.textContent = formatTimeLeft(minutes, seconds);
        submitButton.style.display = 'none';
        cancelButton.style.display = 'block';
        startTimer();
    }
}

openFormBtn.addEventListener('click', () => {
    openFormBtn.style.display = 'none';
    formContainer.style.display = 'flex';
    updateBarcode();
    initialize();
});

submitButton.addEventListener('click', handleGenerateClick);
