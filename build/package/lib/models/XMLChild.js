"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-shim");
var XMLElement_1 = require("./XMLElement");
var _ = require("lodash");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var XMLChild = /** @class */ (function () {
    function XMLChild(options) {
        this.options = options;
        this.name = options.name;
        if (options.stripPluralS) {
            this.name = this.name.replace(/s$/, '');
        }
        if (options.namespace) {
            this.name = utils_1.ns(options.namespace, this.name);
        }
    }
    XMLChild.annotate = function (target, key, options, descriptor) {
        if (options === void 0) { options = {}; }
        var element = XMLElement_1.XMLElement.getOrCreateIfNotExists(target);
        var fullOptions = Object.assign({
            getter: function (entity) {
                if (descriptor && descriptor.get) {
                    return descriptor.get.call(entity);
                }
                return entity[key];
            }
        }, options);
        fullOptions.name = options.name || key;
        element.addChild(new XMLChild(fullOptions));
    };
    XMLChild.createXmlChild = function (options) {
        var hasGetter = typeof options.getter === 'function';
        var hasValue = options.value !== void 0;
        if ((hasGetter && hasValue) || (!hasGetter && !hasValue)) {
            throw new Error("Either a getter or a value has to be defined for attribute \"" + options.name + "\".");
        }
        var fullOptions = Object.assign({
            getter: utils_2.createCustomGetter(options),
        }, options);
        return new XMLChild(fullOptions);
    };
    XMLChild.prototype.setSchema = function (target, parentEntity, isAsync, schemaOptions) {
        var _this = this;
        if (isAsync === void 0) { isAsync = false; }
        var entity = this.options.getter.call(null, parentEntity);
        var process = function (schema) {
            if (schema !== void 0 && schema !== null) {
                var structure_1 = _this.options.implicitStructure;
                if (structure_1) {
                    // a schema can be an array or an object,
                    // so we ensure that this is always an
                    // array and don't have to distinguish
                    [].concat(schema).forEach(function (_schema) { return _this.resolveImplicitStructure(structure_1, target, _schema); });
                }
                else {
                    if (entity === schema && _this.options.nestedNamespace) {
                        var nsSchema = {};
                        for (var key in schema) {
                            if (schema.hasOwnProperty(key)) {
                                nsSchema[utils_1.ns(_this.options.nestedNamespace, key)] = schema[key];
                            }
                        }
                        schema = nsSchema;
                    }
                    target[_this.name] = schema;
                }
            }
        };
        if (isAsync) {
            XMLElement_1.XMLElement.getSchemaAsync(entity, schemaOptions)
                .then(function (schema) { return process(schema); });
        }
        else {
            process(XMLElement_1.XMLElement.getSchema(entity, schemaOptions));
        }
    };
    XMLChild.prototype.resolveImplicitStructure = function (structure, target, schema) {
        var PLACEHOLDER = '$';
        if (!new RegExp(".\\.\\" + PLACEHOLDER).test(structure) &&
            !new RegExp(".\\.\\" + PLACEHOLDER + "\\..").test(structure) &&
            !new RegExp("\\" + PLACEHOLDER + "\\..").test(structure)) {
            throw new Error("Structure '" + structure + "' is invalid");
        }
        var tree = this.getImplicitNodeTree(structure);
        var indexOfPlaceholder = tree.findIndex(function (node) { return node.name === PLACEHOLDER; });
        tree[indexOfPlaceholder].name = this.name;
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (!Array.isArray(target)) {
                if (!target[node.name]) {
                    if (i !== indexOfPlaceholder) {
                        target[node.name] = { '@': node.attributes };
                    }
                    else {
                        target[node.name] = [];
                    }
                }
                target = target[node.name];
            }
            else {
                var newTarget = {};
                target.push(newTarget);
                target = newTarget;
            }
            if (i === tree.length - 1) {
                if (Array.isArray(target)) {
                    target.push(schema);
                }
                else {
                    target[node.name] = _.merge(schema, { '@': node.attributes });
                }
            }
        }
    };
    XMLChild.prototype.getImplicitNodeTree = function (treeString) {
        var REGEX = new RegExp('([a-z\\w0-9-\\$\\:]+?)\\[(.*?)\\]|([a-z\\w0-9-\\$\\:]+)', 'gi');
        var match = REGEX.exec(treeString);
        var tree = [];
        while (match !== null) {
            var tagName = match[1] || match[3];
            var attributeString = match[2];
            tree.push({
                name: tagName,
                attributes: this.getAttributes(attributeString)
            });
            match = REGEX.exec(treeString);
        }
        return tree;
    };
    XMLChild.prototype.getAttributes = function (attributeString) {
        var attributes = {};
        if (attributeString) {
            attributeString.split(',').forEach(function (val) {
                var attributesArr = val.split('=');
                attributes[attributesArr[0]] = attributesArr[1];
            });
        }
        return attributes;
    };
    return XMLChild;
}());
exports.XMLChild = XMLChild;
//# sourceMappingURL=XMLChild.js.map