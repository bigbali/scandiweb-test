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

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categories: [],
            currencies: [],
            isLoading: true,
            hasDataButIsUnusable: false
        }

        this.fetchAllData = this.fetchAllData.bind(this);
        this.getActualApp = this.getActualApp.bind(this);
        this.determineCorrectProcedure = this.determineCorrectProcedure.bind(this);
    }

    async fetchAllData() {
        fetchData().then(data => {
            let products = [];
            let categories = [];
            let currencies = [];

            // If data has no products, we have incorrect data.
            // If data has products, but has no categories, that's still incorrect.
            // * I could have made my life easier by checking data in the fetch function.
            // * Oh well, now it matters little enough not to bother with it.
            try {
                products = data.products;
                categories = extractCategories(products);
                currencies = extractCurrencies(products);
                // I see now there are only 5 different currencies, and "extractCurrencies()" could be considered a hit on performance.
                // None the less, I'm keeping it, because here, the performance implications pretty much don't matter,
                // and I can never know when someone decides to add a new currency to specific item, while the rest stay the same
            }
            catch (error) {
                this.setState({
                    ...this.state,
                    hasDataButIsUnusable: true
                })
                // This is for the outer catch block to handle
                throw Error("API response could not be processed.");
            }

            this.setState({
                ...this.state,
                products: products,
                categories: categories,
                currencies: currencies,
                isLoading: false,
            });

        }).catch(error => {
            this.setState({
                ...this.state,
                isLoading: false,
            })
            // If something goes wrong, this shall say so in the console
            devlog(`Failed to set application state from API response:\n ${error}`, "error");
        })
    }

    getActualApp() {
        // I realize the page will be rendered twice, once initially, then once when data is fetched
        /* I had a nasty bug I can't even explain properly.
            In theory, I passed currencies through props to CurrencySelector, yet only when
            my code was transpiled, they were properly usable. React Dev Tools showed the props in place,
            but the component seem to have no idea about them.
            My understanding was, when here the state updated, they would get re-rendered with proper props,
            but instead what I got was a day of trying to figure out what the F# is going on.
            Anyway, this in theory does solve it. */
        if (this.state.currencies.length > 0 && this.state.categories.length > 0) {
            return (
                <>
                    <LoadingSpinner active={this.state.isLoading} />
                    <Router>
                        <Header categories={this.state.categories} currencies={this.state.currencies} />
                        <Switch>
                            {/* Redirect index to first available category */}
                            <Route exact path="/">
                                {/* If categories have not yet been assigned, redirect nowhere */}
                                <Redirect exact from="/" to={this.state.categories.length > 0 ? `category/${this.state.categories[0]}` : ""} />
                            </Route>
                            <Route exact path="/category/:category">
                                <CategoryPage categories={this.state.categories} productListings={this.state.products} />
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

    determineCorrectProcedure() {
        let application;

        // If we have finished loading, but got no data at all, this will catch that
        if (!this.state.isLoading && !this.state.hasDataButIsUnusable && this.state.categories.length === 0) {
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
        this.fetchAllData();
    }

    render() {
        return (
            <>
                {this.determineCorrectProcedure()}
            </>
        )
    }
}

export default withRouter(App);

