import devlog from "../../../util/devlog";
import getVariationAttributesWithoutType from "../../../util/getVariationAttributesWithoutType";
import getVariationWithoutType from "../../../util/getVariationAttributesWithoutType";
import { cartIncrement, cartRemove } from "../../actions/actions";
import * as actions from "../../actions/types";
import initialState from "../../initialState";
import store from "../../store";


const cartReducer = (state = initialState.cart, action) => {
    // We will keep check of how many items we have in cart 
    // (every variation is an item on its own)
    let itemCounter = state.counter;

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
            case actions.CART_INCREMENT:
                // TODO: also increment total counter
                productId = action.payload.productId;
                productVariation = action.payload.productVariation;
                
                //TODO: idea - attributes in cart without type?
                state.products[productId].variations.forEach((variation, index) => {
                    if (JSON.stringify(getVariationAttributesWithoutType(variation.attributes)) === JSON.stringify(productVariation)){
                        state.products[productId].variations[index].quantity++;
                    }
                })
                
                devlog(JSON.stringify(state))
                
                return state
                
                case actions.CART_DECREMENT:
                    productId = action.payload.productId;
                    productVariation = action.payload.productVariation;
                    
                    state.products[productId].variations.forEach((variation, index) => {
                        if (JSON.stringify(getVariationAttributesWithoutType(variation.attributes)) === JSON.stringify(productVariation)){
                            // If quantity is less than 1, remove item altogether
                            if (state.products[productId].variations[index].quantity > 1) {
                                state.products[productId].variations[index].quantity--;
                            }
                            else {
                                // let x = {...state}
                                // x.products[productId].variations.splice(index, index + 1);
                                // devlog(JSON.stringify(x))
                                devlog("removing item")
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