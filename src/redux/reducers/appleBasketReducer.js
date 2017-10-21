import { fromJS } from 'immutable';  //为什么immutable 没写入package.json 好奇怪

const initialState = {
    isPicking: false,
    newAppleId: 3,
    apples: [
        {
            id: 0,
            weight: 233,
            isEaten: false,
            red: true,
            ripen: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true,
            red: false,
            ripen: false
        },
        {
            id: 2,
            weight: 256,
            isEaten: false,
            red: false,
            ripen: false
        }
    ]
};


export default (state = initialState, action) => {

    //let newState ;

    switch (action.type) {

        case 'apple/BEGIN_PICK_APPLE':

            /** 将isPicking设置true */
            return fromJS(state).set('isPicking', true).toJS();

        case 'apple/DONE_PICK_APPLE':

            let newApple =  {
                id: state.newAppleId,
                weight: action.payload[0],
                isEaten: false,
                red: action.payload[1]
            };

            return fromJS(state).update('apples', list => list.push(newApple))
                                .set('newAppleId', state.newAppleId + 1)
                                .set('isPicking', false)
                                .toJS();

        case 'apple/FAIL_PICK_APPLE':

            return fromJS(state).set('isPicking', false).toJS();

        case 'apple/EAT_APPLE':

            return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();


        case 'apple/RIPEN_APPLE':
            alert('苹果已经被催熟可以食用')

            return fromJS(state).setIn(['apples', action.payload, 'red'], true)
                                .setIn(['apples', action.payload, 'ripen'], true)
                                .toJS();

        default:
            return state;
    }

};
