/**
 * Created by CoolGuy on 2016/12/21.
 */
import React,{Component} from 'react';
import Menu from '../../components/ApiPage/Menu/MenuList';
import ApiContent from '../../components/ApiPage/ApiContent';
import './api-page.scss';
class ApiPage extends Component{
    render(){
        return (
            <div className="api-page-wrapper">
                <div className="row-left"><Menu/></div>
                <div className="row-right">
                    <ApiContent/>
                </div>
            </div>
        )
    }
}

export default ApiPage;