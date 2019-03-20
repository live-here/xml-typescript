"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var XMLChild_1 = require("../models/XMLChild");
function XMLChild() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        return function (target, key, descriptor) {
            return XMLChild_1.XMLChild.annotate(target, key, args[0], descriptor);
        };
    }
    return XMLChild_1.XMLChild.annotate(args[0], args[1], void 0, args[2]);
}
exports.XMLChild = XMLChild;
//# sourceMappingURL=XMLChild.js.map