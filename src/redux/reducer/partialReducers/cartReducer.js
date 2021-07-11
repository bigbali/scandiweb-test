import * as actions from "../../actions/types";
import initialState from "../../initialState";

const cartReducer = (state = null, action) => {
    switch (action.type){
        case actions.CART_ADD:

            let variation = {};

            Object.entries(action.payload.attributes).forEach(attribute => {
                variation = {
                    ...variation,
                    [attribute[0]]: attribute[1]
                }
            });

            console.log(state[action.payload.productId])

            
            
            return {
                [action.payload.productId]: {
                    variations: [
                        //...state[action.payload.productId].variations,
                        variation
                    ]
                },
            }
        case actions.CART_REMOVE:
            console.log("rem")
            return "pello"
        case actions.CART_INCREMENT:
            console.log("incr")
            return "pello"
        case actions.CART_DECREMENT:
            console.log("decr")
            return "pello"

        default:
            console.log("def")
            return state;
    }
}

export default cartReducer;