/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import Action from '../../../actions';
import {/*parseImportData,*/listToObject} from '../../../util';
//import $ from 'jquery';
//import TextField from 'material-ui/TextField';
const btnStyle = {
    margin:20
};
const demoJson = JSON.stringify({
    "string":"foo","number":5,"array":[1,2,3,null],
    "object":{"property":"value",
        "subobj":{"arr":["foo","ha"],"numero":1}}},null,'\t');
class TextArea extends Component{
    formatList = (list)=>{
        //var temp = [];
        //parseImportData(data,temp);
        //console.log(JSON.stringify(temp,null,'\t'));
        let data = JSON.stringify(listToObject(list),null,'    ');
        return data;
    };

    handleDataChange = (e) => {
        let value = e.target.value;
        let {dispatch,apiType} = this.props;
        dispatch(Action.changeApiRequestDataTextAreaAll(apiType,value));

    };
    handleKeyDown = (e) => {
        let code = e.keyCode || e.charCode;
        if(code === 9){//Tab键
            e.preventDefault();
            //e.target.setSelectionRange(0,0);
            //var selObj = window.getSelection();
            //console.log(selObj);
        }
    };
    handleImportFromTable = ()=>{
        let {dispatch,table,apiType} = this.props;
        let data = JSON.stringify(listToObject(table),null,'    ');
        dispatch(Action.changeApiRequestDataTextAreaAll(apiType,data));
    };
    handleBeautify = ()=>{
        let {textarea,dispatch,apiType} = this.props;
        try{
            let jsonTextArea = JSON.parse(textarea);
            let data = JSON.stringify(jsonTextArea,null,'    ');
            dispatch(Action.changeApiRequestDataTextAreaAll(apiType,data));
        }catch (e){
            console.warn("oops,压根就不是json格式",e);
        }
    };
    handleUglify = () =>{
        let {textarea,dispatch,apiType} = this.props;
        try{
            let jsonTextArea = JSON.parse(textarea);
            let data = JSON.stringify(jsonTextArea);
            dispatch(Action.changeApiRequestDataTextAreaAll(apiType,data));
        }catch (e){
            console.warn("oops,压根就不是json格式",e);
        }
    };
    render(){
        let {textarea} = this.props;
        return (
            <div>
                <div style={{marginTop:20,borderTop:"1px solid #ccc"}}>
                    <RaisedButton label="从表格导入" style={btnStyle} onClick={this.handleImportFromTable}/>
                    <RaisedButton label="美化格式" style={btnStyle} onClick={this.handleBeautify}/>
                    <RaisedButton label="压缩格式" style={btnStyle} onClick={this.handleUglify}/>
                </div>

                <textarea name="textarea"
                          id="textarea"
                          cols="100"
                          rows="20"
                          placeholder={demoJson}
                          value={textarea}
                          onChange={this.handleDataChange}
                          onKeyDown={this.handleKeyDown}
                          style={{
                            height:200
                          }}
                >
                </textarea>
                <div>
                    友情提醒：从表格导入可能会清空输入框中的所有内容
                </div>
            </div>
        )
    }
}

export default connect((state)=>({state}))(muiThemeable()(TextArea));
