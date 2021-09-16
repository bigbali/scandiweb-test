import { getPriceInSelectedCurrency } from "./dataProcessor";
import store from "../redux/store"
import getProductById from "./getProductById";

/**
 * Get total price of all the products in cart.
 * Note: unnecessarily many iterations might not be friends with performance.
 * @returns {number} Sum of prices of all product variations.
 */
const getTotalPrice = () => {
    const productsArray = Object.entries(store.getState().cart.products);
    let totalPrice = 0;

    productsArray.forEach(product => {
        const productId = product[0]
        const productBody = product[1]
        const actualProduct = getProductById(productId)
        const price = getPriceInSelectedCurrency(actualProduct, true);
        let totalVariationCount = 0;

        productBody.variations.forEach(variation => {
            totalVariationCount += variation.quantity;
        })

        totalPrice += totalVariationCount * price;
    })

    // Cut off decimals (an of course, this is kinda like an e-commerce site,
    // we so act greedy and round upwards!)
    return totalPrice.toFixed(2)
}

export default getTotalPrice