/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import TextArea from '../../TextArea';
import {connect} from 'react-redux';
import Action from '../../../actions';
import AjaxAction from '../../../actions/AjaxAction';
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
class TheTextArea extends Component{
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
            //todo:在用户光标处插入4个空格
            //e.target.setSelectionRange(0,0);
            //var selObj = window.getSelection();
            //console.log(selObj);
        }else if(code === 13){//回车键触发保存
            this.handleApiEdit();
        }
    };
    handleApiEdit = () => {
        //let value = event.target.value;
        let {dispatch,apiType,textarea,currentApiId} = this.props;
        //todo:只有在值不相同的情况下进行处理
        dispatch(AjaxAction.apiEdit(currentApiId,{
            [apiType+"JsonArgs"]:textarea
        }));
    };
    handleImportFromTable = ()=>{
        let {dispatch,table,apiType} = this.props;
        let data = JSON.stringify(listToObject(table),null,'    ');
        dispatch(Action.changeApiRequestDataTextAreaAll(apiType,data));
        this.handleApiEdit();
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


                <TextArea placeholder={demoJson}
                          value={textarea}
                          onChange={this.handleDataChange}
                          onKeyDown={this.handleKeyDown}
                >
                </TextArea>
                <div>
                    友情提醒：从表格导入可能会清空输入框中的所有内容
                </div>
            </div>
        )
    }
}

export default connect((state)=>({
    state:state,//必须要有这项，否则可能导致不会在被修改的时候重新渲染
    currentApiId:state.currentApiId
}))(muiThemeable()(TheTextArea));
