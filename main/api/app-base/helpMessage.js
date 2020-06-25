"use strict";
exports.__esModule = true;
function helpMessage(_a) {
    var resourceType = _a.resourceType;
    return {
        type: 'tree',
        name: resourceType.name,
        value: resourceType,
        state: {
            _view: 'tree',
            _expanded: true,
            name: {
                _hidden: true
            },
            routes: {
                _view: 'table',
                _expanded: true
            },
            actions: {
                _view: 'table',
                _expanded: true
            }
        }
    };
}
exports["default"] = helpMessage;
//# sourceMappingURL=helpMessage.js.map