/**
 * Created by CoolGuy on 2016/12/28.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import Toggle from 'material-ui/Toggle';
import {Card, CardTitle} from 'material-ui/Card';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ApiVisual from '../ApiVisual';
import TextArea from '../../TextArea';
import './api-content.scss';
import $ from 'jquery';
import action from '../../../actions';
import AjaxAction from '../../../actions/AjaxAction';
import {request_method,request_protocol,data_type,response_type} from '../../../initData';

let titleStyle = {
    fontSize:14,
    color:"#A4B3C1",//themeColor,
    fontWeight:"bold"
};
let cardTitleStyle = {
    //borderBottom:"1px solid #A4B3C1",
    padding:10,
    minWidth:600
};
let cardStyle = {
    padding:10,
    marginBottom:40
};
let liHeight = 29;
class ApiContent extends Component{
    state = {
        top:0
    };
    handleKeyValueChange = (key,event,value) => {
        let {dispatch,currentApiId} = this.props;
        dispatch(action.changeApiDataByKey(key,value));
        //修改同时告诉后端需要更新的数据
        console.log(key,value);
        dispatch(AjaxAction.apiEdit(currentApiId,{
            [key]:value
        }))
    };
    cardBasicInfo(){
        let {currentApi} = this.props;
        currentApi = currentApi || {};
        return (
            <Card containerStyle={cardStyle}>
                <CardTitle title="基本信息" titleStyle={titleStyle} style={cardTitleStyle}/>
                <div>
                    <TextField
                        hintText="http://"
                        floatingLabelText="接口地址"
                        fullWidth={true}
                        onChange={this.handleKeyValueChange.bind(this,"requestURL")}
                        value={currentApi.requestURL}
                    />
                </div>
                <div className="dp-f">
                    <div className="flex1">
                        <TextField
                            hintText=""
                            floatingLabelText="版本号"
                            fullWidth={true}
                            onChange={this.handleKeyValueChange.bind(this,"version")}
                            value={currentApi.version}
                        />
                    </div>
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="请求类型"
                            value={currentApi.contentType}
                            onChange={(event,index,value)=>{this.handleKeyValueChange("contentType",event,value);}}
                            fullWidth={true}
                        >
                            {response_type.map((v,i)=>{/*eslint array-callback-return:0*/
                                for(var key in v){/*eslint guard-for-in:0*/
                                    return <MenuItem key={i}  value={key} primaryText={v[key]} />
                                }

                            })}

                        </SelectField>
                    </div>
                </div>
                <div className="dp-f">
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="协议类型"
                            value={currentApi.protocol}
                            onChange={(event,index,value)=>{this.handleKeyValueChange("protocol",event,value);}}
                            fullWidth={true}
                        >
                            {request_protocol.map((v,i)=>{
                                return <MenuItem key={i}  value={v} primaryText={v} />
                            })}

                        </SelectField>
                    </div>

                    <div className="flex1">
                        <SelectField
                            floatingLabelText="请求方式"
                            value={currentApi.requestMethod}
                            onChange={(event,index,value)=>{this.handleKeyValueChange("requestMethod",event,value);}}
                            fullWidth={true}
                        >
                            {request_method.map((v,i)=>{
                                return <MenuItem key={i}  value={v} primaryText={v} />
                            })}

                        </SelectField>
                    </div>
                </div>
                <div className="dp-f">
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="数据类型"
                            value={currentApi.dataType}
                            onChange={(event,index,value)=>{this.handleKeyValueChange("dataType",event,value);}}
                            fullWidth={true}
                        >
                            {data_type.map((v,i)=>{
                                return <MenuItem key={i} value={v} primaryText={v} />
                            })}

                        </SelectField>
                    </div>
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="响应类型"
                            value={currentApi.respContentType}
                            onChange={(event,index,value)=>{this.handleKeyValueChange("respContentType",event,value);}}
                            fullWidth={true}
                            labelStyle={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}
                        >
                            {response_type.map((v,i)=>{
                                for(var key in v){/*eslint guard-for-in:0*/
                                    return <MenuItem key={i}  value={key} primaryText={v[key]} />
                                }
                            })}

                        </SelectField>
                    </div>

                </div>

            </Card>
        )
    }

    liScroll = (i,cb=null)=>{
        if(i * liHeight === this.state.top){
            return;
        }
        this.setState({
            top:i*liHeight
        },cb)
    };
    liClick = ()=>{
        let _this = this;
        let scroller = $(".api-content-wrapper .content-wrapper");
        $(".left-nav-ul li").click(function(){
            let $this = $(this);
            let index= $this.index();
            _this.liScroll(index,()=>{
                //console.log(index+",");
                scroller.scrollTo((".card"+index),1500);
            });

        });
    };
    upperVisible = ()=>{
        let index = 0;
        let length = 6;//li的长度
        for(let i = length - 1; i >= 0; i--){
            let cardI = $(".card"+i);
            if(cardI.length){
                let top = cardI.position().top;
                if(top <= 0){
                    index = i;
                    break;
                }
            }

        }
        return index;
    };
    scrollChange = ()=>{
        let scroller = $(".api-content-wrapper .content-wrapper");
        scroller.on("scroll",()=>{
            let i = this.upperVisible();
            this.liScroll(i);
        });
    };

    componentDidMount() {
        this.liClick();
        this.scrollChange();
        $(".api-content-wrapper .content-wrapper").css("height",document.documentElement.clientHeight - 70);
    }
    render(){

        let themeColor = this.props.muiTheme.palette.primary1Color;
        let {showApi,currentApi} = this.props;
        let {request,requestTextArea,response,responseTextArea} = currentApi;
        return (
            <div className="api-content-wrapper">
                {!showApi ? <div>赶紧从左边新增一个或者选择一个API吧</div> :
                <div>
                    <div className="header">
                        <h1><TextField
                            hintText="请输入接口名称"
                            value={currentApi.apiName}
                            onChange={this.handleKeyValueChange.bind(this,"apiName")}
                            fullWidth={true}
                            /></h1>
                        <div className="toggle">
                            <Toggle
                                label="预览"
                                defaultToggled={false}
                                labelPosition="right"
                                style={{float:"right"}}
                            />
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="left-nav">
                            <ul className="left-nav-ul">
                                <li>基本信息</li>
                                <li>请求参数</li>
                                <li>响应参数</li>
                                <li>辅助信息</li>
                                <li>示例</li>
                                <li>文档</li>
                            </ul>
                            <div className="line" style={{top:this.state.top,backgroundColor:themeColor}}></div>
                        </div>
                        <div className="right-content">

                            <div className="card0">{this.cardBasicInfo()}</div>
                            <div className="card1">
                                <Card containerStyle={cardStyle}>
                                    <CardTitle title="请求参数" titleStyle={titleStyle} style={cardTitleStyle}/>
                                    <ApiVisual apiType="request" table={request} textarea={requestTextArea}/>
                                </Card>
                            </div>
                            <div className="card2">
                                <Card containerStyle={cardStyle}>
                                    <CardTitle title="响应参数" titleStyle={titleStyle} style={cardTitleStyle}/>
                                    <ApiVisual apiType="response" table={response} textarea={responseTextArea}/>
                                </Card>
                            </div>
                            <div className="card3">
                                <Card containerStyle={cardStyle}>
                                    <CardTitle title="辅助信息" titleStyle={titleStyle} style={cardTitleStyle}/>
                                    <TextArea name="aid-textarea"
                                              id="aid-textarea"
                                              placeholder={"请输入辅助信息"}
                                    ></TextArea>
                                </Card>
                            </div>
                            <div className="card4">
                                <Card containerStyle={cardStyle}>
                                    <CardTitle title="示例" titleStyle={titleStyle} style={cardTitleStyle}/>
                                    <TextArea placeholder={"请输入示例"}
                                    ></TextArea>
                                </Card>
                            </div>
                            <div className="card5">
                                <Card containerStyle={cardStyle}>
                                    <CardTitle title="文档" titleStyle={titleStyle} style={cardTitleStyle}/>
                                    <TextArea placeholder={"请输入文档"}
                                    ></TextArea>
                                </Card>
                            </div>

                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}
export default connect((state)=>{
    return {
        currentApiId:state.currentApiId,
        currentApi:state.currentApi,
        //request:state.currentApi.request,
        //requestTextArea:state.currentApi.requestTextArea,
        //response:state.currentApi.response,
        //responseTextArea:state.currentApi.responseTextArea,
        showApi:state.showApi,
    }
})(muiThemeable()(ApiContent));
