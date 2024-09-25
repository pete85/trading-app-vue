import './assets/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { createAuth0 } from '@auth0/auth0-vue';

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
app.mount('#app');
