import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, batch } from 'react-redux';
import store from './redux/store';
import actions from './redux/actions';
import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';
import CheckoutPage from './routes/CheckoutPage';
import ErrorPage from './routes/ErrorPage/ErrorPage.component';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import Header from './components/Header';
import * as status from './globals/statuscodes';
import './styles/main.scss';
import { fetchCategories, fetchCurrencies } from './queries/queries';
import setErrorStatus from './util/errorHandlers/setErrorStatus';

class App extends PureComponent {

    async initialize() {
        let isError = false;

        const categories = await fetchCategories().catch(error => {
            isError = true;
        });
        const currencies = await fetchCurrencies().catch(error => {
            isError = true;
        });

        if (isError) {
            setErrorStatus(status.STATUS_API_OFFLINE)
        }

        batch(() => {
            this.props.setCategories(categories.data.categories);
            this.props.setCurrencies(currencies.data.currencies);
            this.props.setIsLoading(false);
        })
    }

    getActualApp = () => {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/category/:category"
                        component={CategoryPage} />
                    <Route exact path="/product/:product"
                        component={ProductPage} />
                    <Route exact path="/cart"
                        component={CartPage} />
                    <Route exact path="/checkout"
                        component={CheckoutPage} />
                    <Route exact path="/" render={() => {
                        <Redirect to={"category/all"} />
                    }} />

                    {/* Catch 404 */}
                    <Route>
                        <ErrorPage status={status.STATUS_NOT_FOUND} />
                    </Route>
                </Switch>
            </Router>
        )
    }

    // If everything went smoothly, get our app. Else, get an error page.
    getAppOrError = () => {
        const state = store.getState();

        if (state.status === status.STATUS_OK) {
            // I don't remember what this is for, but eliminating it allowed 404 messages to be displayed again

            // if (state.isLoading) {
            //     return null
            // }

            return this.getActualApp();
        }
        else {
            return (
                <ErrorPage status={state.status} />
            )
        }
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <>
                <LoadingSpinner />
                {this.getAppOrError()}
            </>
        )
    }
}

const mapDispatchToProps = () => {
    return {
        ...actions
    }
}

export default connect(null, mapDispatchToProps())(App);

