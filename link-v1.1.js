function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadCSS('https://cdn.jsdelivr.net/gh/eswhik/test/link-v1.1.css');

function setCookie(name, value, minutes) {
    const d = new Date();
    d.setTime(d.getTime() + (minutes * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

const overlayLink = document.getElementById("overlay-link");
const floatingWindow = document.getElementById("floatingWindow");
const iframeContainer = document.getElementById("iframeContainer");
const btn = document.getElementById("btnDirectLink");

function cerrarVentanaFlotante() {
    overlayLink.style.display = "none";
    floatingWindow.style.display = "none";
    const data = JSON.parse(btn.getAttribute('data-link'));
    setCookie("scriptShown", "true", data.intervalMinutes);
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
    btn.innerHTML = data.wait.replace("{seconds}", countdown);

    const countdownInterval = setInterval(function() {
        if (countdown > 1) {
            countdown--;
            btn.innerHTML = data.wait.replace("{seconds}", countdown);
        } else {
            clearInterval(countdownInterval);
            btn.textContent = data.close;
            btn.classList.remove("disabled");
            btn.addEventListener("click", cerrarVentanaFlotante);
        }
    }, 1000);
}

window.onload = function() {
    if (!getCookie("scriptShown")) {
        abrirVentanaFlotante();
    }
    setInterval(function() {
        if (!getCookie("scriptShown")) {
            abrirVentanaFlotante();
        }
    }, 60000);
};
