import { Server } from 'socket.io';

const AUCTION_ROOM = 'auction';

export default class SocketController {
    #io;
    #auctioneer;
    #bidders;

    constructor(server) {
        this.#io = new Server(server);
        this.#auctioneer = null;
        this.#bidders = new Map();
    }

    initController() {
        this.#io.on('connection', socket => this.handleConnection(socket));
    }

    handleConnection(socket) {
        console.log(`Nouvelle connexion avec l'ID ${socket.id}`);

        socket.emit('connected', socket.id);

        socket.on('joinAuction', () => this.handleJoinAuction(socket));
        socket.on('startAuction', (item, initialPrice) => this.handleStartAuction(socket, item, initialPrice));
        socket.on('bid', (bidderId, amount) => this.handleBid(socket, bidderId, amount));
        socket.on('endAuction', () => this.handleEndAuction(socket));

        socket.on('disconnect', () => {
            if (this.#auctioneer === socket.id) {
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
        if (!this.#auctioneer) {
            this.#auctioneer = socket.id;
            socket.join(AUCTION_ROOM);
            socket.emit('auctioneerJoined');
	    console.log("le commissaire est la");
        } else {
            this.#bidders.add(socket.id);
            socket.emit('auctionAlreadyInProgress');
	    console.log("Il y a déjà un commissaire-priseur.");
        }
    }

    handleStartAuction(socket, item, initialPrice) {
        if (this.#auctioneer === socket.id) {
            this.#io.to(AUCTION_ROOM).emit('auctionStarted', item, initialPrice);
	    console.log(`auctionStarted emitted for ${item} with intial price ${initialPrice} `);

        }else {
	    socket.emit('notAuctioneer');
	    console.log("Vous n'êtes pas le commissaire-priseur.");
    	}
    }

    handleBid(socket, bidderId, amount) {
        if (this.#auctioneer !== bidderId) {
            this.#io.to(AUCTION_ROOM).emit('bidReceived', bidderId, amount);
	    console.log(`bidRecieved sent ${amount} from ${bidderId} `);

        }
    }

    handleEndAuction(socket) {
        if (this.#auctioneer === socket.id) {
            this.#io.to(AUCTION_ROOM).emit('auctionEnded');
            this.#auctioneer = null;
	    console.log("Les enchères sont terminées.");
        } else {
            console.log("Vous n'êtes pas le commissaire-priseur et vous ne pouvez pas terminer la vente aux enchères.");
        }
    }
}
