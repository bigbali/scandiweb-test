import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';

import Header from './components/Header';

import './styles/main.scss';

import { getGarbage, determineAllAvailableCategories } from './queries/parseGarbage';

import log from './util/log';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: []
        }

        this.fetchAllData = this.fetchAllData.bind(this);
    }

    async fetchAllData() {
        getGarbage().then(result => {
            this.setState({
                categories: determineAllAvailableCategories(result),
                products: result
                // We can use result directly, as it is already the pure product array
                // from which we isolated the categories
            });
            this.props.history.push(`/category/${this.state.categories[0]}`);
        }).catch(error => {
            // If something goes wrong, this shall say so in the console
            log(`Failed to set application state from API response:\n ${error}`, "error");
        })
    }

    componentDidMount() {
        this.fetchAllData();
    }

    render() {
        return (
            <>
                <Router>
                    <Header categories={this.state.categories} />
                    <Switch>
                        {/* Redirect index to first available category */}
                        {/*<Redirect exact from="/" to={`category/${this.state.categories[0]}`} />*/}
                        <Route exact path="/">
                            <CategoryPage product-listings={this.state.products} />
                        </Route>
                        <Route exact path="/category/:category">
                            <CategoryPage product-listings={this.state.products} />
                        </Route>
                        <Route exact path="/product/:product">
                            <ProductPage product-listings={this.state.products} />
                        </Route>
                        <Route exact path="/cart">
                            <CartPage />
                        </Route>
                        <Route>
                            <div style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                justifyContent: "center", height: "100vh", width: "100vw", position: "absolute",
                                top: "0", zIndex: -1
                            }}>
                                <h1>
                                    This looks an awful lot like a 404.
                                </h1>
                                <h3>
                                    Sorry!
                                </h3>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    }
}

export default withRouter(App);

