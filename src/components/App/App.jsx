import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect, batch } from 'react-redux';
import { fetchCategories, fetchCurrencies } from '../../queries';
import actions from '../../redux/actions';
import CategoryPage from '../../routes/CategoryPage';
import ProductPage from '../../routes/ProductPage';
import CartPage from '../../routes/CartPage';
import CheckoutPage from '../../routes/CheckoutPage';
import MissingPage from '../../routes/MissingPage';
import LoadingSpinner from '../LoadingSpinner';
import ErrorOverlay from '../ErrorOverlay';
import Header from '../Header';
import './Styles.scss';

class App extends PureComponent {
    initialize = async () => {
        const categories = await fetchCategories();
        const currencies = await fetchCurrencies();

        if (categories && currencies) {
            batch(() => {
                this.props.setCategories(categories.data.categories);
                this.props.setCurrencies(currencies.data.currencies);
                this.props.setIsLoading(false);
            })
        }
        else { // When we had an error
            this.props.setIsLoading(false);
        }
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <>
                <LoadingSpinner />
                <ErrorOverlay /> {/* Show fatal errors, such as no API response*/}
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
                        <Route exact path="/">
                            <Redirect to={"category/all"} />
                        </Route>
                        <Route> {/* 404 */}
                            <MissingPage />
                        </Route>
                    </Switch>
                </Router>
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

