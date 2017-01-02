/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

//import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';
//import Divider from 'material-ui/Divider';
import Link from '../NavLink';


import Icon from '../Icon';
import FrontPage from '../../containers/FrontPage';

import './layout.scss';


class Layout extends Component{

    toFrontPage(){
        if(this.props.location.pathname !== '/'){
            this.props.router.push("/");
        }
    }
    renderMainIcon(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <span className="pomelo-logo-wrapper" onClick={()=>{this.toFrontPage()}}>
                <Icon name="pomelo" size={25} color="#ffffff" className="pomelo-logo" style={{backgroundColor:themeColor}}/>
            </span>

        )
    }
    inDashboard(path){
        return ~path.indexOf('/dashboard');
    }
    renderTitle(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        let {location,user} = this.props;
        let className = "fixed-header";
        //dashboard下的都需要这个class
        if(this.inDashboard(location.pathname)){
            className+= " animate-to-right";
        }
        return (
            <div className={className} style={{backgroundColor:themeColor}}>
                <div className="header-left" onClick={()=>{this.toFrontPage()}}>
                    <span className="name">Pomelo</span>
                </div>
                <div className="header-right">
                    {
                        user.email ?
                            (<Link to="/dashboard">工作台</Link>) :
                            (<span><Link to="/login">登录</Link> | <Link to="/reg">注册</Link></span>)
                    }
                </div>
            </div>
        )
    }
    renderLeftMenu(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        let {location} = this.props;
        let className = "left-menu";
        //dashboard下的都需要这个class
        if(this.inDashboard(location.pathname)){
            className+= " animate-to-bottom";
        }
        return (
            <div className={className} style={{backgroundColor:themeColor}}>
                <div className="icons-wrapper">
                    <ul className="top-icons">
                        <li><Icon name="search" color="#fff"></Icon></li>
                        <li><Link to="/dashboard"><Icon name="home" color="#fff"></Icon></Link></li>
                        <li><Icon name="plus-circle" color="#fff"></Icon></li>
                        <li><Icon name="users" color="#fff"></Icon></li>
                    </ul>
                    <div className="flex1"></div>
                    <ul className="bottom-icons">
                        <li><Icon name="share-alt-square" color="#fff"></Icon></li>
                        <li><Icon name="bell" color="#fff"></Icon></li>
                        <li><Icon name="gear" color="#fff"></Icon></li>
                    </ul>
                </div>

            </div>
        )
    }

    componentDidMount() {

    }
    render(){
        //let themeColor = this.props.muiTheme.palette.primary1Color;
        let pathname = this.props.location.pathname;
        //console.log(pathname);
        return (
            <div className="outer">
                {this.renderMainIcon()}
                {this.renderLeftMenu()}
                {this.renderTitle()}

                <div className="main-content">
                    <div className="content">
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="example"
                            transitionEnterTimeout={350}
                            transitionLeave={false}
                        >
                            {this.props.children ?
                                React.cloneElement(this.props.children,{
                                    key:pathname
                                })
                            :<FrontPage key={pathname} {...this.props}/>
                            }
                        </ReactCSSTransitionGroup>

                    </div>
                </div>

                {/*<div className="layout-footer">版权所有 @ pomelo</div>*/}
            </div>
        )
    }
}
export default connect(state=>({
    user:state.user
}))(muiThemeable()(Layout));