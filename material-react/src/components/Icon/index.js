/**
 * Created by CoolGuy on 2016/12/8.
 * 所有的图标信息
 * 当前支持的图标请参考方法iconNames
 * eg:
 * <Icon name="management" size={120}/>
 * <Icon name="team"/>
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {connect} from 'react-redux';
import './icon.scss';
class Icon extends Component{

    iconNames(icon){
        let icons = ['pomelo','management','team','cooperation','data'];
        icon = icon.toLowerCase();
        if(icons.indexOf(icon)===-1){
            return icons[0];
        }
        return icon;
    }

    renderIconManagement(){
        return (
            <span className="icon-management">
                <span className="path1"></span><span className="path2"></span>
            </span>
        )
    }

    renderIconTeam(){
        return (
            <span className="icon-team">
                <span className="path1"></span><span className="path2"></span>
            </span>
        )
    }

    renderIconCooperation(){
        return (
            <span className="icon-cooperation">
                <span className="path1"></span><span className="path2"></span>
            </span>
        )
    }
    renderIconData(){
        return (
            <span className="icon-data">
                <span className="path1"></span><span className="path2"></span><span className="path3"></span>
            </span>
        )
    }
    renderDefaultIcon(name){

        return (
            <span className={"icon-"+name}></span>
        )
    }
    //注意，有几个ICON不是纯色的，比较特殊
    renderIcon(name){
        switch (name){
            case 'management':return this.renderIconManagement();
            case 'team':return this.renderIconTeam();
            case 'cooperation':return this.renderIconCooperation();
            case 'data':return this.renderIconData();
            default:return this.renderDefaultIcon(name);
        }
    }
    //获取图标的颜色，如果传入color则使用，否则检查是否useThemeColor为true，是的话使用主题色，否则返回undefined
    getIconColor(){
        let color = this.props.color;
        if(color){
            return color;
        }
        let useThemeColor = this.props.useThemeColor;
        if(useThemeColor){
            color = this.props.muiTheme.palette.primary1Color;
        }
        return color;
    }
    specailIconStyle(){
        let theme = this.props.theme;
        let color = this.getIconColor();
        let name = this.iconNames(this.props.name);
        //非default的主题并且图标是以下4种，需要单独处理样式
        //hack copy from:http://www.duanzhihe.com/984.html
        if(theme!=='default' && ~['management','team','cooperation','data'].indexOf(name)){
            // Create a new style tag
            let style = document.createElement("style");
            // Append the style tag to head
            document.head.appendChild(style);

            // Grab the stylesheet object
            let sheet = style.sheet;

            // Use addRule or insertRule to inject styles
            let iconClassName = 'icon-'+name;
            //console.log(iconClassName,color);
            sheet.addRule(`.${iconClassName} ::before`,`color: ${color} !important`);
            sheet.insertRule(`.${iconClassName} ::before { color: ${color}  !important}`, 0);
        }

    }

    componentDidUpdate() {
        this.specailIconStyle();
    }
    componentDidMount(){
        this.specailIconStyle();
    }
    render(){
        let name = this.iconNames(this.props.name);
        let size = this.props.size;
        let className = this.props.className || "";

        let color = this.getIconColor();
        //console.log("color",color);

        //'management','team','cooperation','data' 这几个图标需要单独处理颜色
        return (
            <span className={"icon "+className} style={{fontSize:size,color:color}} >
                {this.renderIcon(name)}
            </span>

        )
    }
}

export default connect((state)=>({
    theme:state.theme
}))(muiThemeable()(Icon));