document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('start-button').addEventListener('click', () => start());
    document.getElementById('end-button').addEventListener('click', () => end());


    const socket = io();
    socket.emit('auctioneer');


    function start() {
        const item = document.getElementById('objet').value.trim();
        const initialPrice = document.getElementById('prix').value.trim();
        if (item !== '' && initialPrice !== '') {
            socket.emit('startAuction', item, initialPrice);
            console.log("Fonction start fonctionne");
        } else {
            console.log("Veuillez spécifier un objet et un prix avant de démarrer l'enchère.");
        }
    }

    function end() {
        socket.emit('endAuction');
        console.log("Fonction end fonctionne");
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
        console.log("Il y a déjà un commissaire-priseur.");
        document.getElementById('commissaire-info').innerText = `Il y a déjà un commissaire-priseur.`;
        const encheresForm = document.getElementById('enchere-form');
        if (encheresForm) {
            encheresForm.remove();
        }
    });

    socket.on('auctionStarted', (item, initialPrice) => {
        console.log("Initialisation du montant");
        document.getElementById('montant-actuel').innerText = initialPrice + `€`;
    });

    socket.on('bidReceived', (bidderId, amount) => {
        console.log(`Montant actuel estimé : ${amount}€ par ${bidderId}`);
        document.getElementById('montant-actuel').innerText = amount + `€` ;
    });

    socket.on('auctionEnded', () => {
        console.log("Fini");
        document.getElementById('commissaire-info').innerText = `Vente aux enchères terminée`;
        alert('les enchères sont finies.');
    });

    socket.on('auctioneerLeft', () => {
        console.log("Commissaire parti");
        document.getElementById('commissaire-info').innerText = `Le commissaire priseur a quitté la vente.`;
    });

});