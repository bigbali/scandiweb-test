import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import store from '../../redux/store';
import getPrice from '../../util/getPrice';
import Attributes from '../Attributes';
import Button from '../Button';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import Carousel from '../Carousel';
import FallbackImage from '../../media/jpg/no-image.jpg';
import './CartContent.style.scss';

class CartItem extends Component {
    render() {
        const product = this.props.product;
        const variation = this.props.variation;

        return (
            <div className={`cart-item ${this.props.className || ""}`}>
                <div className="left">
                    <div className="product-data">
                        <p className="brand">
                            {product.brand}
                        </p>
                        <p className="name">
                            {product.name}
                        </p>
                        <p className="price">
                            {getPrice(product.prices)}
                        </p>
                        <Attributes
                            product={product}
                            attributes={variation.attributes}
                        />
                    </div>
                    <div className="quantity-actions">
                        <Button onClick={() => {
                            store.dispatch(
                                actions.cartAdd(product, variation.attributes)
                            )
                        }}>
                            <img src={PlusSymbol} alt="+" />
                        </Button>
                        <span>
                            {variation.quantity}
                        </span>
                        <Button onClick={() => {
                            store.dispatch(
                                actions.cartRemove(product, variation.attributes)
                            )
                        }}>
                            <img src={MinusSymbol} alt="-" />
                        </Button>
                    </div>
                </div>
                <div className="right">
                    {this.props.carousel ? (
                        <Carousel
                            gallery={product.gallery}
                            altTitle={product.name} />
                    ) : (
                        <img
                            src={product.gallery[0]}
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = FallbackImage;
                            }}
                        />
                    )}
                </div>
            </div>
        )
    }
}

class CartContent extends Component {
    render() {
        // We must wait for currencies to be loaded,
        // else we couldn't get prices
        if (!this.props.currencies) return null

        const products = Object.values(this.props.products);

        return (
            <div className="cart-content">
                {
                    products.map(product => {
                        return product.variations.map((variation, index) => {
                            return (
                                <CartItem
                                    key={index}
                                    product={product}
                                    variation={variation}
                                    className={this.props.className}
                                    carousel={this.props.carousel}
                                />
                            )
                        })
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    }
}

export default connect(mapStateToProps, null)(CartContent)
