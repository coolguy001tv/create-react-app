/**
 * Created by CoolGuy on 2016/10/11 16:05.
 */
import React from 'react';
import { connect } from 'react-redux';
import '../styles/appleBasket.css';
import AppleItem from '../components/AppleItem';
import {fetchApple} from '../actions/apple';

class AppleBasket extends React.Component {

    pickApple(){
        let {dispatch} = this.props;
        console.log("pick pick");
        dispatch(fetchApple("theId"));
    }
    render() {

        let { state } = this.props;
        //if(!state.apple) state.apple = [];

        //这部分从对应的 appleBasketReducer.js 中拷贝
        //let mockState = {
        //    isPicking : false,
        //    newAppleId: 3,
        //    apples: [
        //        {
        //            id: 1,
        //            weight: 235,
        //            isEaten: true
        //        },
        //        {
        //            id: 2,
        //            weight: 256,
        //            isEaten: false
        //        }
        //    ]
        //};
        //
        ////是否开启模拟数据的开关，注释这行代码关闭模拟数据
        //state = mockState;


        //对 state 做显示级别的转化
        let stats = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };

        state.apple.map(apple => {
            let selector = apple.isEaten ? 'appleEaten':'appleNow';
            stats[selector].quantity ++;
            stats[selector].weight += apple.weight;
        })


        return (
            <div className="appleBusket">
                <div className="title">苹果篮子</div>

                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">
                            {stats.appleNow.quantity}个苹果，
                            {stats.appleNow.weight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">
                            {stats.appleEaten.quantity}个苹果，
                            {stats.appleEaten.weight}克
                        </div>
                    </div>
                </div>

                <div className="appleList">
                    { state.apple.map((apple,i) => <AppleItem key={i} state ={apple} />) }
                </div>

                <div className="btn-div">
                    <button onClick={this.pickApple.bind(this)}>摘苹果</button>
                </div>

            </div>
        );
    }

}
function select(state) {
    return {
        state: state
    }
}
export default connect(select)(AppleBasket);