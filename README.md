# react-append-render
动态创建html标签，简化创建流程

# Installation
`npm i react-append-render --save`

# Use
```javascript
import React, { Component } from 'react';
import Render, {unmount} from 'react-append-render';

class Prompt extends Component{
    close = () => {
        const {_renderClose, tag} = this.props;
        _renderClose(tag);
    }
    render(){
        const {type, message} = this.props;

        return (
            <div id="prompt" className="prompt_show" onClick={this.close}>
                <font>{message}</font>
            </div>
        )
    }
}

@Render
export default class Test extends Component{
    test(v){
        const {_renderLayer} = this.props;
        _renderLayer({
            tag: 'prompt',
            components: <Prompt type="success" message="hi i'm here" tag="prompt" />,
        });
    }
    
    render(){
        return (
            <div onClick={this.test}>click here!</div>
        )
    }
}
```

# Api
`_renderLayer` 创建新的html标签  
`_renderClose` 删除html标签
