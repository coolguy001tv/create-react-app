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
import AjaxAction from '../../actions/AjaxAction';
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
                              onClick={(e)=>{e.preventDefault();e.stopPropagation();}}></Icon>
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

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(AjaxAction.projectList());
    }

    render(){

        let {projectList} = this.props;
        return (
            <div className="dashboard-content">
                <h1>工作台</h1>
                <div className="project-list clearfix">
                    {projectList.map((v,i)=>{
                        this.renderOneLi(v,i);
                    })}

                    {this.renderOneLi(0)}
                </div>
            </div>
        )
    }
}

export default connect((state)=>({
    projectList:state.projectList
}))(muiThemeable()(DashboardIndex));