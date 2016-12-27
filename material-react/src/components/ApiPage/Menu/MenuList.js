/**
 * Created by CoolGuy on 2016/12/26.
 */
import React,{Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Icon from '../../Icon';
import $ from 'jquery';
require("../../../../public/nestable/jquery.nestable");
import './menu-list.scss';
class MenuList extends Component{
    componentDidMount() {
        //$('.dd1').nestable({maxDepth:2});
        $('.dd').nestable({maxDepth:2});
    }
    render(){
        return (
            <div>MenuList
                <div>
                    <div className="" style={{width:300}}>
                        <ol className="dd-list">
                            <li className="dd-item" data-id="1">
                                <div className="dd-handle"><MenuItem primaryText="Maps" /></div>

                            </li>
                            <li className="dd-item" data-id="2">
                                <div className="dd-handle"><MenuItem primaryText="Maps" /></div>

                            </li>
                            <li className="dd-item" data-id="3">
                                <div className="dd-handle"><MenuItem primaryText="Maps" /></div>

                                <div className="">
                                    <ol className="dd-list">
                                        <li className="dd-item" data-id="4">
                                            <div className="dd-handle"><MenuItem primaryText="Maps" /></div>

                                        </li>
                                        <li className="dd-item" data-id="5">
                                            <div className="dd-handle"><MenuItem primaryText="Maps" /></div>
                                        </li>
                                    </ol>
                                </div>

                            </li>
                        </ol>
                    </div>

                    <div className="dd" style={{width:400,margin:"100px"}}>
                        <ol className="dd-list">
                            <li className="dd-item" data-id="11">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">用户管理</span></div>
                            </li>
                            <li className="dd-item" data-id="12">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">统计管理</span></div>
                            </li>
                            <li className="dd-item" data-id="13">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">项目管理</span></div>

                                    <ol className="dd-list">
                                        <li className="dd-item" data-id="14">
                                            <div className="dd-handle"><span className="method post"></span> <span className="name">获取用户列表</span></div>
                                        </li>
                                        <li className="dd-item" data-id="15">
                                            <div className="dd-handle"><span className="method get"></span> <span className="name">获取用户列表</span></div>
                                        </li>
                                    </ol>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuList;