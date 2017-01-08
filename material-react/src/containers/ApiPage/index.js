/**
 * Created by CoolGuy on 2016/12/21.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Menu from '../../components/ApiPage/Menu/MenuList';
import ApiContent from '../../components/ApiPage/ApiContent';
import './api-page.scss';
require('../../../public/scrollTo/jquery.scrollTo');
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

export default connect()(ApiPage);