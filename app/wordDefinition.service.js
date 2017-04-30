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
// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var WordDefinitionService = (function () {
    function WordDefinitionService(http) {
        this.dict = {}; // internal cache
        // root URL for API
        this.API_ROOT = "https://od-api.oxforddictionaries.com/api/v1/entries/en/";
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('app_id', '4b622080');
        this.headers.append('app_key', 'c532ab8c56d05f0499258bd40eaaa447');
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    // definitions have the following schema:
    // list of definitions, for each definition:
    // 0th element is the part of speech
    // 1st element is the definition
    // TODO: do this with objects
    WordDefinitionService.prototype.define = function (w) {
        var _this = this;
        var word = w.toLowerCase();
        // TO DO: localStorage caching of objects
        var requestURL = this.generateRequestURL(word);
        var p1 = this.http.get(requestURL, this.options).map(function (res) { return res.json(); }).toPromise();
        var p2 = p1.then(function (response) {
            try {
                var allDefinitions = [];
                var results = response["results"];
                for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                    var result = results_1[_i];
                    var lexicalEntries = result["lexicalEntries"];
                    for (var _a = 0, lexicalEntries_1 = lexicalEntries; _a < lexicalEntries_1.length; _a++) {
                        var lexicalEntry = lexicalEntries_1[_a];
                        var pos = lexicalEntry["lexicalCategory"];
                        var entries = lexicalEntry["entries"];
                        for (var _b = 0, entries_1 = entries; _b < entries_1.length; _b++) {
                            var entry = entries_1[_b];
                            var senses = entry["senses"];
                            for (var _c = 0, senses_1 = senses; _c < senses_1.length; _c++) {
                                var sense = senses_1[_c];
                                var definitions = sense["definitions"];
                                for (var _d = 0, definitions_1 = definitions; _d < definitions_1.length; _d++) {
                                    var definition = definitions_1[_d];
                                    allDefinitions.push([pos, definition]);
                                }
                            }
                        }
                    }
                }
                return allDefinitions;
            }
            catch (err) {
                console.log("somethign went wrong in parsing return JSON...");
                return [];
            }
        }, function () { });
        // cache entry
        p2.then(function (allDefinitions) { _this.dict[word] = allDefinitions; }, function () { });
        return p2;
    };
    WordDefinitionService.prototype.generateRequestURL = function (word) {
        return this.API_ROOT + word + "/definitions";
    };
    return WordDefinitionService;
}());
WordDefinitionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WordDefinitionService);
exports.WordDefinitionService = WordDefinitionService;
//# sourceMappingURL=wordDefinition.service.js.map