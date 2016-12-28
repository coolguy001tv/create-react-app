/**
 * Created by CoolGuy on 2016/12/26.
 */
import React,{Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Icon from '../../Icon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import $ from 'jquery';
require("../../../../public/nestable/jquery.nestable");
import './menu-list.scss';
class MenuList extends Component{
    componentDidMount() {
        //注意列表页目前有BUG，即API可以移动到第一级目录下
        $('#leftMenu').nestable({maxDepth:2});
    }
    addFolder(){
        console.log("folder added");
    }
    render(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <div className="menu-list-wrapper">
                <h1 style={{borderBottom:"1px solid "+themeColor}}>会议系统</h1>
                <div className="one-row">
                    <Icon name="plus-square" size={20} onClick={()=>{this.addFolder()}}/>
                    <Icon name="sort-alpha-asc" size={20}/>
                </div>
                <div id="leftMenu" className="dd">
                    <ol className="dd-list">
                        <li className="dd-item" data-type="folder" data-name="1用户管理"  data-id="abcdefas">
                            <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">1用户管理</span></div>
                            <ol className="dd-list">
                                <li className="dd-item" data-type="file" data-name="1.1获取用户列表" data-method="post"  data-id="14">
                                    <div className="dd-handle"><span className="method post"></span> <span className="name">1.1获取用户列表</span></div>
                                </li>
                            </ol>
                        </li>
                        <li className="dd-item" data-type="folder"  data-name="2统计管理" data-id="12">
                            <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">2统计管理</span></div>
                        </li>
                        <li className="dd-item" data-type="folder"  data-id="13" data-name="3项目管理">
                            <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">3项目管理</span></div>

                            <ol className="dd-list">
                                <li className="dd-item" data-type="file"  data-method="post"   data-name="获取用户列表" data-id="14">
                                    <div className="dd-handle"><span className="method post"></span> <span className="name">获取用户列表</span></div>
                                </li>
                                <li className="dd-item" data-type="file"  data-method="get" data-id="15"  data-name="获取用户列表">
                                    <div className="dd-handle"><span className="method get"></span> <span className="name">获取用户列表</span></div>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </div>

        )
    }
}

export default muiThemeable()(MenuList);