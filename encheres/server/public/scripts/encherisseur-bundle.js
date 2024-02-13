/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/scripts/encherisseur.js ***!
  \*************************************/
document.addEventListener('DOMContentLoaded', function() {
    const socket = io();
    let bidderId;
    let auctionInProgress = false;


    socket.emit('bidder');

    socket.on('connected', (socketId) => {
        bidderId = socketId;
        console.log("Connecté au serveur de sockets en tant qu'enchérisseur avec l'ID :", socketId);
        document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${socketId}`;
    });

    socket.on('joinBidder', () => {
        console.log("Un enchérisseur a rejoint les enchères");
        document.getElementById('welcome-span').innerText = `Vous pouvez commencer à enchérir`;
    });

    socket.on('auctionStarted', (item, initialPrice) => {
        console.log("Début de l'enchère pour l'objet :", item);
        document.getElementById('time-remaining').innerText = 'En cours';
        document.getElementById('current-price').innerText = initialPrice + '€';
        document.getElementById('bid-options').style.display = 'block';

        auctionInProgress = true;
        updateWelcomeSpan(item, initialPrice);
    });

    socket.on('bidReceived', (bidderId, amount) => {
        const currentPrice = parseInt(document.getElementById('current-price').innerText);
        const newPrice = currentPrice + amount;
        document.getElementById('current-price').innerText = `${newPrice}€`;
        console.log(`Montant actuel estimé : ${newPrice}€ par ${bidderId}`);
        updateWelcomeSpan(null, newPrice);
    });

    socket.on('auctionEnded', () => {
        console.log('Reçu : auctionEnded');
        document.getElementById('time-remaining').innerText = 'Vente aux enchères terminée';
        alarm('les enchères sont terminées.');
        auctionInProgress = false;
        updateWelcomeSpan('Aucune enchère en cours', null);
    });

    socket.on('bidderLeft', () => {
        alert("Un enchérisseur a quitté la vente.");
    });


    function updateWelcomeSpan(item, price) {
        let message = 'Aucune enchère en cours';
        if (auctionInProgress && item && price !== null) {
            message = `Enchère en cours pour l'objet : ${item}`;
        }
        document.getElementById('welcome-span').innerText = message;
    }  


    function setup() {
        const bidButtons = document.querySelectorAll('.bid-options button');

        bidButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.dataset.amount);
                placeBid(socket, bidderId, amount);
            });
        });
    }

    function placeBid(socket, bidderId, amount) {
        socket.emit('bid', bidderId, amount);

        socket.on('bidConfirmed', () => {
            const currentPrice = parseInt(document.getElementById('current-price').innerText);
            const newPrice = currentPrice + amount;
            document.getElementById('current-price').innerText = `${newPrice}€`;
            document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${bidderId}, Prix actuel : ${newPrice}€`;
        });
    }

    setup();
});

/******/ })()
;
//# sourceMappingURL=encherisseur-bundle.js.map