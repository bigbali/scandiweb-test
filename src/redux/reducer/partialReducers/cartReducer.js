import * as actions from "../../actions/types";

const cartReducer = (state = [], action) => {
    switch (action.type){
        case actions.CART_ADD:
            return {
                ...state,
                products: {
                    ...state.products
                    + action.payload
                }
            }
            
        /*
        case actions.CART_REMOVE:
            return {
                ...state,
                xcurrencies
            }
        case actions.CART_INCREMENT:
            return {
                ...state,
                xcurrencies
            }
        case actions.CART_DECREMENT:
            return {
                ...state,
                xcurrencies
            }
        */
        default:
            return state;
    }
}

export default cartReducer;