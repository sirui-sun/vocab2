// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class WordDefinitionService {

  dict: Object = {};  // internal cache
  http: any;
  headers:Headers;
  options:RequestOptions;

  // root URL for API
  private API_ROOT:string = "https://od-api.oxforddictionaries.com/api/v1/entries/en/"

  constructor(http: Http) { 
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Accept','application/json');
    this.headers.append('app_id','4b622080');
    this.headers.append('app_key','c532ab8c56d05f0499258bd40eaaa447');
    this.options = new RequestOptions({headers:this.headers});
  }

  // definitions have the following schema:
  // list of definitions, for each definition:
  // 0th element is the part of speech
  // 1st element is the definition
  // TODO: do this with objects
  define( w : string ):Promise<any> {
    let word = w.toLowerCase();
    
    // TO DO: localStorage caching of objects

    let requestURL = this.generateRequestURL(word);
    let p1 = this.http.get(requestURL, this.options).map((res: Response) => res.json()).toPromise();
    let p2 = p1.then((response : Response)=>{
      try {
        let allDefinitions:Array<any> = [];
        let results = response["results"];
        for (let result of results) {
         let lexicalEntries = result["lexicalEntries"];
         for (let lexicalEntry of lexicalEntries) {
           let pos = lexicalEntry["lexicalCategory"];
           let entries = lexicalEntry["entries"];
           for (let entry of entries) {
             let senses = entry["senses"];
             for (let sense of senses) {
                let definitions = sense["definitions"];
                for (let definition of definitions) {
                  allDefinitions.push([pos, definition]);
                }
             }
           }
         }
        }
         return allDefinitions;
      } catch (err) {
        console.log("somethign went wrong in parsing return JSON...");
        return [];
      }
    }, () => {});
    
    // cache entry
    p2.then(
      (allDefinitions:Array<any>) => {this.dict[word] = allDefinitions;},
      () => {}
    );
    return p2;
  }

  generateRequestURL(word:string):string {
    return this.API_ROOT + word + "/definitions";
  }
}