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
// Importing the "Injectable" function from the angular2/core module
// and adding the "@Injectable" decorator lets us use dependency injection
// in this service.
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var WordDefinitionService = (function () {
    function WordDefinitionService(http) {
        var _this = this;
        this.dict = {};
        http.get('./resources/dictionary/dict.json').map(function (res) { return res.json(); }).subscribe(function (res) { return _this.dict = res; });
    }
    // definitions have the following schema:
    // list of definitions, for each definition:
    // 0th element is the part of speech
    // 1st element is the definition
    // TODO: do this with objects
    WordDefinitionService.prototype.define = function (word) {
        if (!this.dict) {
            return [];
        }
        return this.dict[word.toLowerCase()];
    };
    WordDefinitionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WordDefinitionService);
    return WordDefinitionService;
}());
exports.WordDefinitionService = WordDefinitionService;
//# sourceMappingURL=wordDefinition.service.js.map