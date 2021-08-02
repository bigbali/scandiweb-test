import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartIcon from '../../media/svg/cart.svg';
import actions from '../../redux/actions';
import devlog from '../../util/devlog';
import getProductById from '../../util/getProductById';
import MinicartItem from '../MinicartItem';
import './Minicart.style.scss';

class Minicart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isExpanded: false
        }

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.mapCartItemsToHtml = this.mapCartItemsToHtml.bind(this);
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    mapCartItemsToHtml() {
        // Get all cart entries
        let cartEntries = Object.entries(this.props.cart.products);

        const mappedItems = cartEntries.map((product, productIndex) => {

            const itemId = product[0];

            const itemVariations = product[1].variations;
            const fullProduct = getProductById(itemId);

            //devlog(JSON.stringify(fullProduct))
            /*
            const mappedVariations = itemVariations.map((variation, variationIndex) => {

                // If first item, presume it's '_quantity', which doesn't interest us, so we return null.
                if (!variationIndex === 0) {
                    return null
                }

                return variation
            })
            */
            return (
                <MinicartItem product={fullProduct} variations={itemVariations} key={productIndex} />
            )
        });

        return mappedItems
    }

    render() {
        const counter = this.props.cart.counter;

        return (
            <div className={`minicart-wrapper ${this.state.isExpanded ? "expanded" : ""}`} onClick={this.toggleExpanded}>
                <div className="minicart-relative">
                    <img className="minicart-icon" src={CartIcon} alt="" />
                    <span className={`minicart-counter ${counter < 1 ? "hidden" : ""}`}>
                        {/* If counter is zero, just hide counter, because we want it to still take up space
                        (so cart icon doesn't move to right when counter isn't visible) */}
                        {counter}
                    </span>
                    <div className="minicart-window">
                        <p className="my-bag">
                            <span className="bold">My Bag</span>
                            <span className="medium">
                                , {` ${counter} ${counter === 1 ? "item" : "items"}`}
                            </span>
                        </p>
                        {this.mapCartItemsToHtml()}
                    </div>
                </div>
                <div className="minicart-shade">

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (state) => {
    return {
        incrementItemCount: actions.cartIncrement,
        decrementItemCount: actions.cartDecrement
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Minicart);
