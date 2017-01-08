/**
 * Created by CoolGuy on 2016/11/29.
 */
import API from '../util/ApiList';
import {ajax,ajaxCommon} from '../util';
import FolderAction from './FolderAction';
import ProjectAction from './ProjectAction';
import LoginAction from './LoginAction';







export default {
    ...LoginAction,
    ...ProjectAction,
    ...FolderAction
}
