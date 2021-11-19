import React, { PureComponent } from 'react';
import './CheckoutPage.style.scss';

export default class CheckoutPage extends PureComponent {
    render() {
        return (
            <main className="checkout-page">
                <div>
                    <h1>
                        Check this out!
                    </h1>
                    <h2>
                        This is the checkout page.
                    </h2>
                </div>
            </main>
        )
    }
}
