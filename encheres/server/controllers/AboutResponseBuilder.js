import ResponseBuilder from './ResponseBuilder.js';
import * as fs from 'fs/promises';

export default class AboutResponseBuilder extends ResponseBuilder{
  async buildResponse() {
    if(this.url==='/about'){
    try{

      const data = await fs.readFile('../public/html/about.html');
      this.response.statusCode = 200;
      this.response.write(data);}
      catch(err) {
        const data1 = await fs.readFile('../public/html/encherisseur.html');
        this.response.statusCode = 404;
        this.response.write(data1);
      }
  }

  }
}
