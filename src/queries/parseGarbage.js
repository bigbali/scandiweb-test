import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { getAll } from './queries';

export async function getGarbage(){
    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
    });
    
    // Return this so we don't get undefined in App.jsx
    // I'd like to believe I know why, but even though I tried to understand,
    // the bulb in my mind decided to dim;
    // probably because I deprived myself from not at all deserved sleep
    // so let's call it magic!
    return client.query({
        // Query string resides in queries.js, because it bothers my eyes with its presence
        query: gql (getAll)
    })
    .then(result => {
        return result.data.category.products;
    })
}


export const determineAllAvailableCategories = (products) => {
    let categories = [];

    // Loop through all the products and push their category to categories, if not yet included
    // this way we can make sure there is one entry for each category
    products.forEach(product => {
        let category = product.category;

        if (!categories.includes(category)){
            categories.push(category);
        }
    });
  
    return categories;
}