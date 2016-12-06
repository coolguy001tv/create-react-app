/**
 * Created by CoolGuy on 2016/12/3.
 * 请参考http://www.material-ui.com/#/customization/themes 修改主题
 */
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

let primary = {
    palette: {
        primary1Color:"#22c67f"
    }
};


export default (type)=>{
    switch (type){
        case 'default':
            return primary;
        case 'dark':
            return darkBaseTheme;
        default:
            return lightBaseTheme;
    }
};