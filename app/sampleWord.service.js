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
var SampleWordService = (function () {
    // to do: turn the observable into a promise
    // use that promise in the sample word - only if the initial promise resolves do you resolve the second promise
    // constructor(http: Http) {
    // 	this.sampleWords = [];
    // 	http.get('./resources/sampleWords.json')
    //      .map((res: Response) => res.json()).subscribe((res : Response) => this.sampleWords = res);
    // }
    function SampleWordService(http) {
        var _this = this;
        this.sampleWords = []; // list of sample words
        var p = http.get('./resources/sampleWords.json').map(function (res) { return res.json(); }).toPromise();
        this.isLoadedPromise = p.then(function (res) { return _this.sampleWords = res; });
    }
    SampleWordService.prototype.getSampleWord = function () {
        var _this = this;
        return this.isLoadedPromise.then(function () {
            return _this.sampleWords[Math.floor(Math.random() * _this.sampleWords.length)];
        });
        // console.log("got here");
        // if(!this.sampleWords) { return "no word"; }
        // return this.sampleWords[Math.floor(Math.random() * this.sampleWords.length)];
    };
    return SampleWordService;
}());
SampleWordService = __decorate([
    core_1.Injectable()
    // Returns definitions for a given word
    ,
    __metadata("design:paramtypes", [http_1.Http])
], SampleWordService);
exports.SampleWordService = SampleWordService;
//# sourceMappingURL=sampleWord.service.js.map