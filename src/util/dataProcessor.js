import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { getAll } from '../queries/queries';

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
        return result.data.category;
    })
}


export const extractCategories = (products) => {
    let categories = [];

    // Loop through all the products and push their category to categories, if not yet included
    // this way we can make sure there is one entry for each category
    products.forEach(product => {
        let category = product.category;

        if (!categories.includes(category)){
            categories.push(category);
        }
    });
  
    return categories;
}

// Iterate through all the products and all their prices
// to determine all available currencies
export const extractCurrencies = (products) => {
    let currencies = [];

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

    return currencies;
}

export const extractAttributes = (products) => {
    return "TODO";
}

// Prepend currency with symbol
export const pairWithSymbol = (currency) => {
    return `${_GETSYMBOL_(currency)} ${currency}`;
}

export const getSymbol = (currency) => {
    return _GETSYMBOL_(currency);
}

// It's possible to have a currency which does not have a symbol.
// In this case, we return the currency.
// This is useful in CurrencySelector, when we select a currency without symbol.
// (Now you can tell me how unnecessary it is, as no one will ever add such a currency,
// and you're probably right, but surprises are quite common in the world of software,
// and also, I had fun doing this)
export const getSafeSymbol = (currency) => {
    let symbol = getSymbol(currency);

    if (!symbol) {
        symbol = currency;
    }

    return symbol;
}

const _GETSYMBOL_ = (currency) => {
    let symbol

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