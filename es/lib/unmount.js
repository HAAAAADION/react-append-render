import React, {Component} from 'react';
import {setState, getState} from './core';

export default C => Containers => {
    const UnmountComponent = C(Containers);
    const unmountPrototype = UnmountComponent.prototype;

    return class extends Component {
        componentWillUnmount() {
            let Render = getState().render;
            const component = Render.get('component');

            component.map((v, k) => {
                unmountPrototype.removeElement(k);
            });

            this.reset();
        }
        shouldComponentUpdate(p, s){
            return false;
        }
        reset(){
            let Render = getState().render;
            Render = Render.set('num', 0);
            Render = Render.set('component', {});
            setState(Render);
        }
        render() {
            return (
                <UnmountComponent {...this.props} />
            )
        }
    }
};