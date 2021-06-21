const initialState = {
    isLoading: true,
    status: "OK",
    products: {
        all: [],
    },
    categories: {
        all: [],
        selected: null
    },
    currencies : {
        all: [],
        selected: null
    },
    cart: {
        products: [{
            product: null,
            quantity: 0
        }]
    }
}

export default initialState;