import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { getAll } from '../queries/queries';
import devlog from './devlog';
import store from '../redux/store';
import { setStatus } from './../redux/actions/actions';
import * as actions from './../redux/actions/types';

const setErrorStatus = (status) => {
    store.dispatch(setStatus(status));
}

export async function fetchData(){

    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });
    
    return client.query({
        // Query string resides in queries.js, because it bothers my eyes with its presence
        query: gql (getAll)
    })
    .then(result => {
        const data = result.data.category;
        if (data) {
            return data;
        }
        else {
            setErrorStatus(actions.STATUS_DATA_EMPTY);
            devlog("API responded with empty data.", "error");
        }
    })
    .catch(error => {
        setErrorStatus(actions.STATUS_API_OFFLINE);
        devlog("API did not respond.", "error");
    })
}



export const extractCategories = (products) => {
    let categories = [];

    // Loop through all the products and push their category to categories, if not yet included
    // this way we can make sure there is one entry for each category
    try {
        products.forEach(product => {
            let category = product.category;
    
            if (!categories.includes(category)){
                categories.push(category);
            }
        });
    }
    catch(error) {
        // In theory, if 'products' is undefined, we get an error, which means we have no categories
        // ... and then, how are we going to select categories? :|
        setErrorStatus(actions.STATUS_DATA_CORRUPTED);
        devlog("Couldn't extract [categories]. Data is probably corrupted.", "error");
    }
  
    return categories;
}

// Iterate through all the products and all their prices
// to determine all available currencies
export const extractCurrencies = (products) => {
    let currencies = [];

    try {
        // Cute little nested array :)
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

export const getPriceInSelectedCurrency = (product, currency) => {
    const prices = product.prices;
    let relevantPrice;

    // If currency matches selected currency, return that
    prices.forEach(price => {
        if (price.currency === currency) {
            relevantPrice = price.amount;
        }
    });

    return `${getSafeSymbol(currency)}${relevantPrice}`;
}

export const extractAttributes = (products) => {
    // TODO:
    return "TODO";
}

// Prepend currency with symbol, if exists 
// (we return different things because one of the return values contains a space we don't want)
export const pairWithSymbol = (currency) => {
    const symbol = _GETSYMBOL_(currency);
    if (symbol){
        return `${_GETSYMBOL_(currency)} ${currency}`
    }

    return currency;
}

/** @deprecated */
export const getSymbol = (currency) => {
    return _GETSYMBOL_(currency);
}

// Probably, no one would add a currency which does not have a symbol in _GETSYMBOL_(),
// but if it would be so, this would prevent a bug from occuring from such a situation.
// Unnecessary? Yes. Cool? Also yes. :)
export const getSafeSymbol = (currency) => {
    let symbol = _GETSYMBOL_(currency);

    if (!symbol) {
        symbol = currency;
    }

    return symbol;
}

// To be used internally, for external use we have 'getSafeSymbol()'
const _GETSYMBOL_ = (currency) => {
    let symbol;

    switch (currency.toUpperCase()){
        // From Wikipedia
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
            symbol = "";
    }

    return symbol;
}