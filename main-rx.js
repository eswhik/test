function loadRx(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadRx('https://cdn.jsdelivr.net/gh/eswhik/test/style-rx.css');

function generarCodigoRoblox() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const generarSeccionRoblox = () => Array.from({ length: 4 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');

    return `RI-${generarSeccionRoblox()}-${generarSeccionRoblox()}-${generarSeccionRoblox()}-${generarSeccionRoblox()}`;
}

function generarCodigosRoblox(n = 4) {
    return Array.from({ length: n }, generarCodigoRoblox);
}

function mostrarCodigosRoblox(codigos) {
    const container = document.getElementById('codigos-roblox');
    container.innerHTML = "";

    codigos.forEach(codigo => {
        const codigoDiv = document.createElement('div');
        codigoDiv.className = 'codigo-roblox';
        codigoDiv.textContent = codigo;
        container.appendChild(codigoDiv);
    });
}

function iniciarCuentaRegresivaRoblox(duracion, display, texto) {
    let timer = duracion, minutos, segundos;
    const intervalo = setInterval(() => {
        minutos = parseInt(timer / 60, 10);
        segundos = parseInt(timer % 60, 10);

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        display.textContent = texto.replace('${minutos}', minutos).replace('${segundos}', segundos);

        if (--timer < 0) {
            clearInterval(intervalo);
            const codigos = generarCodigosRoblox();
            localStorage.setItem('codigos-roblox', JSON.stringify(codigos));
            localStorage.setItem('timestamp-roblox', Date.now());
            mostrarCodigosRoblox(codigos);
            iniciarCuentaRegresivaRoblox(duracion, display, texto);
        }
    }, 1000);
}

function initRoblox() {
    const displayTimer = document.getElementById('timer-roblox');
    const texto = document.querySelector('.rcgd').getAttribute('data-txt-rx');
    let duracion = parseInt(displayTimer.getAttribute('data-timer')) * 60; // Convertir minutos a segundos
    const codigosGuardados = JSON.parse(localStorage.getItem('codigos-roblox'));
    const timestampGuardado = localStorage.getItem('timestamp-roblox');

    if (codigosGuardados && timestampGuardado) {
        const tiempoTranscurrido = (Date.now() - timestampGuardado) / 1000;
        if (tiempoTranscurrido < duracion) {
            mostrarCodigosRoblox(codigosGuardados);
            iniciarCuentaRegresivaRoblox(duracion - tiempoTranscurrido, displayTimer, texto);
        } else {
            const codigos = generarCodigosRoblox();
            localStorage.setItem('codigos-roblox', JSON.stringify(codigos));
            localStorage.setItem('timestamp-roblox', Date.now());
            mostrarCodigosRoblox(codigos);
            iniciarCuentaRegresivaRoblox(duracion, displayTimer, texto);
        }
    } else {
        const codigos = generarCodigosRoblox();
        localStorage.setItem('codigos-roblox', JSON.stringify(codigos));
        localStorage.setItem('timestamp-roblox', Date.now());
        mostrarCodigosRoblox(codigos);
        iniciarCuentaRegresivaRoblox(duracion, displayTimer, texto);
    }
}

initRoblox();
