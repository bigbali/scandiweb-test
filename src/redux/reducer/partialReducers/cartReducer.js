import initialState from "../../initialState";
import deepEqual from 'deep-equal';
import * as actions from "../../actions/types";

const cartReducer = (state = initialState.cart, action) => {
    switch (action.type) {
        case actions.CART_ADD:
            return add(state, action)
        case actions.CART_REMOVE:
            return remove(state, action)
        default:
            return state;
    }
}

export default cartReducer;

const add = (state, action) => {
    const newProduct = action.payload.product;
    const oldProduct = state.products[newProduct.id];
    state.counter++;

    // Create/update total price array
    state.total = newProduct.prices.map((price, index) => {
        return {
            currency: price.currency,
            amount: price.amount +
                (state.total[index] // Doesn't yet exist on first run
                    ? state.total[index].amount
                    : 0
                )
        }
    })

    // If product is already in cart => check if new variation matches
    // one that's already there, and if so, increment its counter
    if (oldProduct) {
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

    return {
        ...state,
        products: { ...state.products }
        // Products cloned separately because
        // under some circumstances changes go by unnoticed
    }
}

const remove = (state, action) => {
    const newProduct = action.payload.product;
    const oldProduct = state.products[newProduct.id];
    state.counter--;

    // If product is with this variation of attributes
    // is already in cart, decrement its counter.
    // If there is only one item, remove it altogether.
    if (oldProduct) {
        // Update total price array
        state.total = state.total.map((price, index) => {
            return {
                currency: price.currency,
                amount: price.amount - newProduct.prices[index].amount
            }
        })

        oldProduct.variations.forEach((variation, index) => {
            if (deepEqual(variation.attributes,
                action.payload.attributes
            )) { // If incoming attributes match already existing
                let relevantVariation = oldProduct.variations[index];

                if (relevantVariation.quantity <= 1) {
                    if (oldProduct.variations.length <= 1) {
                        delete state.products[newProduct.id];
                        // If we are deleting the only variation,
                        // delete item entirely
                    }
                    else {
                        // Remove variation at index
                        oldProduct.variations.splice(index, 1);
                    }
                }
                else {
                    relevantVariation.quantity--;
                }
            }
        })
    } // Else, there is nothing for us to do here.

    return {
        ...state,
        products: { ...state.products }
    }
}