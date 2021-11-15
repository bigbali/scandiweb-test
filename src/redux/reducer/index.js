import { combineReducers } from "redux";
import currenciesReducer from './partialReducers/currenciesReducer';
import categoriesReducer from "./partialReducers/categoriesReducer";
import cartReducer from "./partialReducers/cartReducer";
import loadingReducer from "./partialReducers/loadingReducer";
import statusReducer from './partialReducers/statusReducer';

const reducer = combineReducers({
    isLoading: loadingReducer,
    status: statusReducer,
    categories: categoriesReducer,
    currencies: currenciesReducer,
    cart: cartReducer
});

export default reducer;