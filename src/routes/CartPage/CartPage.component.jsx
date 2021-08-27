import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem';
import actions from '../../redux/actions';
import getProductById from '../../util/getProductById';
import './CartPage.style.scss';
import devlog from '../../util/devlog';

class CartPage extends PureComponent {
    constructor(props) {
        super(props)

        this.mapProductsToHtml = this.mapProductsToHtml.bind(this)
    }

    mapProductsToHtml() {
        const cartItems = Object.entries(this.props.cart.products);
        const mappedCartItems = cartItems.map(item => {
            const productId = item[0];
            const productVariations = item[1].variations;
            const product = getProductById(productId);

            return (
                <CartItem product={product} variations={productVariations} key={productId} />
            )
        })

        //devlog(JSON.stringify(mappedCartItems))
        if (mappedCartItems.length > 0) {
            return mappedCartItems
        }
        else {
            devlog("miapicsa")
            return (
                <h2 className="cart-page-empty">
                    Hey, your cart is empty.
                    There's plenty of stuff to fill it up with, just look around.
                </h2>
            )
        }
    }

    render() {
        return (
            <main className="cart-page">
                <h1 className="cart-page-title">CART</h1>
                {this.mapProductsToHtml()}
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = () => {
    return {
        incrementItemCount: actions.cartIncrement,
        decrementItemCount: actions.cartDecrement
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(CartPage);
