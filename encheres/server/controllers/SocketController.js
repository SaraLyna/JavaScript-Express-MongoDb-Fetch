import { Server as ServerIO } from "socket.io";

const PRIVATE_ROOM = 'private';

export default class SocketController {

  #io;
  #bidders;

  constructor(io) {
    this.#io = new ServerIO(server);
    this.#bidders = new Map();

  }
  
  initController() {
    this.#io.on("connection", socket => this.setupListeners(socket));
  }


  registerSocket(socket) {
    console.log(`new connection with id ${socket.id}`);
    socket.emit('ping', { message: 'ping' });
    setInterval(() => {
      const random = Math.floor(Math.random() * 7) + 2;
      this.#io.to(socket.id).emit('parametrizedMessage', { number: random });
      console.log(`Sent parametrized message to client ${socket.id}: ${random}`);
      this.#clients.set(socket.id, random);
    }, 2000);

    this.setupListeners(socket);
  }

  setupListeners(socket) {
    socket.on( msg.GREATINGS  , user => this.greatings(socket, user.name) );
    socket.on( 'disconnect' , () => this.leave(socket) );
    clearInterval(this.#clients.get(socket.id));
    this.#clients.delete(socket.id);
    socket.on( msg.JOIN_PRIVATE , () => this.joinPrivate(socket));
  }

  greatings(socket, userName) {
    console.log(`greatings received from ${userName} (id : ${socket.id})`);
    this.#clients.set(socket.id, userName);
    socket.emit(msg.WELCOME);
    socket.broadcast.emit(msg.NEW_USER, userName);
  }

  joinPrivate(socket) {
    socket.join(PRIVATE_ROOM);
    this.#io.to(PRIVATE_ROOM).emit(msg.PRIVATE, `${this.#clients.get(socket.id)} a rejoint le salon`, 'serveur');
    socket.on( msg.PRIVATE_MESSAGE, msg => this.sendPrivateMessage(socket, msg) );
  }

  sendPrivateMessage(socket, msg) {
    const senderName = this.#clients.get(socket.id);
    socket.to(PRIVATE_ROOM).emit(msg.PRIVATE, msg, senderName);
    console.log(`message sent to room ${PRIVATE_ROOM} from ${senderName}`);
  }

  leave(socket) {
    const userName = this.#clients.get(socket.id) || 'unknown' ;
    console.log(`disconnection from ${socket.id} (user : ${userName})`);
    this.#clients.delete(socket.id);
  }



}
