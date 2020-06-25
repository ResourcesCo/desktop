"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var j2ref_1 = __importDefault(require("j2ref"));
var getNextToken = function (input) {
    var remainingInput = input.trim();
    if (remainingInput[0] === '{' || remainingInput[0] === '[') {
        var matchingBracket = { '{': '}', '[': ']' }[remainingInput[0]];
        var i = remainingInput.indexOf(matchingBracket);
        while (i !== -1) {
            var str = remainingInput.substr(0, i + 1);
            var parsed = void 0;
            try {
                parsed = JSON.parse(str);
                return [str, remainingInput.substr(str.length)];
            }
            catch (e) {
                parsed = null;
            }
            i = remainingInput.indexOf(matchingBracket, i + 1);
        }
    }
    if (remainingInput[0] === '"') {
        remainingInput = remainingInput.substr(1);
        var match = /(^|[^\\])"(\s|$)/.exec(remainingInput);
        if (match) {
            return [
                remainingInput.substr(0, match.index + 1),
                remainingInput.substr(match.index + match[0].length),
            ];
        }
        else {
            return [false, ''];
        }
    }
    else if (remainingInput[0] === "'") {
        remainingInput = remainingInput.substr(1);
        var match = /(^|[^\\])'(\s|$)/.exec(remainingInput);
        if (match) {
            return [
                remainingInput.substr(0, match.index + 1),
                remainingInput.substr(match.index + match[0].length),
            ];
        }
        else {
            return [false, ''];
        }
    }
    else if (remainingInput[0] === '`') {
        remainingInput = remainingInput.substr(1);
        var match = /(^|[^\\])`$/.exec(remainingInput);
        if (match) {
            return [
                remainingInput.substr(0, match.index + 1),
                remainingInput.substr(match.index + match[0].length),
            ];
        }
        match = /(^|[^\\])`(\s|$)/.exec(remainingInput);
        if (match) {
            return [
                remainingInput.substr(0, match.index + 1),
                remainingInput.substr(match.index + match[0].length),
            ];
        }
        return [false, ''];
    }
    else {
        var token = null;
        if (remainingInput[0] === '[') {
            var result = j2ref_1["default"]("$" + remainingInput);
            if (result && result.keys) {
                token = result.matched.token.substr(1);
            }
        }
        else {
            var result = j2ref_1["default"](remainingInput);
            if (result) {
                token = result.matched.token;
            }
        }
        if (token && remainingInput.substr(token.length, 1) === ' ') {
            return [token.trim(), remainingInput.substr(token.trim().length)];
        }
        var splitText = remainingInput.split(/\s+/);
        return [splitText[0], remainingInput.substr(splitText[0].length + 1)];
    }
};
function parseCommand(input) {
    var result = [];
    var remainingInput = input.trim();
    while (remainingInput.trim().length > 0) {
        var _a = getNextToken(remainingInput), token = _a[0], _remainingInput = _a[1];
        if (token === false) {
            return;
        }
        result.push(token);
        remainingInput = _remainingInput;
    }
    return result;
}
exports["default"] = parseCommand;
//# sourceMappingURL=parseCommand.js.map