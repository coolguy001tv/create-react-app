/**
 * Created by CoolGuy on 2016/12/3.
 * 请参考http://www.material-ui.com/#/customization/themes 修改主题
 */
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

let defaultType = {
    palette: {
        primary1Color:"#22c67f"
    }
};

let redType = {
    palette: {
        primary1Color:"#ff0000"
    }
};

export default (type)=>{
    switch (type){
        case 'default':
            return defaultType;
        case 'dark':
            return darkBaseTheme;
        case 'red':
            return redType;
        default:
            return lightBaseTheme;
    }
};