import * as actions from "../../actions/types";
import initialState from "../../initialState";

const cartReducer = (state = null, action) => {

    const createOrAppendVariations = (product, variation) => {
        
        // If we already have this product in the cart, then add to it.
        // Else, create it. This is because if we try to access product ID while
        // we don't yet have it, we are in for some 'undefined' trouble
        if(product){
            // We'll use this to check if variation already exists
            let variationExists = false;

            product.variations.forEach(existingVariation => {
                // We must use 'JSON.stringify()' because we can't directly compare objects (as far as I know,
                // and I might not know)
                if (JSON.stringify(variation) === JSON.stringify(existingVariation)){
                    variationExists = true;
                }
            })

            if (!variationExists){
                return [
                    ...product.variations,
                    variation
                ]
            } 
            // We can't return nothing because that would delete our variations
            // ... so we return the variations themselves.
            else {
                return [...product.variations]
            }

        }
        else {
            return [
                variation
            ]
        }
    }

    switch (action.type){
        case actions.CART_ADD:

            let variation = {};

            // Assign attribute key/value pairs to 'variation'
            Object.entries(action.payload.attributes).forEach(attribute => {
                variation = {
                    ...variation,
                    [attribute[0]]: attribute[1]
                }
            });

            return {
                // We spread state out here so we can keep previous products in the cart
                ...state,
                [action.payload.productId]: {
                    variations: createOrAppendVariations(state[action.payload.productId], variation)
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