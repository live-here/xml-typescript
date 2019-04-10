"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
const chai_1 = require("chai");
const Person_1 = require("../models/Person");
const Hobby_1 = require("../models/Hobby");
const index_1 = require("../../index");
const utils_1 = require("../../lib/utils");
const elisa = new Person_1.Person('Elisa', '_', 25);
const robin = new Person_1.Person('Robin', 'Buschmann', 29);
const hobbies = [
    new Hobby_1.Hobby('reading', 'loves to read books, magazines and web articles'),
    new Hobby_1.Hobby('listening to Music', 'loves to listen to rock music'),
    new Hobby_1.Hobby('travelling', 'loves to travel around the world'),
];
elisa.addFriend(robin);
elisa.addHobbies(hobbies);
elisa.addPets(['dog', 'cat']);
const personXmlElement = index_1.xml.getXMLElement(elisa);
const PS_NS_URL = 'http://person.example.com';
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
describe("Person", () => {
    describe("schema", () => {
        const schema = index_1.xml.getSchema(elisa);
        describe("attributes", () => {
            it(`should have attributes "firstname" and "age" with specified values`, () => {
                const attributes = schema[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'firstname')]).to.equal(elisa.getFirstname());
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'fullname')]).to.equal(elisa.fullname);
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'age')]).to.equal(elisa.getAge());
                chai_1.expect(attributes[utils_1.ns('xmlns', Person_1.PERSON_NS)]).to.equal(PS_NS_URL);
            });
        });
        describe("childs", () => {
            it(`should have dynamic child "thoughtful"`, () => {
                chai_1.expect(schema).to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'), true);
            });
            it(`should have child hobbies named as "hobby"`, () => {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')].length).to.equal(hobbies.length);
            });
            it(`should have child hobbies with attributes "name" and "description" with specified values`, () => {
                const hobbySchemas = schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')];
                hobbySchemas.forEach(hobbySchema => {
                    const hobbyAttrSchema = hobbySchema[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                    const hobby = hobbies.find(value => value.getName() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'name')] &&
                        value.getDescription() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'description')]);
                    chai_1.expect(hobby).not.to.be.undefined;
                });
            });
            it(`should have child friends named as "friend"`, () => {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0]).not.to.equal(robin);
            });
            it(`should have child pets processed with implicit structure`, () => {
                chai_1.expect(schema.pets).not.to.be.undefined;
                chai_1.expect(schema.pets.pet).not.to.be.undefined;
                chai_1.expect(schema.pets.pet instanceof Array).to.be.true;
            });
            it(`should have friends with no "xmlns:${Person_1.PERSON_NS}" attribute and no "thoughtful" child`, () => {
                const friend = schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0];
                const friendAttributes = friend[utils_1.DEFAULT_ATTRIBUTE_PROPERTY];
                chai_1.expect(friend).not.to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'));
                chai_1.expect(friendAttributes).not.to.have.property(utils_1.ns('xmlns', Person_1.PERSON_NS));
            });
        });
        describe("async process", () => {
            it(`should result in the same schema value as schema from sync process`, () => index_1.xml
                .getSchemaAsync(elisa)
                .then(asyncSchema => chai_1.expect(asyncSchema).to.deep.equal(schema)));
        });
    });
    describe("schema with options", () => {
        const ATTR_PROPERTY = 'attributes';
        const OPTIONS = { attrContainerName: ATTR_PROPERTY };
        const schema = index_1.xml.getSchema(elisa, OPTIONS);
        describe("attributes", () => {
            it(`should have attributes "firstname" and "age" with specified values`, () => {
                const attributes = schema[ATTR_PROPERTY];
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'firstname')]).to.equal(elisa.getFirstname());
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'fullname')]).to.equal(elisa.fullname);
                chai_1.expect(attributes[utils_1.ns(Person_1.PERSON_NS, 'age')]).to.equal(elisa.getAge());
                chai_1.expect(attributes[utils_1.ns('xmlns', Person_1.PERSON_NS)]).to.equal(PS_NS_URL);
            });
        });
        describe("childs", () => {
            it(`should have dynamic child "thoughtful"`, () => {
                chai_1.expect(schema).to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'), true);
            });
            it(`should have child hobbies named as "hobby"`, () => {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')].length).to.equal(hobbies.length);
            });
            it(`should have child hobbies with attributes "name" and "description" with specified values`, () => {
                const hobbySchemas = schema[utils_1.ns(Person_1.PERSON_NS, 'hobby')];
                hobbySchemas.forEach(hobbySchema => {
                    const hobbyAttrSchema = hobbySchema[ATTR_PROPERTY];
                    const hobby = hobbies.find(value => value.getName() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'name')] &&
                        value.getDescription() === hobbyAttrSchema[utils_1.ns(Hobby_1.HOBBY_NS, 'description')]);
                    chai_1.expect(hobby).not.to.be.undefined;
                });
            });
            it(`should have child friends named as "friend"`, () => {
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')]).not.to.be.undefined;
                chai_1.expect(schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0]).not.to.equal(robin);
            });
            it(`should have child pets processed with implicit structure`, () => {
                chai_1.expect(schema.pets).not.to.be.undefined;
                chai_1.expect(schema.pets.pet).not.to.be.undefined;
                chai_1.expect(schema.pets.pet instanceof Array).to.be.true;
            });
            it(`should have friends with no "xmlns:${Person_1.PERSON_NS}" attribute and no "thoughtful" child`, () => {
                const friend = schema[utils_1.ns(Person_1.PERSON_NS, 'friend')][0];
                const friendAttributes = friend[ATTR_PROPERTY];
                chai_1.expect(friend).not.to.have.property(utils_1.ns(Person_1.PERSON_NS, 'thoughtful'));
                chai_1.expect(friendAttributes).not.to.have.property(utils_1.ns('xmlns', Person_1.PERSON_NS));
            });
        });
        describe("async process", () => {
            it(`should result in the same schema value as schema from sync process`, () => index_1.xml
                .getSchemaAsync(elisa, OPTIONS)
                .then(asyncSchema => chai_1.expect(asyncSchema).to.deep.equal(schema)));
        });
    });
    describe("xml", () => {
        it(`should be defined and of type string`, () => {
            const result = index_1.xml.serialize(elisa);
            chai_1.expect(result).not.to.be.undefined;
            chai_1.expect(typeof result).to.equal('string');
        });
        describe("async process", () => {
            it(`should be defined and of type string`, () => index_1.xml
                .serializeAsync('great-person', elisa)
                .then(result => {
                chai_1.expect(result).not.to.be.undefined;
                chai_1.expect(typeof result).to.equal('string');
            }));
        });
    });
});
//# sourceMappingURL=Person.spec.js.map