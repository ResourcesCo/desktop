"use strict";
exports.__esModule = true;
function isUrlArg(s) {
    return s.startsWith('/') || s.startsWith('https://');
}
function parseArgs(args) {
    var url = null, action = null, params = null;
    if (isUrlArg(args[0])) {
        url = args[0];
        if (args.length > 1 && args[1].startsWith(':')) {
            action = args[1].substr(1);
            params = args.slice(2);
        }
        else {
            params = args.slice(1);
        }
    }
    else if (args[0].startsWith(':') && isUrlArg(args[1])) {
        action = args[0].substr(1);
        url = args[1];
        params = args.slice(2);
    }
    return { url: url, action: action, params: params };
}
exports["default"] = parseArgs;
//# sourceMappingURL=parseArgs.js.map