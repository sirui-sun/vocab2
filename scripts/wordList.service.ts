import { WordComponent } from './word.component';
import { WORDS } from './wordList.data.constant';

// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
import { Injectable } from 'angular2/core';

@Injectable()


//localStorage word schema:
// [ {
//      word: string,    
//      definitions: Array<{partOfSpeech:string; definition:string}>,
//      whenAdded: number,  // when the word was added
//      interval: number  // which spaced repetition interval
// }]

export class WordListService {

  private LOCAL_STORAGE_KEY = "words";

  // The "getBookmarks()" function checks if there is data in the local storage.
  // If there is, we return this data,
  // if there isn't we return the default data.
  getWords() {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    if ( words !== null ) {
      this.wordsToReturn = words;
    }
    return Promise.resolve( this.wordsToReturn );
  }

  // A "setBookmarks()" function saves new data in the local storage.
  addWord( word : Object ) {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    
    // TODO: can we initialize this on init?
    if ( words == null) {
      this.saveToLocalStorage([]);
    }

    // Look for word, quit if found, aka this word is a duplicate
    if (this.findWord(word["word"], words) != -1) {
      return;
    }

    words.push(word);
    this.saveToLocalStorage(words);
  }

  // remove from localStorage
  deleteWord( word : string ) {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    let targetIdx = this.findWord(word, words);
    if (targetIdx == -1) {
      return; 
    } else {
      words.splice(targetIdx, 1);
      this.saveToLocalStorage(words);
    }
  }
  
  // returns index or -1 if not found
  private findWord (word : string, wordList : Object[]) {
    for (let i in wordList) {
      if (word == wordList[i]["word"]) { return i}
    }
    return -1;
  }

  // saves words to local storage
  private saveToLocalStorage(words) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(words));
  }
}