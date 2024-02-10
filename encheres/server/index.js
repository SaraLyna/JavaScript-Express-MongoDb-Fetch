import http from 'http';
import { Server } from 'socket.io';
import RequestController from './controllers/RequestController.js';
import SocketController from './controllers/SocketController.js';


const server = http.createServer(
  (request, response) => new RequestController(request, response, io).handleRequest());

const io = new Server(server);
const ioController = new SocketController(io);
ioController.initController();

io.on('connection', socket => ioController.handleConnection(socket) );


server.listen(8080);
