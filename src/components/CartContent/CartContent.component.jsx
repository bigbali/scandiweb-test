import React, { Component, PureComponent } from 'react';
import getPrice from '../../util/getPrice';
import Attributes from '../Attributes';
import Button from '../Button';
import './CartContent.style.scss';

class CartItem extends Component {
    render() {
        const product = this.props.product;
        const variation = this.props.variation;

        return (
            <div className="cart-item">
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
                <div className="quantity-actions">
                    <Button>
                        +
                    </Button>
                    <span>
                        {variation.quantity}
                    </span>
                    <Button>
                        -
                    </Button>
                </div>
                <img
                    src={product.gallery[0]}
                    alt={product.name}
                />
            </div>
        )
    }
}

export default class CartContent extends Component {
    render() {
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
                                />
                            )
                        })
                    })
                }
            </div>
        )
    }
}
