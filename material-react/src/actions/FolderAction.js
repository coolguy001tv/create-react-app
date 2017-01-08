/**
 * Created by CoolGuy on 2017/1/8.
 */
import API from '../util/ApiList';
import {ajax,ajaxCommon} from '../util';

const FOLDER_ADD = "FOLDER_ADD";//新建目录
const FOLDER_ADJUST = "FOLDER_ADJUST";//调整目录结构
const FOLDER_LIST = "FOLDER_LIST";//获取目录结构列表
const FOLDER_DELETE = "FOLDER_DELETE";//删除目录
const FOLDER_EDIT = "FOLDER_EDIT";//编辑目录


export default {
    FOLDER_ADD,
    FOLDER_ADJUST,
    FOLDER_LIST,
    FOLDER_DELETE,
    FOLDER_EDIT,
}