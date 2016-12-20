/**
 * Created by CoolGuy on 2016/12/8.
 * 所有的图标信息
 * 当前支持的图标请参考方法iconNames和font-awesome网站(http://fontawesome.io/icons/)
 * 要使用font-awesome图标，请在html中引用相关的css（目前已经引入了）
 * eg:
 * <Icon name="management" size={120}/>
 * <Icon name="team"/>
 */
import React,{Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {connect} from 'react-redux';
import './icon.scss';
class Icon extends Component{

    iconNames(icon){
        return icon.toLowerCase();
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
    renderPomelo(name,color,size){
        return (
            <IconButton iconStyle={{color:color,fontSize:size}}>
                <FontIcon className={"icon-pomelo"}>
                </FontIcon>
            </IconButton>

        )
    }
    renderDefaultIcon(name,color,size){
        let disableTouchRipple = this.props.disableTouchRipple || false;//是否不显示MUI点击的效果
        let style = this.props.style;
        return (
            <IconButton disableTouchRipple={disableTouchRipple} iconStyle={{color:color,fontSize:size}} style={{...style}}>
                <FontIcon className={"fa fa-"+name}>
                </FontIcon>
            </IconButton>
        )
    }
    //注意，有几个ICON不是纯色的，比较特殊
    renderIcon(name,color,size){
        switch (name){
            case 'management':return this.renderIconManagement();
            case 'team':return this.renderIconTeam();
            case 'cooperation':return this.renderIconCooperation();
            case 'data':return this.renderIconData();
            case 'pomelo': return this.renderPomelo(name,color,size);
            default:return this.renderDefaultIcon(name,color,size);
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
        let size = this.props.size || 24;
        let className = this.props.className || "";
        let style = this.props.style || {};

        let color = this.getIconColor();
        console.log(name,color,size);

        //'management','team','cooperation','data','pomelo' 这几个图标需要单独处理颜色
        return (
            <span className={"icon "+className} style={{fontSize:size,color:color,...style}} >
                {this.renderIcon(name,color,size)}
            </span>
        )
    }
}

export default connect((state)=>({
    theme:state.theme
}))(muiThemeable()(Icon));