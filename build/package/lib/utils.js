"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ATTRIBUTE_PROPERTY = '@';
function ns(namepsace, value) {
    return namepsace + ':' + value;
}
exports.ns = ns;
function createCustomGetter(_options) {
    if (_options.restrictTo) {
        const restrictTo = _options.restrictTo;
        return entity => {
            if (restrictTo.indexOf(entity) !== -1) {
                return (_options.getter ? _options.getter(entity) : _options.value);
            }
        };
    }
    return (_options.getter || (() => _options.value));
}
exports.createCustomGetter = createCustomGetter;
//# sourceMappingURL=utils.js.map