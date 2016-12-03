/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ContentInbox from '../../../node_modules/material-ui/svg-icons/content/inbox';
import ActionGrade from '../../../node_modules/material-ui/svg-icons/action/grade';
import ContentSend from '../../../node_modules/material-ui/svg-icons/content/send';
import ContentDrafts from '../../../node_modules/material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Link from '../NavLink';

import './layout.scss';

export default class Layout extends Component{

    componentDidMount() {
        //console.log("It's ok!");
    }
    render(){
        //console.log(this.props.location)
        return (
            <div className="outer">
                <div>公共头部</div>
                <div className="">
                    <div className="left-menu">

                        <List>
                            <Subheader>左侧菜单只用于临时展示用~</Subheader>
                            <Divider />
                            <Link to="/login"><ListItem primaryText="登录" leftIcon={<ContentInbox />} /></Link>
                            <Link to="/reg"><ListItem primaryText="注册" leftIcon={<ActionGrade />} /></Link>
                            <Link to="/dashboard"><ListItem primaryText="dashboard" leftIcon={<ContentDrafts />} /></Link>
                        </List>
                        <Divider />
                    </div>
                    <div className="content">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >

                            {this.props.children && React.cloneElement(this.props.children,{
                                key:this.props.location.pathname
                            })}

                    </ReactCSSTransitionGroup>
                    </div>
                    {/*<div className="content">
                        {this.props.children}
                    </div>*/}
                </div>

                <div className="footer">版权所有 @ pomelo</div>
            </div>
        )
    }
}