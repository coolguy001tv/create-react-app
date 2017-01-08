/**
 * Created by CoolGuy on 2016/12/20.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
//import Divider from 'material-ui/Divider';
import Icon from '../../components/Icon';
import TextField from 'material-ui/TextField';
//import {Link} from 'react-router';
import "./edit-project.scss";
import AjaxAction from '../../actions/AjaxAction';

class EditProject extends Component{

    editProject = ()=>{
        //新增或编辑，先写新增
        let {projectName,description} = this.refs;
        let {dispatch,router,params} = this.props;
        let {id} = params;//projectId
        let projectNameValue = projectName.input.value;
        let descriptionValue = description.input.value;
        if(id){//编辑
            dispatch(AjaxAction.projectEdit(id,projectNameValue,descriptionValue)).then((data) => {
                if(data.result){
                    router.push('/dashboard');
                }
            })
        }else{
            dispatch(AjaxAction.projectAdd(projectNameValue,descriptionValue)).then((data)=>{
                if(data.result){
                    let id = data.data;
                    router.push('/dashboard/project/'+id);
                }
            });
        }

        return false;
    };
    getCurrentProjectInfo = (projectId)=>{
        let {projectList} = this.props;
        if(!projectList || !projectList.length){
            return;
        }
        let result = projectList.find((v)=>{
            return(v.projectId === projectId);
        });
        return result;
    };
    render(){
        console.log(this.props.params.id);
        let id = this.props.params.id;//这是productId
        let themeColor = this.props.muiTheme.palette.primary1Color;
        let currentProject = this.getCurrentProjectInfo(id) || {};
        return (
            <Paper rounded={false} className="edit-project" style={{borderTop:"2px solid "+themeColor}}>
                <Icon name="data" size={100}></Icon>
                <TextField
                    hintText="项目名"
                    errorText=""
                    defaultValue={currentProject.projectName}
                    ref="projectName"
                    fullWidth={true}
                />
                <TextField
                    hintText="描述(非必填)"
                    errorText=""
                    defaultValue={currentProject.description}
                    ref="description"
                    fullWidth={true}
                />

                <RaisedButton label={id?"编 辑":"新 建"} fullWidth={true} primary={true} style={{marginTop:40,width:"100%"}} onClick={this.editProject}/>

            </Paper>
        )
    }
}

export default connect((state)=>({
    projectList:state.projectList
}))(muiThemeable()(EditProject));