/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import Action from '../../../actions';
import {parseImportData,listToObject} from '../../../util';
import $ from 'jquery';
//import TextField from 'material-ui/TextField';
const btnStyle = {
    margin:12
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
    state = {
        shouldUpdateTextArea:true,//如果用户处于编辑状态，则不需要更新；blur之后则需要更新
        textArea:this.props.data ? this.formatList(this.props.data) : ""
    };

    componentWillReceiveProps(newProps){
        let newData = this.formatList(newProps.data);
        console.log(newData);
        if(this.state.shouldUpdateTextArea){
            if(newData !== this.state.textArea){
                this.setState({
                    textArea:newData
                })
            }
        }

    }
    componentDidMount(){
        //$(document).on("keypress",function(e){
        //   console.log(e.charCode);
        //});
    }

    handleDataChange = (e) => {
        let value = e.target.value;
        this.setState({
            textArea:value
        },()=>{
            try{
                let json = JSON.parse(value);
                console.log(json);
                let {dispatch} = this.props;
                let parsedData = [];
                parseImportData(json,parsedData);
                dispatch(Action.changeApiRequestDataAll(parsedData));
            }catch (e){
                //不用做任何事
            }
        })

    };
    handleBlur = (e) => {
        this.setState({
            shouldUpdateTextArea:true
        })
    };
    handleFocus = (e) => {
        this.setState({
            shouldUpdateTextArea:false
        })
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
    render(){
        return (
            <div>
                <RaisedButton label="美化(Beautify)" style={btnStyle} />
                <RaisedButton label="Uglify" style={btnStyle} />
                <textarea name="textare"
                          id="textare"
                          cols="100"
                          rows="20"
                          placeholder={demoJson}
                          value={this.state.textArea}
                          onChange={this.handleDataChange}
                          onBlur={this.handleBlur}
                          onFocus={this.handleFocus}
                          onKeyDown={this.handleKeyDown}
                          style={{
                            height:200
                          }}
                >

                </textarea>
            </div>
        )
    }
}

export default connect((state)=>({state}))(muiThemeable()(TextArea));
