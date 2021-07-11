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
        /*  What it's supposed to look like:
        '0': {
            variations: [
                {
                    color: "blue",
                    size: "xxl",
                    quantity: 2
                },
                {
                    color: "yellow",
                    size: "xl",
                    quantity: 1
                }
            ]
        }
        '1': {
            variations: [
                {
                    capacity: "8gb",
                    quantity: 3
                },
                {
                    capacity: "4gb",
                    quantity: 6
                }
            ]
        }
        Where: '0' and '1' are IDs of a product
        */
    }
}

export default initialState;