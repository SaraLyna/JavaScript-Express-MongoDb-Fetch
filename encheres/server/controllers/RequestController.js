import { URL } from 'url';
import http from 'http';
import * as fs from 'fs/promises';
import { getContentTypeFrom }  from './contentTypeUtil.js';
import AboutResponseBuilder from './AboutResponseBuilder.js';
import AccueilResponseBuilder from './AccueilResponseBuilder.js';
import BidderResponseBuilder from './BidderResponseBuilder.js';
import AuctioneerResponseBuilder from './AuctioneerResponseBuilder.js';
import ErrorResponseBuilder from './ErrorResponseBuilder.js';
import RequestRouter from './RequestRouter.js';

export default class RequestController {
  #request;
  #response;
  #url;



  constructor(request, response,io) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
    //this.#io = io;
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
    this.#response.setHeader("Content-Type" , getContentTypeFrom(this.#url) );
    const router = new RequestRouter(this.#url, this.#response);
    router.routeRequest();
  }


}
