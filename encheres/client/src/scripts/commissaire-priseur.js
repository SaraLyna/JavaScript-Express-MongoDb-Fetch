const socket = io();

socket.on('connection', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
});


function start() {
    const item = document.getElementById('objet').value;
    const initialPrice = document.getElementById('prix').value;
    socket.emit('startAuction', item, initialPrice);
}

function end() {
    socket.emit('endAuction');
}
