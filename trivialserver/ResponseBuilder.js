export default class ResponseBuilder{
  #response;
  #statusCode;
  #contentType
  constructor(response) {
    this.#response = response;
    this.#statusCode = 200;
    this.#contentType = 'text/html';
  }

  setStatusCode(statusCode) {
   this.#statusCode = statusCode;
  }

  setContentType(contentType) {
   this.#contentType = contentType;
  }

  buildResponse() {
    this.buildHeader();
    this.buildBody();
    this.buildFooter();
  }

  buildHeader() {
    this.#response.statusCode = this.#statusCode;
    this.#response.setHeader('Content-Type', this.#contentType);
  }
  buildBody() {
    // À implémenter dans les sous-classes
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this.#response.write(`<footer>${currentDate}</footer></body></html>`);
   this.#response.end();
  }
}

export class HtmlResponseBuilder extends ResponseBuilder{
  buildBody() {
  // À implémenter dans les sous-classes
  }
}

export class FirstPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this.#response.write(`<p> First Page Content </p>`);
  }
}

export class SecondPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this.#response.write(`<p> Second Page Content </p>`);
  }
}

export class JsonResponseBuilder extends ResponseBuilder{
  #params;
  constructor(response, params) {
   super(response);
   this.#params = params;
   this.setContentType('application/json');
  }

  buildBody() {
   const jsonData = {};
   this.#params.forEach((value, key) => {
     jsonData[key] = value;
   });
   jsonData.date = new Date().toISOString();
   this.#response.write(JSON.stringify(jsonData));
   this.#respone.end;
  }
}

export class NotFoundHtmlResponseBuilder extends HtmlResponseBuilder {
  constructor(response) {
    super(response);
    this.setStatusCode(404);
  }
  buildBody() {
    this.#response.write(`<p>404: Page not found </p>`);
    this.#response.end;
  }
}
