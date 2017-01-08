/**
 * Created by CoolGuy on 2016/12/26.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Icon from '../../Icon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AjaxAction from '../../../actions/AjaxAction';
import {createUuid} from '../../../util'

import $ from 'jquery';
require("../../../../public/nestable/jquery.nestable");
import './menu-list.scss';
class MenuList extends Component{
    state = {
        dialogOpen: false,
        dialogType:"file",//文件file或者文件夹folder
        dialogOperation:"add",//新增add或者编辑edit
    };
    handleOpen = () => {
        this.setState({dialogOpen: true});
    };

    handleClose = () => {
        this.setState({dialogOpen: false});
    };
    getProjectId = ()=>{
        let location = window.location.href;
        let locArr = location.split("/");
        let index = locArr.findIndex((v)=>{
            return v === "project";
        });
        if(index === -1){
            console.error("程序错误，projectId");
            return;
        }
        let projectId = locArr[index+1];
        return projectId;
    };
    componentDidMount() {
        let {dispatch} = this.props;
        let $leftMenu = $('#leftMenu');
        let _this = this;
        $leftMenu.nestable({maxDepth:2});
        $leftMenu.on("change",function(){
            let data = $leftMenu.nestable('serialize');
            let {dispatch} = _this.props;
            dispatch(AjaxAction.folderAdjust(_this.getProjectId(),data));
            //console.log(data,currentMenu);

        });
        dispatch(AjaxAction.folderList(this.getProjectId()));
    }
    addName = ()=>{
        this.handleOpen();
    };
    addFolder = ()=>{
        let {dispatch,currentMenu} = this.props;
        let projectId = this.getProjectId();
        let name = this.refs.name.input.value;
        let newFolder = {
            "id": createUuid(),
            "name": name,
            "type": "folder",
        };
        let newFolders = [...currentMenu,newFolder];
        dispatch(AjaxAction.folderAdd(projectId,newFolder.id,newFolder.name,newFolders)).then((data)=>{
            if(data.result){
                this.setState({
                    dialogOpen:false
                })
            }
        })
    };
    renderFolder(folder){
        if(!folder || !folder.length){
            return null;
        }
        return (
            <ol className="dd-list">
                {folder.map((v)=>{
                    return (
                        <li key={v.id || v.folderId} className="dd-item" data-type={v.type || "folder"} data-name={v.name || v.folderName}  data-id={v.id || v.folderId}>
                            <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">{v.name || v.folderName}</span></div>
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
                    <IconMenu
                        iconButtonElement={<IconButton iconClassName="fa fa-plus-square"></IconButton>}
                        anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                    >
                        <MenuItem primaryText="文件夹" onClick={this.addName}/>
                        <MenuItem primaryText="API" />
                    </IconMenu>

                    <Icon name="sort-alpha-asc" size={20}/>
                </div>
                <div id="leftMenu" className="dd">
                    {this.renderMenu()}
                </div>
                <Dialog
                    title="请输入文件夹名称"
                    contentStyle={{width:400}}
                    actions={[<FlatButton
                                label="取消"
                                primary={true}
                                onTouchTap={this.handleClose}
                              />,
                            <FlatButton
                                label="提交"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.addFolder}
                            />]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    <TextField hintText="给文件夹取个名字" ref="name"/>
                </Dialog>
            </div>

        )
    }
}

export default connect((state)=>{
    return {
        currentMenu:state.currentMenu
    }
})(muiThemeable()(MenuList));