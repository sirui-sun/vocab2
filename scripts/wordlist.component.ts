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
	public words : Array<Word>

	constructor ( private wordListService : WordListService ) { }

	// the arrow is equivalent to a function declaration
	// the content to the left of the arrow is the function input
	// the content to right fo the arrow is the function body
	getWordsLists() {
		this.wordListService.getWords().then( words => this.words = words)
	}

	ngOnInit() {
		this.getWordsLists();
	}

	deleteWord ( word : Word, i : number) {
		this.wordListService.deleteWord(word.word);
		this.getWordsLists();
	}

	onSubmit ( word : Word ) {
		// TODO: can we use a constructor for Word objects?
		this.newWord["whenAdded"] = new Date();
		this.newWord["interval"] = 0;
		this.wordListService.addWord(this.newWord);
		this.getWordsLists();
		this.newWord = {"word": ""};
	}
}