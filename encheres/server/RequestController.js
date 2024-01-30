import { URL } from 'url';
import AboutResponseBuilder from '../client/src/scripts/AboutResponseBuilder.js';
import AccueilResponseBuilder from '../client/src/scripts/AccueilResponseBuilder.js';
import BidderResponseBuilder from '../client/src/scripts/BidderResponseBuilder.js';
import AuctioneerResponseBuilder from '../client/src/scripts/AuctioneerResponseBuilder.js';
import ErrorResponseBuilder from '../client/src/scripts/ErrorResponseBuilder.js';
//import RessourceResponseBuilder from './RessourceResponseBuilder.js';

import RequestRouter from './RequestRouter.js';
import http from 'http';
import io from 'socket.io';

export default class RequestController {
  #request;
  #response;
  #url;
  #io;
  
  
  
  constructor(request, response,io) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
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
  
  handleRequest() {
    const router = new RequestRouter(this.#url, this.#response);
    router.routeRequest();
  }


 
  handleWebSocket() {
    const socket = this.#io.acceptConnection(this.#request, this.#response);
    socket.on('message', (message) => {
      console.log(`Received message from WebSocket client: ${message}`);
    });
    socket.send('Hello from the WebSocket server!');
  }
}

