// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

// Returns definitions for a given word
export class SampleWordService {

	private sampleWords: any = [];              // list of sample words
  private isLoadedPromise:Promise<any>;   // Promise: is this loaded?

  // to do: turn the observable into a promise
  // use that promise in the sample word - only if the initial promise resolves do you resolve the second promise

	// constructor(http: Http) {
	// 	this.sampleWords = [];
	// 	http.get('./resources/sampleWords.json')
 //      .map((res: Response) => res.json()).subscribe((res : Response) => this.sampleWords = res);
	// }

  constructor(http: Http) {
    let p = http.get('./resources/sampleWords.json').map((res: Response) => res.json()).toPromise();
    this.isLoadedPromise = p.then((res : Response) => this.sampleWords = res);
  }

  getSampleWord():Promise<any> {
    return this.isLoadedPromise.then(()=> {
      return this.sampleWords[Math.floor(Math.random() * this.sampleWords.length)];
    });
  
    // console.log("got here");
    // if(!this.sampleWords) { return "no word"; }
    // return this.sampleWords[Math.floor(Math.random() * this.sampleWords.length)];
  }
}