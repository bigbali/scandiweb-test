import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import * as actions from '../redux/actions/types';
import { setErrorStatus } from '../util/dataProcessor';
import devlog from '../util/devlog';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

export async function fetchProducts(category: string = "") {
    if (category === "all") category = "";

    try {
        const response = await client.query({
            query: gql(
                `{
                    category(input: {title: "${category}"}) {
                        name
                        products {
                            id
                            name
                            inStock
                            gallery
                            description
                            category
                            attributes {
                                id
                                name
                                type
                                items {
                                    id
                                    value
                                    displayValue
                                }
                            }
                            prices {
                                currency
                                amount
                            }
                            brand
                        }
                    }
                }`
            )
        })

        if (!response) {
            setErrorStatus(actions.STATUS_DATA_EMPTY);
        }

        return response
    } catch {
        setErrorStatus(actions.STATUS_FAILED_TO_FETCH_PRODUCTS);
    }
}

export async function fetchCategories() {
    try {
        const response = await client.query({
            query: gql(
                `{
                    categories {
                        name
                    }
                }`
            )
        })

        if (!response) {
            setErrorStatus(actions.STATUS_DATA_EMPTY);
        }

        return response
    } catch {
        setErrorStatus(actions.STATUS_FAILED_TO_FETCH_CATEGORIES);
    }
}

export async function fetchCurrencies() {
    try {
        return await client.query({
            query: gql(
                `{
                    currencies
                }`
            )
        })
    } catch {
        setErrorStatus(actions.STATUS_FAILED_TO_FETCH_CURRENCIES)
    }
}

export async function fetchProductById(slugProductId: string) {
    console.log(slugProductId)
    //try {
    return await client.query({
        query: gql(
            `{
                    product(id: "${slugProductId}") {
                        id
                        name
                        inStock
                        gallery
                        description
                        category
                        attributes {
                            id
                            name
                            type
                            items {
                            id
                            value
                            displayValue
                            }
                        }
                        prices {
                            currency
                            amount
                        }
                        brand
                    }
                }`
        )
    })
        .catch(error => console.log(error))
    // } catch {
    //     //setErrorStatus(actions.STATUS_FAILED_TO_FETCH_PRODUCT)
    //     console.log("NO PRODUCT YOOO")
    // }
}