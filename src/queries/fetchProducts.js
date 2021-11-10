import { gql } from 'apollo-boost';
import setErrorStatus from '../util/setErrorStatus';
import client from './client';
import * as actions from '../redux/actions/types';

export const fetchProducts = async (category = "") => {
    // If we query for nothing, it returns all
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
