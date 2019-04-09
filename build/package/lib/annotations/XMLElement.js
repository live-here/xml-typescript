"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const XMLElement_1 = require("../models/XMLElement");
function XMLElement(options) {
    return (target) => {
        return XMLElement_1.XMLElement.annotate(target.prototype, options);
    };
}
exports.XMLElement = XMLElement;
//# sourceMappingURL=XMLElement.js.map