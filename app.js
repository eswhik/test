function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadCSS('https://cdn.jsdelivr.net/gh/eswhik/test/app.css');

function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

loadScript('https://cdn.jsdelivr.net/npm/vue@3', function() {

    const App = {
        data() {
            return {
                isLoading: false,
                configServer: serverConfig,
                currentServer: '',
                iframeLoaded: false
            };
        },
        mounted() {
            const iconPlay = document.querySelector('.icon-play');
            const img = document.querySelector('.video-container img');

            iconPlay.addEventListener('click', this.loadFirstIframe);
            img.addEventListener('click', this.loadFirstIframe);
            this.cleanup = () => {
                iconPlay.removeEventListener('click', this.loadFirstIframe);
                img.removeEventListener('click', this.loadFirstIframe);
            };
        },
        beforeUnmount() {
            this.cleanup();
        },
        methods: {
            changeServer(url) {
                const iframe = this.$refs.iframe;
                const loaderContainer = this.$refs.loaderContainer;
                const iconPlay = document.querySelector('.icon-play');
                const img = document.querySelector('.video-container img');

                if (iframe.src !== url) {
                    this.isLoading = true;
                    loaderContainer.style.display = 'flex';
                    iframe.onload = () => {
                        loaderContainer.style.display = 'none';
                    };
                    iframe.src = url;
                    iconPlay.style.display = 'none';
                    img.style.display = 'none';
                }
            },
            loadFirstIframe() {
                if (!this.currentServer) {
                    this.currentServer = this.configServer[1].server;
                    this.changeServer(this.currentServer);
                }
            }
        },
        template: `
            <div id="app">
                <div class="video-container">
                    <svg class="icon-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="110" height="110" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;">
                        <g id="_01_align_center" data-name="01 align center">
                            <path d="M19.765,9.458,4.98.019v24l14.779-9.473a3.007,3.007,0,0,0,.006-5.088Zm-1.08,3.395-11.7,7.5V3.677l11.707,7.474a1,1,0,0,1-.007,1.7Z"></path>
                        </g>
                    </svg>
                    <img :src="configServer[0].imgServer" alt="Video Thumbnail">
                    <div class="loader-container" ref="loaderContainer" :style="{ display: isLoading ? 'flex' : 'none' }">
                        <div class="loader"></div>
                    </div>
                    <iframe ref="iframe" width="640" height="360" style="max-width: 100%; max-height: 100%;" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="sv-ct">
                    <div class="server-buttons">
                        <button v-for="server in configServer.slice(1)" :key="server.className" :class="['btnx', server.className.toLowerCase()]" @click="changeServer(server.server)">
                            <svg class="icon-play" style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18">
                                <path d="M22,1H10.037V4H8V1H6V4H3.963V1H2A2,2,0,0,0,0,3V5A2,2,0,0,0,2,7H22a2,2,0,0,0,2-2V3A2,2,0,0,0,22,1Z" style="fill: #f3f3f3;"></path>
                                <path d="M22,9H10.037v3H8V9H6v3H3.963V9H2a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V11A2,2,0,0,0,22,9Z" style="fill: #dfdfdf;"></path>
                                <path d="M22,17H10.037v3H8V17H6v3H3.963V17H2a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V19A2,2,0,0,0,22,17Z" style="fill: #b3b3b3;"></path>
                            </svg>
                            {{ server.className }}
                        </button>
                    </div>
                </div>
            </div>
        `
    };

    Vue.createApp(App).mount('#app');
});
