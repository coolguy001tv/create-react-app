/**
 * Created by CoolGuy on 2016/12/7.
 * 首页
 */
import './front-page.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
//@muiThemeable
export default class FrontPage extends Component{

    create(){
        this.props.router.push('/login');
    }

    renderNumber(number,name){
        return (
            <div className="numbers">
                <span>220,443</span>
                <span>用户</span>
            </div>
        )
    }
    render(){
        return (
            <div className="front-page">
                <div className="header">
                    <h1></h1>
                    <RaisedButton label="创建一个项目" style={{width:320,marginBottom:40}} primary={true}
                             onClick={()=>{this.create()}}     />
                    <Divider/>
                </div>
                <div className="front-page-content">
                    当前有{this.renderNumber(222111,'用户')}
                    编写了{this.renderNumber(1234,'APIs')}，
                    被{this.renderNumber(234562345,'开发人员')}使用
                </div>

            </div>
        )
    }
}
