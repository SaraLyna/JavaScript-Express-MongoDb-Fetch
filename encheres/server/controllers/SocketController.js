import { Server as ServerIO } from "socket.io";

const AUCTION_ROOM = 'auction';

export default class SocketController {
    #io;
    #auctioneer;
    #bidders;

    constructor(server) {
        this.#io = new ServerIO(server);
        this.#auctioneer = null;
        this.#bidders = new Map();
    }

    initController() {
        this.#io.on("connection", socket => this.handleConnection(socket));
    }

    handleConnection(socket) {
        console.log(`Nouvelle connexion avec l'ID ${socket.id}`);

        socket.emit('connected', { id: socket.id });

        socket.on('joinAuction', () => this.handleJoinAuction(socket));
        socket.on('startAuction', (item, initialPrice) => this.handleStartAuction(socket, item, initialPrice));
        socket.on('bid', (bidderId, amount) => this.handleBid(socket, bidderId, amount));
        socket.on('endAuction', () => this.handleEndAuction(socket));

        socket.on('disconnect', () => {
            if (this.#auctioneer && this.#auctioneer.id === socket.id) {
                this.#auctioneer = null;
                this.#io.to(AUCTION_ROOM).emit('auctioneerLeft');
            } else if (this.#bidders.has(socket.id)) {
                this.#bidders.delete(socket.id);
                this.#io.to(AUCTION_ROOM).emit('bidderLeft');
            }
        });
    }

    handleJoinAuction(socket) {
        if (!this.#auctioneer) {
            this.#auctioneer = { id: socket.id };
            socket.join(AUCTION_ROOM);
            socket.emit('auctioneerJoined');
        } else {
            socket.emit('auctionAlreadyInProgress');
        }
    }

    handleStartAuction(socket, item, initialPrice) {
        if (this.#auctioneer && this.#auctioneer.id === socket.id) {
            this.#io.to(AUCTION_ROOM).emit('auctionStarted', item, initialPrice);
        }
    }

    handleBid(socket, bidderId, amount) {
        if (this.#auctioneer && bidderId !== this.#auctioneer.id) {
            this.#io.to(AUCTION_ROOM).emit('bidReceived', bidderId, amount);
        }
    }

    handleEndAuction(socket) {
        if (this.#auctioneer && this.#auctioneer.id === socket.id) {
            this.#io.to(AUCTION_ROOM).emit('auctionEnded');
            this.#auctioneer = null;
        }
    }
}
