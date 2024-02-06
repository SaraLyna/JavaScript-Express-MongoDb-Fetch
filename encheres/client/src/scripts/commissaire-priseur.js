const socket = io();

socket.on('connection', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
});


function startFunction() {
    alert("Bouton de démarrage cliqué !");
}

function commissaireFunction() {
    alert("Bouton du commissaire cliqué !");
}
