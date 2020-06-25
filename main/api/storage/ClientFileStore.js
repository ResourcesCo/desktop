"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
var actions_1 = __importDefault(require("./actions"));
var ConsoleError_1 = __importDefault(require("../ConsoleError"));
var ClientFileStore = /** @class */ (function () {
    function ClientFileStore(_a) {
        var url = _a.url;
        this.url = url;
        this.actions = actions_1["default"];
    }
    ClientFileStore.prototype.get = function (_a) {
        var path = _a.path;
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, isomorphic_unfetch_1["default"]("" + this.url + path)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ClientFileStore.prototype.put = function (_a) {
        var path = _a.path, value = _a.value;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, isomorphic_unfetch_1["default"]("" + this.url + path, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ contentType: 'application/json', value: value })
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    ClientFileStore.prototype["delete"] = function (_a) {
        var path = _a.path;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, isomorphic_unfetch_1["default"]("" + this.url + path, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' }
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    ClientFileStore.prototype.run = function (_a) {
        var action = _a.action, params = __rest(_a, ["action"]);
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof this.actions[action || 'get'] === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.actions[action || 'get'](__assign(__assign({}, params), { fileStore: this }))];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2: throw new ConsoleError_1["default"]('Unknown action');
                }
            });
        });
    };
    return ClientFileStore;
}());
exports["default"] = ClientFileStore;
//# sourceMappingURL=ClientFileStore.js.map