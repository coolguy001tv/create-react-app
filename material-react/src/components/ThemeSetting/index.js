/**
 * Created by CoolGuy on 2016/12/3.
 * 主题设置
 */
import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ThemeType from './ThemeType';

 class ThemeSetting extends React.Component{
    render(){
        let {theme} = this.props;
        console.log(theme);
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(ThemeType(theme))}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
};
export default connect((state)=>({theme:state.theme}))(ThemeSetting);
