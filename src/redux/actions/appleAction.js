// import $ from 'jquery';


let actions = {

    pickApple: function() {

        return function(dispatch, getState) {
            /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
            if (getState().appleBasket.isPicking){
                return;
            }

            dispatch(actions.beginPickApple());

            let option = [true, false]

            let weight = Math.floor(200 + Math.random() * 50);
            let ran = Math.floor(Math.random()*2)
            let isRed = option[ran]

            dispatch(actions.donePickApple(weight, isRed));

        }
    },

    beginPickApple: () => ({
        type: 'apple/BEGIN_PICK_APPLE'
    }),

    donePickApple: (appleWeight,isRed) => ({
        type: 'apple/DONE_PICK_APPLE',
        payload: [appleWeight, isRed]
    }),

    failPickApple: errMsg => ({
        type: 'apple/FAIL_PICK_APPLE',
        payload: new Error(errMsg),
        error: true
    }),

    eatApple: appleId => ({
        type: 'apple/EAT_APPLE',
        payload: appleId
    }),

    ripenApple: appleId => ({
        type: 'apple/RIPEN_APPLE',
        payload: appleId
    })

};

export default actions;