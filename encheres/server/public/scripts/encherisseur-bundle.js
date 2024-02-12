/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/scripts/encherisseur.js ***!
  \*************************************/
document.addEventListener('DOMContentLoaded', function() {

    function setup() {
        const bidButtons = document.querySelectorAll('.bid-options');

        bidButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.dataset.amount);
                placeBid(amount);
              });
          });
       }

    function placeBid(amount) {
        socket.emit('bid', socket.id, amount);
    }

    setup();
});    

const socket = io();

socket.on('connected', () => {
	console.log("Connecté au serveur de sockets en tant qu'enchérisseur");
    document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${socket.id}`;
});

socket.on('auctionStarted', (item, initialPrice) => {
	console.log("debut");
    document.getElementById('time-remaining').innerText = `En cours`;
    document.getElementById('current-price').innerText = initialPrice + `€`;
    document.getElementById('bid-options').style.display = 'block';
});

socket.on('bidReceived', (bidderId, amount) => {
    console.log('Reçu : bidReceived', bidderId, amount);
    document.getElementById('current-price').innerText = amount + `€`;
});

socket.on('auctionEnded', () => {
    console.log('Reçu : auctionEnded');
    document.getElementById('time-remaining').innerText = `Vente aux enchères terminée`;
});

socket.on('bidderLeft', () => {
    alert("Un enchérisseur a quitté la vente.");
});



/******/ })()
;
//# sourceMappingURL=encherisseur-bundle.js.map