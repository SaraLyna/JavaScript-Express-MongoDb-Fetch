import http from 'http';
import { Server } from 'socket.io';
import RequestController from './controllers/RequestController.js';


const server = http.createServer(
  (request, response) => new RequestController(request, response, io).handleRequest());

const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('Un client s\'est connecté');
//
// });
server.listen(8080);
