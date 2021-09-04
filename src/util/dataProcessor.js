import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { getAll } from '../queries/queries';
import { setStatus } from './../redux/actions/actions';
import devlog from './devlog';
import store from '../redux/store';
import * as actions from './../redux/actions/types';

/*
    This file is basically a bunch of helpers in one file.
*/

const setErrorStatus = (status) => {
    store.dispatch(setStatus(status));
}

/**
 * Get all our data.
 * @async
 * @returns {Promise} Data fetched from GraphQL API.
 */
export async function fetchData(){
    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });
    
    return client.query({
        // Query string resides in queries.js, because it bothers my eyes with its presence.
        query: gql (getAll)
    })
    .then(result => {
        // If we get here, that means API request succeeded...
        const data = result.data.category;

        // ... but that doesn't mean our data is not empty, so here we check for that,
        // and if we don't have data, then set the appropriate status.
        if (data) {
            return data;
        }
        else {
            setErrorStatus(actions.STATUS_DATA_EMPTY);
            devlog("API responded with empty data.", "error");
        }
    })
    .catch(error => {
        // If for any reason we get no response, set appropriate status.
        setErrorStatus(actions.STATUS_API_OFFLINE);
        devlog("API did not respond.", "error");
    })
}


/**
 * Extract all available categories from supplied products.
 * @param   {*} products
 * @returns {Array} An array of categories in string format.
 */
export const extractCategories = (products) => {
    let categories = [];

    // Loop through all the products and push their category to categories, if not yet included.
    // This way we can make sure there is one entry for each category.
    try {
        products.forEach(product => {
            let category = product.category;
    
            if (!categories.includes(category)){
                categories.push(category);
            }
        });
    }
    catch(error) {
        // Check if for any reason we couldn't isolate categories from all products.
        setErrorStatus(actions.STATUS_DATA_CORRUPTED);
        devlog("Couldn't extract [categories]. Data is probably corrupted.", "error");
    }
  
    return categories;
}

/**
 * Extract all available currencies from supplied products.
 * @param   {*} products
 * @returns {Array} An array of currencies in string format.
 */
export const extractCurrencies = (products) => {
    let currencies = [];

    try {
        // It's a nested loop, and it's cute :)
        products.forEach(product => {  
            let prices = product.prices;
    
            prices.forEach(price => {
                let currency = price.currency;
    
                if (!currencies.includes(currency)){
                    currencies.push(currency);
                }
            })
        });
    }
    catch(error) {
        // Same as above...
        // If no products, then no currencies, then no 'currency selector'... then life is sad :(
        setErrorStatus(actions.STATUS_DATA_CORRUPTED);
        devlog("Couldn't extract [currencies]. Data is probably corrupted.", "error");
    }

    return currencies;
}

/**
 * Get price in the currency that is currently selected.
 * @param {*} product 
 * @param {boolean} isJustNumber Tell the function if we want it to return just the number.
 * @returns 
 */
export const getPriceInSelectedCurrency = (product, isJustNumber) => {
    const prices = product.prices;
    const currency = store.getState().currencies.selected;
    let relevantPrice;

    // Check if currency matches selected
    prices.forEach(price => {
        if (price.currency === currency) {
            relevantPrice = price.amount;
        }
    });

    // Return just the number
    if (isJustNumber){
        return relevantPrice
    }

    return `${getSymbol(currency)}${relevantPrice}`
}

/** 
 * @description
 * Get currency string prepended with currency symbol.
 * @param {string} currency 
 * Currency which we want to pair.
 */
export const pairWithSymbol = (currency) => {
    const symbol = _GETSYMBOL_(currency);

    // If symbol matches currency, return only one of them, so we have 'USD' instead of 'USD USD'
    if (symbol === currency){
        return symbol
    }

    return `${symbol} ${currency}`
}

// Actually, what even is the point of this? Hmmm.
export const getSymbol = (currency) => {
    return _GETSYMBOL_(currency);
}

export const getSelectedSymbol = () => {
    const selectedCurrency = store.getState().currencies.selected;
    return _GETSYMBOL_(selectedCurrency)
}

// Probably, no one would add a currency which does not have a symbol in _GETSYMBOL_(),
// but if it would be so, this would prevent a bug from occuring from such a situation.
// Unnecessary? Yes. Cool? Also yes. :)

/** 
 * @deprecated 
 * use 'getSymbol()' instead
 */
export const getSafeSymbol = (currency) => {
    let symbol = _GETSYMBOL_(currency);

    if (!symbol) {
        symbol = currency;
    }

    return symbol;
}

/** 
 * Get currency symbol based on currency string.
 * To be used internally. 
 * For external use, see 'getSymbol()'.
 * @param {string} currency currency for which we want to find a symbol.
 * @returns {string} Symbol or currency itself if can't match currency to a symbol.
 */
const _GETSYMBOL_ = (currency) => {
    let symbol;

    switch (currency.toUpperCase()){
        case "USD":
            symbol = "$";
            break;
        case "EUR":
            symbol = "€";
            break;
        case "GBP":
            symbol = "£";
            break;
        case "AUD":
            symbol = "$";
            break;
        case "RUB":
            symbol = "₽";
            break;
        case "JPY":
            symbol = "¥";
            break;
        case "CNY":
            symbol = "元 / ¥";
            break;
        case "HKD":
            symbol = "$";
            break;
        case "NZD":
            symbol = "$";
            break;
        case "SEK":
            symbol = "kr";
            break;
        case "KRW":
            symbol = "₩";
            break;
        case "SGD":
            symbol = "$";
            break;
        case "NOK":
            symbol = "kr";
            break;
        case "MXN":
            symbol = "$";
            break;
        case "INR":
            symbol = "₹";
            break;
        case "HUF":
            symbol = "Ft";
            break;
        case "RON":
            symbol = "Lei";
            break;
        default:
            symbol = currency;
    }

    return symbol;
}