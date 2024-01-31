import ResponseBuilder from './ResponseBuilder.js';


export default class AuctioneerResponseBuilder extends ResponseBuilder {
  buildResponse() {
    this._response.statusCode = 200;
    this._response.setHeader('Content-Type', 'text/html');
    this._response.end('<h1>Page du commissaire-priseur</h1>');
  }
}
