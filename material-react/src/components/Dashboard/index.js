/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import DashboardIndex from '../../containers/DashboardIndex';
import muiThemeable from 'material-ui/styles/muiThemeable';
import './dashboard.scss';
class Dashboard extends Component{

    render(){
        //let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <div className="dashboard">
                {this.props.children || <DashboardIndex/>}
            </div>
        )
    }
}

export default muiThemeable()(Dashboard)