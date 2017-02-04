System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var WordListService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            WordListService = (function () {
                function WordListService() {
                    this.LOCAL_STORAGE_KEY = "words";
                }
                // The "getBookmarks()" function checks if there is data in the local storage.
                // If there is, we return this data,
                // if there isn't we return the default data.
                WordListService.prototype.getWords = function () {
                    var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    if (words !== null) {
                        this.wordsToReturn = words;
                    }
                    return Promise.resolve(this.wordsToReturn);
                };
                // A "setBookmarks()" function saves new data in the local storage.
                WordListService.prototype.addWord = function (word) {
                    var words = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    // TODO: can we initialize this on init?
                    if (words == null) {
                        this.saveToLocalStorage([]);
                    }
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