// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()

// Returns definitions for a given word
export class WordDefinitionService {

	dict: Object;

	constructor(http: Http) {
		this.dict = {};
		http.get('./resources/dictionary/dict.json').map((res: Response) => res.json()).subscribe((res : Response) => this.dict = res);
	}

  // definitions have the following schema:
  // list of definitions, for each definition:
  // 0th element is the part of speech
  // 1st element is the definition
  // TODO: do this with objects
  define( word : string ) {
    if(!this.dict) { return []; }
    console.log("defining..");
    console.log(word);
    return this.dict[word.toLowerCase()];
  }
}