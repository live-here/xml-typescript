"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XMLElement_1 = require("./XMLElement");
class XMLValue {
    static annotate(target, key, descriptor) {
        const element = XMLElement_1.XMLElement.getOrCreateIfNotExists(target);
        element.value = (entity) => {
            if (descriptor && descriptor.get) {
                return descriptor.get.call(entity);
            }
            return entity[key];
        };
    }
}
exports.XMLValue = XMLValue;
//# sourceMappingURL=XMLValue.js.map