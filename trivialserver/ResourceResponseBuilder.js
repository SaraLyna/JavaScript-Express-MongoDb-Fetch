import path from 'path';
import fs from 'fs';
import ResponseBuilder from './ResponseBuilder.js';
import HtmlResponseBuilder from './HtmlResponseBuilder.js';
import NotFoundHtmlResponseBuilder from './NotFoundHtmlResponseBuilder.js';



export default class ResourceResponseBuilder extends ResponseBuilder {
  #resourcePath;

  constructor(response, resourcePath) {
    super(response);
    this.#resourcePath = resourcePath;
    this.setContentType('text/plain');
  }

  buildResponse() {
    try {
      this.buildHeader();
      this.buildBody();
      this.buildFooter();
    } catch (error) {
      const notFoundResponse = new NotFoundHtmlResponseBuilder(this._response);
      notFoundResponse.buildResponse();
    }
  }

  buildBody() {
    const filePath = path.join(new URL('.', import.meta.url).pathname, 'public', this.#resourcePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const fileContent = fs.readFileSync(filePath);
      this._response.write(fileContent);
    } else {
      throw new Error('File not found');
    }
  }
}
