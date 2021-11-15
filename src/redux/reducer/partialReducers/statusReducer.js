import * as actions from "../../actions/types";
import * as status from '../../../globals/statuscodes';
import initialState from "../../initialState";

const statusReducer = (state = initialState.status, action) => {
    const setStatus = (status) => {
        state.status = status;
        state.errorCount++;

        console.log(state)
        return state
    }

    if (state.status === status.STATUS_API_OFFLINE) {
        return state
    }

    // If we had multiple errors, assume API is unreachable.
    // Else, assume for some reason we failed only one request,
    // so a page reload might fix it.
    if (state.errorCount > 1) {
        return setStatus(status.STATUS_API_OFFLINE)
    }

    switch (action.type) {
        case actions.STATUS_OK:
            return setStatus(status.STATUS_OK)
        case actions.STATUS_API_OFFLINE:
            return setStatus(status.STATUS_API_OFFLINE)
        case actions.STATUS_DATA_EMPTY:
            return setStatus(status.STATUS_DATA_EMPTY)
        case actions.STATUS_DATA_CORRUPTED:
            return setStatus(status.STATUS_DATA_CORRUPTED)
        case actions.STATUS_FAILED_TO_FETCH_CATEGORIES:
            return setStatus(status.STATUS_FAILED_TO_FETCH_CATEGORIES)
        case actions.STATUS_FAILED_TO_FETCH_CURRENCIES:
            return setStatus(status.STATUS_FAILED_TO_FETCH_CURRENCIES)
        case actions.STATUS_FAILED_TO_FETCH_PRODUCTS:
            return setStatus(status.STATUS_FAILED_TO_FETCH_PRODUCTS)
        case actions.STATUS_FAILED_TO_FETCH_PRODUCT:
            return setStatus(status.STATUS_FAILED_TO_FETCH_PRODUCT)
        default:
            return state;
    }
}

export default statusReducer;