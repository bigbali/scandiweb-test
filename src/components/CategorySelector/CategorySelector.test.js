import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { selectCategory, setCategories } from '../../redux/actions/actions';
import store from '../../redux/store';
import CategorySelector from '../CategorySelector';
import '@testing-library/jest-dom/extend-expect';

store.dispatch(setCategories([
    { name: "pair of socks" },
    { name: "shampoos" }
]));

const cs =
    <Provider store={store}>
        <Router>
            <CategorySelector />
        </Router>
    </Provider>

test('properly displays categories', () => {
    render(cs);

    expect(screen.getByText("ALL")).toBeInTheDocument();
    expect(screen.getByText("PAIR OF SOCKS")).toBeInTheDocument();
    expect(screen.getByText("SHAMPOOS")).toBeInTheDocument();
});
test('selects categories properly', () => {
    render(cs);

    const shampoos = screen.getByText("SHAMPOOS");
    store.dispatch(selectCategory("shampoos"));

    expect(screen.getByText("ALL")).not.toHaveClass("current-category");
    expect(shampoos).toHaveClass("current-category");
});
