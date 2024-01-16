import ResponseBuilder from './ResponseBuilder.js';
import HtmlResponseBuilder from './HtmlResponseBuilder.js';

export default class NotFoundHtmlResponseBuilder extends HtmlResponseBuilder {
  constructor(response) {
    super(response);
    this.setStatusCode(404);
  }
  buildBody() {
    this._response.write(`<p>404: Page not found </p>`);
    this._response.end;
  }
}
