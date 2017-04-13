import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Word } from './word.component';
import { WordComponent } from './word.component';
import { WordListService } from './wordList.service';
import { SampleWordService } from './sampleWord.service';
import { FormControl, FormArray, Validators } from '@angular/forms'
declare var chrome:any;

// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
@Component({
    selector: 'sp-wordlist',
    templateUrl: './templates/wordList.html',
    providers: [ WordListService, SampleWordService ],
    inputs: ["newWord"]
})

export class WordListComponent implements OnInit {
	
	public words : Array<Word>;					// full set of words
	private autoGotItInterval:number = 10000;	// ms after which we automatically increment

	// fields
	public newWord:string = "";
	public newCustomDefinitions:Array<Object> = [];
	public sampleWord:string = "";
	
	// form controls
	wordControl:FormControl = new FormControl(null , Validators.required);
	customDefControls:Array<FormControl> = [];
	customDefArray:FormArray = new FormArray(this.customDefControls);


	constructor ( private wordListService : WordListService, private sampleWordService : SampleWordService) { 
		// listen to messages passed from content extension, and add them to local storage
	}

	ngOnInit() {
		this.getWordsLists();
		this.checkAutoGotIt();
		let t = this;
		this.sampleWordService.getSampleWord().then((sampleWord:string) => { this.sampleWord = sampleWord; });

		// if (chrome) {
		// 	chrome.runtime.onMessage.addListener(
		// 		function(request : any , sender : any, sendResponse : any) {
	 //  				t.onBgAddWord(request);
		// 	});
		// }

		// wait two seconds and then trigger an action

	}

	// the arrow is equivalent to a function declaration
	// the content to the left of the arrow is the function input
	// the content to right fo the arrow is the function body
	getWordsLists():void {
		this.wordListService.getWords().then((words:any) => this.words = words);
	}

	// TODO: is there a way to do this without repeatedly calling getWordsLists
	onGotIt( word : Word ):void {
		this.wordListService.onGotIt(word);
		this.getWordsLists();
	}

	onForget( word : Word):void {
		this.wordListService.onForget(word);
		this.getWordsLists();
	}

	onUpdateCustomDefinitions(word:Word, event:any):void  {
		this.wordListService.updateWordWithCustomDefinitions(word.word, event)
	}

	onSubmitSampleWord():void {
		this.onBgAddWord(this.sampleWord);
		this.sampleWordService.getSampleWord().then((sampleWord:string) => { this.sampleWord = sampleWord; });
		this.getWordsLists();
	}

	// when the document's visibility changes, checks if we should auto-increment
	checkAutoGotIt():void {
		setTimeout(()=> {
			if(document.visibilityState == "visible") {
				for (let word of this.words) {
					if (word.shouldBeDisplayed()) {
						this.wordListService.onGotIt(word);
					}
				}
			}
		}, this.autoGotItInterval);
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