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
import MenuItem from 'material-ui/MenuItem';
import {uuid} from '../../../util';
import './table.scss';

//import Reducer from '../../../reducers/CurrentProjectReducer';
import Action from '../../../actions';

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
    formatOneData = (one,depth)=>{
        let id = one.uuid || uuid();
        return (
            <TableRow key={id}>
                <TableRowColumn className={"depth-"+depth} style={{paddingLeft:24+depth*10}}><TextField name="argument-name" style={{width:"auto"}} value={one.name}/></TableRowColumn>
                <TableRowColumn><TextField name="argument-value" style={{width:"auto"}} value={one.testValue}/></TableRowColumn>
                <TableRowColumn>{this.renderSelect(one.type,id)}</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
            </TableRow>
        );
    };
    //todo: 修改当前项的值
    handleChange = (uuid,event, index, type) =>{
        let {dispatch} = this.props;
        //console.log(uuid,event, index, value);
        dispatch(Action.changeApiRequestType(uuid,type));
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

                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>参数名</TableHeaderColumn>
                            <TableHeaderColumn>参数值</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn>必传</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                            <TableHeaderColumn>描述</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false}>
                        {this.tableRow}
                    </TableBody>
                </Table>
            </div>

        )
    }
}

export default connect((state)=>({state}))(muiThemeable()(ApiTable));