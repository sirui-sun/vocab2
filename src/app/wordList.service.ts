import { WordComponent } from './word.component';
import { Word } from './word.component';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
// import { DefinitionModal } from './word.component';

// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.

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

  constructor () {
    if (localStorage[this.LOCAL_STORAGE_KEY] == null) {
      localStorage[this.LOCAL_STORAGE_KEY] = "[]";
    }
  }

  getWords() {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    let returnWords : Array<any> = [];
    for (let word of words) {
      returnWords.push(new Word(word["word"], word["whenAdded"], word["interval"]));
    }
    
    return Promise.resolve( returnWords );
  }

  addWord( word : Object ) {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    
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
  
  // increment word interval
  onGotIt( word : Word ) {
    // are we at the terminal interval?
    if (word.interval >= word.intervals.length) { return; }
    
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    let targetIdx = this.findWord(word.word, words);
    if (targetIdx == -1 ) { return; }

    let targetWord = words[targetIdx];
    words[targetIdx] = new Word(targetWord.word, targetWord.whenAdded, targetWord.interval+1);
    this.saveToLocalStorage(words);
    return;
  }

  // forget case - set timestamp to now, but don't touch interval
  // TODO: do we realy want that functionality?
  onForget( word : Word ) {
    let words = JSON.parse( localStorage.getItem(this.LOCAL_STORAGE_KEY) );
    let targetIdx = this.findWord(word.word, words);
    if (targetIdx == -1 ) { return; }

    let targetWord = words[targetIdx];
    let newInterval = targetWord.interval == 0 ? 1 : targetWord.interval
    words[targetIdx] = new Word(targetWord.word, new Date(), newInterval);
    this.saveToLocalStorage(words);
    return;
  }

  // returns index or -1 if not found
  private findWord (word : string, wordList : Object[]) : number {
    for (let i in wordList) {
      if (word == wordList[i]["word"]) { return parseInt(i) }
    }
    return -1;
  }

  // saves words to local storage
  private saveToLocalStorage(words : Array<any>) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(words));
  }
}