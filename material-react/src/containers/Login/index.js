/**
 * Created by CoolGuy on 2016/11/27.
 */
import React,{Component} from 'react';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
}
var Login = React.createClass({
    render(){
        return (
            <div>
                登陆~
                <Paper style={style} zDepth={1} rounded={false} >
                    登陆
                </Paper>
            </div>

        )

    }
});
export default Login;