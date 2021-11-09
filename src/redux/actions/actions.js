import * as actions from './types';

/*************** Loading ***************/

export const toggleisLoading = () => {
    return {
        type: actions.LOADING_TOGGLE,
    }
}

export const setIsLoading = (isLoading) => {
    if (isLoading) {
        return {
            type: actions.LOADING_SET_TRUE,
        }
    }
    else {
        return {
            type: actions.LOADING_SET_FALSE,
        }
    }
}

/*************** Status ***************/

export const setStatus = (statusActionType) => {
    return {
        type: statusActionType,
    }
}

/*************** Products ***************/

export const setProducts = (products) => {
    return {
        type: actions.PRODUCTS_SET,
        payload: products
    }
}

export const selectProduct = (product) => {
    return {
        type: actions.PRODUCTS_SELECT,
        payload: product.id
    }
}

/*************** Categories ***************/

export const setCategories = (categories) => {
    return {
        type: actions.CATEGORIES_SET,
        payload: categories
    }
}

export const selectCategory = (category) => {
    localStorage.setItem("persistedCategory", category);

    return {
        type: actions.CATEGORIES_SELECT,
        payload: category
    }
}

/*************** Currencies ***************/

export const setCurrencies = (currencies) => {
    return {
        type: actions.CURRENCIES_SET,
        payload: currencies
    }
}

export const selectCurrency = (currency) => {
    return {
        type: actions.CURRENCIES_SELECT,
        payload: currency
    }
}

/*************** Cart ***************/

export const cartAdd = (attributes, productId, productPrice) => {
    return {
        type: actions.CART_ADD,
        payload: {
            attributes,
            productId
        }
    }
}

// Apparently, this won't be needed
export const cartRemove = (productId, productVariation) => {
    return {
        type: actions.CART_REMOVE,
        payload: {
            productId,
            productVariation
        }
    }
}

export const cartIncrement = (productId, productVariation) => {
    return {
        type: actions.CART_INCREMENT,
        payload: {
            productId,
            productVariation
        }
    }
}

export const cartDecrement = (productId, productVariation) => {
    return {
        type: actions.CART_DECREMENT,
        payload: {
            productId,
            productVariation
        }
    }
}