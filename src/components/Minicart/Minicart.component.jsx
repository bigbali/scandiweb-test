import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSelectedSymbol } from '../../util/dataProcessor';
import CartIcon from '../../media/svg/cart.svg';
import Button from '../Button';
import MinicartItem from '../MinicartItem';
import getTotalPrice from '../../util/getTotalPrice';
import getProductById from '../../util/getProductById';
import './Minicart.style.scss';

class Minicart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isExpanded: false
        }

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.mapCartItemsToHtml = this.mapCartItemsToHtml.bind(this);
    }

    setExpanded(isExpanded) {
        this.setState({
            isExpanded: isExpanded
        });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setExpanded(false);
        }
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    mapCartItemsToHtml() {
        // Get all cart entries
        let cartEntries = Object.entries(this.props.cart.products);
        const mappedItems = cartEntries.map(item => {

            const productId = item[0];
            const productVariations = item[1].variations;
            const fullProduct = getProductById(productId);

            return (
                <MinicartItem product={fullProduct} variations={productVariations} key={productId} />
            )
        });

        return mappedItems
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    render() {
        const counter = this.props.cart.counter;

        return (
            <div ref={this.setWrapperRef}
                className={`minicart-wrapper ${this.state.isExpanded ? "expanded" : ""}`}>
                <div className="minicart-relative">
                    {/* Putting these two in a wrapper would mess up the styling, so let's just duplicate 'onClick' */}
                    <img className="minicart-icon" src={CartIcon} alt="Minicart" onClick={this.toggleExpanded} />
                    <span className={`minicart-counter ${counter < 1 ? "hidden" : ""}`} onClick={this.toggleExpanded}>
                        {/* If counter is zero, just hide it, because we want it to still take up space
                            (so cart icon doesn't move to right when counter isn't visible) */}
                        {counter}
                    </span>
                    <div className="minicart-window">
                        <div className="minicart-items-wrapper">
                            <p className="my-bag">
                                <span className="bold">My Bag</span>
                                <span className="medium">
                                    , {` ${counter} ${counter === 1 ? "item" : "items"}`}
                                </span>
                            </p>
                            <div className={`minicart-is-empty ${counter < 1 ? "totally-empty" : "absolutely-not-empty"} semibold font-size-20`}>
                                Your cart is empty. <br />
                                Go buy something!
                            </div>
                            {this.mapCartItemsToHtml()}
                        </div>
                        <div className="total-price">
                            <span>Total</span>
                            <span>
                                {getSelectedSymbol()}
                                {getTotalPrice()}
                            </span>
                        </div>
                        <div className="minicart-buttons-wrapper">
                            {/* This is done this strange way because if I put 'Button' in 'Link', the styling breaks */}
                            <Button className="font-size-14" onClick={this.toggleExpanded}>
                                View Bag
                                <Link to="/cart" className="fill-entirely" />
                            </Button>
                            <Button className="fill" onClick={this.toggleExpanded}>
                                Checkout
                                <Link to="/checkout" className="fill-entirely" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="minicart-shade"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(Minicart);
