"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var XMLAttribute_1 = require("../models/XMLAttribute");
function XMLAttribute() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        return function (target, key, descriptor) {
            return XMLAttribute_1.XMLAttribute.annotate(target, key, args[0], descriptor);
        };
    }
    return XMLAttribute_1.XMLAttribute.annotate(args[0], args[1], void 0, args[2]);
}
exports.XMLAttribute = XMLAttribute;
//# sourceMappingURL=XMLAttribute.js.map