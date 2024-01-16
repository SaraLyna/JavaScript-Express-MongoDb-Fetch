import ResponseBuilder from './ResponseBuilder.js';


export default class JsonResponseBuilder extends ResponseBuilder{
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
