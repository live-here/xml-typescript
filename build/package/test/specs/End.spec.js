"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Hobby_1 = require("../models/Hobby");
const Person_1 = require("../models/Person");
const hobbies = [
    new Hobby_1.Hobby('reading', 'loves to read books, magazines and web articles', 'a'),
    new Hobby_1.Hobby('listening to Music', 'loves to listen to rock music', 'b'),
    new Hobby_1.Hobby('travelling', 'loves to travel around the world', 'c'),
];
const pets = ['dog', 'cat'];
const bob = new Person_1.Person('Bob', 'Mad', 29, pets, hobbies);
const bobXml = __1.xml.serialize(bob);
console.log(bobXml);
//# sourceMappingURL=End.spec.js.map