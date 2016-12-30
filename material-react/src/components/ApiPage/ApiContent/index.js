/**
 * Created by CoolGuy on 2016/12/28.
 */

import React,{Component} from 'react';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ApiVisual from '../ApiVisual';
import './api-content.scss';
import $ from 'jquery';


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

    liClick = ()=>{
        let _this = this;
        let scroller = $(".api-content-wrapper .content-wrapper");

        $(".left-nav-ul li").click(function(){
            let $this = $(this);
            let height = $this.outerHeight();
            let index= $this.index();
            _this.setState({
                top:index*height
            });
            console.log(index);
            scroller.scrollTo((".card"+index),1500);
        });

    };

    componentDidMount() {
        this.liClick();
        $(".api-content-wrapper .content-wrapper").css("height",document.documentElement.clientHeight - 70);
    }
    render(){

        let themeColor = this.props.muiTheme.palette.primary1Color;

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
                                <ApiVisual/>
                            </Card>
                        </div>




                    </div>
                </div>


            </div>
        )
    }
}
export default muiThemeable()(ApiContent);
