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
const XMLChild_1 = require("../../lib/annotations/XMLChild");
const XMLElement_1 = require("../../lib/annotations/XMLElement");
const XMLAttribute_1 = require("../../lib/annotations/XMLAttribute");
exports.PERSON_ROOT = 'person';
exports.PERSON_NS = 'ps';
let Person = class Person {
    constructor(firstname, lastname, age, pets, hobbies) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.pets = pets;
        this.hobbies = hobbies;
    }
    get fullname() {
        return this.firstname + ' ' + this.lastname;
    }
    getFirstname() {
        return this.firstname;
    }
    getAge() {
        return this.age;
    }
    addHobby(hobby) {
        if (!this.hobbies)
            this.hobbies = [];
        this.hobbies.push(hobby);
    }
    addHobbies(hobbies) {
        if (!this.hobbies)
            this.hobbies = [];
        this.hobbies.push(...hobbies);
    }
    addFriend(friend) {
        if (!this.friends)
            this.friends = [];
        this.friends.push(friend);
    }
    addFriends(friends) {
        if (!this.friends)
            this.friends = [];
        this.friends.push(...friends);
    }
    addPets(pets) {
        if (!this.pets)
            this.pets = [];
        this.pets.push(...pets);
    }
};
__decorate([
    XMLAttribute_1.XMLAttribute({ namespace: '' }),
    __metadata("design:type", String)
], Person.prototype, "firstname", void 0);
__decorate([
    XMLAttribute_1.XMLAttribute({ namespace: exports.PERSON_NS }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Person.prototype, "fullname", null);
__decorate([
    XMLAttribute_1.XMLAttribute({ namespace: exports.PERSON_NS }),
    __metadata("design:type", Number)
], Person.prototype, "age", void 0);
__decorate([
    XMLChild_1.XMLChild({
        namespace: exports.PERSON_NS,
        name: 'hobby'
    }),
    __metadata("design:type", Array)
], Person.prototype, "hobbies", void 0);
__decorate([
    XMLChild_1.XMLChild({
        namespace: exports.PERSON_NS,
        stripPluralS: true
    }),
    __metadata("design:type", Array)
], Person.prototype, "friends", void 0);
__decorate([
    XMLChild_1.XMLChild({
        name: 'pet',
        implicitStructure: 'pets.$'
    }),
    __metadata("design:type", Array)
], Person.prototype, "pets", void 0);
Person = __decorate([
    XMLElement_1.XMLElement({ root: exports.PERSON_ROOT }),
    __metadata("design:paramtypes", [String, String, Number, Object, Object])
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map