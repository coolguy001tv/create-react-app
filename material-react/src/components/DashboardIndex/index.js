/**
 * Created by CoolGuy on 2016/12/12.
 */
import React,{Component} from 'react';
import './dashboard-index.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';
class DashboardIndex extends Component{
    renderOneLi(){
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <li style={{borderBottom:"2px solid "+themeColor}}>
                会议系统
            </li>
        )
    }
    render(){

        return (
            <div className="dashboard-content">
                <h1>工作台</h1>
                <ul className="project-list clearfix">
                    {this.renderOneLi()}
                    {this.renderOneLi()}
                    {this.renderOneLi()}
                    {this.renderOneLi()}
                    {this.renderOneLi()}
                    {this.renderOneLi()}
                    <li className="add">
                        新建项目
                    </li>
                </ul>
            </div>
        )
    }
}

export default muiThemeable()(DashboardIndex);