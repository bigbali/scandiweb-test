import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';

import Header from './components/Header';

import './styles/main.scss';

import { fetchData, extractCategories, extractCurrencies } from './util/dataProcessor';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import ErrorPage from './routes/ErrorPage/ErrorPage.component';
import devlog from './util/devlog';
import store from './redux/store';

import actions from './redux/actions';
import { connect, batch } from 'react-redux';
import * as status from './globals/statuscodes';

// Declare variables here, so we can use them anywhere with ease.
// The intention is to allow batching actions together to prevent re-renders.
let products;
let categories;
let currencies;

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.initialize = this.initialize.bind(this);
        this.getActualApp = this.getActualApp.bind(this);
        this.getAppOrError = this.getAppOrError.bind(this);
        this.getRedirect = this.getRedirect.bind(this);
        this.getWithId = this.getWithId.bind(this);
    }

    // TODO: store in cache: selected category, product, currency

    async initialize() {
        fetchData()
            .then(data => {
                products = this.getWithId(data.products)
                categories = extractCategories(products);
                currencies = extractCurrencies(products);

                // Batch actions together to prevent re-renders
                batch(() => {
                    this.props.setProducts(products);
                    this.props.setCategories(categories);
                    this.props.setCurrencies(currencies);
                    this.props.selectCurrency(currencies[0]);
                    this.props.setIsLoading(false);
                })
            })
            .catch(error => {
                this.props.setIsLoading(false);
            })
    }

    // Returns our products with an additional 'id' property
    getWithId(products) {
        // We duplicate the objects with an additional 'id' attribute.
        let idInjectedProducts = [];

        products.forEach((product, index) => {
            idInjectedProducts.push({
                ...product,
                id: index + 1
                // We add 1 so we start at 'id: 1' instead of 0.
            })
        })

        return idInjectedProducts
    }

    getRedirect() {
        /* 
            Note: this 'categories' is not the one from state, but the one declared at the top of the file,
            which is assigned in an async function. This means it will usually be assigned after the first render.
            Because of that, we check if we have categories, and if not, we don't try to redirect.
            On second render, we will have all the data we need. 
            This is when we send in our mighty redirect, so instead of staring at a blank screen,
            our dear user can stare at our products instead.

            TLDR: we can't redirect when we don't yet have categories.
        */

        if (categories) {
            const firstCategory = categories[0];
            devlog(`Redirecting to first available category: '${firstCategory}'.`);

            return (
                <Redirect to={`category/${categories[0]}`} />
            )
        }

        return
    }

    getActualApp() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/category/:category" component={CategoryPage} />
                    <Route exact path="/product/:product" component={ProductPage} />
                    <Route exact path="/cart" component={CartPage} />
                    {/* Redirect from index to page of first available category */}
                    <Route exact path="/" render={() => {
                        return this.getRedirect()
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
    getAppOrError() {
        const state = store.getState();

        if (state.status === status.STATUS_OK) {
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

// We spread everything out, so we don't have to bother adding things in when we realize we need them
// (then wipe our tears off when we realize we re-render 5 times on page load :[)
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

