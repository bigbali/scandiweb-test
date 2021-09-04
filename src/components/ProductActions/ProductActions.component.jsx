import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import Button from '../Button/Button.component';
import actions from '../../redux/actions'
import devlog from '../../util/devlog';
import getBrightness from '../../util/getBrightness';
import getTitle from '../../util/getTitle';
import getSubtitle from '../../util/getSubtitle';
import './ProductActions.style.scss';

// Store data so we can push to state only once, so we don't cause unnecessary re-render.
let initialSelection = {
    attributes: {}
};

class ProductActions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            attributes: {}
        }

        this.mapAttributesToHtml = this.mapAttributesToHtml.bind(this);
        this.selectAttributeItem = this.selectAttributeItem.bind(this);
        this.initialSelectAttributeItems = this.initialSelectAttributeItems.bind(this);
        this.addToInitialSelection = this.addToInitialSelection.bind(this);
        this.isVariationAlreadyInCart = this.isVariationAlreadyInCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    isVariationAlreadyInCart() {
        let isInCart = false;

        // First we check if product ID is in cart, then we compare each variation of that product
        // with the one stored in the state of this component
        if (this.props.cart.products[this.props.product.id]) {
            const variations = this.props.cart.products[this.props.product.id].variations;
            const variation = this.state.attributes;

            variations.forEach(thisVariation => {
                const attributesOfThisVariation = thisVariation.attributes;

                if (JSON.stringify(attributesOfThisVariation) === JSON.stringify(variation)) {
                    isInCart = true;
                }
            });
        }

        return isInCart
    }

    addToCart(productId) {
        this.props.dispatchAddToCart(this.state, productId, this.props.product);
    }

    initialSelectAttributeItems() {
        this.setState(
            initialSelection
        )
    }

    addToInitialSelection(attribute, item) {
        initialSelection = {
            attributes: {
                ...initialSelection.attributes,
                [attribute.id.toLowerCase()]: {
                    value: item.value,
                    displayValue: item.displayValue,
                    type: attribute.type
                }
            }
        }
    }

    selectAttributeItem(attribute, item) {
        this.setState({
            attributes: {
                ...this.state.attributes,
                [attribute.id.toLowerCase()]: {
                    value: item.value,
                    displayValue: item.displayValue,
                    type: attribute.type
                }
            }
        })

        devlog(`Selected ${attribute.name}: ${item.displayValue}.`)
    }


    mapAttributesToHtml(attributes) {
        // Determine class string for attribute value selector buttons
        const getClassListModifier = (attribute, attrItem) => {
            const value = attrItem.value;
            const stateAttributeEntry = this.state.attributes[attribute.id.toLowerCase()];
            let classListModifier = "attribute-item";

            // Differentiate between swatch and text items
            if (attribute.type === "swatch") {
                classListModifier += " swatch";

                if (getBrightness(value) < 100) {
                    classListModifier += " invert-color";
                }
            }
            else {
                classListModifier += " text";
            }

            // Check if value of this attribute is already added to state, 
            // and if so, mark as selected.
            // Must check if there is 'stateAttributeEntry' because on initial render it won't be set,
            // and I wouldn't want to greet users with an error because I tried to access a property of 'undefined'.
            if (stateAttributeEntry) {
                if (value === stateAttributeEntry.value) {
                    classListModifier += " selected";
                }
            }

            return classListModifier
        }

        // This sets background color to attribute item value, if attribute type is swatch
        const getInlineStyleModifier = (attrType, attrItem) => {
            const color = attrItem.value;
            let inlineStyleModifier;

            if (attrType === "swatch") {
                inlineStyleModifier = {
                    backgroundColor: color
                }
            }

            return inlineStyleModifier
        }

        // Iterate through each attribute and create appropriate attribute item buttons
        // (for example, shoe size selector buttons)
        const mappedAttributes = attributes.map((attribute, attrIndex) => {

            // Map the items inside the attribute
            const attributeItems = attribute.items.map((item, itemIndex) => {

                // Add first items to 'initialSelection'
                if (itemIndex === 0) {
                    this.addToInitialSelection(attribute, item, attrIndex);
                }

                // We want to stop here if we don't yet have state set
                // (so we don't try to access unset state)
                if (!this.state) return null;

                return (
                    <div
                        key={itemIndex}
                        style={getInlineStyleModifier(attribute.type, item)}
                        className={getClassListModifier(attribute, item)}
                        aria-label={item.displayValue}
                        onClick={() => this.selectAttributeItem(attribute, item)}>
                        {item.displayValue}
                    </div>
                )
            });

            return (
                <div key={attrIndex} className="attribute-wrapper">
                    <p className="attribute-name">
                        {attribute.name}:
                    </p>
                    <div className="attribute-items-wrapper">
                        {attributeItems}
                    </div>
                </div>
            )
            /*
            */
        })

        return (
            <div className="attributes-wrapper">
                {mappedAttributes}
            </div>
        )
    }

    componentDidMount() {
        this.initialSelectAttributeItems();
    }

    render() {
        const product = this.props.product;

        // Reset initial selection on every render (so we don't add
        // new items on top of the old ones on every re-render)
        initialSelection = {};

        return (
            <div>
                <h1 className="product-title semibold font-size-30">
                    {getTitle(product.name)}
                </h1>
                <h2 className="product-subtitle regular font-size-30">
                    {getSubtitle(product.name)}
                </h2>
                <div>
                    {this.mapAttributesToHtml(product.attributes)}
                </div>
                <p className="product-price-label">
                    Price:
                </p>
                <p className="product-price">
                    {getPriceInSelectedCurrency(product)}
                </p>
                <Button className="fill" onClick={() => this.addToCart(product.id)}
                    disabled={this.isVariationAlreadyInCart()}>
                    Add to cart
                </Button>
                <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
        cart: state.cart,
    }
}

const mapDispatchToProps = () => {
    return {
        dispatchAddToCart: actions.cartAdd
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductActions);
