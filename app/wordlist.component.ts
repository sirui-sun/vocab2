import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Word } from './word.component';
import { WordComponent } from './word.component';
import { WordListService } from './wordList.service';
import { FormControl, FormArray, Validators } from '@angular/forms'

// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
@Component({
    selector: 'sp-wordlist',
    templateUrl: './templates/wordList.html',
    providers: [ WordListService ],
    inputs: ["newWord"]
})

export class WordListComponent implements OnInit {
	
	public words : Array<Word>;		// full set of words

	// fields
	newWord:string = "";
	newCustomDefinitions:Array<Object> = [];
	
	// form controls
	wordControl:FormControl = new FormControl(null , Validators.required);
	customDefControls:Array<FormControl> = [];
	customDefArray:FormArray = new FormArray(this.customDefControls);

	constructor ( private wordListService : WordListService ) { 
		// listen to messages passed from content extension, and add them to local storage
	}

	// the arrow is equivalent to a function declaration
	// the content to the left of the arrow is the function input
	// the content to right fo the arrow is the function body
	getWordsLists() {
		this.wordListService.getWords().then((words:any) => this.words = words);
	}

	// TODO: is there a way to do this without repeatedly calling getWordsLists
	onGotIt( word : Word ) {
		this.wordListService.onGotIt(word);
		this.getWordsLists();
	}

	onForget( word : Word) {
		this.wordListService.onForget(word);
		this.getWordsLists();
	}

	onUpdateCustomDefinitions(word:Word, event:any) {
		this.wordListService.updateWordWithCustomDefinitions(word.word, event)
	}

	ngOnInit() {
		this.getWordsLists();
		let t = this;

		// if (chrome) {
		// 	chrome.runtime.onMessage.addListener(
		// 		function(request : any , sender : any, sendResponse : any) {
	 //  				// console.log("background task received request: " + rquest);
	 //  				t.onBgAddWord(request);
		// 	});
		// }
	}

	deleteWord ( word : Word, i : number) {
		this.wordListService.deleteWord(word.word);
		this.getWordsLists();
	}

	addCustomDefinition():void{
		this.customDefArray.push(new FormControl(null, Validators.required));
	}

	removeCustomDefinition(idx:number):void{
		this.customDefArray.removeAt(idx);
	}

	onSubmit ( word : Word ) {
		// customDef: update the Word
		// customDef: get the definition
		// customDef: if empty, engage the modal dialogue to ask for definition 
		// customDef: if not, then just add the word
		if(!this.wordControl.valid) {
			alert("please enter a word...");
			return;
		}

		if(!this.customDefArray.valid){
			alert("please enter all definitions...");
			return;
		}

		let result = this.wordListService.addWord(new Word(this.wordControl.value, null, null, this.customDefArray.value));
		if (result == -1 ) {
			alert("You've already added this word...");
		}

		this.getWordsLists();
		this.wordControl.reset();
		this.customDefControls = [];
		this.customDefArray = new FormArray(this.customDefControls);
	}

	// background word adds assume no custom definitions (for now)
	onBgAddWord ( word : string ) {
		this.wordListService.addWord(new Word(word, null, null, null));
		this.getWordsLists();
	}
}