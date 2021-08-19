import store from "../redux/store"
import devlog from "./devlog";

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
        // Copy object so we can mutate the copy without changing the original
        // (remove 'type' properties from direct properties of this object,
        // then compare with the the variation supplied as argument,
        // and if they match, return the quantity)
        let attributes = {...cartVariation.attributes}
        const indexableAttributes = Object.entries(attributes);

        indexableAttributes.forEach(attribute => {
            const attributeName = attribute[0];
            const attributeValues = attribute[1];
            // Remove 'type' property
            const {type, ...attributeValuesWithoutType} = attributeValues;
            attributes[attributeName] = attributeValuesWithoutType;
        })

        if (JSON.stringify(attributes) === JSON.stringify(productVariation)){
            quantity = cartVariation.quantity;
        }
    })

    return quantity
}

export default getVariationQuantity