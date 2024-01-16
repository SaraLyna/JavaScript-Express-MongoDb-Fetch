import path from 'path';
import fs from 'fs';

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
    //this._response.write('<!DOCTYPE html>');
    //this._response.write('<html>');
    //this._response.write('<head>');
    //this._response.write('<title> Title </title>');
    //this._response.write('</head>');
    //this._response.write('<body>');
    this._response.setHeader('Content-Type', this.#contentType);
  }
  buildBody() {
    // À implémenter dans les sous-classes
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this._response.write(`<footer>${currentDate}</footer></body></html>`);
   this._response.end();
  }
}

export class HtmlResponseBuilder extends ResponseBuilder{
  buildBody() {
  // À implémenter dans les sous-classes
  }
}

export class FirstPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`);
    this._response.write(`<p> First Page Content </p>`);
  }
}

export class SecondPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`);
    this._response.write(`<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`);
    this._response.write(`<p> Second Page Content </p>`);
  }
}

export class NotFoundHtmlResponseBuilder extends HtmlResponseBuilder {
  constructor(response) {
    super(response);
    this.setStatusCode(404);
  }
  buildBody() {
    this._response.write(`<p>404: Page not found </p>`);
    this._response.end;
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
   this._response.write(JSON.stringify(jsonData));
   this._response.end;
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this._response.end();
  }
}

export class RandomJsonResponseBuilder extends JsonResponseBuilder {
  constructor(response, params) {
    super(response, params);
  }

  buildBody() {
    const randomValue = Math.floor(Math.random() * 101);
    const jsonData = {
      randomValue: randomValue,
      date: new Date().toISOString(),
    };
    this._response.write(JSON.stringify(jsonData));
    this._response.end;
  }
}



export class ResourceResponseBuilder extends ResponseBuilder {
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
