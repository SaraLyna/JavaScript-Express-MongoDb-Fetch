const socket = io();

socket.on('connection', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
});
