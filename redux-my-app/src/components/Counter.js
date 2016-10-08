/**
 * Created by CoolGuy on 2016/10/8 11:22.
 */
import {Component} from 'react';

export default class Counter extends Component {
    render(){
        return (
            <button onClick={this.props.onIncrement}>
                {this.props.value}
            </button>
        )
    }
}