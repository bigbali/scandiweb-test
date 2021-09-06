import { createStore } from "redux";
import { loadState, saveState }   from "../util/localStorage";
import initialState    from "./initialState";
import reducer         from './reducer';

let savedState = loadState();
let state = initialState;

// We save 'products' because 'getProductById()' will use it before it's gonna be set
if (savedState) {
    state.cart = savedState.cart;
    state.products = savedState.products;
    state.currencies = savedState.currencies;
}

const store = createStore(
    reducer,
    state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;

store.subscribe(() => {
    saveState({
        state: store.getState()
    });
});