import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getPrice from '../../util/getPrice';
import store from '../../redux/store';
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
        const addToCart = () => {
            store.dispatch(
                actions.cartAdd(product,
                    product.attributes.map(attribute => {
                        return {
                            ...attribute,
                            selected: attribute.items[0]
                        }
                    })
                )
            )
        }

        return (
            <Link
                to={`/product/${product.id}`}
                className="product-card-wrapper-link">
                <div
                    className={`product-card 
                    ${product.inStock
                            ? ""
                            : "out-of-stock"
                        }`}>
                    <div
                        className="product-card-image"
                        style={{ backgroundImage: `url(${product.gallery[0]})` }}
                    >
                        <div className="hover-cart-thing">
                            <img src={CartIcon} alt="Add to cart"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart();
                                }}
                            />
                        </div>
                    </div>
                    <h5 className="product-card-title">
                        {product.name}
                    </h5>
                    <p className="product-card-price">
                        {getPrice(product.prices)}
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

export default connect(mapStateToProps, null)(ProductCard);
