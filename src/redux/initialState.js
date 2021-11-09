import { STATUS_OK } from "../globals/statuscodes";

const initialState = {
    isLoading: true,
    status: STATUS_OK,
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
