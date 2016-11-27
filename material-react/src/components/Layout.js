/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
export default class Layout extends Component{

    render(){
        return (
            <div>
                <div>公共头部</div>
                <div className="content">
                    {this.props.children}
                </div>
                <div>公共尾部</div>
            </div>
        )
    }
}