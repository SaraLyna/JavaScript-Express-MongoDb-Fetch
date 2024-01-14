import { URL } from 'url';
import {
  HtmlResponseBuilder,
  JsonResponseBuilder,
  NotFoundHtmlResponseBuilder,
  FirstPageHtmlResponseBuilder,
  SecondPageHtmlResponseBuilder,
} from './ResponseBuilder.js';

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
      } else {
        responseBuilder = new NotFoundHtmlResponseBuilder(this.#response);
      }
    responseBuilder.buildResponse();
  }
}
