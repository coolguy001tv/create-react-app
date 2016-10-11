/**
 * Created by CoolGuy on 2016/10/10 16:52.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import Apple from './containers/AppleBasket';
export default class AllApp extends Component {
    render(){
        console.log("AllApp");
        return (
            <Apple/>
        )
    }
}