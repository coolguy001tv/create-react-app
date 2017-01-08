/**
 * Created by CoolGuy on 2016/11/29.
 */
import FolderAction from './FolderAction';
import ProjectAction from './ProjectAction';
import LoginAction from './LoginAction';
import ApiAction from './ApiAction';







export default {
    ...LoginAction,
    ...ProjectAction,
    ...FolderAction,
    ...ApiAction
}
