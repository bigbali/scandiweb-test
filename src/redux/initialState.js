const initialState = {
    isLoading: true,
    status: "OK",
    products: {
        all: [],
        selected: {}
    },
    categories: {
        all: [],
        selected: ""
    },
    currencies : {
        all: ["USD"],
        selected: "USD"
    },
    cart: {
        products: [{
            product: null,
            quantity: 0
        }]
    }
}

export default initialState;