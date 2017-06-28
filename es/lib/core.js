import {fromJS} from 'immutable';

const state = {
    render: fromJS({
        num: 0,
        component: {}
    })
};

const DEFAULT_CLASS_NAME = 'render';

const immutableMapDel = (arr, n) => {
    if (n < 0) return arr;
    else return arr.slice(0, n).concat(arr.slice(n+1, arr.size));
};

const setState = (data) => {
    state.render = data;
};

const getState = () => {
    return state;
};

export {
    setState,
    getState,
    immutableMapDel,
    DEFAULT_CLASS_NAME
}