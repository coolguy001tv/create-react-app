/**
 * Created by CoolGuy on 2016/12/26.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
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
    renderFolder(folder){
        if(!folder || !folder.length){
            return null;
        }
        return (
            <ol className="dd-list">
                {folder.map((v)=>{
                    return (
                        <li key={v.id} className="dd-item" data-type={v.type || "folder"} data-name={v.name}  data-id={v.id}>
                            <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">{v.name}</span></div>
                            {this.renderApi(v.children)}
                        </li>
                    );
                })}
            </ol>
        )

    }
    renderApi(children){
        if(!children || !children.length){
            return null;
        }
        return (
            <ol className="dd-list">
                {children.map((v)=>{
                    return (
                        <li key={v.id} className="dd-item" data-type={v.type || "file"} data-name={v.name} data-method={v.method ||"options"}  data-id={v.id}>
                            <div className="dd-handle"><span className={"method "+v.method}></span> <span className="name">{v.name}</span></div>
                        </li>
                    );
                })}
            </ol>
        )
    }
    //目前只处理2级
    renderMenu = ()=>{
        let {currentMenu} = this.props;
        return this.renderFolder(currentMenu);
    };
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
                    {this.renderMenu()}
                </div>
            </div>

        )
    }
}

export default connect((state)=>{
    return {
        currentMenu:state.currentMenu
    }
})(muiThemeable()(MenuList));