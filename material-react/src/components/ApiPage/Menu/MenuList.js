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
import action from '../../../actions';
import {createUuid} from '../../../util';
import {createDefaultLeftMenu} from '../../../initData';

import $ from 'jquery';
require("../../../../public/nestable/jquery.nestable");
import './menu-list.scss';
class MenuList extends Component{
    state = {
        dialogFolderOpen: false,
        dialogApiOpen:false,
    };
    handleOpen = (isFolder) => {
        let key = isFolder ? 'dialogFolderOpen' : 'dialogApiOpen'
        this.setState({[key]: true});
    };

    handleClose = (isFolder) => {
        let key = isFolder ? 'dialogFolderOpen' : 'dialogApiOpen'
        this.setState({[key]: false});
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
        $leftMenu.on("change",function(e,changedElement){
            let data = $leftMenu.nestable('serialize');
            let {dispatch} = _this.props;
            //todo: 优化什么时候应该发起协议
            //dispatch(AjaxAction.folderAdjust(_this.getProjectId(),data));
            //console.log(data,currentMenu);
            //目前只能先依靠这个事件了
            //如果点击的是API，需要获取详情
            let $p = $(changedElement).parent();
            if($p.data("type") === "file"){
                let id = $p.data("id");
                id && dispatch(AjaxAction.apiGet(id))
            }

        });
        $leftMenu.on("helloworld",function(){
            let $this = $(this);
            console.log($this);
        });
        //获取列表
        dispatch(AjaxAction.folderList(this.getProjectId())).then((data)=>{
            let theData = data.data;
            //如果没有数据添加一条默认的目录数据
            if(!theData || !theData.folders){
                this.addFolder(createDefaultLeftMenu());
            }

        });
    }

    addOneApi = ()=>{
        //告知后端创建新的API了
        //先只创建API到默认的未分类下，后期考虑放到其他目录下
        let {currentMenu,dispatch} = this.props;
        let currentMenu0 = currentMenu[0];
        let newApi = {
            apiId:createUuid(),
            apiName:this.refs.apiName.input.value || "新的API",
            type:"file"
        };
        let newListItem = {
            id:newApi.apiId,
            name:newApi.apiName,
            type:newApi.type
        };
        currentMenu0.children = currentMenu0.children || [];
        currentMenu0.children.push(newListItem);
        dispatch(AjaxAction.apiAdd({
            apiId:newApi.apiId,
            api:{
                apiName:newApi.apiName
            },
            projectId:this.getProjectId(),
            folders:{
                list:currentMenu
            }
        }));
        this.setState({
            dialogApiOpen:false
        })
    };
    addFolder = (folder)=>{
        let {dispatch,currentMenu} = this.props;
        currentMenu = currentMenu || [];
        let newFolder = folder;
        let projectId = this.getProjectId();
        if(!newFolder){
            let name = this.refs.name.input.value;
            newFolder = {
                "id": createUuid(),
                "name": name,
            };
        }
        newFolder.type = "folder";
        let newFolders = [...currentMenu,newFolder];
        dispatch(AjaxAction.folderAdd(projectId,newFolder.id,newFolder.name,newFolders)).then((data)=>{
            if(data.result){
                this.setState({
                    dialogFolderOpen:false
                })
            }
        })
    };
    addApi = ()=>{
        let {dispatch} = this.props;
        dispatch(action.showApiDetail());
        this.addOneApi();
        //同时还需要更新左侧目录
    };
    setFolder = (e)=>{
        console.log("setFolder");
        e.stopPropagation();
    };
    //注意，请不要随意动renderFolder/renderApi的结构，否则拖动可能不可用
    renderFolder(folder){
        if(!folder || !folder.length){
            return null;
        }
        return (
            <ol className="dd-list">
                {folder.map((v)=>{
                    return (
                        <li key={v.id} className="dd-item" data-type={v.type || "folder"} data-name={v.name}  data-id={v.id}>
                            <div className="dd-handle">
                                <Icon name="folder" size={20}/>
                                <span className="name">{v.name}</span>
                            </div>
                            <IconMenu
                                iconButtonElement={<IconButton iconClassName="fa fa-plus-square"></IconButton>}
                                anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                                targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                                className="item-icon"
                                style={{position:"absolute"}}
                            >
                                <MenuItem primaryText="文件夹" onClick={this.handleOpen.bind(this,true)}/>
                                <MenuItem primaryText="API" onClick={this.handleOpen.bind(this,false)}/>
                            </IconMenu>
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
                        <MenuItem primaryText="文件夹" onClick={this.handleOpen.bind(this,true)}/>
                        <MenuItem primaryText="API" onClick={this.handleOpen.bind(this,false)}/>
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
                                onTouchTap={this.handleClose.bind(this,true)}
                              />,
                            <FlatButton
                                label="提交"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.addFolder.bind(this,null)}
                            />]}
                    modal={false}
                    open={this.state.dialogFolderOpen}
                    onRequestClose={this.handleClose.bind(this,true)}
                >
                    <TextField hintText="给文件夹取个名字" ref="name"/>
                </Dialog>
                <Dialog
                    title="请输入API名称"
                    contentStyle={{width:400}}
                    actions={[<FlatButton
                                label="取消"
                                primary={true}
                                onTouchTap={this.handleClose.bind(this,false)}
                              />,
                            <FlatButton
                                label="提交"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.addApi.bind(this,null)}
                            />]}
                    modal={false}
                    open={this.state.dialogApiOpen}
                    onRequestClose={this.handleClose.bind(this,false)}
                >
                    <TextField hintText="给API取个名字" ref="apiName"/>
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