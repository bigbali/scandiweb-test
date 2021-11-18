import initialState from "../../initialState";
import deepEqual from 'deep-equal';
import * as actions from "../../actions/types";

const cartReducer = (state = initialState.cart, action) => {
    console.log("CARTA")
    switch (action.type) {
        case actions.CART_ADD:
            return add(state, action)
        default:
            return state;
    }
}

export default cartReducer;

const add = (state, action) => {
    const newProduct = action.payload.product;
    const oldProduct = state.products[newProduct.id];
    state.counter++;

    state.total = newProduct.prices.map((price, index) => {
        return {
            currency: price.currency,
            amount: price.amount +
                (state.total[index]
                    ? state.total[index].amount
                    : 0
                )
        }
    })

    // If product is already in cart => check if new variation matches
    // one that's already there, and if so, increment its counter
    if (state.products[newProduct.id]) {
        let isInCart = false;

        oldProduct.variations.forEach((variation, index) => {
            if (deepEqual(
                variation.attributes,
                action.payload.attributes
            )) { // If incoming attributes match already existing
                state.products[newProduct.id].variations[index].quantity++;
                isInCart = true;
            }
        })

        // If not variation is not yet in cart, but product is already there,
        // add variation to product
        if (!isInCart) {
            state.products[newProduct.id].variations.push({
                quantity: 1,
                attributes: action.payload.attributes
            })
        }
    }
    else {
        // When product with this ID has not yet been added to cart,
        // add it
        state.products[newProduct.id] = {
            ...action.payload.product,
            variations: [
                {
                    quantity: 1,
                    attributes: action.payload.attributes
                }
            ]
        }
    }

    return { ...state }
}

const remove = (state, action) => {
    state.counter--;

    const id = action.payload.product.id;
    const product = state.products[id];

    // If product is already in cart => check if new variation matches
    // one that's already there, and if so, increment its counter
    if (product) {
        product.variations.forEach((variation, index) => {
            if (deepEqual(variation.attributes,
                action.payload.attributes
            )) { // If incoming attributes match already existing
                let relevantVariation = state.products[id].variations[index];

                if (relevantVariation.quantity <= 1) {
                    delete state.products[id].variations[index];
                }
                else {
                    relevantVariation.quantity--;
                }
            }
        })
    }

    return state
}