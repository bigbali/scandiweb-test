import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getPrice from '../../util/getPrice';
import CartIcon from '../../media/svg/cart.svg';
import Button from '../Button';
import CartContent from '../CartContent';
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
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef
            && !this.wrapperRef.contains(event.target)) {
            this.setExpanded(false);
        }
    }

    setExpanded(isExpanded) {
        if (this.state.isExpanded) {
            this.setState({
                isExpanded: isExpanded
            });
        }
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        const counter = this.props.counter;

        return (
            <>
                <div ref={this.setWrapperRef}
                    className={`minicart-wrapper 
                    ${this.state.isExpanded
                            ? "expanded"
                            : ""}`}>
                    <div className="minicart-relative">
                        <img
                            className="minicart-icon"
                            src={CartIcon}
                            alt="Minicart"
                            onClick={this.toggleExpanded}
                        />
                        <span
                            onClick={this.toggleExpanded}
                            className={`minicart-counter 
                            ${counter < 1
                                    ? "hidden"
                                    : ""}`}
                        >
                            {counter}
                        </span>
                        <div className="minicart-window">
                            <div className="minicart-items-wrapper">
                                <p className="my-bag">
                                    <span className="bold">
                                        My Bag
                                    </span>
                                    <span className="medium">
                                        , {`${counter} 
                                        ${counter === 1
                                                ? "item"
                                                : "items"
                                            }`}
                                    </span>
                                </p>
                                <div className={`minicart-is-empty semibold font-size-20
                                ${counter < 1
                                        ? "totally-empty"
                                        : "absolutely-not-empty"}`}>
                                    Your cart is empty.
                                </div>
                                <CartContent
                                    products={this.props.products}
                                    className="in-minicart"
                                />
                            </div>
                            <div className="total-price">
                                <span>Total</span>
                                <span>
                                    {getPrice(this.props.total)}
                                </span>
                            </div>
                            <div className="minicart-actions">
                                <Link to="/cart">
                                    <Button
                                        className="bold"
                                        onClick={this.toggleExpanded}
                                    >
                                        View Bag
                                    </Button>
                                </Link>
                                <a href="/checkout">
                                    <Button
                                        className="fill"
                                        onClick={this.toggleExpanded}
                                    >
                                        Checkout
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`shade 
                    ${this.state.isExpanded
                        ? "expanded"
                        : ""}`}>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.cart.products,
        counter: state.cart.counter,
        total: state.cart.total,
    }
}

export default connect(mapStateToProps, null)(Minicart);
