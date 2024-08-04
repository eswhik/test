function loadFf(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadFf('https://cdn.jsdelivr.net/gh/eswhik/test/style-ff.css');

function generarCodigoFreeFire() {
    const caracteres = '0123456789';
    const generarSeccionFreeFire = () => Array.from({ length: 3 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');

    return `${generarSeccionFreeFire()}${generarSeccionFreeFire()}${generarSeccionFreeFire()}${generarSeccionFreeFire()}`;
}

function generarCodigosFreeFire(n = 5) {
    return Array.from({ length: n }, generarCodigoFreeFire);
}

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto);
}

function mostrarCodigosFreeFire(codigos) {
    const container = document.getElementById('codigos-free-fire');
    container.innerHTML = "";

    codigos.forEach(codigo => {
        const codigoDiv = document.createElement('div');
        codigoDiv.className = 'codigo-free-fire';

        const imgFlag = document.createElement('img');
        imgFlag.src = 'https://i.ibb.co/q5BM9k5/ff.png';
        imgFlag.className = 'ff-icon';
        codigoDiv.appendChild(imgFlag);

        const codigoTexto = document.createElement('span');
        codigoTexto.textContent = codigo;
        codigoDiv.appendChild(codigoTexto);

        const imgCopy = document.createElement('img');
        imgCopy.src = 'https://i.ibb.co/GsV8QWh/copy.png';
        imgCopy.className = 'copy-ff';
        imgCopy.onclick = () => copiarAlPortapapeles(codigo);
        codigoDiv.appendChild(imgCopy);

        container.appendChild(codigoDiv);
    });
}

function iniciarCuentaRegresivaFreeFire(duracion, display, texto) {
    let timer = duracion, minutos, segundos;
    const intervalo = setInterval(() => {
        minutos = parseInt(timer / 60, 10);
        segundos = parseInt(timer % 60, 10);

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        display.textContent = texto.replace('${minutos}', minutos).replace('${segundos}', segundos);

        if (--timer < 0) {
            clearInterval(intervalo);
            const codigos = generarCodigosFreeFire();
            localStorage.setItem('codigos-free-fire', JSON.stringify(codigos));
            localStorage.setItem('timestamp-free-fire', Date.now());
            mostrarCodigosFreeFire(codigos);
            iniciarCuentaRegresivaFreeFire(duracion, display, texto);
        }
    }, 1000);
}

function initFreeFire() {
    const displayTimer = document.getElementById('timer-freefire');
    const texto = document.querySelector('.rcgd').getAttribute('data-txt-rx');
    let duracion = parseInt(displayTimer.getAttribute('data-timer')) * 60;
    const codigosGuardados = JSON.parse(localStorage.getItem('codigos-free-fire'));
    const timestampGuardado = localStorage.getItem('timestamp-free-fire');

    if (codigosGuardados && timestampGuardado) {
        const tiempoTranscurrido = (Date.now() - timestampGuardado) / 1000;
        if (tiempoTranscurrido < duracion) {
            mostrarCodigosFreeFire(codigosGuardados);
            iniciarCuentaRegresivaFreeFire(duracion - tiempoTranscurrido, displayTimer, texto);
        } else {
            const codigos = generarCodigosFreeFire();
            localStorage.setItem('codigos-free-fire', JSON.stringify(codigos));
            localStorage.setItem('timestamp-free-fire', Date.now());
            mostrarCodigosFreeFire(codigos);
            iniciarCuentaRegresivaFreeFire(duracion, displayTimer, texto);
        }
    } else {
        const codigos = generarCodigosFreeFire();
        localStorage.setItem('codigos-free-fire', JSON.stringify(codigos));
        localStorage.setItem('timestamp-free-fire', Date.now());
        mostrarCodigosFreeFire(codigos);
        iniciarCuentaRegresivaFreeFire(duracion, displayTimer, texto);
    }
}

initFreeFire()
