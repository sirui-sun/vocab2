System.register(['angular2/core', './wordDefinition.service'], function(exports_1, context_1) {
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
    var core_1, core_2, core_3, wordDefinition_service_1;
    var Word, WordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (wordDefinition_service_1_1) {
                wordDefinition_service_1 = wordDefinition_service_1_1;
            }],
        execute: function() {
            // interface Word {
            // 	word: string,
            // 	definitions: Array<{partOfSpeech:string; definition:string}>
            // }
            Word = (function () {
                function Word(word, whenAdded, interval) {
                    this.intervals = [0, 1 / 72, 1, 2, 4, 7, 11, 14, 21, 35, 70, 105];
                    this.word = word;
                    this.whenAdded = whenAdded ? whenAdded : new Date();
                    this.interval = interval ? interval : 0;
                    this.definitions = [];
                }
                // should this word currently be displayed?
                Word.prototype.shouldBeDisplayed = function () {
                    var now = new Date();
                    var toCheck = new Date(this.whenAdded);
                    toCheck.setDate(toCheck.getDate() + this.intervals[this.interval]);
                    return now > toCheck;
                };
                return Word;
            }());
            exports_1("Word", Word);
            WordComponent = (function () {
                // hmm, does each word have to declare its own private instance of word definition service?
                function WordComponent(WordDefinitionService) {
                    this.WordDefinitionService = WordDefinitionService;
                    this.definitions = [];
                    this.defined = false;
                    this.wordDeleted = new core_3.EventEmitter();
                    this.wordGotIt = new core_3.EventEmitter();
                    this.wordForgot = new core_3.EventEmitter();
                }
                WordComponent.prototype.onDelete = function (word) {
                    this.wordDeleted.emit(word);
                };
                WordComponent.prototype.onGotIt = function (word) {
                    this.wordGotIt.emit(word);
                };
                WordComponent.prototype.onForget = function (word) {
                    this.wordForgot.emit(word);
                };
                WordComponent.prototype.onDefine = function () {
                    this.defined = !(this.defined);
                    this.word.definitions = this.WordDefinitionService.define(this.word.word);
                };
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], WordComponent.prototype, "wordDeleted", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], WordComponent.prototype, "wordGotIt", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], WordComponent.prototype, "wordForgot", void 0);
                WordComponent = __decorate([
                    core_1.Component({
                        selector: 'sp-word',
                        templateUrl: './templates/word.html',
                        providers: [wordDefinition_service_1.WordDefinitionService],
                        inputs: ['word']
                    }), 
                    __metadata('design:paramtypes', [wordDefinition_service_1.WordDefinitionService])
                ], WordComponent);
                return WordComponent;
            }());
            exports_1("WordComponent", WordComponent);
        }
    }
});
//# sourceMappingURL=word.component.js.map