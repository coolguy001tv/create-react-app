/**
 * Created by CoolGuy on 2017/1/7.
 * 因为Material UI 的多行文本框textarea并不符合我们的设计，所以统一拖一个自己的textarea出来
 */

import React,{Component} from 'react';
import {createUuid}  from '../../util';
const textAreaStyle = {
    height:300
};
export default class TextArea extends Component{
    render(){
        let {name,id,style,className} = this.props;
        let uuid = createUuid();
        !name && (name = "t-"+uuid);
        !id && (id = "t-"+uuid);
        let theStyle = Object.assign(textAreaStyle,style);
        return (
            <textarea {...this.props}
                name={name}
                id={id}
                cols="100"
                style={theStyle}
                className={className || ""}
                value={this.props.value}
            >

            </textarea>
        )
    }
}