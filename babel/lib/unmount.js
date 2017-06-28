'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (C) {
    return function (Containers) {
        var UnmountComponent = C(Containers);
        var unmountPrototype = UnmountComponent.prototype;

        return function (_Component) {
            (0, _inherits3.default)(_class, _Component);

            function _class() {
                (0, _classCallCheck3.default)(this, _class);
                return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            (0, _createClass3.default)(_class, [{
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    var Render = (0, _core.getState)().render;
                    var component = Render.get('component');

                    component.map(function (v, k) {
                        unmountPrototype.removeElement(k);
                    });

                    this.reset();
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(p, s) {
                    return false;
                }
            }, {
                key: 'reset',
                value: function reset() {
                    var Render = (0, _core.getState)().render;
                    Render = Render.set('num', 0);
                    Render = Render.set('component', {});
                    (0, _core.setState)(Render);
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(UnmountComponent, this.props);
                }
            }]);
            return _class;
        }(_react.Component);
    };
};

module.exports = exports['default'];