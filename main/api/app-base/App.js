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
var path_to_regexp_1 = require("path-to-regexp");
var mapValues_1 = __importDefault(require("lodash/mapValues"));
var request_1 = __importDefault(require("./request"));
var helpMessage_1 = __importDefault(require("./helpMessage"));
function defaultAction(actionName) {
    if (actionName === 'help') {
        return {
            name: 'help',
            params: []
        };
    }
}
var App = /** @class */ (function () {
    function App(_a) {
        var _this = this;
        var appSpec = _a.appSpec, env = _a.env, requestParam = _a.request;
        this.help = function (_a) {
            var resourceType = _a.resourceType;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, helpMessage_1["default"]({ resourceType: this.resourceTypes[resourceType] })];
                });
            });
        };
        var name = appSpec.name, resourceTypes = appSpec.resourceTypes, run = appSpec.run;
        this.name = name;
        this.resourceTypes = mapValues_1["default"](resourceTypes, function (_a, name) {
            var routes = _a.routes, actions = _a.actions, props = __rest(_a, ["routes", "actions"]);
            return (__assign(__assign({ name: name }, props), { routes: routes.map(function (route) { return (__assign(__assign({}, route), { match: path_to_regexp_1.match(route.path) })); }), actions: mapValues_1["default"](actions, function (action, name) { return (__assign({ name: name }, action)); }) }));
        });
        this.env = env;
        this.onRun = run;
        this.request = requestParam || request_1["default"];
    }
    App.prototype.prepareMessage = function (result) {
        if (typeof result === 'string') {
            return { type: 'text', text: result };
        }
        else if (typeof result === 'object') {
            return result;
        }
        else {
            return;
        }
    };
    App.prototype.route = function (_a) {
        var host = _a.host, path = _a.path, action = _a.action, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _b, resourceType, _c, _d, route, result;
            return __generator(this, function (_e) {
                for (_i = 0, _b = Object.values(this.resourceTypes); _i < _b.length; _i++) {
                    resourceType = _b[_i];
                    for (_c = 0, _d = resourceType.routes; _c < _d.length; _c++) {
                        route = _d[_c];
                        if (!host === !route.host || host === route.host) {
                            result = this.matchRoute({
                                resourceType: resourceType,
                                route: route,
                                path: path,
                                action: action,
                                params: params
                            });
                            if (result) {
                                return [2 /*return*/, result];
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    App.prototype.matchRoute = function (_a) {
        var resourceType = _a.resourceType, route = _a.route, path = _a.path, actionName = _a.action, params = _a.params;
        var match = route.match(path);
        if (match) {
            var resolvedActionName_1 = actionName || resourceType.defaultAction || 'help';
            var action = Object.values(resourceType.actions).find(function (_a) {
                var name = _a.name;
                return name === resolvedActionName_1;
            }) || defaultAction(resolvedActionName_1);
            if (action) {
                var result = this.matchParams({ match: match, action: action, params: params });
                if (result.error) {
                    return result;
                }
                else if (result.params) {
                    return {
                        resourceType: resourceType.name,
                        action: resolvedActionName_1,
                        params: result.params
                    };
                }
            }
        }
    };
    App.prototype.matchParams = function (_a) {
        var match = _a.match, action = _a.action, params = _a.params;
        var _b = match.params, discard = _b.any, actionParams = __rest(_b, ["any"]);
        if (action.params.length === params.length) {
            var i = 0;
            for (var _i = 0, _c = action.params; _i < _c.length; _i++) {
                var name_1 = _c[_i];
                actionParams[name_1] = params[i];
                i++;
            }
            return { params: actionParams };
        }
        else {
            return {
                error: "Expected " + action.params.length + " parameter" + (action.params.length === 1 ? '' : 's') + ", got " + params.length
            };
        }
    };
    App.prototype.run = function (_a) {
        var resourceType = _a.resourceType, action = _a.action, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var handler, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handler = action === 'help' ? this.help : this.onRun;
                        return [4 /*yield*/, handler({
                                resourceType: resourceType,
                                action: action,
                                params: params,
                                env: this.env,
                                request: this.request
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, this.prepareMessage(result)];
                }
            });
        });
    };
    App.get = function (_a) {
        var app = _a.app, env = _a.env;
        return __awaiter(this, void 0, void 0, function () {
            var appSpec;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, app()];
                    case 1:
                        appSpec = _b.sent();
                        return [2 /*return*/, new App({ appSpec: appSpec, env: env })];
                }
            });
        });
    };
    return App;
}());
exports["default"] = App;
//# sourceMappingURL=App.js.map