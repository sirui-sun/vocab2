// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
import { Injectable } from 'angular2/core';

@Injectable()


// Returns definitions for a given word
export class WordDefinitionService {

  // definitions have the following schema:
  // list of definitions, for each definition:
  // 0th element is the part of speech
  // 1st element is the definition
  // TODO: do this with objects
  define( word : string ) {
    if(!dict) { return []; }
    return dict[word.toLowerCase()];
  }
}