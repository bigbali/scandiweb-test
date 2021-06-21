import { combineReducers } from "redux";


import productsReducer from './partialReducers/productsReducer';
import currenciesReducer from './partialReducers/currenciesReducer';
import categoriesReducer from "./partialReducers/categoriesReducer";
import cartReducer from "./partialReducers/cartReducer";
import loadingReducer from "./partialReducers/loadingReducer";


//import * as reducers from './partialReducers';
import statusReducer from './partialReducers/statusReducer';

const reducer = combineReducers({
    isLoading:  loadingReducer,
    status: statusReducer,
    products:   productsReducer,
    categories: categoriesReducer,
    currencies: currenciesReducer,
    cart:       cartReducer
    });

export default reducer;