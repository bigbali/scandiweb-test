const getSymbol = (currency) => {
    if (!currency) return "";

    let symbol;

    switch (currency.toUpperCase()) {
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

export default getSymbol