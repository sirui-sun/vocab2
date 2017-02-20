import { Component } from 'angular2/core';
import { Output } from 'angular2/core';
import { EventEmitter } from 'angular2/core';
import { WordDefinitionService } from './wordDefinition.service';

// interface Word {
// 	word: string,
// 	definitions: Array<{partOfSpeech:string; definition:string}>
// }

export class Word {
	word: string,		
	definitions: Array,
	whenAdded: Date,	// when the word was added
	interval: number	// which spaced repetition interval
	intervals = [0, 1/72, 1, 2, 4, 7, 11, 14, 21, 35, 70, 105];

	constructor(word: string, whenAdded: Date, interval: number) {
		this.word = word;
		this.whenAdded = whenAdded ? whenAdded : new Date();
		this.interval = interval ? interval : 0
		this.definitions = [];
	}

	// should this word currently be displayed?
	shouldBeDisplayed() {
		let now = new Date();
		let toCheck = new Date(this.whenAdded);
		toCheck.setDate(toCheck.getDate() + this.intervals[this.interval]);
		return now > toCheck;
	}
}

@Component({
    selector: 'sp-word',
    templateUrl: './templates/word.html',
    providers: [ WordDefinitionService ],
    inputs: ['word']
})

export class WordComponent { 

	word : Word;
	definitions = [];
	defined = false;

	// hmm, does each word have to declare its own private instance of word definition service?
	constructor ( private WordDefinitionService : WordDefinitionService) { }

	@Output() wordDeleted : EventEmitter<any> = new EventEmitter();
	@Output() wordGotIt : EventEmitter<any> = new EventEmitter();
	@Output() wordForgot : EventEmitter<any> = new EventEmitter();

	onDelete( word : Word ) {
		this.wordDeleted.emit( word );
	}

	onGotIt( word : Word ) {
		this.wordGotIt.emit( word );
	}

	onForget( word : Word ) {
		this.wordForgot.emit( word );
	}

	onDefine() {
		this.defined = !(this.defined);
		this.word.definitions = this.WordDefinitionService.define(this.word.word);
	}
}