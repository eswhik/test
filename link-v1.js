function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadCSS('https://cdn.jsdelivr.net/gh/eswhik/test/link-v1.css');

const overlayLink = document.getElementById("overlay-link");
const floatingWindow = document.getElementById("floatingWindow");
const iframeContainer = document.getElementById("iframeContainer");
const btn = document.getElementById("btnDirectLink");
const countdownSpan = document.getElementById("countdown");

function cerrarVentanaFlotante() {
    overlayLink.style.display = "none";
    floatingWindow.style.display = "none";
}

function abrirVentanaFlotante() {
    overlayLink.style.display = "block";
    floatingWindow.style.display = "block";

    const iframeSrc = iframeContainer.getAttribute('data-src');

    const iframe = document.createElement("iframe");
    iframe.src = iframeSrc;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = "0";
    iframeContainer.innerHTML = '';
    iframeContainer.appendChild(iframe);

    const data = JSON.parse(btn.getAttribute('data-link'));

    let countdown = data.countdown;
    countdownSpan.textContent = countdown;

    const countdownInterval = setInterval(function() {
        if (countdown > 0) {
            countdown--;
            countdownSpan.textContent = countdown;
        } else {
            clearInterval(countdownInterval);
            btn.textContent = data.close;
            btn.classList.remove("disabled");
            btn.addEventListener("click", cerrarVentanaFlotante);
        }
    }, 1000);
}

window.onload = function() {
    abrirVentanaFlotante();
    setInterval(abrirVentanaFlotante, 60000);
};
