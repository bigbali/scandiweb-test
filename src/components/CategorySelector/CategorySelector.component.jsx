import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import getProductById from '../../util/getProductById';
import actions from './../../redux/actions';
import './CategorySelector.style.scss';

class CategorySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.mapCategoriesToLinks = this.mapCategoriesToLinks.bind(this);
    }

    mapCategoriesToLinks() {
        // Keep-alive = keep selected if product has this category
        const getIsKeepAlive = (category) => {
            let isSelected = this.props.categories.selected === category;

            return isSelected
        }

        return (
            this.props.categories.all.map((category, index) => {
                return (
                    <li key={category}>
                        <NavLink activeClassName="current-category"
                            className={`${getIsKeepAlive(category) ? "keep-alive" : ""}`}
                            exact to={category ? `/category/${category}` : ""}
                            onClick={() => { this.props.selectCategory(category) }}>
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
                    {this.mapCategoriesToLinks()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        categories: state.categories
    }
}

const mapDispatchToProps = () => {
    return {
        selectCategory: actions.selectCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(CategorySelector));
