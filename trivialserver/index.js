import http from 'http';
import RequestController from './RequestController.js';


// const server = http.createServer(            // création du serveur
// 	(request, response) => {
// 		// création et envoi de la réponse
// 		response.writeHead(200, {"Content-Type": "text/html"});
// 		response.write('<h1>First minimal node server</h1>');
// 		response.write('<p>I am alive </p>');
// 		response.end();
// 	}
// );

const server = http.createServer(
  (request, response) => new RequestController(request, response).handleRequest());


server.listen(8080);
