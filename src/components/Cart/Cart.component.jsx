import React, { Component } from 'react';
import CartIcon from '../../media/svg/cart.svg';
//import CartCounterIcon from '../../media/svg/cart-count-circle.svg';

import './Cart.style.scss';

export default class Cart extends Component {
    render() {
        return (
            <div className="cart-wrapper">
                <img className="cart-icon" src={CartIcon} alt="" />
                <span className="cart-counter">
                    2
                </span>
            </div>
        )
    }
}
