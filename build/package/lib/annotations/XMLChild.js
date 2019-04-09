"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const XMLChild_1 = require("../models/XMLChild");
function XMLChild(...args) {
    if (args.length === 1) {
        return (target, key, descriptor) => {
            return XMLChild_1.XMLChild.annotate(target, key, args[0], descriptor);
        };
    }
    return XMLChild_1.XMLChild.annotate(args[0], args[1], void 0, args[2]);
}
exports.XMLChild = XMLChild;
//# sourceMappingURL=XMLChild.js.map