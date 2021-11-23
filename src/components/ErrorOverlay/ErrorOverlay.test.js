import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setStatus } from '../../redux/actions/actions';
import store from '../../redux/store';
import ErrorOverlay from '../ErrorOverlay';
import '@testing-library/jest-dom/extend-expect';
import {
    STATUS_API_OFFLINE,
    STATUS_FAILED_TO_FETCH_CATEGORIES,
    STATUS_FAILED_TO_FETCH_CURRENCIES,
    STATUS_FAILED_TO_FETCH_PRODUCTS,
    STATUS_OK
} from '../../redux/actions/types';


const eo =
    <Provider store={store}>
        <Router>
            <ErrorOverlay />
        </Router>
    </Provider>

afterEach(() => {
    store.dispatch(setStatus("reset"));
})

test("displays API offline triggered by error count", () => {
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_CATEGORIES));
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_CURRENCIES));
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_PRODUCTS));
    render(eo);
    expect(screen.getByText(/couldn't fetch data/g)).toBeInTheDocument();
});

test("displays API offline if directly set", () => {
    store.dispatch(setStatus(STATUS_API_OFFLINE));
    render(eo);
    expect(screen.getByText(/couldn't fetch data/g)).toBeInTheDocument();

});

test("displays failed to fetch categories", () => {
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_CATEGORIES));
    render(eo);
    expect(screen.getByText(/failed to fetch categories/g)).toBeInTheDocument();
});

test("displays failed to fetch currencies", () => {
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_CURRENCIES));
    render(eo);
    expect(screen.getByText(/failed to fetch currencies/g)).toBeInTheDocument();
});

test("displays failed to fetch products", () => {
    store.dispatch(setStatus(STATUS_FAILED_TO_FETCH_PRODUCTS));
    render(eo);
    expect(screen.getByText(/failed to fetch products/g)).toBeInTheDocument();
});

test("doesn't display if no error", () => {
    store.dispatch(setStatus(STATUS_OK));
    render(eo);

    const msg = screen.getByText(/error|fetch/g);
    expect(msg).not.toHaveClass("expanded");
});

