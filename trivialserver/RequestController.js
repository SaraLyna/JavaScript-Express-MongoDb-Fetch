import { URL } from 'url';
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
    this.prepareResponse();
    this.buildResponse();
  }

  prepareResponse() {
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'text/html');
  }

  buildResponse()  {
    const nameValue = this.#url.searchParams.get('name') || 'unknown';


    // routage "à la main"
    if (this.#url.pathname == '/') {
        this.response.write(`<h2>welcome home</h2>`);
    }
    else if (this.#url.pathname.startsWith('/welcome') ){
      this.response.write(`<p>Welcome to <strong>${nameValue}</strong></p>`);
    }
    else if (this.#url.pathname.startsWith('/first')) {
      this.response.write(`premier`);

    }
    else if (this.#url.pathname.startsWith('/second')) {
      this.response.write(`second`);

    }
    else if (this.#url.pathname.startsWith('/json')) {
      this.response.write(`json`);

    }
    else {
      this.response.write(`<p>Something else</p>`);
    }

    this.response.end();
  }

}
