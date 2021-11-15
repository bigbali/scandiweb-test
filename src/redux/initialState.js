import { STATUS_OK } from "../globals/statuscodes";

const initialState = {
    isLoading: true,
    status: {
        status: STATUS_OK,
        errorCount: 0
    },
    products: {
        all: [],
        selected: null
    },
    categories: {
        all: [],
        selected: null
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
