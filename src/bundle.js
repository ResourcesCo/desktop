define(["react", "react-dom", "./components/App"], function (_react, _reactDom, _App) {
  "use strict";

  _react = _interopRequireDefault(_react);
  _reactDom = _interopRequireDefault(_reactDom);
  _App = _interopRequireDefault(_App);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  _reactDom.default.render(_react.default.createElement(_App.default, null), document.getElementById('app'));
});

//# sourceMappingURL=bundle.js.map