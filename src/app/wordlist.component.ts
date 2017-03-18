import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Word } from './word.component';
import { WordComponent } from './word.component';
import { WordListService } from './wordList.service';

// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
@Component({
    selector: 'sp-wordlist',
    templateUrl: './templates/wordList.html',
    //directives: [ WordComponent ],
    providers: [ WordListService ],
    inputs: ["newWord"]
})

export class WordListComponent implements OnInit {

	newWord = {"word": ""};
	public words : Array<Word>;		// full set of words

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


	ngOnInit() {
		this.getWordsLists();
		let t = this;

		// if (chrome) {
		// 	chrome.runtime.onMessage.addListener(
		// 		function(request, sender, sendResponse) {
	 //  				console.log("background task received request: " + request);
	 //  				t.onBgAddWord(request);
		// 	});
		// }
	}

	deleteWord ( word : Word, i : number) {
		this.wordListService.deleteWord(word.word);
		this.getWordsLists();
	}

	onSubmit ( word : Word ) {
		this.wordListService.addWord(new Word(this.newWord.word, null, null));
		this.getWordsLists();
		this.newWord = new Word("", null, null);
	}

	onBgAddWord ( word : string ) {
		this.wordListService.addWord(new Word(word, null, null));
		this.getWordsLists();
	}
}