"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Promise = require("bluebird");
var js2xmlparser = require("js2xmlparser");
var utils_1 = require("../utils");
var META_KEY = 'xml:element';
var XMLElement = /** @class */ (function () {
    function XMLElement() {
    }
    XMLElement.serialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = this.getRootAndEntity(args), root = _a.root, entity = _a.entity;
        var schema = this.getSchema(entity);
        var parserOptions = args[2]
            ? args[2]
            : {
                declaration: {
                    encoding: 'UTF-8'
                }
            };
        return js2xmlparser.parse(root, schema, parserOptions);
    };
    XMLElement.serializeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = this.getRootAndEntity(args), root = _a.root, entity = _a.entity;
        var parserOptions = args[2]
            ? args[2]
            : {
                declaration: {
                    encoding: 'UTF-8'
                }
            };
        return this.getSchemaAsync(entity)
            .then(function (schema) { return js2xmlparser.parse(root, schema, parserOptions); });
    };
    XMLElement.getSchema = function (arg, schemaOptions) {
        var _this = this;
        if (schemaOptions === void 0) { schemaOptions = {}; }
        if (arg === void 0)
            return;
        if (Array.isArray(arg)) {
            return arg.map(function (entity) { return _this.processSchema(entity, false, schemaOptions); });
        }
        return this.processSchema(arg, false, schemaOptions);
    };
    XMLElement.getSchemaAsync = function (arg, schemaOptions) {
        var _this = this;
        if (schemaOptions === void 0) { schemaOptions = {}; }
        var processAsync = function (entity) {
            return Promise.resolve(_this.processSchema(entity, true, schemaOptions));
        };
        if (arg === void 0)
            Promise.resolve();
        if (Array.isArray(arg)) {
            return Promise.all(arg.map(function (entity) { return processAsync(entity); }));
        }
        return processAsync(arg);
    };
    XMLElement.getXMLElement = function (target) {
        return Reflect.getMetadata(META_KEY, target);
    };
    XMLElement.setXMLElement = function (target, element) {
        return Reflect.defineMetadata(META_KEY, element, target);
    };
    XMLElement.getOrCreateIfNotExists = function (target) {
        var element = this.getXMLElement(target);
        if (!element) {
            element = new XMLElement();
            this.setXMLElement(target, element);
        }
        return element;
    };
    XMLElement.annotate = function (target, options) {
        var element = this.getOrCreateIfNotExists(target);
        element.root = options.root;
    };
    XMLElement.processSchema = function (entity, isAsync, schemaOptions) {
        if (entity && typeof entity === 'object') {
            var element = XMLElement.getXMLElement(entity);
            if (element) {
                return element.getSchema(entity, isAsync, schemaOptions);
            }
        }
        return entity;
    };
    XMLElement.getRootAndEntity = function (args) {
        var entity;
        var root;
        if (args.length === 1) {
            entity = args[0];
        }
        else {
            root = args[0];
            entity = args[1];
        }
        var element = this.getXMLElement(entity);
        if (!root && element && element.root) {
            root = element.root;
        }
        if (!root) {
            throw new Error('No root defined for entity: ' + JSON.stringify(entity));
        }
        return { root: root, entity: entity };
    };
    XMLElement.prototype.addAttribute = function (attribute) {
        if (!this.attributes)
            this.attributes = [];
        this.attributes.push(attribute);
    };
    XMLElement.prototype.addChild = function (child) {
        if (!this.children)
            this.children = [];
        this.children.push(child);
    };
    XMLElement.prototype.getSchema = function (entity, isAsync, schemaOptions) {
        var object = {};
        var attrProperty = schemaOptions.attrContainerName || utils_1.DEFAULT_ATTRIBUTE_PROPERTY;
        if (this.attributes) {
            object[attrProperty] = {};
            this.attributes.forEach(function (attr) { return attr.setSchema(object[attrProperty], entity); });
        }
        if (this.children) {
            this.children.forEach(function (child) { return child.setSchema(object, entity, isAsync, schemaOptions); });
        }
        return object;
    };
    return XMLElement;
}());
exports.XMLElement = XMLElement;
//# sourceMappingURL=XMLElement.js.map