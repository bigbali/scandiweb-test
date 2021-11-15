import initialState from "../../initialState";
import * as actions from "../../actions/types";

const cartReducer = (state = initialState.cart, action) => {
    switch (action.type) {
        case actions.CART_ADD:
            let cart = { ...state };

            cart = {
                counter: ++state.counter,
                products: {
                    ...state.products,
                    [action.payload.product.id]: {
                        ...action.payload.product,
                        attributes: [
                            ...action.payload.attributes,
                        ],
                        count: 1
                    }
                }
            }

            // let match = false;
            // state.products.forEach((cartItem, index) => {
            //     if (cartItem.id === action.payload.product.id) {
            //         match = true;
            //         // if (JSON.stringify({ ...cartItem.attributes }) === JSON.stringify({ ...action.payload.attributes })) {
            //         //     console.log("MATCH")
            //         //     state.products[index].count++;
            //         //     returnValue = state;
            //         // }
            //         cartItem.attributes.forEach((attribute, index) => {
            //             console.log(attribute.selected)
            //             console.log(action.payload.attributes[index].selected)
            //         })
            //         // console.log(cartItem.attributes)
            //         // console.log(action.payload.attributes)

            //     }
            // })

            return cart

        default:
            //console.log("def")
            return state;
    }
}

export default cartReducer;