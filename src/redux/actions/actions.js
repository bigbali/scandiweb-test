import * as actions from './types';

/*************** Loading ***************/

export const toggleisLoading = () => {
    return {
      type: actions.LOADING_TOGGLE,
    }
}

export const setIsLoading = (isTrue) => {
    if (isTrue){
        return {
          type: actions.LOADING_SET_TRUE,
        }
    }
    return {
        type: actions.LOADING_SET_FALSE,
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

/*************** Currencies ***************/

export const cartAdd = (product) => {
    return {
      type: actions.CURRENCIES_SET,
      payload: product
    }
}

export const cartRemove = (product) => {
    return {
      type: actions.CURRENCIES_SELECT,
      payload: product
    }
}

export const cartIncrement = (product) => {
    return {
      type: actions.CURRENCIES_SET,
      payload: product
    }
}

export const cartDecrement = (product) => {
    return {
      type: actions.CURRENCIES_SELECT,
      payload: product
    }
}
