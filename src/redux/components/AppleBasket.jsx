import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions/appleAction';
import AppleItem from './AppleItem';
import '../../styles/appleBasket.scss';

class AppleBasket extends React.Component {

    componentWillUpdate() {
        let apples = this.props.appleBasket.apples
        apples.forEach((apple) => {
            console.log(apple.red)
        })
    }

    /**  计算当前已吃和未吃苹果的状态*/
    calculateStatus(){
        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            },
            appleRipen: {
                quantity: 0,
                weight: 0
            }
        };
        this.props.appleBasket.apples.forEach(apple => {

            let selector = apple.isEaten ? 'appleEaten':'appleNow';
                status[selector].quantity ++;
                status[selector].weight += apple.weight;

        });
        return status;
    }

    calculateRipenApple(){
        let appleRipen = {
            quantity: 0,
            weight: 0
        }

        this.props.appleBasket.apples.forEach(apple => {

            if(apple.ripen){
                appleRipen.quantity ++;
                appleRipen.weight += apple.weight;
            }
        });
        return appleRipen;
    }

    handleApple = (id, red) => {
        if (red){
            this.props.actions.eatApple(id)
        } else {
            this.props.actions.ripenApple(id)
        }


        console.log('eat'+this.props.appleBasket.apples)
        console.log('red'+red)
    }



    /** 获取未吃苹果的组件数组*/
    getAppleItem(apples) {
        let data = [];
        apples.forEach(apple => {
            if (!apple.isEaten) {
                data.push( <AppleItem apple={apple} handleApple={this.handleApple} key={apple.id}/> )
            }

        });

        if(!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也</div>);
        return data;
    }

    render(){

        let { appleBasket, actions  } = this.props;
        let { apples, isPicking} = appleBasket;
        let status = this.calculateStatus();
        let appleRipen = this.calculateRipenApple()
        let {
            appleNow: {quantity:notEatenQuantity,weight:notEatenWeight},
            appleEaten: {quantity:EatenQuantity,weight:EatenWeight}
        } = status;
        let { quantity:ripenQuantity, weight: ripenWeight } = appleRipen;


        return (
            <div className="appleBasket">
                <div className="title">苹果篮子</div>

                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
                    </div>
                    <div className="section">
                        <div className="head">催熟</div>
                        <div className="content"> {ripenQuantity}个青苹果，{ripenWeight} 克</div>
                    </div>
                </div>


                <div className="appleList">
                    { this.getAppleItem(apples) }
                </div>

                <div className="btn-div">
                    <button  className={isPicking ? 'disabled' : ''}  onClick={actions.pickApple} >摘苹果</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appleBasket: state.appleBasket
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

 export default connect(mapStateToProps, mapDispatchToProps)(AppleBasket);