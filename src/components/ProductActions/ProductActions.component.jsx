import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import Button from '../Button/Button.component';
import actions from '../../redux/actions'
import './ProductActions.style.scss';

class Attributes extends PureComponent {
    render() {
        return (
            <div className="attributes">
                {   // Return a row for each attribute type,
                    // each containing an array of buttons
                    this.props.product.attributes.map((attribute, index) => {
                        const selected = this.props.attributes[index].selected;

                        const buttons = attribute.items.map(item => {
                            return (
                                <Button
                                    key={item.id}
                                    attributeItem={item}
                                    aria-label={item.displayValue}
                                    style={
                                        attribute.type === "swatch"
                                            ? { backgroundColor: item.value }
                                            : null
                                    }
                                    className={`
                                        ${selected === item
                                            ? "selected"
                                            : ""}
                                        ${attribute.type}`}
                                    onClick={() => {
                                        this.props.selectItem(item, attribute);
                                    }}
                                >
                                    {attribute.type === "text"
                                        && item.displayValue}
                                </Button>
                            )
                        })

                        return (
                            <div
                                key={attribute.name}
                                className="attribute-row">
                                <div className="name">
                                    {attribute.name}:
                                </div>
                                <div className="buttons">
                                    {buttons}
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

class ProductActions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            attributes: null
        }

        // this.mapAttributesToHtml = this.mapAttributesToHtml.bind(this);
        // this.isVariationAlreadyInCart = this.isVariationAlreadyInCart.bind(this);
        // this.addToCart = this.addToCart.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }


    // isVariationAlreadyInCart() {
    //     let isInCart = false;

    //     // First we check if product ID is in cart, then we compare each variation of that product
    //     // with the one stored in the state of this component
    //     if (this.props.cart.products[this.props.product.id]) {
    //         const variations = this.props.cart.products[this.props.product.id].variations;
    //         const variation = this.state.attributes;

    //         variations.forEach(thisVariation => {
    //             const attributesOfThisVariation = thisVariation.attributes;

    //             if (JSON.stringify(attributesOfThisVariation) === JSON.stringify(variation)) {
    //                 isInCart = true;
    //             }
    //         });
    //     }

    //     return isInCart
    // }

    // addToCart(productId) {
    //     //this.props.dispatchAddToCart(this.state, productId, this.props.product);
    //     console.log(this.props.product)
    // }

    selectItem = (item, attribute) => {
        this.state.attributes.forEach((attr, index) => {
            if (attr.id === attribute.id) {
                let newAttributes = [
                    ...this.state.attributes
                ];

                newAttributes[index].selected = item;

                this.setState({
                    attributes: newAttributes
                })
            }
        })
    }

    // Set initial selection
    static getDerivedStateFromProps(nextProps, prevState) {
        // If not first render, abort
        if (prevState.attributes) return null

        return {
            attributes: nextProps.product.attributes.map(attribute => {
                let selected; // Add a 'selected' property to all attributes

                attribute.items.forEach((item, index) => {
                    if (index === 0) {
                        selected = item;
                    }
                })

                return {
                    ...attribute,
                    selected
                }
            })
        }
    }

    render() {
        const product = this.props.product;

        return (
            <div className="product-actions">
                <div className="title">
                    <h1 className="brand">
                        {product.brand}
                    </h1>
                    <h2 className="name">
                        {product.name}
                    </h2>
                </div>
                <Attributes
                    product={product}
                    attributes={this.state.attributes}
                    selectItem={this.selectItem}
                />
                <div className="price-wrapper">
                    <div className="label">
                        Price:
                    </div>
                    <div className="price">
                        {getPriceInSelectedCurrency(product)}
                    </div>
                </div>
                <div
                    className={`add-to-cart
                        ${!product.inStock
                            ? "out-of-stock"
                            : ""}`}
                    onClick={() => {
                        if (product.inStock) {
                            this.props.addToCart(product, this.state.attributes)
                        }
                    }}
                >
                    {
                        product.inStock
                            ? "ADD TO CART"
                            : "OUT OF STOCK"
                    }
                </div>
                <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
    }
}

const mapDispatchToProps = () => {
    return {
        addToCart: actions.cartAdd
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductActions);
