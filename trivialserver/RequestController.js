import { URL } from 'url';
import HtmlResponseBuilder from './HtmlResponseBuilder.js';
import JsonResponseBuilder from './JsonResponseBuilder.js';
import NotFoundHtmlResponseBuilder from './NotFoundHtmlResponseBuilder.js';
import FirstPageHtmlResponseBuilder from './FirstPageHtmlResponseBuilder.js';
import SecondPageHtmlResponseBuilder from './SecondPageHtmlResponseBuilder.js';
import RandomJsonResponseBuilder from './RandomJsonResponseBuilder.js';
import ResourceResponseBuilder from './ResourceResponseBuilder.js';
import ResponseBuilder from './ResponseBuilder.js';

export default class RequestController {
  #request;
  #response;
  #url;
  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
  }

  get response() {
    return this.#response;
  }

  handleRequest() {
    const router = new RequestRouter(this.#url, this.#response);
    router.routeRequest();
  }
}

class RequestRouter {
  #url;
  #response;
  constructor(url, response) {
    this.#url = url;
    this.#response = response;
  }

  routeRequest() {
    const pathname = this.#url.pathname;
    let responseBuilder;
      if (pathname === '/first') {
        responseBuilder = new FirstPageHtmlResponseBuilder(this.#response);
      } else if (pathname === '/second') {
        responseBuilder = new SecondPageHtmlResponseBuilder(this.#response);
      } else if (pathname === '/json') {
        responseBuilder = new JsonResponseBuilder(this.#response, this.#url.searchParams);
      } else if (pathname === '/random') {
        responseBuilder = new RandomJsonResponseBuilder(this.#response, this.#url.searchParams);
      } else if (pathname.startsWith('/public')) {
        const resourcePath = pathname.replace('/public', ''); // Extraire le chemin de la ressource
        responseBuilder = new ResourceResponseBuilder(this.#response, resourcePath);
      } else {
        responseBuilder = new NotFoundHtmlResponseBuilder(this.#response);
      }
    responseBuilder.buildResponse();
  }
}
