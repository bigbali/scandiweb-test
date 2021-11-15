import { STATUS_OK } from "../globals/statuscodes";

const initialState = {
    isLoading: true,
    status: {
        status: STATUS_OK,
        errorCount: 0
    },
    categories: {
        all: ["all"],
        selected: "all"
    },
    currencies: {
        all: [],
        selected: null
    },
    cart: {
        products: [],
        counter: 0
    }
}

export default initialState;
