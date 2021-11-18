import store from '../redux/store';
import getSymbol from './getSymbol';

const getPrice = (prices) => {
    const currency = store.getState().currencies.selected;
    const symbol = getSymbol(currency);

    if (prices.length === 0) return symbol + "0.00"

    const price = prices.find((price) => {
        return price.currency === currency
    });

    if (price) return symbol + price.amount.toFixed(2)
}

export default getPrice