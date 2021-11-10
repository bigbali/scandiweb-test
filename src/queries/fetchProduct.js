import { gql } from 'apollo-boost';
import setErrorStatus from '../util/setErrorStatus';
import client from './client';
import * as actions from '../redux/actions/types';

export const fetchProduct = async (productId) => {
    try {
        return await client.query({
            query: gql(
                `{
                    product(id: "${productId}") {
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
    } catch {
        setErrorStatus(actions.STATUS_FAILED_TO_FETCH_PRODUCT)
    }
}
