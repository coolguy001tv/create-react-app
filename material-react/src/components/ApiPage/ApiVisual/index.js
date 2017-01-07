/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ApiTable from './Table';
import ApiTextArea from './TextArea';


class ApiVisual extends Component{

    render(){
        let {table,textarea,apiType} = this.props;
        return (
            <div>
                <ApiTable table={table} textarea={textarea} apiType={apiType}/>
                <ApiTextArea table={table} textarea={textarea} apiType={apiType}/>
            </div>


        )
    }
}

export default muiThemeable()(ApiVisual);