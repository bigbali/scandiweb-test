import * as actions from './types';

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


export const setStatus = (statusActionType) => {
    return {
        type: statusActionType,
    }
}

export const setCategories = (categories) => {
    return {
        type: actions.CATEGORIES_SET,
        payload: categories
    }
}

export const selectCategory = (category) => {
    return {
        type: actions.CATEGORIES_SELECT,
        payload: category
    }
}

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

export const cartAdd = (product, attributes) => {
    return {
        type: actions.CART_ADD,
        payload: {
            product,
            attributes
        }
    }
}

export const cartRemove = (product, attributes) => {
    return {
        type: actions.CART_REMOVE,
        payload: {
            product,
            attributes
        }
    }
}
