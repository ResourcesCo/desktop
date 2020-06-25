"use strict";
exports.__esModule = true;
function env(target, cb) {
    return new Proxy(target, {
        set: function (target, key, value) {
            target[key] = value;
            cb();
            return true;
        }
    });
}
exports["default"] = env;
//# sourceMappingURL=env.js.map