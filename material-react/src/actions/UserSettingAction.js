/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajaxCommon} from '../util';
const USER_SETTING_ACCOUNT = "USER_SETTING_ACCOUNT";//获取用户账户信息信息
const USER_SETTING_INFO = "USER_SETTING_INFO";//获取用户信息
const USER_SETTING_INFO_EDIT = "USER_SETTING_INFO_EDIT";//设置用户信息

export default {
    USER_SETTING_ACCOUNT,
    USER_SETTING_INFO,
    USER_SETTING_INFO_EDIT,
    userSettingAccount:() => {
        return ajaxCommon({
            api:API.UserSetting.account,
            success:(data)=>({
                type:USER_SETTING_ACCOUNT,
                data
            })});
    },
    userSettingInfo:() => {
        return ajaxCommon({
            api:API.UserSetting.info,
            success:(data)=>({
                type:USER_SETTING_INFO,
                data
            })});
    },
    userSettingInfoEdit:(userInfoReq) => {
        return ajaxCommon({
            api:API.UserSetting.infoEdit,
            data:{userInfoReq},
            success:(data)=>({
                type:USER_SETTING_INFO_EDIT,
                data
            })});
    }
}