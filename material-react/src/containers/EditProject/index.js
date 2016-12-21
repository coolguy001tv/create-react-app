/**
 * Created by CoolGuy on 2016/12/20.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
//import Divider from 'material-ui/Divider';
import Icon from '../../components/Icon';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import "./edit-project.scss";

class EditProject extends Component{
    render(){
        console.log(this.props.params.id);
        let id = this.props.params.id;
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <Paper rounded={false} className="edit-project" style={{borderTop:"2px solid "+themeColor}}>
                <Icon name="data" size={100}></Icon>
                <TextField
                    hintText="项目名"
                    errorText=""
                    defaultValue={""}
                    fullWidth={true}
                />
                <TextField
                    hintText="描述(非必填)"
                    errorText=""
                    defaultValue={""}
                    fullWidth={true}
                />
                <Link to="/dashboard/api" style={{width:"100%"}}>
                    <RaisedButton label={id?"编 辑":"新 建"} fullWidth={true} primary={true} style={{marginTop:40}}/>
                </Link>
            </Paper>
        )
    }
}

export default muiThemeable()(EditProject);