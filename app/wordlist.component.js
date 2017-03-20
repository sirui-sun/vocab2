"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var word_component_1 = require('./word.component');
var wordList_service_1 = require('./wordList.service');
// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
var WordListComponent = (function () {
    function WordListComponent(wordListService) {
        this.wordListService = wordListService;
        this.newWord = { "word": "" };
        // listen to messages passed from content extension, and add them to local storage
    }
    // the arrow is equivalent to a function declaration
    // the content to the left of the arrow is the function input
    // the content to right fo the arrow is the function body
    WordListComponent.prototype.getWordsLists = function () {
        var _this = this;
        this.wordListService.getWords().then(function (words) { return _this.words = words; });
    };
    // TODO: is there a way to do this without repeatedly calling getWordsLists
    WordListComponent.prototype.onGotIt = function (word) {
        this.wordListService.onGotIt(word);
        this.getWordsLists();
    };
    WordListComponent.prototype.onForget = function (word) {
        this.wordListService.onForget(word);
        this.getWordsLists();
    };
    WordListComponent.prototype.ngOnInit = function () {
        this.getWordsLists();
        var t = this;
        // if (chrome) {
        // 	chrome.runtime.onMessage.addListener(
        // 		function(request : any , sender : any, sendResponse : any) {
        //  				// console.log("background task received request: " + rquest);
        //  				t.onBgAddWord(request);
        // 	});
        // }
    };
    WordListComponent.prototype.deleteWord = function (word, i) {
        this.wordListService.deleteWord(word.word);
        this.getWordsLists();
    };
    WordListComponent.prototype.onSubmit = function (word) {
        this.wordListService.addWord(new word_component_1.Word(this.newWord.word, null, null));
        this.getWordsLists();
        this.newWord = new word_component_1.Word("", null, null);
    };
    WordListComponent.prototype.onBgAddWord = function (word) {
        this.wordListService.addWord(new word_component_1.Word(word, null, null));
        this.getWordsLists();
    };
    WordListComponent = __decorate([
        core_1.Component({
            selector: 'sp-wordlist',
            templateUrl: './templates/wordList.html',
            //directives: [ WordComponent ],
            providers: [wordList_service_1.WordListService],
            inputs: ["newWord"]
        }), 
        __metadata('design:paramtypes', [wordList_service_1.WordListService])
    ], WordListComponent);
    return WordListComponent;
}());
exports.WordListComponent = WordListComponent;
//# sourceMappingURL=wordlist.component.js.map