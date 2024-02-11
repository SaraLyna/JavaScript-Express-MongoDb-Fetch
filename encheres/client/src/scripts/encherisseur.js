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
	console.log("encherisseur");
        document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${socket.id}`;
    });

    socket.on('auctionStarted', (item, initialPrice) => {
	console.log("debut");
        document.getElementById('time-remaining').innerText = `En cours`;
        document.getElementById('current-price').innerText = initialPrice + `€`;
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


