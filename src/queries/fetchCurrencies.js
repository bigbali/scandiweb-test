import { gql } from 'apollo-boost';
import setErrorStatus from '../util/setErrorStatus';
import client from './client';
import * as actions from '../redux/actions/types';

export const fetchCurrencies = async () => {
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
