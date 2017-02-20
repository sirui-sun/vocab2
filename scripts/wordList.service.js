System.register(['./word.component', 'angular2/core'], function(exports_1, context_1) {
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
    var word_component_1, core_1;
    var WordListService;
    return {
        setters:[
            function (word_component_1_1) {
                word_component_1 = word_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            WordListService = (function () {
                function WordListService() {
                    this.LOCAL_STORAGE_KEY = "words";
                }
                WordListService.prototype.ngOnInit = function () {
                    if (localStorage[this.LOCAL_STORAGE_KEY] == null) {
                        localStorage[this.LOCAL_STORAGE_KEY] = [];
                    }
                };
                WordListService.prototype.getWords = function () {
                    var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    var returnWords = [];
                    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                        var word = words_1[_i];
                        returnWords.push(new word_component_1.Word(word["word"], word["whenAdded"], word["interval"]));
                    }
                    return Promise.resolve(returnWords);
                };
                WordListService.prototype.addWord = function (word) {
                    var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    // Look for word, quit if found, aka this word is a duplicate
                    if (this.findWord(word["word"], words) != -1) {
                        return;
                    }
                    words.push(word);
                    this.saveToLocalStorage(words);
                };
                // remove from localStorage
                WordListService.prototype.deleteWord = function (word) {
                    var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    var targetIdx = this.findWord(word, words);
                    if (targetIdx == -1) {
                        return;
                    }
                    else {
                        words.splice(targetIdx, 1);
                        this.saveToLocalStorage(words);
                    }
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
                    words[targetIdx] = new word_component_1.Word(targetWord.word, targetWord.whenAdded, targetWord.interval + 1);
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
                    var newInterval = targetWord.interval == 0 ? 1 : targetWord.interval;
                    words[targetIdx] = new word_component_1.Word(targetWord.word, new Date(), newInterval);
                    this.saveToLocalStorage(words);
                    return;
                };
                // returns index or -1 if not found
                WordListService.prototype.findWord = function (word, wordList) {
                    for (var i in wordList) {
                        if (word == wordList[i]["word"]) {
                            return i;
                        }
                    }
                    return -1;
                };
                // saves words to local storage
                WordListService.prototype.saveToLocalStorage = function (words) {
                    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(words));
                };
                WordListService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WordListService);
                return WordListService;
            }());
            exports_1("WordListService", WordListService);
        }
    }
});
//# sourceMappingURL=wordList.service.js.map