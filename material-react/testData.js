/**
 * Created by CoolGuy on 2016/12/21.
 * 测试可用的后端接口
 */
$.ajax({url:"http://121.40.214.161:8080/user/account/register",data:JSON.stringify({
    "authCode": "string",
    "email": "string",
    "nickname": "string",
    "password": "string",
    "phone": "string"
}),dataType:"json",type:"post",contentType:"application/json;charset=UTF-8"});