"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const XMLAttribute_1 = require("../models/XMLAttribute");
function XMLAttribute(...args) {
    if (args.length === 1) {
        return (target, key, descriptor) => {
            return XMLAttribute_1.XMLAttribute.annotate(target, key, args[0], descriptor);
        };
    }
    return XMLAttribute_1.XMLAttribute.annotate(args[0], args[1], void 0, args[2]);
}
exports.XMLAttribute = XMLAttribute;
//# sourceMappingURL=XMLAttribute.js.map