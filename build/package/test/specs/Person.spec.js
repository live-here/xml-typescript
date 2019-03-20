"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
var chai_1 = require("chai");
var Person_1 = require("../models/Person");
var Hobby_1 = require("../models/Hobby");
var index_1 = require("../../index");
var utils_1 = require("../../lib/utils");
var elisa = new Person_1.Person('Elisa', '_', 25);
var robin = new Person_1.Person('Robin', 'Buschmann', 29);
var hobbies = [
    new Hobby_1.Hobby('reading', 'loves to read books, magazines and web articles'),
    new Hobby_1.Hobby('listening to Music', 'loves to listen to rock music'),
    new Hobby_1.Hobby('travelling', 'loves to travel around the world'),
];
elisa.addFriend(robin);
elisa.addHobbies(hobbies);
elisa.addPets(['dog', 'cat']);
var personXmlElement = index_1.xml.getXMLElement(elisa);
var PS_NS_URL = 'http://person.example.com';
if (personXmlElement) {
    personXmlElement.addAttribute(index_1.xmlAttribute.createAttribute({
        name: 'ps',
        namespace: 'xmlns',
        value: PS_NS_URL,
        restrictTo: [elisa]
    }));
    personXmlElement.addChild(index_1.xmlChild.createXmlChild({
        name: 'thoughtful',
        namespace: Person_1.PERSON_NS,
        value: true,
        restrictTo: [elisa]
    }));
}
describe("Person", function () {
    describe("schema", function () {
        var schema = index_1.xml.getSchema(elisa);
        describe("attributes", function () {
            it("should have attributes \"firstname\" and \"age\" with specified values", function () {
                var attributes = schema[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'firstname')]).to.equal(elisa.getFirstname());
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'fullname')]).to.equal(elisa.fullname);
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'age')]).to.equal(elisa.getAge());
                chai_1.expect(attributes[utils_1.ns('xmlns', Person_1.PERSON_NS)]).to.equal(PS_NS_URL);
            });
        });
        describe("childs", function () {
            it("should have dynamic child \"thoughtful\"", function () {
                chai_1.expect(schema).to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'), true);
            });
            it("should have child hobbies named as \"hobby\"", function () {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')].length).to.equal(hobbies.length);
            });
            it("should have child hobbies with attributes \"name\" and \"description\" with specified values", function () {
                var hobbySchemas = schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')];
                hobbySchemas.forEach(function (hobbySchema) {
                    var hobbyAttrSchema = hobbySchema[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                    var hobby = hobbies.find(function (value) {
                        return value.getName() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'name')] &&
                            value.getDescription() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'description')];
                    });
                    chai_1.expect(hobby).not.to.be.undefined;
                });
            });
            it("should have child friends named as \"friend\"", function () {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0]).not.to.equal(robin);
            });
            it("should have child pets processed with implicit structure", function () {
                chai_1.expect(schema.pets).not.to.be.undefined;
                chai_1.expect(schema.pets.pet).not.to.be.undefined;
                chai_1.expect(schema.pets.pet instanceof Array).to.be.true;
            });
            it("should have friends with no \"xmlns:" + Person_1.PERSON_NS + "\" attribute and no \"thoughtful\" child", function () {
                var friend = schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0];
                var friendAttributes = friend[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                chai_1.expect(friend).not.to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'));
                chai_1.expect(friendAttributes).not.to.have.property(utils_1.ns('xmlns', Person_1.PERSON_NS));
            });
        });
        describe("async process", function () {
            it("should result in the same schema value as schema from sync process", function () {
                return index_1.xml
                    .getSchemaAsync(elisa)
                    .then(function (asyncSchema) { return chai_1.expect(asyncSchema).to.deep.equal(schema); });
            });
        });
    });
    describe("schema with options", function () {
        var ATTR_PROPERTY = 'attributes';
        var OPTIONS = { attrContainerName: ATTR_PROPERTY };
        var schema = index_1.xml.getSchema(elisa, OPTIONS);
        describe("attributes", function () {
            it("should have attributes \"firstname\" and \"age\" with specified values", function () {
                var attributes = schema[ATTR_PROPERTY];
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'firstname')]).to.equal(elisa.getFirstname());
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'fullname')]).to.equal(elisa.fullname);
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'age')]).to.equal(elisa.getAge());
                chai_1.expect(attributes[utils_1.ns('xmlns', Person_1.PERSON_NS)]).to.equal(PS_NS_URL);
            });
        });
        describe("childs", function () {
            it("should have dynamic child \"thoughtful\"", function () {
                chai_1.expect(schema).to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'), true);
            });
            it("should have child hobbies named as \"hobby\"", function () {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')].length).to.equal(hobbies.length);
            });
            it("should have child hobbies with attributes \"name\" and \"description\" with specified values", function () {
                var hobbySchemas = schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')];
                hobbySchemas.forEach(function (hobbySchema) {
                    var hobbyAttrSchema = hobbySchema[ATTR_PROPERTY];
                    var hobby = hobbies.find(function (value) {
                        return value.getName() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'name')] &&
                            value.getDescription() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'description')];
                    });
                    chai_1.expect(hobby).not.to.be.undefined;
                });
            });
            it("should have child friends named as \"friend\"", function () {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0]).not.to.equal(robin);
            });
            it("should have child pets processed with implicit structure", function () {
                chai_1.expect(schema.pets).not.to.be.undefined;
                chai_1.expect(schema.pets.pet).not.to.be.undefined;
                chai_1.expect(schema.pets.pet instanceof Array).to.be.true;
            });
            it("should have friends with no \"xmlns:" + Person_1.PERSON_NS + "\" attribute and no \"thoughtful\" child", function () {
                var friend = schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0];
                var friendAttributes = friend[ATTR_PROPERTY];
                chai_1.expect(friend).not.to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'));
                chai_1.expect(friendAttributes).not.to.have.property(utils_1.ns('xmlns', Person_1.PERSON_NS));
            });
        });
        describe("async process", function () {
            it("should result in the same schema value as schema from sync process", function () {
                return index_1.xml
                    .getSchemaAsync(elisa, OPTIONS)
                    .then(function (asyncSchema) { return chai_1.expect(asyncSchema).to.deep.equal(schema); });
            });
        });
    });
    describe("xml", function () {
        it("should be defined and of type string", function () {
            var result = index_1.xml.serialize(elisa);
            chai_1.expect(result).not.to.be.undefined;
            chai_1.expect(typeof result).to.equal('string');
        });
        describe("async process", function () {
            it("should be defined and of type string", function () {
                return index_1.xml
                    .serializeAsync('great-person', elisa)
                    .then(function (result) {
                    chai_1.expect(result).not.to.be.undefined;
                    chai_1.expect(typeof result).to.equal('string');
                });
            });
        });
    });
});
//# sourceMappingURL=Person.spec.js.map