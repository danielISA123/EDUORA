<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
    <!-- Tambahkan Pusher JavaScript Client -->
    <script src="https://js.pusher.com/8.0.1/pusher.min.js"></script>
    <script>
        // Setup Pusher
        window.Pusher = Pusher;
        window.pusherConfig = {
            key: '{{ config("broadcasting.connections.pusher.key") }}',
            cluster: '{{ config("broadcasting.connections.pusher.options.cluster") }}',
            wsHost: '{{ config("broadcasting.connections.pusher.options.host") }}',
            wsPort: {{ config("broadcasting.connections.pusher.options.port") }},
            forceTLS: {{ config("broadcasting.connections.pusher.options.encrypted") ? 'true' : 'false' }},
        };
    </script>
</head>
<body>
    @inertia
</body>
</html>