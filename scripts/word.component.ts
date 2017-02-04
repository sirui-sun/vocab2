import { Component } from 'angular2/core';
import { Output } from 'angular2/core';
import { EventEmitter } from 'angular2/core';

// interface Word {
// 	word: string,
// 	definitions: Array<{partOfSpeech:string; definition:string}>
// }

export interface Word {
	word: string,		
	definitions: Array<{partOfSpeech:string; definition:string}>,
	whenAdded: number,	// when the word was added
	interval: number	// which spaced repetition interval
}

@Component({
    selector: 'sp-word',
    templateUrl: './templates/word.html',
    inputs: ['word']
})

export class WordComponent { 

	word : Word;
	defined = false;

	@Output() wordDeleted : EventEmitter<any> = new EventEmitter();

	onDelete( word : Word ) {
		this.wordDeleted.emit( word );
	}
}