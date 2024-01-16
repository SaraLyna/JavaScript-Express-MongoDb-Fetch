import ResponseBuilder from './ResponseBuilder.js';
import HtmlResponseBuilder from './HtmlResponseBuilder.js';

export default class SecondPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`);
    this._response.write(`<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`);
    this._response.write(`<p class="ok"> Second Page Content </p>`);
  }
}
