import store from "../redux/store"
import getVariationAttributesWithoutType from "./getVariationAttributesWithoutType";

/**
 * Get how many items of this variation are in cart.
 * @param {*} productId
 * @param {*} productVariation
 * @returns {number} quantity of variation, if it exists
 */
const getVariationQuantity = (productId, productVariation) => {
    const cart = store.getState().cart;
    const variations = cart.products[productId].variations;
    let quantity = null;

    variations.forEach(cartVariation => {
        const attributes = getVariationAttributesWithoutType(cartVariation.attributes);

        if (JSON.stringify(attributes) === JSON.stringify(productVariation)){
            quantity = cartVariation.quantity;
        }
    })

    return quantity
}

export default getVariationQuantity