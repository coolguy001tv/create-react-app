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
import {uuid} from '../../../util';
import './table.scss';

//import Reducer from '../../../reducers/CurrentProjectReducer';
import Action from '../../../actions';

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
        let {dispatch} = this.props;
        dispatch(Action.addApiRequestData(uuid));
    };
    handleDelOneRow = (uuid) => {
        let {dispatch} = this.props;
        dispatch(Action.delApiRequestData(uuid));
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
        let id = one.uuid || uuid();
        return (
            <TableRow key={id}>
                <TableRowColumn className={"depth-"+depth} style={{paddingLeft:24+depth*20}}><TextField onChange={this.handleArgNameChange.bind(this,id)} name="argument-name" style={{width:"auto"}} value={one.name}/></TableRowColumn>
                <TableRowColumn><TextField onChange={this.handleTestValueChange.bind(this,id)} name="argument-value" style={{width:"auto"}} value={one.testValue}/></TableRowColumn>
                <TableRowColumn>{this.renderSelect(one.type,id)}</TableRowColumn>
                <TableRowColumn style={requireTrStyle}><Checkbox onCheck={this.handleCheck.bind(this,id)} checked={one.require || false}/></TableRowColumn>
                <TableRowColumn style={operationTrStyle}>{this.formatOneOperation(id)}</TableRowColumn>
                <TableRowColumn><TextField name="description" onChange={this.handleDescriptionValueChange.bind(this,id)} style={{width:"auto"}} value={one.description}/></TableRowColumn>
            </TableRow>
        );
    };
    handleDescriptionValueChange = (uuid, event, newValue) => {
        let {dispatch} = this.props;
        dispatch(Action.changeApiRequestData(uuid,"description",newValue));
    };
    handleTestValueChange = (uuid, event, newValue) => {
        let {dispatch} = this.props;
        dispatch(Action.changeApiRequestData(uuid,"testValue",newValue));
    };
    handleArgNameChange = (uuid,event,newValue) =>{
        let {dispatch} = this.props;
        console.log(uuid,newValue);
        dispatch(Action.changeApiRequestData(uuid,"name",newValue));
    };
    handleCheck = (uuid,event,isInputChecked) => {
        let {dispatch} = this.props;
        dispatch(Action.changeApiRequestData(uuid,"require",isInputChecked));
    };
    //todo: 修改当前项的值
    handleChange = (uuid,event, index, type) =>{
        let {dispatch} = this.props;
        //console.log(uuid,event, index, value);
        dispatch(Action.changeApiRequestData(uuid,"type",type));
    };
    renderSelect = (value,id)=>{
        return (
            <SelectField
                value={value||"string"}
                onChange={this.handleChange.bind(this,id)}
            >
                <MenuItem value="string" primaryText="string" />
                <MenuItem value="number" primaryText="number" />
                <MenuItem value="array" primaryText="array" />
                <MenuItem value="object-array" primaryText="object-array" />
                <MenuItem value="object" primaryText="object" />
                <MenuItem value="boolean" primaryText="boolean" />
            </SelectField>
        )
    };
    render(){

        let {data} = this.props;
        console.log(data);
        this.tableRow = [];
        this.depth = 0;
        this.listData(data);
        //console.log(this.tableRow);
        return (
            <div>

                <Table  selectable={false} style={{textAlign:"center"}}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>参数名</TableHeaderColumn>
                            <TableHeaderColumn>参数值</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn style={requireTrStyle}>必传</TableHeaderColumn>
                            <TableHeaderColumn style={operationTrStyle}>操作</TableHeaderColumn>
                            <TableHeaderColumn>描述</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {this.tableRow}
                    </TableBody>
                </Table>
                <RaisedButton onClick={this.handleAddOneRow.bind(this,null)} label="新增"/>

                <div>
                    注意：删除一个为object/array-object的数据时，将同时删除其下所有元素
                </div>
            </div>

        )
    }
}

export default connect((state)=>({state}))(muiThemeable()(ApiTable));