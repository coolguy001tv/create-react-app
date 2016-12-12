/**
 * Created by CoolGuy on 2016/12/7.
 * 首页
 */
import './front-page.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Icon from '../../components/Icon';
import {connect} from 'react-redux';
class FrontPage extends Component{

    create(){
        this.props.router.push('/login');
    }

    renderNumber(number,name){
        return (
            <div className="data">
                <span className="number">{number}</span>
                <span>{name}</span>
            </div>
        )
    }
    render(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        console.log(this.props.theme);
        return (
            <div className="front-page">
                <header className="header">
                    <h1></h1>
                    <RaisedButton label="创建一个项目" style={{width:320,marginBottom:40}} primary={true}
                             onClick={()=>{this.create()}}     />
                    <Divider/>
                </header>
                <div className="front-page-content" style={{color:themeColor}}>
                    当前有{this.renderNumber(222111,'用户')}
                    编写了{this.renderNumber(1234,'APIs')}，
                    被{this.renderNumber(234562345,'开发人员')}使用
                </div>
                <div className="icons-div">
                    <div className="one-icon">
                        <Icon name="team" size={100} useThemeColor={true}/>
                        <span className="name">团队</span>
                    </div>
                    <div className="one-icon">
                        <Icon name="cooperation" size={100} useThemeColor={true}/>
                        <span className="name">协作</span>
                    </div>
                    <div className="one-icon">
                        <Icon name="data" size={100} useThemeColor={true}/>
                        <span className="name">数据</span>
                    </div>
                    <div className="one-icon">
                        <Icon name="management" size={100} useThemeColor={true}/>
                        <span className="name">管理</span>
                    </div>
                </div>
                <Divider/>
                其他内容，先这么放着了~
                <footer className="footer">
                    <div className="upper">
                        <div className="content">
                            <div className="list">
                                <h1>平台</h1>
                                <ul>
                                    <li>如何使用</li>
                                    <li>产品介绍</li>
                                </ul>
                            </div>
                            <div className="list">
                                <h1>关于我们</h1>
                                <ul>
                                    <li>博客</li>
                                    <li>团队</li>
                                </ul>
                            </div>
                            <div className="list">
                                <h1>关注我们</h1>
                                <ul>
                                    <li>博客</li>
                                    <li>团队</li>
                                    <li>博客</li>
                                    <li>团队</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="downer">
                        CopyRight @Pomelo Team
                    </div>
                </footer>


            </div>
        )
    }
}
export default connect((state)=>({
    theme:state.theme
}))(muiThemeable()(FrontPage));