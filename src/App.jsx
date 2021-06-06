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

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            isLoading: true,
            hasFetchedData: false
        }

        this.fetchAllData = this.fetchAllData.bind(this);
        this.getActualApp = this.getActualApp.bind(this);
    }

    async fetchAllData() {
        getGarbage().then(result => {
            const categories = determineAllAvailableCategories(result);

            // hasFetchedData: it's possible that the query did succeed, but did not return any data
            // If there are no categories, most likely no products, either
            this.setState({
                categories: categories,
                products: result,
                isLoading: false,
                hasFetchedData: categories ? true : false
                // We can use result directly, as it is already the pure product array
                // from which we isolated the categories
            });
        }).catch(error => {
            // If determineAllAvailableCategories fails, isLoading will stay true
            // because state won't be set,
            // so we do it here, so we can display error to user
            this.setState({
                ...this.state,
                isLoading: false
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
                            <ErrorPage message="This page does not exist." statusCode="404 Not Found">
                                Explanation: we could not find this page, for whatever reason.
                                We are deeply sorry!
                            </ErrorPage>
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    }
    componentDidMount() {
        this.fetchAllData();
    }


    render() {
        let application;

        // If finished loading, but no data has been fetched,
        // return error message
        // (it's also logged in console)
        if (!this.state.isLoading && !this.state.hasFetchedData) {
            application =
                <ErrorPage message="Could not fetch necessary data." statusCode="406 Not Acceptable">
                    This means we could not find the data necessary to operate this page.
                </ErrorPage>
            // I did look it up on Wikipedia. It's real!
            // (and in theory, it only shows when data is unusable, and not when request fails entirely)
        }
        else {
            application = this.getActualApp();
        }

        return (
            <>
                {application}
            </>
        )
    }
}

export default withRouter(App);

