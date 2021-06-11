import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';

import Header from './components/Header';

import './styles/main.scss';

import { getGarbage, determineAllAvailableCategories } from './queries/parseGarbage';

import log from './util/log';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import ErrorPage from './routes/ErrorPage/ErrorPage.component';
import { STATUS_404, STATUS_406 } from './globals/statuscodes';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            isLoading: true,
            hasDataButIsUnusable: false
        }

        this.fetchAllData = this.fetchAllData.bind(this);
        this.getActualApp = this.getActualApp.bind(this);
        this.determineCorrectProcedure = this.determineCorrectProcedure.bind(this);
    }

    async fetchAllData() {
        getGarbage().then(data => {
            let products = [];
            let categories = [];

            // If data has no products, we have incorrect data.
            // If data has products, but has no categories, that's still incorrect.
            // * I could have made my life easier by checking data in the fetch function.
            // * Oh well, now it matters little enough not to bother with it.
            try {
                products = data.products;
                categories = determineAllAvailableCategories(products);
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
                categories: categories,
                products: products,
                isLoading: false,
                hasDataButIsUnusable: false
            });

        }).catch(error => {
            this.setState({
                ...this.state,
                isLoading: false,
            })
            // If something goes wrong, this shall say so in the console
            log(`Failed to set application state from API response:\n ${error}`, "error");
        })
    }

    getActualApp() {
        // I realize the page will be rendered twice, once initially, then once when data is fetched
        return (
            <>
                <LoadingSpinner active={this.state.isLoading} />
                <Router>
                    <Header categories={this.state.categories} />
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

