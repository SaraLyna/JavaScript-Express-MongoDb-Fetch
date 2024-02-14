/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/scripts/encherisseur.js ***!
  \*************************************/
document.addEventListener('DOMContentLoaded', function() {
    let bidderId;
    let auctionInProgress = false;

    const socket = io();
    socket.emit('bidder');

    socket.on('connected', (socketId) => {
        bidderId = socketId;
        console.log("Connecté au serveur de sockets en tant qu'enchérisseur avec l'ID :", socketId);
        document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${socketId}`;
    });

    socket.on('joinBidder', () => {
        console.log("Un enchérisseur a rejoint les enchères");
        document.getElementById('welcome-span').innerText = `Vous pouvez commencer à enchérir.`;
    });

    socket.on('startBidder', () =>{
      console.log("Un enchérisseur est en attente.");
      document.getElementById('welcome-span').innerText = ` Une vente aux enchères est déjà en cours. Veuillez attendre qu'elle soit terminée.`;
      document.getElementById('time-remaining').innerText = 'en attente';
      document.getElementById('current-price').innerText = '-€';
      return;
    });

    socket.on('auctionStarted', (item, initialPrice) => {
        if (auctionInProgress) {
            console.log("Une vente a été commencée.");
            return;
        }
        auctionInProgress = true;
        console.log("Début de l'enchère pour l'objet :", item);
        document.getElementById('time-remaining').innerText = item;
        document.getElementById('current-price').innerText = initialPrice + '€';
        document.getElementById('bid-options').style.display = 'block';

        updateWelcomeSpan(item, initialPrice);
    });

    socket.on('bidReceived', (bidderId, amount) =>{
      const current = document.getElementById('current-price');
      let currentPriceValue = parseInt(current.innerText);
      currentPriceValue += parseInt(amount);
      current.innerText = currentPriceValue;

    });

    socket.on('winner', (bidderId,currentBid) => {
        console.log("vous etes le gagnant de l'enchere");
        const currentPriceElement = document.getElementById('current-price');
        currentBid = parseInt(currentPriceElement.innerText);
        document.getElementById('welcome-span').innerText = `Félicitations, vous l'avez emportée !! `;
        alert(`Félicitations, vous avez remporté l'enchère avec une offre de ${currentBid}€.`);
        const bidButtons = document.querySelectorAll('.bid-options button');
        bidButtons.forEach(button => {
            button.disabled = true;
        });
        document.getElementById('time-remaining').innerText = 'Vente aux enchères terminée';
        document.getElementById('current-price').innerText = '-';
    });




    socket.on('auctionEndedForBidders',() => {
        alert("La vente aux enchères est terminée. Vous ne pouvez plus soumettre d'offres.");
        document.getElementById('time-remaining').innerText = 'Vente aux enchères terminée';
        document.getElementById('current-price').innerText = '-';
        const bidButtons = document.querySelectorAll('.bid-options button');
        bidButtons.forEach(button => {
            button.disabled = true;
        });
        auctionInProgress = false;
        document.getElementById('welcome-span').innerText = "La vente aux enchères est terminée. Le gagnant est ${bidderId} avec une offre de ${currentBid}€.";
        //updateWelcomeSpan('Aucune enchère en cours', null);
    });

    socket.on('auctionEndedWithoutWinner', () => {
        document.getElementById('welcome-span').innerText = "La vente aux enchères est terminée sans gagnant.";
        alert("La vente aux enchères est terminée sans gagnant.");
        const bidButtons = document.querySelectorAll('.bid-options button');
        bidButtons.forEach(button => {
            button.disabled = true;
        });
    });




    socket.on('auctioneerLeft', (auctioneerId) => {
        document.getElementById('welcome-span').innerText = `Le commissaire priseur a quitté la vente.`;
        alert("Le commissaire priseur a quitté la vente. Les enchères sont annulées.");
        const bidButtons = document.querySelectorAll('.bid-options button');
        bidButtons.forEach(button => {
            button.disabled = true;
        });
    });


    socket.on('bidderLeft', () => {
        alert("Un enchérisseur a quitté la vente.");
    });





    function updateWelcomeSpan(item, price) {
        let message = 'En attente';
        let displayPrice = 'En attente';
        if (auctionInProgress && item && price !== null) {
            message = `Enchère en cours pour l'objet : ${item}`;
            displayPrice = `${price}€`;
        }
        document.getElementById('welcome-span').innerText = message;
        document.getElementById('current-price').innerText = displayPrice;
    }


    function setup() {
        const bidButtons = document.querySelectorAll('.bid-options button');

        bidButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.dataset.amount);
                const currentPriceElement = document.getElementById('current-price');
                const newPrice = amount + parseInt(currentPriceElement.innerText);
                currentPriceElement.innerText = `${newPrice}€`;
                placeBid( bidderId, amount);
            });
        });
    }

    function placeBid(bidderId, amount) {
        socket.emit('bid', bidderId, amount);
    }

    setup();
});

/******/ })()
;
//# sourceMappingURL=encherisseur-bundle.js.map