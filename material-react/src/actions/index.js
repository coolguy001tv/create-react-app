/**
 * Created by CoolGuy on 2016/11/27.
 */
import CurrentProjectAction from './CurrentApiAction';
const THEME_CHANGE = 'THEME_CHANGE';//变更主题
const SHOW_API_DETAIL = "SHOW_API_DETAIL";//展示右侧的API详情

export default {
    THEME_CHANGE,
    SHOW_API_DETAIL,
    showApiDetail: ()=>({
        type:SHOW_API_DETAIL
    }),
    ...CurrentProjectAction,
};