import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { STATUS_404 } from './../../globals/statuscodes';


import ErrorPage from '../ErrorPage';
import './CategoryPage.style.scss';
import devlog from '../../util/devlog';
import ProductCard from '../../components/ProductCard';
//import { DataContext } from './../../contexts/DataContext';
import { connect, useSelector } from 'react-redux';
import actions from '../../redux/actions';
import * as status from '../../globals/statuscodes';


class CategoryPage extends PureComponent {

    constructor(props) {
        super(props);

        this.selectProductsByCategory = this.selectProductsByCategory.bind(this);
        this.getProductCards = this.getProductCards.bind(this);
    }


    // Get current category from URL
    selectProductsByCategory() {
        let selectedProducts = [];

        this.props.products.all.forEach(product => {
            // FIXME: state gets reset on page reload, so we can't use categories.selected, which makes it redundant
            if (product.category === this.props.match.params.category) {
                selectedProducts.push(product);
            }
        })

        return selectedProducts;
    }

    getProductCards(products) {
        return products.map((product, index) => {
            return (
                <ProductCard key={index} product={product} className="product-card" />
            )
        })
    }

    render() {
        const categoryName = this.props.match.params.category;
        const products = this.selectProductsByCategory();

        // Check if category is in categories list, and if not, return an error page.
        // Else, continue.
        if (!this.props.categories.all.includes(categoryName)) {
            return <ErrorPage status={status.STATUS_NOT_FOUND} />
        }

        return (
            <main className="category-page">
                <h1>
                    {categoryName}
                </h1>
                <div className="product-area">
                    {this.getProductCards(products)}
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        products: state.products
    }
}

export default connect(mapStateToProps, null)(withRouter(CategoryPage));