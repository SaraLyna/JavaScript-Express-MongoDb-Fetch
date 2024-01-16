import ResponseBuilder from './ResponseBuilder.js';
import HtmlResponseBuilder from './HtmlResponseBuilder.js';


export default class FirstPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`);
    this._response.write(`<p class="ok">  First Page Content </p>`);
  }
}
