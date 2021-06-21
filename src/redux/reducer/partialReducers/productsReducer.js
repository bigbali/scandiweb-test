import * as actions from "../../actions/types";

const productsReducer = (state = [], action) => {
    switch (action.type){
        case actions.PRODUCTS_SET:
            return {
                ...state,
                all: action.payload,
            }
        default:
            return state;
    }
}

export default productsReducer;