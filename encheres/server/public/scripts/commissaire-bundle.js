/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/scripts/commissaire-priseur.js ***!
  \********************************************/
document.addEventListener('DOMContentLoaded', function() {

    
    function setup() {
        document.getElementById('start-button').addEventListener('click', start);
        document.getElementById('end-button').addEventListener('click', end);
    }

    function start() {
        const item = document.getElementById('objet').value;
        const initialPrice = document.getElementById('prix').value;
        socket.emit('startAuction', item, initialPrice);
    }

    function end() {
        socket.emit('endAuction');
    }

    setup();



    const socket = io();
    socket.on('connected', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
        document.getElementById('commissaire-info').innerText = `Vous etes connecté en tant que commissaire-priseur`;
    });

    socket.on('auctioneerJoined', () => {
        console.log("le commissaire a rejoint les enchères");
        document.getElementById('commissaire-info').innerText = `Vous êtes le commissaire priseur n°1.`;
    });

    socket.on('auctionAlreadyInProgress', () => {
        console.log("Il y a déja un commissaire-priseur.");
        document.getElementById('commissaire-info').innerText = `Il y a déja un commissaire-priseur.`;
    });

    socket.on('auctionStarted', (item, initialPrice) => {
	console.log("initialisation du montant");
        document.getElementById('montant-actuel').innerText = `Montant actuel enchère : ${initialPrice}€`;
    });

    socket.on('auctionEnded', () => {
	console.log("fini");
        document.getElementById('montant-actuel').innerText = `Vente aux enchères terminée`;
    });

    socket.on('auctioneerLeft', () => {
	console.log("commissaire parti");
        document.getElementById('commissaire-info').innerText = `Le commissaire priseur a quitté la vente.`;
    });

    socket.on('bidReceived', (bidderId, amount) => {
	console.log("montant estimé");
        document.getElementById('montant-actuel').innerText = `Montant actuel estimé : ${initialPrice}€`;
    
    });

});

/******/ })()
;
//# sourceMappingURL=commissaire-bundle.js.map