import http from 'http';

const server = http.createServer(            // création du serveur
	(request, response) => {
		// création et envoi de la réponse
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('<h1>First minimal node server</h1>');
		response.write('<p>I am alive </p>');
		response.end();
	}
);

server.listen(8080);
