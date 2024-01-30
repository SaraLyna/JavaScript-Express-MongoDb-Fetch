import { URL } from 'url';
import AboutResponseBuilder from '../client/src/scripts/AboutResponseBuilder.js';
import AccueilResponseBuilder from '../client/src/scripts/AccueilResponseBuilder.js';
import BidderResponseBuilder from '../client/src/scripts/BidderResponseBuilder.js';
import AuctioneerResponseBuilder from '../client/src/scripts/AuctioneerResponseBuilder.js';
import ErrorResponseBuilder from '../client/src/scripts/ErrorResponseBuilder.js';
//import RessourceResponseBuilder from './RessourceResponseBuilder.js';


export default class RequestRouter {
  #url;
  #response;
  constructor(url, response) {
    this.#url = url;
    this.#response = response;
  }

  routeRequest() {
    const pathname = this.#url.pathname;
    let responseBuilder;
      if (pathname === '/') {
        responseBuilder = new AccueilResponseBuilder(this.#response);
      } else if (pathname === '/about') {
        responseBuilder = new AboutResponseBuilder(this.#response);
      } else if (pathname === '/auctioneer') {
        responseBuilder = new AuctioneerResponseBuilder(this.#response);
      } else if (pathname === '/bidder') {
        responseBuilder = new BidderResponseBuilder(this.#response);
      } else {
        responseBuilder = new ErrorResponseBuilder(this.#response);
      }
    responseBuilder.buildResponse();
  }
}

