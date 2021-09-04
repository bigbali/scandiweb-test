import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorPage from '../ErrorPage';
import ProductCard from '../../components/ProductCard';
import * as status from '../../globals/statuscodes';
import './CategoryPage.style.scss';

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
            // FIXME: state gets reset on page reload, so we can't use categories.selected here.
            // Note: even though state is no longer reset, I decided to keep this as it is.
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