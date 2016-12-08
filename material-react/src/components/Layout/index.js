/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from '../../../node_modules/material-ui/svg-icons/content/inbox';
import ActionGrade from '../../../node_modules/material-ui/svg-icons/action/grade';
import muiThemeable from 'material-ui/styles/muiThemeable';
//import ContentSend from '../../../node_modules/material-ui/svg-icons/content/send';
import ContentDrafts from '../../../node_modules/material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Link from '../NavLink';

import FrontPage from '../../containers/FrontPage';

import './layout.scss';


class Layout extends Component{

    toFrontPage(){
        if(this.props.location.pathname !== '/'){
            this.props.router.push("/");
        }
    }
    renderTitle(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <div className="fixed-header" style={{backgroundColor:themeColor}}>
                <div className="header-left" onClick={()=>{this.toFrontPage()}}>
                    <i className="pomelo-logo">Pomelo</i>
                </div>
                <div className="header-right">
                    <Link to="/login">登录</Link> | <Link to="/reg">注册</Link>
                </div>
            </div>
        )
    }
    render(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        let pathname = this.props.location.pathname;
        //console.log(themeColor,pathname);
        return (
            <div className="outer">
                {this.renderTitle()}
                <div className="main-content">
                    {/*<div className="left-menu" style={{borderTop:"1px solid "+themeColor}}>

                        <List>
                            <Subheader>左侧菜单只用于临时展示用~</Subheader>
                            <Divider />
                            <Link to="/login"><ListItem primaryText="登录" leftIcon={<ContentInbox />} /></Link>
                            <Link to="/reg"><ListItem primaryText="注册" leftIcon={<ActionGrade />} /></Link>
                            <Link to="/dashboard"><ListItem primaryText="dashboard" leftIcon={<ContentDrafts />} /></Link>
                        </List>
                        <Divider />
                    </div>*/}
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

                <div className="footer">版权所有 @ pomelo</div>
            </div>
        )
    }
}
export default muiThemeable()(Layout);