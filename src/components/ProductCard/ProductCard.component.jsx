import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import actions from '../../redux/actions';
import './ProductCard.style.scss';
import CartIcon from '../../media/svg/cart.svg';

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.slugify = this.slugify.bind(this);
        this.isInStock = this.isInStock.bind(this);
    }

    // Create slug for URL
    slugify(product) {
        const slug = product.name
            .toLowerCase()
            .replace(/^\s+|\s+$/g, '')
            .replace(/\s+/g, '-');

        return slug;
    }

    isInStock(product) {
        return product.inStock;
    }

    render() {
        const product = this.props.product;

        return (
            // Get slugified href (for better UX) and select product on click to be used in product page
            <Link to={`/product/${this.slugify(product)}`} className="product-card-wrapper-link" onClick={() => {
                this.props.selectProduct(product)
            }}>
                <div className={`product-card ${this.isInStock(product) ? "" : "out-of-stock"}`}>
                    <div className="product-card-image"
                        style={{ backgroundImage: `url(${this.props.product.gallery[0]})` }}>
                        {/* I put this thing in here because it allows for more precise positioning */}
                        <div className="hover-cart-thing">
                            <img src={CartIcon} alt="Check out" />
                        </div>
                    </div>
                    <h5 className="product-card-title">
                        {product.name}
                    </h5>
                    <p className="product-card-price">
                        {getPriceInSelectedCurrency(product, this.props.currencies.selected)}
                    </p>
                </div >
            </Link >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    }
}

const mapDispatchToProps = () => {
    return {
        selectProduct: actions.selectProduct,
        selectCategory: actions.selectCategory,
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
