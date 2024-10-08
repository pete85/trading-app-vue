import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createAuth0 } from '@auth0/auth0-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faArrowRightFromBracket, faArrowRightToBracket, faServer, faSprayCan, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faVuejs } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome);
library.add(faArrowRightFromBracket);
library.add(faArrowRightToBracket);
library.add(faGithub);
library.add(faServer);
library.add(faSprayCan);
library.add(faVuejs);
library.add(faChartLine);

const app = createApp(App);
app.use(
    createAuth0({
        domain: "dev-edl00i0avfmwjlgy.uk.auth0.com",
        clientId: "DB5iT4vVd7nZL5ckNJ04yIuPWKMFzLPz",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
