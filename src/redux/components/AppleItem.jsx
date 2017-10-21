import React from 'react';
import redApple from '../../images/red_apple.png'
import greenApple from '../../images/green_apple.jpg'
import '../../styles/appleItem.scss';

class AppleItem extends React.Component {

    render() {
        let { apple, handleApple} = this.props;

        return (

            <div className="appleItem">
                <div className="apple"><img style={styles.apple} src={apple.red? redApple:greenApple} alt="" /></div>
                <div className="info">
                    <div className="name">{apple.red? '红苹果':'青苹果'} - { apple.id }号</div>
                    <div className="weight">{ apple.weight }克</div>
                </div>
                <div className="btn-div">
                    <button
                        style={{backgroundColor: apple.red? '#2BA7FC':'red'}}
                        onClick={
                            ()=> {
                                handleApple(apple.id, apple.red)
                                this.setState({refresh:2})
                            }
                        }
                    > {apple.red? '吃掉':'催熟'} </button>
                </div>
            </div>
        );
    }
}

AppleItem.propTypes = {
    apple: React.PropTypes.object.isRequired,     // 单个苹果的数据
};

const styles = {
    apple:{
        height: 50
    }
}


export default AppleItem;