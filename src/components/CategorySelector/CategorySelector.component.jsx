import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import actions from './../../redux/actions';
import './CategorySelector.style.scss';

class CategorySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.getCategories = this.getCategories.bind(this);
    }

    getCategories() {
        return (
            this.props.categories.all.map((category, index) => {
                return (
                    <li key={category}>
                        {/* 
                            Selected category is stored in Redux store
                            so this way we can persist styling on selected
                            category when we select a product of that category 
                        */}
                        <NavLink
                            className={category === this.props.categories.selected
                                ? "current-category"
                                : ""}
                            exact
                            to={category ? `/category/${category}` : ""}
                        >
                            {category.toUpperCase()}
                        </NavLink>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <div className="category-selector-wrapper">
                <ul className="category-selector">
                    {
                        this.props.categories
                            ? this.getCategories()
                            : null
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = () => {
    return {
        selectCategory: actions.selectCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(CategorySelector));
