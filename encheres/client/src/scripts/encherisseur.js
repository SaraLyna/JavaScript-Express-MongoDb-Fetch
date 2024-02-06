const socket = io();
socket.on('connection', () => {
        console.log('Connecté au serveur de sockets en tant qu\'enchérisseur');
});


socket.on('startAuction', (item, initialPrice) => {
    console.log(`Les enchères pour ${item} ont commencé avec un prix de départ de ${initialPrice}€`);
});

socket.on('bid', (bidderId, amount) => {
    console.log(`Nouvelle enchère de ${amount}€ de la part de l'enchérisseur ${bidderId}`);
});

socket.on('endAuction', () => {
    console.log('La vente aux enchères est terminée');
});
