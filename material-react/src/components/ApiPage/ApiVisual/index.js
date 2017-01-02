/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ApiTable from './Table';
import ApiTextArea from './TextArea';


class ApiVisual extends Component{

    render(){
        let {data} = this.props;
        return (
            <div>
                <ApiTable data={data}/>
                <ApiTextArea data={data}/>
            </div>


        )
    }
}

export default muiThemeable()(ApiVisual);