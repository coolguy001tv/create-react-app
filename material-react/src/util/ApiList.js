/**
 * Created by CoolGuy on 2017/1/1.
 *
 */
const URL_PREFIX = "http://192.168.1.100:8080";

let User = {

};
let Login = {
    register:{
        url:URL_PREFIX+"/v1/user/account/register",
        method:"post"
    }
};

export default {
    User,
    Login
}