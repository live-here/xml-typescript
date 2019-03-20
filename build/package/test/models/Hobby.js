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
var XMLAttribute_1 = require("../../lib/annotations/XMLAttribute");
exports.HOBBY_NS = 'h';
var Hobby = /** @class */ (function () {
    function Hobby(name, description) {
        this.h = 'http://hobby.example.com';
        this.name = name;
        this.description = description;
    }
    Hobby.prototype.getName = function () {
        return this.name;
    };
    Hobby.prototype.getDescription = function () {
        return this.description;
    };
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: 'xmlns' }),
        __metadata("design:type", String)
    ], Hobby.prototype, "h", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: exports.HOBBY_NS }),
        __metadata("design:type", String)
    ], Hobby.prototype, "name", void 0);
    __decorate([
        XMLAttribute_1.XMLAttribute({ namespace: exports.HOBBY_NS }),
        __metadata("design:type", String)
    ], Hobby.prototype, "description", void 0);
    return Hobby;
}());
exports.Hobby = Hobby;
//# sourceMappingURL=Hobby.js.map