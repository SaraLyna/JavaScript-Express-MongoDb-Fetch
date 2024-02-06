import { URL } from 'url';
import http from 'http';
import * as fs from 'fs/promises';
import { Server } from 'socket.io';
import { getContentTypeFrom }  from './contentTypeUtil.js';

export default class RequestController {
  #request;
  #response;
  #url;
  #io;



  constructor(request, response,io) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
    this.#io = io;
  }

  get response() {
    return this.#response;
  }

  get request() {
    return this.#request;
  }

  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.#response.setHeader("Content-Type" , getContentTypeFrom(this.#url) );
    await this.buildResponse();
    this.response.end();

  }

  async buildResponse() {
    if(this.url.pathname==='/'){
      try{
        console.log(true);
        const data = await fs.readFile(`./public/html/about.html`);
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) {
          const data1 = await fs.readFile(`./public/html/erreur.html`);
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    } else if(this.url.pathname==='/about'){
    try{

      const data = await fs.readFile(`./public/html/about.html`);
      this.response.statusCode = 200;
      this.response.write(data);}
      catch(err) {
        const data1 = await fs.readFile(`./public/html/encherisseur.html`);
        this.response.statusCode = 404;
        this.response.write(data1);
      }
    } else if(this.url.pathname==='/commissaire-priseur'){
      try{
        const data = await fs.readFile(`./public/html/commissaire-priseur.html`);
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) {
          const data1 = await fs.readFile(`./public/html/commissaire-priseur.html`);
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    } else if(this.url.pathname==='/encherisseur'){
      try{
        const data = await fs.readFile(`./public/html/encherisseur.html`);
        this.response.statusCode = 200;
        this.response.write(data);}
        catch(err) {
          const data1 = await fs.readFile(`./public/html/encherisseur.html`);
          this.response.statusCode = 404;
          this.response.write(data1);
        }
    } else {
      try {
        //console.log(this.url)
        const data = await fs.readFile(`./public/${this.url.pathname}`)
        this.response.statusCode = 200;
        this.response.write(data);
      }
      catch(err) {
        //console.log(false)
        const data1 = await fs.readFile(`./public/html/erreur.html`);
        this.response.statusCode = 404;
        this.response.write(data1);
      }
    }

  }


}
