import React, { Component } from 'react';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import getSubtitle from '../../util/getSubtitle';
import getTitle from '../../util/getTitle';
import Carousel from '../Carousel';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import './CartItem.style.scss';
import Button from '../Button';

export default class CartItem extends Component {
    render() {
        const product = this.props.product;
        const variations = this.props.variations;

        return (
            <div className="cart-item">
                <hr />
                <div className="cart-item-flex">
                    <div className="cart-item-left">
                        <h1 className="product-title font-size-30 semibold">
                            {getTitle(product.name)}
                        </h1>
                        <h2 className="product-subtitle font-size-30 regular">
                            {getSubtitle(product.name)}
                        </h2>
                        <h3 className="product-price">
                            {getPriceInSelectedCurrency(product)}
                        </h3>
                    </div>
                    <div className="cart-item-right">
                        <div className="cart-item-quantity-actions">
                            <Button className="big variation-action">
                                <img src={PlusSymbol} alt="Increment" />
                            </Button>
                            <span className="semibold">
                                {/* variation.quantity... */}
                                1
                            </span>
                            <Button className="big variation-action">
                                <img src={MinusSymbol} alt="Decrement" />
                            </Button>
                        </div>
                        <Carousel gallery={product.gallery} altTitle={product.name} />
                    </div>
                </div>
            </div>
        )
    }
}
