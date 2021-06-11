import React, { Component } from 'react';
import CartIcon from '../../media/svg/cart.svg';
import CartCountIcon from '../../media/svg/cart-count-circle.svg';

export default class Cart extends Component {
    render() {
        return (
            <div>
                <img src={CartIcon} alt="" />
                <img src={CartCountIcon} alt="" />
            </div>
        )
    }
}
