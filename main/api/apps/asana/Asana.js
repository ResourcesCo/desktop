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
exports.__esModule = true;
function getHeaders(apiToken, post) {
    if (post === void 0) { post = false; }
    return __assign({ Authorization: "Bearer " + apiToken }, (post ? { 'Content-Type': 'application/json' } : {}));
}
function auth(_a) {
    var env = _a.env, apiToken = _a.params.apiToken;
    env.ASANA_TOKEN = apiToken;
    return 'API key saved to session.';
}
function authClear(_a) {
    var env = _a.env;
    delete env.ASANA_TOKEN;
    return 'API key cleared.';
}
function complete(_a) {
    var apiToken = _a.env.ASANA_TOKEN, id = _a.params.id, request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request({
                        headers: getHeaders(apiToken, true),
                        url: "https://app.asana.com/api/1.0/tasks/" + id,
                        method: 'PUT',
                        body: { data: { completed: true } }
                    })];
                case 1:
                    response = _b.sent();
                    if (response.ok) {
                        return [2 /*return*/, { type: 'text', text: "Task marked complete" }];
                    }
                    else {
                        return [2 /*return*/, { type: 'text', text: "Error marking task complete" }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function comment(_a) {
    var apiToken = _a.env.ASANA_TOKEN, _b = _a.params, id = _b.id, comment = _b.comment, request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, request({
                        headers: getHeaders(apiToken, true),
                        url: "https://app.asana.com/api/1.0/tasks/" + id + "/stories",
                        method: 'POST',
                        body: { data: { text: comment } }
                    })];
                case 1:
                    response = _c.sent();
                    if (response.ok) {
                        return [2 /*return*/, { type: 'text', text: 'Comment added.' }];
                    }
                    else {
                        return [2 /*return*/, { type: 'text', text: 'Error adding comment.' }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function run(_a) {
    var action = _a.action, env = _a.env, params = _a.params, request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(action === 'auth')) return [3 /*break*/, 1];
                    return [2 /*return*/, auth({ env: env, params: params })];
                case 1:
                    if (!(action === 'auth/clear')) return [3 /*break*/, 2];
                    return [2 /*return*/, authClear({ env: env })];
                case 2:
                    if (!env.ASANA_TOKEN) return [3 /*break*/, 7];
                    if (!(action === 'complete')) return [3 /*break*/, 4];
                    return [4 /*yield*/, complete({ env: env, params: params, request: request })];
                case 3: return [2 /*return*/, _b.sent()];
                case 4:
                    if (!(action === 'comment')) return [3 /*break*/, 6];
                    return [4 /*yield*/, comment({ env: env, params: params, request: request })];
                case 5: return [2 /*return*/, _b.sent()];
                case 6: return [3 /*break*/, 8];
                case 7: return [2 /*return*/, { type: 'error', text: 'An Asana token is required.' }];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function app() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    name: 'Asana',
                    environmentVariables: {
                        ASANA_TOKEN: {
                            doc: "\n          An Asana personal access token, from the\n          [Asana developer console](https://app.asana.com/0/developer-console)'\n        "
                        }
                    },
                    resourceTypes: {
                        tasks: {
                            routes: [
                                {
                                    host: 'app.asana.com',
                                    path: '/0/:projectId/:id{/f}?'
                                },
                                { path: '/asana/tasks/:id' },
                            ],
                            actions: {
                                get: {
                                    params: [],
                                    request: {
                                        method: 'GET',
                                        url: '/tasks/:id'
                                    },
                                    docUrl: 'https://developers.asana.com/docs/get-a-task'
                                },
                                comment: {
                                    params: ['comment']
                                },
                                complete: {
                                    params: []
                                }
                            }
                        },
                        auth: {
                            routes: [
                                {
                                    host: 'app.asana.com',
                                    path: '/:any*'
                                },
                                { path: '/asana' },
                            ],
                            actions: {
                                auth: { params: ['apiToken'] },
                                clearAuth: {
                                    params: []
                                }
                            }
                        }
                    },
                    run: run
                }];
        });
    });
}
exports["default"] = app;
//# sourceMappingURL=Asana.js.map