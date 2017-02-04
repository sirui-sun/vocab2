System.register(['angular2/core', './word.component', './wordList.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, word_component_1, wordList_service_1;
    var WordListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (word_component_1_1) {
                word_component_1 = word_component_1_1;
            },
            function (wordList_service_1_1) {
                wordList_service_1 = wordList_service_1_1;
            }],
        execute: function() {
            // The ListComponent metadata defines the component's selector,
            // the url of the template and the directives used in this template.
            WordListComponent = (function () {
                function WordListComponent(wordListService) {
                    this.wordListService = wordListService;
                    this.newWord = { "word": "" };
                }
                // the arrow is equivalent to a function declaration
                // the content to the left of the arrow is the function input
                // the content to right fo the arrow is the function body
                WordListComponent.prototype.getWordsLists = function () {
                    var _this = this;
                    this.wordListService.getWords().then(function (words) { return _this.words = words; });
                };
                WordListComponent.prototype.ngOnInit = function () {
                    this.getWordsLists();
                };
                WordListComponent.prototype.deleteWord = function (word, i) {
                    this.wordListService.deleteWord(word.word);
                    this.getWordsLists();
                };
                WordListComponent.prototype.onSubmit = function (word) {
                    // TODO: can we use a constructor for Word objects?
                    this.newWord["whenAdded"] = new Date();
                    this.newWord["interval"] = 0;
                    this.wordListService.addWord(this.newWord);
                    this.getWordsLists();
                    this.newWord = { "word": "" };
                };
                WordListComponent = __decorate([
                    core_1.Component({
                        selector: 'sp-wordlist',
                        templateUrl: './templates/wordList.html',
                        directives: [word_component_1.WordComponent],
                        providers: [wordList_service_1.WordListService],
                        inputs: ["newWord"]
                    }), 
                    __metadata('design:paramtypes', [wordList_service_1.WordListService])
                ], WordListComponent);
                return WordListComponent;
            }());
            exports_1("WordListComponent", WordListComponent);
        }
    }
});
//# sourceMappingURL=wordlist.component.js.map