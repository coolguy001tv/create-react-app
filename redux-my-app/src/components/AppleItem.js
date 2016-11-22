/**
 * Created by CoolGuy on 2016/10/11 16:17.
 */
import React from 'react';
import {connect} from 'react-redux';
import '../styles/appleItem.css';
import {eatApple} from '../actions/apple';
class AppleItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.state != this.props.state;
    }
    render() {
        let { state, dispatch } = this.props;
        console.log(state,"Item");
        if (state.isEaten) return null;
        return (
            <div className="appleItem">
                <div className="apple"><img src="../images/apple.png" alt=""/></div>
                <div className="info">
                    <div className="name">红苹果 - {state.id}号</div>
                    <div className="weight">{state.weight}克</div>
                </div>
                <div className="btn-div"><button onClick={() => dispatch(eatApple(state.id)) }>吃掉</button></div>
            </div>
        );

    }


}

export default connect()(AppleItem);