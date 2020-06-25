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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var shortid_1 = __importDefault(require("shortid"));
var ClientFileStore_1 = __importDefault(require("../storage/ClientFileStore"));
var ConsoleError_1 = __importDefault(require("../ConsoleError"));
var App_1 = __importDefault(require("../app-base/App"));
var parseArgs_1 = __importDefault(require("../app-base/parseArgs"));
var parseUrl_1 = __importDefault(require("../app-base/parseUrl"));
var Asana_1 = __importDefault(require("../apps/asana/Asana"));
var GitHub_1 = __importDefault(require("../apps/github/GitHub"));
var Test_1 = __importDefault(require("../apps/test/Test"));
var env_1 = __importDefault(require("./env"));
var apps = {
    asana: Asana_1["default"],
    github: GitHub_1["default"],
    test: Test_1["default"]
};
var ConsoleChannel = /** @class */ (function () {
    function ConsoleChannel(_a) {
        var _this = this;
        var name = _a.name, apps = _a.apps, files = _a.files;
        this.saveEnv = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem("channels/" + this.name + "/env", JSON.stringify(this.env, null, 2));
                }
                return [2 /*return*/];
            });
        }); };
        this.name = name;
        this.config = { apps: apps, files: files };
        this.messages = {};
        this.messageIds = [];
    }
    ConsoleChannel.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.files) {
                            if (typeof window !== 'undefined') {
                                this.files = new ClientFileStore_1["default"](this.config.files);
                            }
                            else {
                                this.files = new ConsoleChannel.LocalFileStore(this.config.files);
                            }
                        }
                        return [4 /*yield*/, this.loadEnv()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadApps()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConsoleChannel.prototype.loadEnv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var envData, item, _i, _a, appName;
            return __generator(this, function (_b) {
                envData = {};
                if (typeof window !== 'undefined') {
                    item = window.localStorage.getItem("channels/" + this.name + "/env");
                    if (typeof item === 'string' && item.length > 0) {
                        envData = JSON.parse(item);
                    }
                }
                this.env = {};
                for (_i = 0, _a = Object.keys(apps); _i < _a.length; _i++) {
                    appName = _a[_i];
                    envData[appName] = envData[appName] || {};
                    this.env[appName] = env_1["default"](envData[appName], this.saveEnv);
                }
                return [2 /*return*/];
            });
        });
    };
    ConsoleChannel.prototype.loadApps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appNames, loadedApps, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.apps = {};
                        appNames = Object.keys(apps);
                        return [4 /*yield*/, Promise.all(appNames.map(function (appName) {
                                return App_1["default"].get({ app: apps[appName], env: _this.env[appName] });
                            }))];
                    case 1:
                        loadedApps = _a.sent();
                        for (i = 0; i < loadedApps.length; i++) {
                            this.apps[appNames[i]] = loadedApps[i];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ConsoleChannel.prototype.dispatchAction = function (handler, params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, handler.run(params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof ConsoleError_1["default"]) {
                            if (e_1.data && e_1.data.consoleMessage) {
                                return [2 /*return*/, e_1.data.consoleMessage];
                            }
                            else {
                                return [2 /*return*/, { type: 'error', text: "Error: " + e_1.message }];
                            }
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConsoleChannel.prototype.route = function (_a) {
        var url = _a.url, action = _a.action, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var _b, host, path, _i, _c, app, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(/^\/files(\/|$)/.test(url) && this.files)) return [3 /*break*/, 1];
                        return [2 /*return*/, { handler: this.files, url: url.substr('/files'.length) }];
                    case 1:
                        if (!url) return [3 /*break*/, 5];
                        _b = parseUrl_1["default"](url), host = _b.host, path = _b.path;
                        _i = 0, _c = Object.values(this.apps);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _c.length)) return [3 /*break*/, 5];
                        app = _c[_i];
                        return [4 /*yield*/, app.route({ host: host, path: path, action: action, params: params })];
                    case 3:
                        result = _d.sent();
                        if (result) {
                            if ('error' in result) {
                                return [2 /*return*/, result];
                            }
                            else {
                                return [2 /*return*/, __assign({ handler: app, url: url }, result)];
                            }
                        }
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ConsoleChannel.prototype.runCommand = function (_a) {
        var message = _a.message, parsed = _a.parsed, onMessage = _a.onMessage, parentMessage = _a.parentMessage, parentMessageId = _a.parentMessageId, formData = _a.formData;
        return __awaiter(this, void 0, void 0, function () {
            var _b, urlArg, actionArg, params, routeMatch, messageId, _c, isBackgroundAction, messageId, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = parseArgs_1["default"](parsed), urlArg = _b.url, actionArg = _b.action, params = _b.params;
                        return [4 /*yield*/, this.route({
                                url: urlArg,
                                action: actionArg,
                                params: params
                            })];
                    case 1:
                        routeMatch = _d.sent();
                        if (!(routeMatch && 'error' in routeMatch)) return [3 /*break*/, 2];
                        messageId = shortid_1["default"]();
                        onMessage({
                            type: 'input',
                            text: message,
                            commandId: messageId
                        });
                        onMessage({
                            type: 'error',
                            text: routeMatch.error,
                            commandId: messageId
                        });
                        return [2 /*return*/, true];
                    case 2:
                        if (!routeMatch) return [3 /*break*/, 4];
                        _c = routeMatch;
                        isBackgroundAction = formData && formData.action === 'runAction';
                        messageId = shortid_1["default"]();
                        if (!isBackgroundAction) {
                            onMessage({
                                type: 'input',
                                text: message,
                                commandId: messageId,
                                loading: true
                            });
                        }
                        else {
                            onMessage({
                                type: 'form-status',
                                commandId: messageId,
                                parentCommandId: parentMessageId,
                                loading: true
                            });
                        }
                        if (!('handler' in routeMatch)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dispatchAction(routeMatch.handler, {
                                url: routeMatch.url,
                                action: isBackgroundAction
                                    ? formData.actionName
                                    : 'action' in routeMatch
                                        ? routeMatch.action
                                        : undefined,
                                params: 'params' in routeMatch ? routeMatch.params : {},
                                parentMessage: parentMessage
                            })];
                    case 3:
                        result = _d.sent();
                        if ('resourceType' in routeMatch) {
                            result.resourceType = routeMatch.resourceType;
                        }
                        onMessage([
                            result && __assign(__assign({}, result), { commandId: messageId, message: parsed[0] }),
                            {
                                type: 'loaded',
                                commandId: isBackgroundAction ? parentMessageId : messageId
                            },
                        ].filter(function (value) { return value; }));
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConsoleChannel.prototype.getClientConfig = function (_a) {
        var apiBaseUrl = _a.apiBaseUrl;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.files
                        ? {
                            files: {
                                url: apiBaseUrl + "/channels/" + this.name + "/files",
                                path: this.files.path
                            }
                        }
                        : {}];
            });
        });
    };
    return ConsoleChannel;
}());
exports["default"] = ConsoleChannel;
//# sourceMappingURL=ConsoleChannel.js.map