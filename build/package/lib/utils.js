"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ATTRIBUTE_PROPERTY = '@';
function ns(namepsace, value) {
    return namepsace + ':' + value;
}
exports.ns = ns;
function createCustomGetter(_options) {
    if (_options.restrictTo) {
        var restrictTo_1 = _options.restrictTo;
        return function (entity) {
            if (restrictTo_1.indexOf(entity) !== -1) {
                return (_options.getter ? _options.getter(entity) : _options.value);
            }
        };
    }
    return (_options.getter || (function () { return _options.value; }));
}
exports.createCustomGetter = createCustomGetter;
//# sourceMappingURL=utils.js.map