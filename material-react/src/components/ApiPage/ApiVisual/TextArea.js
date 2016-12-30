/**
 * Created by CoolGuy on 2016/12/30.
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const btnStyle = {
    margin:12
};
const demoJson = JSON.stringify({
    "string":"foo","number":5,"array":[1,2,3,null],
    "object":{"property":"value",
        "subobj":{"arr":["foo","ha"],"numero":1}}},null,'\t');
class TextArea extends Component{

    render(){
        return (
            <div>

                <RaisedButton label="美化(Beautify)" style={btnStyle} />
                <RaisedButton label="Uglify" style={btnStyle} />
                <textarea name="textare" id="textare" cols="100" rows="20" placeholder={demoJson}></textarea>
            </div>
        )
    }
}

export default muiThemeable()(TextArea);
