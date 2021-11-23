import { createStore } from "redux";
import initialState from "./initialState";
import reducer from './reducer';

const store = createStore(
    reducer,
    { // Try to get cart from localStorage
        ...initialState,
        cart: JSON.parse(localStorage.getItem("cart"))
            || initialState.cart
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

store.subscribe(() => {
    try { // Add cart to localStorage
        localStorage.setItem('cart', JSON.stringify(store.getState().cart));
    } catch {
        console.error("Couldn't save cart contents.")
    }
});