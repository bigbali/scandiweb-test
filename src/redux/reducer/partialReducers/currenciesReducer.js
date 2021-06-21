import * as actions from "../../actions/types";

const currenciesReducer = (state = [], action) => {
    switch (action.type){
        case actions.CURRENCIES_SET:
            return {
                ...state,
                all: action.payload,
                selected: state.selected
            }
        case actions.CURRENCIES_SELECT:
            return {
                ...state,
                all: state.all,
                selected: action.payload
            }
        default:
            return state;
    }
}

export default currenciesReducer;