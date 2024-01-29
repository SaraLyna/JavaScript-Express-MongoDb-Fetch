export default class ResponseBuilder{
  _response;
  #statusCode;
  #contentType
  constructor(response) {
    this._response = response;
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
    this._response.statusCode = this.#statusCode;

    this._response.setHeader('Content-Type', this.#contentType);
  }
  buildBody() {
    // À implémenter dans les sous-classes
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this._response.write(currentDate);
   this._response.end();
  }
}
