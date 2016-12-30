/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import Toggle from 'material-ui/Toggle';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ApiTable from './Table';
import ApiTextArea from './TextArea';


class ApiVisual extends Component{

    render(){
        return (
            <div>
                <ApiTable/>
                <ApiTextArea/>
            </div>


        )
    }
}

export default muiThemeable()(ApiVisual);