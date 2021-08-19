import devlog from "../../../util/devlog";
import * as actions from "../../actions/types";
import initialState from "../../initialState";


const cartReducer = (state = initialState.cart, action) => {
    // We will keep check of how many items we have in cart 
    // (every variation is an item on its own)
    let itemCounter = state.counter;

    const createOrAppendVariations = (product, variation) => {
        // Check if product is already in cart
        if (product){
            // We'll use this to check if variation already exists
            let variationExists = false;

            product.variations.forEach(existingVariation => {
                // Check if variation already exists in cart
                if (JSON.stringify(variation) === JSON.stringify(existingVariation)){
                    variationExists = true;
                }
            })

            if (!variationExists){
                itemCounter++;
                return [
                    ...product.variations,
                    variation
                ]
            } 

            // We can't return null because that would delete our variations
            // ... so we return the variations themselves.
            else {
                return [...product.variations]
            }
        }
        else {
            itemCounter++;
            return [
                variation
            ]
        }
    }

    switch (action.type){
        case actions.CART_ADD:
            let variation = {
                // We'll use this to check how many items are in cart of each different variation.
                // Underscore is to differentiate it from other properties.
                quantity: 1
            };

            // Assign attribute key/value pairs to 'variation'.
            Object.entries(action.payload.attributes).forEach(attribute => {
                variation = {
                    ...variation,
                    [attribute[0]]: attribute[1]
                }
            });
            
            return {
                products: {
                    ...state.products,
                    [action.payload.productId]: {
                        variations: createOrAppendVariations(state.products[action.payload.productId], variation)
                    },
                },
                counter: itemCounter
            }
        // case actions.CART_REMOVE:
        //     console.log("rem")
        //     return "pello"
        case actions.CART_INCREMENT:
            devlog(JSON.stringify(action.payload))
            console.log("incr")
            return state
        case actions.CART_DECREMENT:
            console.log("decr")
            return state

        default:
            console.log("def")
            return state;
    }

}

export default cartReducer;