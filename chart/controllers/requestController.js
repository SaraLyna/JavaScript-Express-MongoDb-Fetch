import * as fs from 'fs/promises';
import { Server as SocketIO } from 'socket.io';
import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';

const BASE = 'http://localhost/';
/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;
  #io;

  constructor(request, response, io) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(this.request.url,BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
    this.#io = io;
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    if (this.isWebSocketUpgradeRequest()) {
      this.handleWebSocket();
    } else {
    await this.buildResponse();
    this.response.end();
    }
  }


  isWebSocketUpgradeRequest() {
   return this.request.headers.upgrade === 'websocket';
  }

  handleWebSocket() {
    const socket = this.#io.acceptConnection(this.request, this.response);
    socket.on('message', (message) => {
      console.log(`Received message from WebSocket client: ${message}`);
    });
    socket.send('Hello from the WebSocket server!');
  }

  /**
  * send the requested resource as it is, if it exists, else responds with a 404
  */
  async buildResponse()  {
    try {
      // check if resource is available
      await fs.access(`.${this.url}`);
      // read the requested resource content
      const data = await fs.readFile(`.${this.url}`);
      // send resource content
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch(err) { // resource is not available
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }

}
