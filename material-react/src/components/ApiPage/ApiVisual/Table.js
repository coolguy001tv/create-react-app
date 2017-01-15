/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
//import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import {supportedType} from '../../../initData';
import {parseImportData,/*listToObject,*/createUuid} from '../../../util';
import './table.scss';

//import Reducer from '../../../reducers/CurrentProjectReducer';
import Action from '../../../actions';
import AjaxAction from '../../../actions/AjaxAction';

const operationTrStyle = {
    width:50
};
const requireTrStyle = {
    width:50
};

class ApiTable extends Component{
    tableRow = [];
    depth = 0;
    listData = (data)=>{
        if(this.depth < 0){
            return null;//目前不清楚为什么会有这种异常
        }
        if(!data || !data.length){
            return null;
        }
        let len = data.length;
        for(let i = 0; i < len; i++){
            let currentOne = data[i];
            this.tableRow.push(this.formatOneData(currentOne,this.depth));
            if(currentOne.children && currentOne.children.length){
                this.depth++;
                this.listData(currentOne.children);
            }
        }
        this.depth--;
    };
    handleAddOneRow = (uuid) => {
        let {dispatch,apiType} = this.props;
        dispatch(Action.addApiRequestData(apiType,uuid));
    };
    handleDelOneRow = (uuid) => {
        let {apiType,dispatch} = this.props;
        dispatch(Action.delApiRequestData(apiType,uuid));
    };
    formatOneOperation = (uuid) => {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem primaryText="新增" onClick={this.handleAddOneRow.bind(this,uuid)}/>
                <MenuItem primaryText="删除" onClick={this.handleDelOneRow.bind(this,uuid)}/>
            </IconMenu>
        )
    };
    formatOneData = (one,depth)=>{
        let id = one.uuid || createUuid();
        return (
            <TableRow key={id}>
                <TableRowColumn className={"depth-"+depth} style={{paddingLeft:24+depth*20}}>
                    <TextField onChange={this.handleArgNameChange.bind(this,id)}
                               onBlur={this.handleApiEdit}
                               name="argument-name"
                               style={{width:"auto"}}
                               value={one.name}/>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField onChange={this.handleTestValueChange.bind(this,id)}
                               onBlur={this.handleApiEdit}
                               name="argument-value"
                               style={{width:"auto"}}
                               value={one.textValue}/>
                </TableRowColumn>
                <TableRowColumn>
                    <TextField name="description"
                               onChange={this.handleDescriptionValueChange.bind(this,id)}
                               onBlur={this.handleApiEdit}
                               style={{width:"auto"}}
                               value={one.description}/>
                </TableRowColumn>
                <TableRowColumn>{this.renderSelect(one.type,id)}</TableRowColumn>
                <TableRowColumn style={requireTrStyle}>
                    <Checkbox onCheck={this.handleCheck.bind(this,id)}
                              onBlur={this.handleApiEdit}
                              checked={one.require || false}/></TableRowColumn>
                <TableRowColumn style={operationTrStyle}>{this.formatOneOperation(id)}</TableRowColumn>

            </TableRow>
        );
    };
    handleApiEdit = () => {
        let {dispatch,apiType,table,currentApiId} = this.props;
        //todo:只有在值不相同的情况下进行处理
        dispatch(AjaxAction.apiEdit(currentApiId,{
            [apiType+"TableArgs"]:table
        }));
    };
    handleDescriptionValueChange = (uuid, event, newValue) => {
        let {dispatch,apiType} = this.props;
        dispatch(Action.changeApiRequestData(apiType,uuid,"description",newValue));
    };
    handleTestValueChange = (uuid, event, newValue) => {
        let {dispatch,apiType} = this.props;
        dispatch(Action.changeApiRequestData(apiType,uuid,"textValue",newValue));
    };
    handleArgNameChange = (uuid,event,newValue) =>{
        let {dispatch,apiType} = this.props;
        console.log(uuid,newValue);
        dispatch(Action.changeApiRequestData(apiType,uuid,"name",newValue));
    };
    handleCheck = (uuid,event,isInputChecked) => {
        let {dispatch,apiType} = this.props;
        dispatch(Action.changeApiRequestData(apiType,uuid,"require",isInputChecked));
    };
    //todo: 修改当前项的值
    handleChange = (uuid,event, index, type) =>{
        let {dispatch,apiType} = this.props;
        //console.log(uuid,event, index, value);
        dispatch(Action.changeApiRequestData(apiType,uuid,"type",type));
        //修改之后需要同时发协议告诉后端
        this.handleApiEdit();
    };
    handleImport = () => {
        console.log("import from json");
        let {dispatch,textarea,apiType} = this.props;
        try{
            let jsonTextArea = JSON.parse(textarea);
            let array = [];
            parseImportData(jsonTextArea,array);
            dispatch(Action.changeApiRequestDataAll(apiType,array));
            //导入成功后也需要将修改告知后端
            this.handleApiEdit();
        }catch (e){
            console.warn("Oops,根本不是一个json格式",e);
        }

    };
    renderSelect = (value,id)=>{
        return (
            <SelectField
                value={value||"string"}
                onChange={this.handleChange.bind(this,id)}
            >
                {supportedType.map((v)=>{
                    return <MenuItem key={v} value={v} primaryText={v} />
                })}
            </SelectField>
        )
    };
    render(){
        let {table} = this.props;
        this.tableRow = [];
        this.depth = 0;
        this.listData(table);
        return (
            <div>
                <Table selectable={false} style={{textAlign:"center"}}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>参数名</TableHeaderColumn>
                            <TableHeaderColumn>参数值</TableHeaderColumn>
                            <TableHeaderColumn>描述</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn style={requireTrStyle}>必传</TableHeaderColumn>
                            <TableHeaderColumn style={operationTrStyle}>操作</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {this.tableRow}
                    </TableBody>
                </Table>
                {/*注意，下面一行必须bind(this,null)或者下面的写法,否则会把一个事件对象传递过去*/}
                <RaisedButton style={{marginTop:20,marginBottom:20}} onClick={()=>{this.handleAddOneRow()}} label="新增"/>
                <RaisedButton style={{margin:20}} onClick={this.handleImport} label="从JSON导入"/>
                <div>
                    注意：删除一个为object/array-object的数据时，将同时删除其下所有元素
                </div>
            </div>

        )
    }
}

export default connect((state)=>({
    //table:state.table,
    state:state,//必须要有这项，否则可能导致不会在被修改的时候重新渲染
    currentApiId:state.currentApiId
}))(muiThemeable()(ApiTable));