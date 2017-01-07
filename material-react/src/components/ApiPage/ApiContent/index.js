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

//import reducers from '../../../reducers';


const request_method = ["GET","POST","HEAD","PUT","DELETE","TRACE","CONNECT","OPTIONS"];
const request_type = ["HTTP","HTTPS"];
const data_type = ["FORM_DATA","X_WWW_FORM_URLENCODED","RAW","BINARY"];
const response_type = ["application/atom+xml","application/x-www-form-urlencoded","application/json","application/octet-stream",
    "application/svg+xml","application/xhtml+xml","application/xml","multipart/form-data","text/html","text/plain",
    "text/xml","*/*","pplication/octet-stream"];
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
        request_method:request_method[0],
        request_type:request_type[0],
        data_type:data_type[0],
        response_type:response_type[2],
        top:0
    };
    handleChange = (type,event, index, value) => this.setState({[type]:value});
    cardBasicInfo(){
        return (
            <Card containerStyle={cardStyle}>
                <CardTitle title="基本信息" titleStyle={titleStyle} style={cardTitleStyle}/>
                <div>
                    <TextField
                        hintText="http://"
                        floatingLabelText="接口地址"
                        fullWidth={true}

                    />
                </div>
                <div className="dp-f">
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="请求类型"
                            value={this.state.request_type}
                            onChange={(...e)=>{this.handleChange('request_type',...e)}}
                            fullWidth={true}
                        >
                            {request_type.map((v,i)=>{
                                return <MenuItem key={i}  value={v} primaryText={v} />
                            })}

                        </SelectField>
                    </div>
                    <div className="flex1">
                        <SelectField
                            floatingLabelText="请求方式"
                            value={this.state.request_method}
                            onChange={(...e)=>{this.handleChange('request_method',...e)}}
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
                            value={this.state.data_type}
                            onChange={(...e)=>{this.handleChange('data_type',...e)}}
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
                            value={this.state.response_type}
                            onChange={(...e)=>{this.handleChange('response_type',...e)}}
                            fullWidth={true}
                            labelStyle={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}
                        >
                            {response_type.map((v,i)=>{
                                return <MenuItem key={i} value={v} primaryText={v} />
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
        let {request,requestTextArea,response,responseTextArea} = this.props;
        //console.log(request,requestTextArea);
        return (
            <div className="api-content-wrapper">
                <div className="header">
                    <h1>获取用户列表</h1>
                    <div className="toggle">
                        <Toggle
                            label="预览"
                            defaultToggled={true}
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
        )
    }
}
export default connect((state)=>{
    return {
        request:state.currentProject.request,
        requestTextArea:state.currentProject.requestTextArea,
        response:state.currentProject.response,
        responseTextArea:state.currentProject.responseTextArea
    }
})(muiThemeable()(ApiContent));
