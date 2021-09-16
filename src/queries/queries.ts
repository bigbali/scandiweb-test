import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});


export const getAll =
    `{
    category {
        products {
            category
            name
            description
            inStock
            gallery
            prices {
                currency
                amount
            }
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
}`;

export const getCategory = (category: string) => {
    return `{
        category {
            name
            products {
                id
                name
                description
                brand
                category
                inStock
                gallery
                prices {
                    currency
                    amount
                }
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }`;
}

export async function fetchProducts(category: string = "") {
    if (category === "all") category = "";

    return client.query({
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

    /* This is another way of getting all data at once, but that would require
        different handlers because of the different data format. */

    // if (category === "all") {
    //     return client.query({
    //         query: gql(`{
    //             categories {
    //                 name
    //                 products {
    //                     id
    //                     name
    //                     inStock
    //                     gallery
    //                     description
    //                     category
    //                     attributes {
    //                         id
    //                         name
    //                         type
    //                         items {
    //                             id
    //                             value
    //                             displayValue
    //                         }
    //                     }
    //                     prices {
    //                         currency
    //                         amount
    //                     }
    //                     brand
    //                 }
    //             }
    //         }`)
    //     })
    // }
}

export async function fetchCategories() {
    return client.query({
        query: gql(
            `{
                categories {
                    name
                }
            }`
        )
    })
}

export async function fetchCurrencies() {
    return client.query({
        query: gql(
            `{
                currencies
            }`
        )
    })
}

export const fetchProductById = (slugProductId: string) => {
    return (`{
        product(id: ${slugProductId}) {
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
      }`)
}