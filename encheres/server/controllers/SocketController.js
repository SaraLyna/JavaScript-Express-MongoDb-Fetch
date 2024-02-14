import { Server } from 'socket.io';

const AUCTION_ROOM = 'auction';

export default class SocketController {
    #io;
    #auctioneer;
    #bidders;
    #started;
    #currentSocketOffer;
    #currentPrice;

    constructor(server) {
        this.#io = new Server(server);
        this.#auctioneer = null;
        this.#bidders = new Map();
        this.#started = false;
        this.#currentSocketOffer = null;
        this.#currentPrice = null;
     }

    initController() {
        this.#io.on('connection', socket => this.handleConnection(socket));
    }

    handleConnection(socket) {
        console.log(`Nouvelle connexion avec l'ID ${socket.id}`);

        socket.emit('connected', socket.id);
        socket.on('bidder',() => this.handleJoinBidder(socket) );
        socket.on('auctioneer',() => this.handleJoinAuction(socket) );

        socket.on('startAuction', (item, initialPrice) => this.handleStartAuction(socket, item, initialPrice));
        socket.on('bid', (bidderId, amount) =>{
          socket.broadcast.emit('bidReceived', bidderId, amount);
          this.#currentSocketOffer = socket;
        });
        //socket.on('currentBid', (currentBid) => this.#currentPrice = currentBid);
        socket.on('endAuction', () => this.handleEndAuction());



        socket.on('disconnect', () => {
            if (this.#auctioneer && this.#auctioneer.id === socket.id) {
                this.#auctioneer = null;
                this.#io.to(AUCTION_ROOM).emit('auctioneerLeft');
		            console.log("Le commissaire-priseur a quitté la vente.");
            } else if (this.#bidders.has(socket.id)) {
                this.#bidders.delete(socket.id);
                this.#io.to(AUCTION_ROOM).emit('bidderLeft');
		            console.log("Un enchérisseur a quitté la vente.");
            }
        });
    }

    handleJoinAuction(socket) {
        if (!this.#auctioneer ) {
            this.#auctioneer = socket;
            socket.join(AUCTION_ROOM);
            socket.emit('auctioneerJoined');
            console.log("le commissaire a rejoint les enchères.")
        } else {
            socket.emit('auctionAlreadyInProgress');
            console.log("il y a déja un comissaire.")
        }
    }


    handleJoinBidder(socket) {
      if(this.#started){
        socket.emit('startBidder');
        console.log("Un enchérisseur est en attente.");
      } else{
         this.#bidders.set(socket.id,socket);
         socket.join(AUCTION_ROOM);
         socket.emit('joinBidder');
         console.log("je suis un encherisseur !") ;
       }

    }

    handleStartAuction(socket, item, initialPrice) {
        if (this.#auctioneer && this.#auctioneer.id === socket.id) {
            this.#started = true;
            this.#bidders.forEach((s) => {
                s.emit('auctionStarted', item, initialPrice);
            })
            this.#auctioneer.emit('auctionStarted', item, initialPrice);
            socket.to(AUCTION_ROOM).emit('auctionStarted', item, initialPrice);
            console.log(`Début de l'enchère pour l'objet : ${item}, Prix initial : ${initialPrice}`);
        } else {
            socket.emit('notAuctioneer');
            console.log("Vous n'êtes pas le commissaire-priseur.");
        }
    }

    /* handleBid(bidderId, amount) {
         if (this.#bidders.has(bidderId)) {
            if (amount !== null && amount !== undefined) {
                this.#io.to(AUCTION_ROOM).emit('bidReceived', bidderId, amount);
                this.#auctioneer.emit('bidConfirmed', bidderId, amount);
                console.log(`Enchère de ${amount} de la part de ${bidderId}.`);
            } else {
                console.log("Erreur : Données d'enchère invalides.");
            }
        } else {
            console.log("Vous n'êtes pas autorisé à enchérir.");
        }
    } */



    handleEndAuction() {
        /* if (this.#auctioneer && this.#auctioneer.id === socket.id) {
            this.#auctioneer = null;
            this.#io.to(AUCTION_ROOM).emit('auctionEndededForBidders');
	        console.log("Les enchères sont terminées.");
        } else {
            console.log("Vous n'êtes pas le commissaire-priseur et vous ne pouvez pas terminer la vente aux enchères.");
        } */
        if (this.#currentSocketOffer) {
            this.#currentSocketOffer.emit('winner');
        }
        if (this.#started) {
            this.#io.to(AUCTION_ROOM).emit('auctionEndededForBidders');
            this.#started = false;
            this.#currentSocketOffer = null;
        }
      }
}
