import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CategoryPage from './routes/CategoryPage';
import ProductPage from './routes/ProductPage';
import CartPage from './routes/CartPage';

import Header from './components/Header';

import './styles/main.scss';

export default class App extends Component {
    render() {
        return (
            <>
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <CategoryPage />
                        </Route>
                        <Route exact path="/product">
                            <ProductPage />
                        </Route>
                        <Route exact path="/cart">
                            <CartPage />
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    }
}

