import { STATUS_OK } from "./statuscodes";

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
        selected: ""
    },
    cart: {
        products: {},
        counter: 0,
        total: []
    }
}

export default initialState;
