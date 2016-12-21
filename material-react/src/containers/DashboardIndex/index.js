/**
 * Created by CoolGuy on 2016/12/12.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './dashboard-index.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import Icon from '../../components/Icon';
class DashboardIndex extends Component{
    renderOneLi(theId){
        let id = theId || "";
        let themeColor = this.props.muiTheme.palette.primary1Color;
        //<li style={{borderBottom:"2px solid "+themeColor}}>
        //    会议系统
        //</li>
        return (
            <Link to={`/dashboard/edit/${id}`}>
                {id ?
                    <Paper
                        className="one"
                        rounded={false}
                        zDepth={0}
                        style={{borderBottom:"2px solid "+themeColor}}

                    >
                        <Icon name="gear" size={20} className="settings" useThemeColor={true}
                              onClick={(e)=>{console.log("111");e.preventDefault();e.stopPropagation();}}></Icon>
                        <Icon name="data" size={60}></Icon>
                        <span className="name">会议系统</span>
                    </Paper> :
                    <Paper className="one add" rounded={false} zDepth={0}>
                        <Icon name="plus-circle" size={60} color="#aaa" style={{width:80,height:100}} disableTouchRipple={true}></Icon>
                    </Paper>
                }

            </Link>
        );
    }

    render(){

        return (
            <div className="dashboard-content">
                <h1>工作台</h1>
                <div className="project-list clearfix">
                    {this.renderOneLi(1)}
                    {this.renderOneLi(2)}
                    {this.renderOneLi(3)}
                    {this.renderOneLi(4)}
                    {this.renderOneLi(5)}
                    {this.renderOneLi(6)}
                    {this.renderOneLi(0)}
                </div>
            </div>
        )
    }
}

export default connect()(muiThemeable()(DashboardIndex));