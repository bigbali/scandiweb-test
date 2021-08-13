import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { fetchData, extractCategories, extractCurrencies } from './util/dataProcessor';
import { connect, batch } from 'react-redux';
import devlog from './util/devlog';
import store from './redux/store';
import actions from './redux/actions';
import * as status from './globals/statuscodes';
import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';
import ErrorPage from './routes/ErrorPage/ErrorPage.component';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import Header from './components/Header';
import './styles/main.scss';

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
                    this.props.setIsLoading(false);

                    // We don't want to override selected currency if we are storing it in 'localStorage'.
                    // So, this should only run if no currency is loaded from 'savedState' in 'store.js'.
                    if (!this.props.currencies.selected) {
                        this.props.selectCurrency(currencies[0]);
                    }
                })
            })
            .catch(error => {
                this.props.setIsLoading(false);
            })
    }

    // Returns our products with an additional 'id' property
    getWithId(products) {
        let idInjectedProducts = [];

        products.forEach((product, index) => {
            idInjectedProducts.push({
                ...product,
                id: index + 1
                // We add 1 so we start at 'id: 1' instead of 0
            })
        })

        return idInjectedProducts
    }

    getRedirect() {
        // If we have categories, we want to redirect to the first one.
        // Else, we say 'here, take this piece o' nothing'.
        if (categories) {
            const firstCategory = categories[0];
            devlog(`Redirecting to first available category: '${firstCategory}'.`);

            return (
                <Redirect to={`category/${categories[0]}`} />
            )
        }

        return null
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

        // If 'isLoading', we don't yet have our data, so we don't want to render anything yet
        if (state.status === status.STATUS_OK) {
            if (state.isLoading) {
                return null
            }

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

