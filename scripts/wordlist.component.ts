import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core';
import { Word } from './word.component';
import { WordComponent } from './word.component';
import { WordListService } from './wordList.service';

// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
@Component({
    selector: 'sp-wordlist',
    templateUrl: './templates/wordList.html',
    directives: [ WordComponent ],
    providers: [ WordListService ],
    inputs: ["newWord"]
})

export class WordListComponent implements OnInit {

	newWord = {"word": ""};
	public words : Array<Word>;		// full set of words

	constructor ( private wordListService : WordListService ) { }

	// the arrow is equivalent to a function declaration
	// the content to the left of the arrow is the function input
	// the content to right fo the arrow is the function body
	getWordsLists() {
		this.wordListService.getWords().then(words => this.words = words);
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
	}

	deleteWord ( word : Word, i : number) {
		this.wordListService.deleteWord(word.word);
		this.getWordsLists();
	}

	onSubmit ( word : Word ) {
		this.wordListService.addWord(new Word(this.newWord.word));
		this.getWordsLists();
		this.newWord = new Word("");
	}
}