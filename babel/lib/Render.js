'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _reactDom = require('react-dom');

var _immutable = require('immutable');

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Containers) {
    return function (_Component) {
        (0, _inherits3.default)(_class, _Component);

        function _class() {
            (0, _classCallCheck3.default)(this, _class);

            var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

            _this._renderLayer = _this._renderLayer.bind(_this);
            _this._close = _this._close.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(_class, [{
            key: '_close',
            value: function _close(tag) {
                this.clearComponent(tag).exports().clearNodeComponent();
            }
        }, {
            key: 'clearComponent',
            value: function clearComponent(tag) {
                var Render = (0, _core.getState)().render;
                var component = Render.get('component');

                component.map(function (v, k) {
                    var kk = -1;
                    v.map(function (val, key) {
                        kk++;
                        if (tag && (val.tag === tag || val.associate === tag)) {
                            v = v.splice(kk, 1);
                            component = component.set(k, v);
                            kk--;
                        } else if (!tag) {
                            component = component.set(k, (0, _immutable.List)([]));
                        }
                    });
                });

                Render = Render.set('component', component);
                (0, _core.setState)(Render);

                return this;
            }
        }, {
            key: 'clearNodeComponent',
            value: function clearNodeComponent() {
                var _this2 = this;

                var Render = (0, _core.getState)().render;
                var component = Render.get('component');

                var kk = -1;
                component.map(function (v, k) {
                    kk++;
                    if (v.size <= 0) {
                        _this2.removeElement(k);
                        component = (0, _core.immutableMapDel)(component, kk);
                        kk--;
                    }
                });

                Render = Render.set('component', component);
                (0, _core.setState)(Render);
                return this;
            }
            /**
             * tag: 提示框名
             * components: 组件
             * exports: 输出标签
             * associate: 关联提示框名
             * */

        }, {
            key: '_renderLayer',
            value: function _renderLayer(_ref) {
                var tag = _ref.tag,
                    components = _ref.components,
                    _ref$exports = _ref.exports,
                    exports = _ref$exports === undefined ? _core.DEFAULT_CLASS_NAME : _ref$exports,
                    associate = _ref.associate;

                var Render = (0, _core.getState)().render;
                var num = Render.get('num');
                var component = Render.get('component');

                Render = Render.set('num', ++num);

                var rendersExports = component.get(exports) || [];

                component = component.set(exports, (0, _immutable.List)([].concat((0, _toConsumableArray3.default)(rendersExports), [{
                    tag: tag,
                    exports: exports,
                    associate: associate,
                    com: _react2.default.cloneElement(components, {
                        key: num,
                        _renderClose: this._close
                    })
                }])));

                Render = Render.set('component', component);
                (0, _core.setState)(Render);

                this.exports();
            }
        }, {
            key: 'builtElement',
            value: function builtElement(label, cl) {
                var layer = document.createElement(label);
                cl = cl || _core.DEFAULT_CLASS_NAME;
                layer.className = cl;
                return document.body.appendChild(layer);
            }
        }, {
            key: 'removeElement',
            value: function removeElement(cl) {
                var body = document.body;
                var s = body.querySelector('.' + cl);
                if (s) {
                    var p = s.parentNode;
                    if (p === body) p.removeChild(s);
                }
            }
        }, {
            key: 'exports',
            value: function exports() {
                var _this3 = this;

                var Render = (0, _core.getState)().render;
                var component = Render.get('component');

                component.map(function (v, k) {
                    var p = document.querySelector('.' + k) || _this3.builtElement('div', k);
                    var layerElement = _react2.default.createElement(
                        'div',
                        { className: 'in-render' },
                        v.map(function (val, key) {
                            return val.com;
                        })
                    );

                    if (layerElement === null) {
                        (0, _reactDom.render)(_react2.default.createElement('noscript', null), p);
                    } else {
                        if (layerElement) {
                            (0, _reactDom.render)(layerElement, p);
                        } else {
                            (0, _reactDom.render)(_react2.default.createElement('div', null), p);
                        }
                    }
                });

                return this;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Containers, (0, _extends3.default)({}, this.props, {
                    _renderLayer: this._renderLayer,
                    _renderClose: this._close
                }));
            }
        }]);
        return _class;
    }(_react.Component);
};

module.exports = exports['default'];