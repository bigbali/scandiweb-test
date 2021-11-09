import * as actions from "../../actions/types";
import initialState from "../../initialState";

const loadingReducer = (state = initialState.isLoading, action) => {
    switch (action.type) {
        case actions.LOADING_TOGGLE:
            return !state
        case actions.LOADING_SET_TRUE:
            return true
        case actions.LOADING_SET_FALSE:
            return false
        default:
            return state;
    }
}

export default loadingReducer;