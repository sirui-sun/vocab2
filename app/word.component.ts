import { ViewChild, Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WordDefinitionService } from './wordDefinition.service';
// import { DefinitionModal } from './definitionModal.component';
// interface Word {
// 	word: string,
// 	definitions: Array<{partOfSpeech:string; definition:string}>
// }

export class Word {
	word: string;		
	definitions: Array<Object>;
	whenAdded: Date;	// when the word was added
	interval: number;	// which spaced repetition interval
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

	// public readonly modal: DefinitionModal = new DefinitionModal();
	// @ViewChild(DefinitionModal)

	word : Word;
	definitions : Array<any> = [1,2,3];
	defined = false;
	definitionVisible = false;

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
		if (!this.defined) {
			this.definitions = this.WordDefinitionService.define(this.word.word);
			this.defined = true;
		}
		this.definitionVisible = true;
	}

	onDismissDefinition() {
		this.definitionVisible = false;
	}
}