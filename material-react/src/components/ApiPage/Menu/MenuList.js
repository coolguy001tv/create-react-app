/**
 * Created by CoolGuy on 2016/12/26.
 */
import React,{Component} from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Icon from '../../Icon';
import $ from 'jquery';
require("../../../../public/nestable/jquery.nestable");
import './menu-list.scss';
class MenuList extends Component{
    // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
          nest:false
      };
    }
    componentDidMount() {
        //注意列表页目前有BUG，即API可以移动到第一级目录下
        $('.dd').nestable({maxDepth:2});

    }
    render(){
        return (
            <div>
                <div>
                    <div className="dd" style={{width:200}}>
                        <ol className="dd-list">
                            <li className="dd-item" data-type="folder"  data-id="abcdefas">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">1用户管理</span></div>
                                <ol className="dd-list">
                                    <li className="dd-item" data-type="file"  data-id="14">
                                        <div className="dd-handle"><span className="method post"></span> <span className="name">1.1获取用户列表</span></div>
                                    </li>
                                </ol>
                            </li>
                            <li className="dd-item" data-type="folder"  data-id="12">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">2统计管理</span></div>
                            </li>
                            <li className="dd-item" data-type="folder"  data-id="13">
                                <div className="dd-handle"><Icon name="folder" size={20}/> <span className="name">3项目管理</span></div>

                                    <ol className="dd-list">
                                        <li className="dd-item" data-type="file"  data-id="14">
                                            <div className="dd-handle"><span className="method post"></span> <span className="name">获取用户列表</span></div>
                                        </li>
                                        <li className="dd-item" data-type="file" data-id="15">
                                            <div className="dd-handle"><span className="method get"></span> <span className="name">获取用户列表</span></div>
                                        </li>
                                    </ol>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuList;