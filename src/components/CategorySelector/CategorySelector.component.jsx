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
                    <NavLink activeClassName="current-category" exact to={`/category/${category}`}>
                        {category.toUpperCase()}
                    </NavLink>
                </li>
            )
        })

        return (
            <div className="category-selector-wrapper">
                <ul className="category-selector">
                    {categories}
                </ul>
            </div>
        )
    }
}

export default CategorySelector;
