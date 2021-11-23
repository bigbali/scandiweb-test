import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CartContent from '../../components/CartContent';
import './CartPage.style.scss';

class CartPage extends PureComponent {
    render() {
        return (
            <main className="cart-page">
                <h1 className="cart-page-title">
                    CART
                </h1>
                {Object.keys(this.props.products) < 1
                    ? (
                        <div className="empty">
                            <h1>
                                Your cart is empty.
                            </h1>
                        </div>
                    )
                    : (
                        <CartContent
                            products={this.props.products}
                            carousel
                            className="in-cart-page"
                        />
                    )
                }
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        counter: state.cart.counter,
        total: state.cart.total
    }
}

export default connect(mapStateToProps, null)(CartPage);
