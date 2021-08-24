import devlog from "../../../util/devlog";
import getVariationAttributesWithoutType from "../../../util/getVariationAttributesWithoutType";
import getVariationWithoutType from "../../../util/getVariationAttributesWithoutType";
import { cartIncrement, cartRemove } from "../../actions/actions";
import * as actions from "../../actions/types";
import initialState from "../../initialState";
import store from "../../store";


const cartReducer = (state = initialState.cart, action) => {
    // Will be assigned later on, if we have the data in payload
    let productId;
    let productVariation;

    // This is called 'lazy solution to making sure react-redux causes re-renders
    // instead of headaches' (which means, return a new object every single time, even
    // when there is no need to)
    state = {...state}

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
                state.counter++;
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
            state.counter++;
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
                counter: state.counter
            }
            case actions.CART_INCREMENT:
                productId = action.payload.productId;
                productVariation = action.payload.productVariation;
                
                state.products[productId].variations.forEach((variation, index) => {
                    if (JSON.stringify(getVariationAttributesWithoutType(variation.attributes)) === JSON.stringify(productVariation)){
                        state.products[productId].variations[index].quantity++;
                        state.counter++;
                    }
                })
                
                devlog(JSON.stringify(state))
                
                return state
                
                case actions.CART_DECREMENT:
                    productId = action.payload.productId;
                    productVariation = action.payload.productVariation;               
                    let stateProductVariations = state.products[productId].variations;
                    
                    stateProductVariations.forEach((variation, index) => {
                        if (JSON.stringify(getVariationAttributesWithoutType(variation.attributes)) === JSON.stringify(productVariation)){
                            state.counter--;

                            if (stateProductVariations[index].quantity > 1) {
                                stateProductVariations[index].quantity--;
                            }
                            // If quantity is less than 1, remove variation altogether
                            else {
                                // Get rid of variation from array
                                stateProductVariations.splice(index, 1);

                                // If product has no more variations, remove product from cart
                                if (stateProductVariations.length === 0){
                                    delete state.products[productId];
                                }
                            }
                        }
                    })
                    
                    return state
                    
                case actions.CART_REMOVE:
                    console.log("rem")
                    return "xoxo"

                default:
                    console.log("def")
                    return state;
                }

}

export default cartReducer;