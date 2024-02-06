import ResponseBuilder from './ResponseBuilder.js';
import * as fs from 'fs/promises';

export default class AuctioneerResponseBuilder extends ResponseBuilder {
  async buildResponse() {
    if(this.url==='/auctionner'){
      try{
        const data = await fs.readFile('../public/html/encherisseur.html');
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
