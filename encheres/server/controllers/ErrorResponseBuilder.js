import ResponseBuilder from './ResponseBuilder.js';
import * as fs from 'fs/promises';

export default class ErrorResponseBuilder extends ResponseBuilder {
    async buildResponse() {
      try {
       console.log(this.url);
       const data = await fs.readFile(`../public/${this.url}`)
       this.response.statusCode = 200;
       this.response.write(data);
     }
     catch(err) {
       const data1 = await fs.readFile(`../public/html/erreur.html`);
       this.response.statusCode = 404;
       this.response.write(data1);
     }
     }
}
