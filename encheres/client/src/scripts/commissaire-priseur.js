document.addEventListener('DOMContentLoaded', function() {
    function setup() {
        document.getElementById('start-button').addEventListener('click', startAuction);
        document.getElementById('end-button').addEventListener('click', endAuction);
    }

    function startAuction() {
        const item = document.getElementById('objet').value;
        const initialPrice = document.getElementById('prix').value;
        socket.emit('startAuction', item, initialPrice);
    }

    function endAuction() {
        socket.emit('endAuction');
    }

    setup();
});


const socket = io();

    socket.on('connected', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
        document.getElementById('commissaire-info').innerText = `Vous etes connecté en tant que commissaire-priseur`;
    });

    socket.on('auctioneerJoined', () => {
        document.getElementById('commissaire-info').innerText = "Vous êtes le commissaire priseur.";
    });

    socket.on('auctionAlreadyInProgress', () => {
        document.getElementById('commissaire-info').innerText = "Il y a déja un commissaire-priseur.";
    });

    socket.on('auctionStarted', (item, initialPrice) => {
        document.getElementById('montant-actuel').innerText = `Montant actuel enchère : ${initialPrice}€`;
    });

    socket.on('auctionEnded', () => {
        document.getElementById('montant-actuel').innerText = "Enchère terminée";
    });

    socket.on('auctioneerLeft', () => {
        document.getElementById('commissaire-info').innerText = "Le commissaire priseur a quitté la vente.";
    });

    // socket.on('bidReceived', (bidderId, amount) => {
    //
    // });
