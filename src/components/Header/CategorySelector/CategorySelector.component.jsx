import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './CategorySelector.style.scss';

class CategorySelector extends Component {
    componentDidMount() {
        //await getGarbage();
    }

    render() {
        let categories = this.props.categories.map((category, index) => {
            return (
                <li key={index}>
                    <NavLink key={index} activeClassName="current-category" exact to={`/category/${category}`}>{category}</NavLink>
                </li>
            )
        })

        return (
            <>
                <ul className="category-selector">
                    {categories}
                </ul>
            </>
        )
    }
}

export default CategorySelector;
