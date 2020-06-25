"use strict";
exports.__esModule = true;
function parseUrl(url) {
    if (url.startsWith('https://')) {
        var _a = new URL(url), host = _a.host, path = _a.pathname;
        return { host: host, path: path };
    }
    else {
        return { path: url };
    }
}
exports["default"] = parseUrl;
//# sourceMappingURL=parseUrl.js.map