import React, { PureComponent } from 'react';
import './CheckoutPage.style.scss';

export default class CheckoutPage extends PureComponent {
    render() {
        return (
            <div className="checkout-page">
                <h1>
                    Welcome to checkout page. This is not in the design spec,
                    so I exist just because if I didn't, a button in 'Minicart' would do nothing.
                </h1>
            </div>
        )
    }
}
