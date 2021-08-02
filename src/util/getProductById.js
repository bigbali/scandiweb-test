import store from "../redux/store";

/**
 * @param {number} productId ID of a product.
 * @returns {Object} Identified product object.
 */
const getProductById = (productId) => {
    const products = store.getState().products.all;
    let identifiedProduct;
    
    products.forEach(product => {
        // We are comparing a string to an integer, that's why it's only a double equals operator.
        // Even though eslint complains about it, I don't believe there is anything wrong with using
        // something as it is intended to be used.
        if (product.id == productId) {
            identifiedProduct = product;
        }
    })
    
    return identifiedProduct
}

export default getProductById;
