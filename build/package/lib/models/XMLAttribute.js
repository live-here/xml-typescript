"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLElement_1 = require("./XMLElement");
var utils_1 = require("../utils");
var XMLAttribute = /** @class */ (function () {
    function XMLAttribute(options) {
        this.options = options;
        this.name = options.name;
        if (options.namespace) {
            this.name = options.namespace + ':' + this.name;
        }
    }
    XMLAttribute.annotate = function (target, key, options, descriptor) {
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
        element.addAttribute(new XMLAttribute(fullOptions));
    };
    XMLAttribute.createAttribute = function (options) {
        var hasGetter = typeof options.getter === 'function';
        var hasValue = options.value !== void 0;
        if ((hasGetter && hasValue) || (!hasGetter && !hasValue)) {
            throw new Error("Either a getter or a value has to be defined for attribute \"" + options.name + "\".");
        }
        var fullOptions = Object.assign({
            getter: utils_1.createCustomGetter(options),
        }, options);
        return new XMLAttribute(fullOptions);
    };
    XMLAttribute.prototype.setSchema = function (target, entity) {
        var value = this.options.getter.call(null, entity);
        if (value !== void 0) {
            target[this.name] = value;
        }
        else if (this.options.required) {
            throw new Error("Attribute " + this.name + " is required, but empty.");
        }
    };
    return XMLAttribute;
}());
exports.XMLAttribute = XMLAttribute;
//# sourceMappingURL=XMLAttribute.js.map