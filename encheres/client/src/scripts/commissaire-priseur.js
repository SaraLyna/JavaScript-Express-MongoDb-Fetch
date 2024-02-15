document.addEventListener('DOMContentLoaded', () => {
    let highestBid = 0;
    let winningBidder = null;
    let auctionInProgress = false;


    document.getElementById('start-button').addEventListener('click', () => start());
    document.getElementById('end-button').addEventListener('click', () => end());


    const socket = io();
    socket.emit('auctioneer');



    function start() {
        if (auctionInProgress) {
            alert("Il y a déjà une vente aux enchères en cours. Attendez qu'elle soit terminée.");
            return;
        }
        const item = document.getElementById('objet').value.trim();
        const initialPrice = document.getElementById('prix').value.trim();
        if (item !== '' && initialPrice !== '') {
            socket.emit('startAuction', item, initialPrice);
            auctionInProgress = true;
        } else {
            alert("Veuillez spécifier un objet et un prix avant de démarrer l'enchère.");
        }
    }

    function end() {
        socket.emit('endAuction');
        auctionInProgress = false;
        //alert("Vente aux enchères terminée !");
    }



    socket.on('connected', () => {
        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');
        document.getElementById('commissaire-info').innerText = `Vous êtes connecté en tant que commissaire-priseur`;
    });

    socket.on('auctioneerJoined', () => {
        console.log("Le commissaire a rejoint les enchères");
        document.getElementById('commissaire-info').innerText = `Vous êtes le commissaire priseur n°1.`;
    });

    socket.on('auctionAlreadyInProgress', () => {
        alert("Il y a déjà un commissaire-priseur.");
        document.getElementById('commissaire-info').innerText = `Il y a déjà un commissaire-priseur.`;
        const encheresForm = document.getElementById('enchere-form');
        if (encheresForm) {
            encheresForm.remove();
        }
    });

    socket.on('auctionStarted', (item, initialPrice) => {
        document.getElementById('montant-actuel').innerText = `Montant actuel enchère : ${initialPrice} €`;
    });

    socket.on('bidReceived', (bidderId, amount) => {
        const currentPriceElement = document.getElementById('montant-actuel');
        const currentPriceText = currentPriceElement.innerText.replace('Montant actuel enchère : ', '');
        const currentPrice = parseInt(currentPriceText);
        const newPrice = currentPrice + amount;
        currentPriceElement.innerText = `Montant actuel enchère : ${newPrice}€`;
        document.getElementById('commissaire-info').innerText = `Offre confirmée : ${amount}€ de la part de ${bidderId}.`;
    });

    socket.on('winner', (bidderId, currentBid) => {
        const currentPriceElement = document.getElementById('montant-actuel');
        currentBid = parseInt(currentPriceElement.innerText);
        document.getElementById('commissaire-info').innerText ="Le gagnant de l'enchère est ${bidderId} avec une offre de ${currentBid}€.";
        //alert(`Le gagnant de l'enchère est ${bidderId} avec une offre de ${currentBid}€.`);
    });


    socket.on('auctionEndedForBidders', () => {
        alert("Les enchères sont terminées.");
        auctionInProgress = false;
        document.getElementById('commissaire-info').innerText = 'Vente terminée';
        const encheresForm = document.getElementById('enchere-form');
        if (encheresForm) {
            encheresForm.remove();
        }
    });
    socket.on('auctionEndedWithoutWinner', () => {
        document.getElementById('commissaire-info').innerText = "La vente aux enchères est terminée sans gagnant.";
        alert("La vente aux enchères est terminée sans gagnant.");
        const encheresForm = document.getElementById('enchere-form');
        if (encheresForm) {
            encheresForm.remove();
        }
    });



});
