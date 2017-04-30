import { ViewChild, Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WordDefinitionService } from './wordDefinition.service';
import { FormControl, FormArray, Validators } from '@angular/forms';
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
	// interval, expressed in days
	intervals = [0, 1/72, 1/36, 1/12, 1/6, 1, 1.5, 2, 3, 4, 7, 9, 11, 14, 17, 21, 27, 35, 50, 70, 85, 105];
	customDefinitions: Array<string>;	// customDefinitions

	constructor(word: string, whenAdded: Date, interval: number, customDefinitions: Array<string>) {
		this.word = word;
		this.whenAdded = whenAdded ? whenAdded : new Date();
		this.interval = interval ? interval : 0
		this.definitions = [];
		this.customDefinitions = customDefinitions ? customDefinitions : [];
	}

	nextReminder():Date {
		let toCheck = new Date(this.whenAdded);
		return new Date(toCheck.setDate(toCheck.getDate() + this.intervals[this.interval]));
	}

	nextReminderString():string {
		let d = new Date(this.nextReminder());
		return d.toLocaleTimeString() + " on " + d.toLocaleDateString();	
	}

	// should this word currently be displayed?
	shouldBeDisplayed():boolean {
		let now = new Date();
		let toCheck = this.nextReminder();
		return now >= toCheck;
	}
}

@Component({
    selector: 'sp-word',
    templateUrl: './templates/word.html',
    providers: [ WordDefinitionService ],
    inputs: ['word', 'reviewMode']
})

export class WordComponent { 

	// public readonly modal: DefinitionModal = new DefinitionModal();
	// @ViewChild(DefinitionModal)

	word : Word;
	reviewMode: boolean = false; 
	definitions : Array<any>;
	defined = false;
	definitionVisible = false;
	definitionsLoaded = false;
	definitionsError = false;

	// custom definition adder
	newCustomDefControls:Array<FormControl> = [];
	newCustomDefArray:FormArray = new FormArray(this.newCustomDefControls);

	constructor ( private WordDefinitionService : WordDefinitionService) { }

	@Output() wordDeleted : EventEmitter<any> = new EventEmitter();
	@Output() wordGotIt : EventEmitter<any> = new EventEmitter();
	@Output() wordForgot : EventEmitter<any> = new EventEmitter();
	@Output() updateCustomDefinitions : EventEmitter<any> = new EventEmitter();

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
			this.definitions = [];
			for (let customDef of this.word.customDefinitions) {
				this.definitions.push([null, customDef]);
			}

			// get official definitions
			this.WordDefinitionService.define(this.word.word)
				.then(
				(dictDefs:Array<any>) => {
					if (!dictDefs) { return };
					this.definitions = this.definitions.concat(dictDefs);
					this.definitionsLoaded = true;
				}, ()=> {
					this.definitionsError = true;
				});

			this.defined = true;
		}

		this.definitionVisible = true;
	}

	onDismissDefinition() {
		this.definitionVisible = false;
	}

	addCustomDefinition():void{
		this.newCustomDefArray.push(new FormControl(null, Validators.required));
	}

	removeCustomDefinition(idx:number):void{
		this.newCustomDefArray.removeAt(idx);
	}

	submitCustomDefinitions():void {
		if (!this.newCustomDefArray.valid) {
			alert("please enter all definitions");
			return;
		}

		let newDefinitions = this.newCustomDefArray.value;
		this.updateCustomDefinitions.emit(newDefinitions);
		for (let d of newDefinitions) {
			this.definitions.push([null, d]);
		}

		this.newCustomDefControls = [];
		this.newCustomDefArray = new FormArray(this.newCustomDefControls);
	}
}