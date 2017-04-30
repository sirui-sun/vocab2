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
var core_1 = require("@angular/core");
var word_component_1 = require("./word.component");
var wordList_service_1 = require("./wordList.service");
var sampleWord_service_1 = require("./sampleWord.service");
var forms_1 = require("@angular/forms");
// The ListComponent metadata defines the component's selector,
// the url of the template and the directives used in this template.
var WordListComponent = (function () {
    function WordListComponent(wordListService, sampleWordService) {
        this.wordListService = wordListService;
        this.sampleWordService = sampleWordService;
        this.autoGotItInterval = 9999999; // ms after which we automatically increment
        this.displayEmptyState = false; // should we display empty state
        this.reviewMode = false; // review mode: show all words
        this.newWord = "";
        this.newCustomDefinitions = [];
        this.sampleWord = "";
        // form controls
        this.wordControl = new forms_1.FormControl(null, forms_1.Validators.required);
        this.customDefControls = [];
        this.customDefArray = new forms_1.FormArray(this.customDefControls);
        // listen to messages passed from content extension, and add them to local storage
    }
    WordListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getWordsLists();
        this.checkAutoGotIt();
        var t = this;
        this.sampleWordService.getSampleWord().then(function (sampleWord) { _this.sampleWord = sampleWord; });
        if (chrome) {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                t.onBgAddWord(request);
            });
        }
    };
    // the arrow is equivalent to a function declaration
    // the content to the left of the arrow is the function input
    // the content to right fo the arrow is the function body
    WordListComponent.prototype.getWordsLists = function () {
        var _this = this;
        this.wordListService.getWords()
            .then(function (words) { return _this.words = words; })
            .then(function () {
            // // check if we should be displaying empty state
            for (var _i = 0, _a = _this.words; _i < _a.length; _i++) {
                var word = _a[_i];
                if (word.shouldBeDisplayed()) {
                    _this.displayEmptyState = false;
                    return;
                }
            }
            _this.displayEmptyState = true;
        });
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
    WordListComponent.prototype.onUpdateCustomDefinitions = function (word, event) {
        this.wordListService.updateWordWithCustomDefinitions(word.word, event);
    };
    WordListComponent.prototype.onSubmitSampleWord = function () {
        var _this = this;
        this.onBgAddWord(this.sampleWord);
        this.sampleWordService.getSampleWord().then(function (sampleWord) { _this.sampleWord = sampleWord; });
        this.getWordsLists();
    };
    // when the document's visibility changes, checks if we should auto-increment
    WordListComponent.prototype.checkAutoGotIt = function () {
        var _this = this;
        setTimeout(function () {
            if (document.visibilityState == "visible") {
                for (var _i = 0, _a = _this.words; _i < _a.length; _i++) {
                    var word = _a[_i];
                    if (word.shouldBeDisplayed()) {
                        _this.wordListService.onGotIt(word);
                    }
                }
            }
        }, this.autoGotItInterval);
    };
    WordListComponent.prototype.deleteWord = function (word, i) {
        this.wordListService.deleteWord(word.word);
        this.getWordsLists();
    };
    WordListComponent.prototype.addCustomDefinition = function () {
        this.customDefArray.push(new forms_1.FormControl(null, forms_1.Validators.required));
    };
    WordListComponent.prototype.removeCustomDefinition = function (idx) {
        this.customDefArray.removeAt(idx);
    };
    WordListComponent.prototype.onSubmit = function (word) {
        // customDef: update the Word
        // customDef: get the definition
        // customDef: if empty, engage the modal dialogue to ask for definition 
        // customDef: if not, then just add the word
        if (!this.wordControl.valid) {
            alert("please enter a word...");
            return;
        }
        if (!this.customDefArray.valid) {
            alert("please enter all definitions...");
            return;
        }
        var result = this.wordListService.addWord(new word_component_1.Word(this.wordControl.value, null, null, this.customDefArray.value));
        if (result == -1) {
            alert("You've already added this word...");
        }
        this.getWordsLists();
        this.wordControl.reset();
        this.customDefControls = [];
        this.customDefArray = new forms_1.FormArray(this.customDefControls);
    };
    // background word adds assume no custom definitions (for now)
    WordListComponent.prototype.onBgAddWord = function (word) {
        this.wordListService.addWord(new word_component_1.Word(word, null, null, null));
        this.getWordsLists();
    };
    WordListComponent.prototype.enableReviewMode = function () {
        this.reviewMode = true;
    };
    WordListComponent.prototype.disableReviewMode = function () {
        this.reviewMode = false;
    };
    return WordListComponent;
}());
WordListComponent = __decorate([
    core_1.Component({
        selector: 'sp-wordlist',
        templateUrl: './templates/wordList.html',
        providers: [wordList_service_1.WordListService, sampleWord_service_1.SampleWordService],
        inputs: ["newWord"]
    }),
    __metadata("design:paramtypes", [wordList_service_1.WordListService, sampleWord_service_1.SampleWordService])
], WordListComponent);
exports.WordListComponent = WordListComponent;
//# sourceMappingURL=wordlist.component.js.map