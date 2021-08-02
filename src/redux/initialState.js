let initialState = {
    isLoading: true,
    status: "OK",
    products: {
        all: [],
        selected: null
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
        products: [],
        counter: 0
    }
}

export default initialState;
