/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';

export default class Layout extends Component{

    componentDidMount() {
        console.log("It's ok!");
    }
    render(){
        return (
            <div>
                <div>公共头部</div>
                <div className="left-menu">
                    <h1>左侧菜单只用于临时展示用，方便各种跳转操作，后面会直接丢掉~</h1>
                    <ul className="lists">
                        <li><Link activeClassName="active" to="/login">登录</Link></li>
                        <li><Link activeClassName="active" to="/reg">注册</Link></li>
                        <li><Link activeClassName="active" to="/dashboard">dashboard</Link></li>
                    </ul>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div>公共尾部</div>
            </div>
        )
    }
}