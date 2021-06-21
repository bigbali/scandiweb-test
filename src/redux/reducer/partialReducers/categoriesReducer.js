import * as actions from "../../actions/types";

const categoriesReducer = (state = null, action) => {
    switch (action.type){
        case actions.CATEGORIES_SET:
            return {
                ...state,
                all: action.payload,
                selected: state.selected
            }
        case actions.CATEGORIES_SELECT:
            return {
                ...state,
                all: state.all,
                selected: action.payload
            }
        default:
            return state;
    }
}

export default categoriesReducer;