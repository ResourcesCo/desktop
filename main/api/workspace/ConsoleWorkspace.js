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
var isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
var ConsoleChannel_1 = __importDefault(require("../channel/ConsoleChannel"));
var ConsoleError_1 = __importDefault(require("../ConsoleError"));
var defaultConfig = { channels: { main: { apps: ['api-finder'] } } };
var ConsoleWorkspace = /** @class */ (function () {
    function ConsoleWorkspace(_a) {
        var location = _a.location;
        this.location = location;
        this.channels = {};
    }
    ConsoleWorkspace.prototype.loadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1, response, data, workspaceConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof window === 'undefined')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ConsoleWorkspace.LocalFileStore.readFile(this.location + '/workspace.json')];
                    case 2:
                        data = _a.sent();
                        this.config = JSON.parse(data);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.config = defaultConfig;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, isomorphic_unfetch_1["default"](this.location, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ apiBaseUrl: this.location })
                        })];
                    case 6:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 7:
                        data = _a.sent();
                        workspaceConfig = data.workspaceConfig;
                        this.config = workspaceConfig;
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ConsoleWorkspace.prototype.getChannel = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.config) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadConfig()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!(name in this.channels)) return [3 /*break*/, 4];
                        if (!(name in this.config.channels)) {
                            throw new ConsoleError_1["default"]('Not found', { status: 404 });
                        }
                        this.channels[name] = new ConsoleChannel_1["default"](__assign({ name: name }, this.config.channels[name]));
                        return [4 /*yield*/, this.channels[name].init()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.channels[name]];
                }
            });
        });
    };
    ConsoleWorkspace.prototype.getClientConfig = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var clientConfig, _i, _a, channelName, channel, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.config) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadConfig()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        clientConfig = { channels: {} };
                        _i = 0, _a = Object.keys(this.config.channels);
                        _d.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        channelName = _a[_i];
                        return [4 /*yield*/, this.getChannel(channelName)];
                    case 4:
                        channel = _d.sent();
                        _b = clientConfig.channels;
                        _c = channelName;
                        return [4 /*yield*/, channel.getClientConfig(params)];
                    case 5:
                        _b[_c] = _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, clientConfig];
                }
            });
        });
    };
    ConsoleWorkspace.getWorkspace = function (optionsArg) {
        if (optionsArg === void 0) { optionsArg = {}; }
        var defaultOptions = {
            location: typeof window !== 'undefined' ? apiBase() : '.'
        };
        var options = __assign(__assign({}, defaultOptions), optionsArg);
        var location = options.location;
        if (!location) {
            throw new Error('no location');
        }
        if (!(location in ConsoleWorkspace.workspaces)) {
            ConsoleWorkspace.workspaces[location] = new ConsoleWorkspace(__assign(__assign({}, options), { location: location }));
        }
        return ConsoleWorkspace.workspaces[location];
    };
    ConsoleWorkspace.workspaces = {};
    return ConsoleWorkspace;
}());
function apiBase() {
    return process.env.API_BASE || '/api';
}
exports["default"] = ConsoleWorkspace;
//# sourceMappingURL=ConsoleWorkspace.js.map