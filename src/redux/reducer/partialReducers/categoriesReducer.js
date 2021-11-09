import devlog from "../../../util/devlog";
import * as actions from "../../actions/types";
import initialState from "../../initialState";

const categoriesReducer = (state = initialState.categories, action) => {
    switch (action.type) {

        case actions.CATEGORIES_SET:
            const categoryNames = action.payload.map(category => {
                return category.name
            })

            return {
                all: [
                    "all",
                    ...categoryNames
                ],
                selected: "all"
            }
        case actions.CATEGORIES_SELECT:
            return {
                all: state.all,
                selected: action.payload
            }
        default:
            return state;
    }
}

export default categoriesReducer;