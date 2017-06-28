import React, {Component} from 'react';
import {render} from 'react-dom';
import {List} from 'immutable';

import {setState, getState, immutableMapDel, DEFAULT_CLASS_NAME} from './core';

export default Containers => (class extends Component {
    constructor() {
        super();

        this._renderLayer = this._renderLayer.bind(this);
        this._close = this._close.bind(this);
    }
    _close(tag){
        this
            .clearComponent(tag)
            .exports()
            .clearNodeComponent();
    }
    clearComponent(tag){
        let Render = getState().render;
        let component = Render.get('component');

        component.map((v, k) => {
            let kk = -1;
        v.map((val, key) => {
            kk++;
        if (tag && (val.tag === tag || val.associate === tag)){
            v = v.splice(kk, 1);
            component = component.set(k, v);
            kk--;
        }else if (!tag) {
            component = component.set(k, List([]));
        }
    })
    });

        Render = Render.set('component', component);
        setState(Render);

        return this;
    }
    clearNodeComponent(){
        let Render = getState().render;
        let component = Render.get('component');

        let kk = -1;
        component.map((v, k) => {
            kk++;
        if (v.size <= 0){
            this.removeElement(k);
            component = immutableMapDel(component, kk);
            kk--;
        }
    });

        Render = Render.set('component', component);
        setState(Render);
        return this;
    }
    /**
     * tag: 提示框名
     * components: 组件
     * exports: 输出标签
     * associate: 关联提示框名
     * */
    _renderLayer({tag, components, exports = DEFAULT_CLASS_NAME, associate}) {
        let Render = getState().render;
        let num = Render.get('num');
        let component = Render.get('component');

        Render = Render.set('num', ++num);

        const rendersExports = component.get(exports) || [];

        component = component.set(exports, List([...rendersExports, {
            tag,
            exports,
            associate,
            com: React.cloneElement(components, {
                key: num,
                _renderClose: this._close
            })
        }]));

        Render = Render.set('component', component);
        setState(Render);

        this.exports();
    }
    builtElement(label, cl){
        let layer = document.createElement(label);
        cl = cl || DEFAULT_CLASS_NAME;
        layer.className = cl;
        return document.body.appendChild(layer);
    }
    removeElement(cl){
        const body = document.body;
        const s = body.querySelector(`.${cl}`);
        if (s) {
            const p = s.parentNode;
            if (p === body) p.removeChild(s);
        }
    }
    exports(){
        let Render = getState().render;
        let component = Render.get('component');

        component.map((v, k) => {
            const p = document.querySelector(`.${k}`) || this.builtElement('div', k);
        const layerElement = <div className="in-render">{v.map((val, key) => val.com)}</div>;

        if (layerElement === null) {
            render(<noscript />, p);
        } else {
            if (layerElement) {
                render(layerElement, p);
            } else {
                render(<div />, p);
            }
        }
    });

        return this;
    }
    render() {
        return (
            <Containers
        {...this.props}
        _renderLayer={this._renderLayer}
        _renderClose={this._close}
    />
    )
    }
})