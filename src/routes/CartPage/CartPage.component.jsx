import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import actions from '../../redux/actions'

class CartPage extends PureComponent {
    constructor(props) {
        super(props)

        this.mapPropsToWhatever = this.mapPropsToWhatever.bind(this)
    }

    mapPropsToWhatever() {

        //TODO: cache CART, CURRENCY

        return <h3>{JSON.stringify(this.props.cart)}</h3>
        /*
        return this.props.map(prop => {
            return (
                <h3>
                    {prop}
                </h3>
            )
        })
        */
    }

    render() {
        return (
            <main>
                <h1>CART</h1>
                {this.mapPropsToWhatever()}
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
