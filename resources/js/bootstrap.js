import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: window.pusherConfig.key,
    cluster: window.pusherConfig.cluster,
    wsHost: window.pusherConfig.wsHost,
    wsPort: window.pusherConfig.wsPort,
    forceTLS: window.pusherConfig.forceTLS,
});