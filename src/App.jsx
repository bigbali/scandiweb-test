import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';

import Header from './components/Header';

import './styles/main.scss';

import { fetchData, extractCategories, extractCurrencies } from './util/dataProcessor';

import log from './util/log';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import ErrorPage from './routes/ErrorPage/ErrorPage.component';
import { STATUS_404, STATUS_406 } from './globals/statuscodes';
import devlog from './util/devlog';
//import DataContextProvider from './contexts/DataContext';
import store from './redux/store';

import actions from './redux/actions';
import { connect } from 'react-redux';
import * as status from './globals/statuscodes';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.initialize = this.initialize.bind(this);
        this.getActualApp = this.getActualApp.bind(this);
        this.getAppOrError = this.getAppOrError.bind(this);
    }

    async initialize() {
        fetchData().then(data => {
            const products = data.products;
            const categories = extractCategories(products);
            const currencies = extractCurrencies(products);

            this.props.setProducts(products);
            this.props.setCategories(categories);
            this.props.setCurrencies(currencies);
        })
            .finally(result => {
                this.props.setIsLoading(false);
            })
    }

    getActualApp() {
        if (this.state.currencies.length > 0 && this.state.categories.length > 0) {
            return (
                <>
                    <Router>
                        <Header categories={this.state.categories} currencies={this.state.currencies} />
                        <Switch>
                            {/* Redirect index to first available category */}
                            <Route exact path="/">
                                {/* If categories have not yet been assigned, redirect nowhere */}
                                <Redirect exact from="/" to={this.state.categories.length > 0 ? `category/${this.state.categories[0]}` : ""} />
                            </Route>
                            <Route exact path="/category/:category">
                                <CategoryPage categories={this.state.categories} products={this.state.products} />
                            </Route>
                            <Route exact path="/product/:product">
                                <ProductPage productListings={this.state.products} />
                            </Route>
                            <Route exact path="/cart">
                                <CartPage />
                            </Route>
                            <Route>
                                <ErrorPage message="This page does not exist." statusCode={STATUS_404}>
                                    Explanation: we could not find this page, for whatever reason.
                                    We are deeply sorry!
                                </ErrorPage>
                            </Route>
                        </Switch>
                    </Router>
                </>
            )
        }
    }

    getAppOrError() {
        // Répa, retek, mogyoró
        // This is all for today :)
        const state = store.getState();
        const isLoading = state.isLoading;
        const status = state.status;
        let application;

        // If we have finished loading, but got no data at all, this will catch that
        if (status) {
            application =
                <ErrorPage message="Could not fetch necessary data." statusCode={STATUS_404}>
                    We couldn't get data necessary to operate this page.
                </ErrorPage>
        }
        // Similarly, if we have finished loading, but think our data is incorrect, this handles it
        else if (!this.state.isLoading && this.state.hasDataButIsUnusable) {
            application =
                <ErrorPage message="Could not fetch usable data." statusCode={STATUS_406}>
                    There's something wrong with our data. Oops!
                </ErrorPage>
            // I did look it up on Wikipedia. It's real!
        }
        else {
            application = this.getActualApp();
        }

        return application;
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <>
                <LoadingSpinner active={this.props.isLoading} />
                {this.getAppOrError()}
            </>
        )
    }

}

// We spread everything out, so we don't have to bother adding things in when we realize we need them
const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = () => {
    return {
        ...actions
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(App);

