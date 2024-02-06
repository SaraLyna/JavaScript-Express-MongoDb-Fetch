import http from 'http';
import { Server } from 'socket.io';
import RequestController from './controllers/RequestController.js';
import SocketController from './controllers/SocketController.js';


const server = http.createServer(
  (request, response) => new RequestController(request, response, io).handleRequest());

const io = new Server(server);
const ioController = new SocketController(io);

io.on('connection', (socket) => {
    console.log('Un nouveau client s\'est connecté');
});
io.on('connection', socket => ioController.handleConnection(socket) );


server.listen(8080);
