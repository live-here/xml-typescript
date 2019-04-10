"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Promise = require("bluebird");
const js2xmlparser = require("js2xmlparser");
const utils_1 = require("../utils");
const META_KEY = 'xml:element';
class XMLElement {
    static serialize(...args) {
        const { root, entity } = this.getRootAndEntity(args);
        const schema = this.getSchema(entity);
        const parserOptions = args[2]
            ? args[2]
            : {
                declaration: {
                    encoding: 'UTF-8'
                }
            };
        return js2xmlparser.parse(root, schema, parserOptions);
    }
    static serializeAsync(...args) {
        const { root, entity } = this.getRootAndEntity(args);
        const parserOptions = args[2]
            ? args[2]
            : {
                declaration: {
                    encoding: 'UTF-8'
                }
            };
        return this.getSchemaAsync(entity)
            .then(schema => js2xmlparser.parse(root, schema, parserOptions));
    }
    static getSchema(arg, schemaOptions = {}) {
        if (arg === void 0)
            return;
        if (Array.isArray(arg)) {
            return arg.map(entity => this.processSchema(entity, false, schemaOptions));
        }
        return this.processSchema(arg, false, schemaOptions);
    }
    static getSchemaAsync(arg, schemaOptions = {}) {
        const processAsync = (entity) => {
            return Promise.resolve(this.processSchema(entity, true, schemaOptions));
        };
        if (arg === void 0)
            Promise.resolve();
        if (Array.isArray(arg)) {
            return Promise.all(arg.map(entity => processAsync(entity)));
        }
        return processAsync(arg);
    }
    static getXMLElement(target) {
        return Reflect.getMetadata(META_KEY, target);
    }
    static setXMLElement(target, element) {
        return Reflect.defineMetadata(META_KEY, element, target);
    }
    static getOrCreateIfNotExists(target) {
        let element = this.getXMLElement(target);
        if (!element) {
            element = new XMLElement();
            this.setXMLElement(target, element);
        }
        return element;
    }
    static annotate(target, options) {
        let element = this.getOrCreateIfNotExists(target);
        element.root = options.root;
    }
    static processSchema(entity, isAsync, schemaOptions) {
        if (entity && typeof entity === 'object') {
            const element = XMLElement.getXMLElement(entity);
            if (element) {
                return element.getSchema(entity, isAsync, schemaOptions);
            }
        }
        return entity;
    }
    static getRootAndEntity(args) {
        let entity;
        let root;
        if (args.length === 1) {
            entity = args[0];
        }
        else {
            root = args[0];
            entity = args[1];
        }
        const element = this.getXMLElement(entity);
        if (!root && element && element.root) {
            root = element.root;
        }
        if (!root) {
            throw new Error('No root defined for entity: ' + JSON.stringify(entity));
        }
        return { root, entity };
    }
    addAttribute(attribute) {
        if (!this.attributes)
            this.attributes = [];
        this.attributes.push(attribute);
    }
    addChild(child) {
        if (!this.children)
            this.children = [];
        this.children.push(child);
    }
    getSchema(entity, isAsync, schemaOptions) {
        const object = {};
        const attrProperty = schemaOptions.attrContainerName || utils_1.DEFAULT_ATTRIBUTE_PROPERTY;
        const val = this.value && this.value(entity);
        if (val) {
            object['#'] = val;
        }
        if (this.attributes) {
            object[attrProperty] = {};
            this.attributes.forEach(attr => attr.setSchema(object[attrProperty], entity));
        }
        if (this.children) {
            this.children.forEach(child => child.setSchema(object, entity, isAsync, schemaOptions));
        }
        // console.log('object', object);
        return object;
    }
}
exports.XMLElement = XMLElement;
//# sourceMappingURL=XMLElement.js.map