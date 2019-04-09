"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XMLElement_1 = require("./XMLElement");
const utils_1 = require("../utils");
class XMLAttribute {
    constructor(options) {
        this.options = options;
        this.name = options.name;
        if (options.namespace) {
            this.name = options.namespace + ':' + this.name;
        }
    }
    static annotate(target, key, options = {}, descriptor) {
        const element = XMLElement_1.XMLElement.getOrCreateIfNotExists(target);
        const fullOptions = Object.assign({
            getter(entity) {
                if (descriptor && descriptor.get) {
                    return descriptor.get.call(entity);
                }
                return entity[key];
            }
        }, options);
        fullOptions.name = options.name || key;
        element.addAttribute(new XMLAttribute(fullOptions));
    }
    static createAttribute(options) {
        const hasGetter = typeof options.getter === 'function';
        const hasValue = options.value !== void 0;
        if ((hasGetter && hasValue) || (!hasGetter && !hasValue)) {
            throw new Error(`Either a getter or a value has to be defined for attribute "${options.name}".`);
        }
        const fullOptions = Object.assign({
            getter: utils_1.createCustomGetter(options),
        }, options);
        return new XMLAttribute(fullOptions);
    }
    setSchema(target, entity) {
        const value = this.options.getter.call(null, entity);
        if (value !== void 0) {
            target[this.name] = value;
        }
        else if (this.options.required) {
            throw new Error(`Attribute ${this.name} is required, but empty.`);
        }
    }
}
exports.XMLAttribute = XMLAttribute;
//# sourceMappingURL=XMLAttribute.js.map