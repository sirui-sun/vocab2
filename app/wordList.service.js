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
Object.defineProperty(exports, "__esModule", { value: true });
var word_component_1 = require("./word.component");
var core_1 = require("@angular/core");
// import { DefinitionModal } from './word.component';
// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
var WordListService = (function () {
    function WordListService() {
        this.LOCAL_STORAGE_KEY = "words";
        if (localStorage[this.LOCAL_STORAGE_KEY] == null) {
            localStorage[this.LOCAL_STORAGE_KEY] = "[]";
        }
    }
    WordListService.prototype.getWords = function () {
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        var returnWords = [];
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            returnWords.push(new word_component_1.Word(word["word"], word["whenAdded"], word["interval"], word["customDefinitions"]));
        }
        return Promise.resolve(returnWords);
    };
    // RepeatDef
    WordListService.prototype.addWord = function (word) {
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        // Look for word, quit if found, aka this word is a duplicate
        if (this.findWord(word["word"], words) != -1) {
            return -1;
        }
        words.push(word);
        this.saveToLocalStorage(words);
        return 1;
    };
    WordListService.prototype.updateWordWithCustomDefinitions = function (word, customDefinitions) {
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        var targetIdx = this.findWord(word, words);
        if (targetIdx == -1) {
            return;
        }
        var targetWord = words[targetIdx];
        words[targetIdx] = new word_component_1.Word(targetWord.word, targetWord.whenAdded, targetWord.interval, targetWord.customDefinitions.concat(customDefinitions));
        this.saveToLocalStorage(words);
    };
    // remove from localStorage
    WordListService.prototype.deleteWord = function (word) {
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        var targetIdx = this.findWord(word, words);
        if (targetIdx == -1) {
            return;
        }
        words.splice(targetIdx, 1);
        this.saveToLocalStorage(words);
    };
    // increment word interval
    WordListService.prototype.onGotIt = function (word) {
        // are we at the terminal interval?
        if (word.interval >= word.intervals.length) {
            return;
        }
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        var targetIdx = this.findWord(word.word, words);
        if (targetIdx == -1) {
            return;
        }
        var targetWord = words[targetIdx];
        words[targetIdx] = new word_component_1.Word(targetWord.word, new Date(), targetWord.interval + 1, targetWord.customDefinitions);
        this.saveToLocalStorage(words);
        return;
    };
    // forget case - set timestamp to now, but don't touch interval
    // TODO: do we realy want that functionality?
    WordListService.prototype.onForget = function (word) {
        var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        var targetIdx = this.findWord(word.word, words);
        if (targetIdx == -1) {
            return;
        }
        var targetWord = words[targetIdx];
        var newInterval = targetWord.interval == 0 ? 1 : targetWord.interval - 1;
        words[targetIdx] = new word_component_1.Word(targetWord.word, new Date(), newInterval, targetWord.customDefinitions);
        this.saveToLocalStorage(words);
        return;
    };
    // returns index or -1 if not found
    WordListService.prototype.findWord = function (word, wordList) {
        for (var i in wordList) {
            if (word == wordList[i]["word"]) {
                return parseInt(i);
            }
        }
        return -1;
    };
    // saves words to local storage
    WordListService.prototype.saveToLocalStorage = function (words) {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(words));
    };
    return WordListService;
}());
WordListService = __decorate([
    core_1.Injectable()
    //localStorage word schema:
    // [ {
    //      word: string,    
    //      definitions: Array<{partOfSpeech:string; definition:string}>,
    //      whenAdded: number,  // when the word was added
    //      interval: number  // which spaced repetition interval
    //      customDefinitions: Array<{partOfSpeech:string; definition:string}>
    // }]
    ,
    __metadata("design:paramtypes", [])
], WordListService);
exports.WordListService = WordListService;
//# sourceMappingURL=wordList.service.js.map