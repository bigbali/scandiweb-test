export const getAll = 
`{
    category {
        products {
            category
            name
            description
            inStock
            gallery
            prices {
                currency
                amount
            }
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
}`;