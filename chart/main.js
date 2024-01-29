import http from 'http';
import { Server as ServerIO } from 'socket.io';

import RequestController from './controllers/requestController.js';
import IOController from './controllers/ioController.js';



const server = http.createServer(
	(request, response) => new RequestController(request, response,io).handleRequest()
);

const io = new ServerIO(server);
const ioController = new IOController(io);


//io.on('connection', socket =>console.log(`connexion réussie`));
io.on('connection', socket => ioController.registerSocket(socket) );
//io.on('connection', ioController.registerSocket.bind(ioController) );  // version alternative



server.listen(8080);
