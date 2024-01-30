import ResponseBuilder from '../../../server/ResponseBuilder.js';
export default class ErrorResponseBuilder extends ResponseBuilder {
   buildResponse() {
    this._response.statusCode = 404;
    this._response.setHeader('Content-Type', 'text/html');
    this._response.end('<h1>Page non trouvée</h1>');
  }
}
