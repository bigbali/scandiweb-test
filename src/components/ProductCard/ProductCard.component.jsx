import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import actions from '../../redux/actions';
import CartIcon from '../../media/svg/cart.svg';
import './ProductCard.style.scss';

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.isInStock = this.isInStock.bind(this);
    }

    isInStock(product) {
        return product.inStock;
    }

    render() {
        const product = this.props.product;

        return (
            <Link to={`/product/${product.id}`} className="product-card-wrapper-link">
                <div
                    className={`product-card 
                    ${product.inStock
                            ? ""
                            : "out-of-stock"
                        }`}>
                    <div
                        className="product-card-image"
                        style={{ backgroundImage: `url(${product.gallery[0]})` }}>
                        <div className="hover-cart-thing">
                            <img src={CartIcon} alt="Check out" />
                        </div>
                    </div>
                    <h5 className="product-card-title">
                        {product.name}
                    </h5>
                    <p className="product-card-price">
                        {getPriceInSelectedCurrency(product)}
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
