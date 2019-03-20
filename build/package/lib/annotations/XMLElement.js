"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var XMLElement_1 = require("../models/XMLElement");
function XMLElement(options) {
    return function (target) {
        return XMLElement_1.XMLElement.annotate(target.prototype, options);
    };
}
exports.XMLElement = XMLElement;
//# sourceMappingURL=XMLElement.js.map