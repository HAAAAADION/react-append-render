'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_CLASS_NAME = exports.immutableMapDel = exports.getState = exports.setState = undefined;

var _immutable = require('immutable');

var state = {
    render: (0, _immutable.fromJS)({
        num: 0,
        component: {}
    })
};

var DEFAULT_CLASS_NAME = 'render';

var immutableMapDel = function immutableMapDel(arr, n) {
    if (n < 0) return arr;else return arr.slice(0, n).concat(arr.slice(n + 1, arr.size));
};

var setState = function setState(data) {
    state.render = data;
};

var getState = function getState() {
    return state;
};

exports.setState = setState;
exports.getState = getState;
exports.immutableMapDel = immutableMapDel;
exports.DEFAULT_CLASS_NAME = DEFAULT_CLASS_NAME;