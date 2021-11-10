import { gql } from 'apollo-boost';
import setErrorStatus from '../util/setErrorStatus';
import client from './client';
import * as actions from '../redux/actions/types';

export const fetchCategories = async () => {
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