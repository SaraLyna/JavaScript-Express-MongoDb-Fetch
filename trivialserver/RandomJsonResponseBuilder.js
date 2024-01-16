import ResponseBuilder from './ResponseBuilder.js';
import JsonResponseBuilder from './JsonResponseBuilder.js';

export default class RandomJsonResponseBuilder extends JsonResponseBuilder {
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
