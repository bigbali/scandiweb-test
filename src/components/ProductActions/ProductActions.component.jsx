import React, { PureComponent } from 'react';
import devlog from '../../util/devlog';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import './ProductActions.style.scss';
import { connect } from 'react-redux';
import Button from '../Button/Button.component';
import getBrightness from '../../util/getBrightness';
import actions from '../../redux/actions'

/*

        TODO: REFACTOR!!!
        FIXME: REFACTOR!!!

 */

// Store data so we can push to state only once, so we don't cause unnecessary re-render
let initialSelection;

class ProductActions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            /*
            Color: "green",
            Size: "XXL",
            ...
            */
        }

        this.mapAttributesToHtml = this.mapAttributesToHtml.bind(this);
        this.selectAttributeItem = this.selectAttributeItem.bind(this);
        this.initialSelectAttributeItems = this.initialSelectAttributeItems.bind(this);
        this.addToInitialSelection = this.addToInitialSelection.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(productId) {
        this.props.dispatchAddToCart(this.state, productId);
    }

    // We populate 'initialSelection', then we assign it to state here
    initialSelectAttributeItems() {
        this.setState(
            initialSelection
        )
    }

    // Dynamically add keys to 'initialSelection'
    addToInitialSelection(attribute, item) {
        initialSelection = ({
            ...initialSelection,
            [attribute.id]: item.value,
        })
    }

    // TODO: selected attribute doesn't persist across re-renders

    selectAttributeItem(attribute, item) {
        this.setState({
            ...this.state,
            [attribute.id]: item.value
        })

        devlog(`Selected ${attribute.name}: ${item.displayValue}.`)
    }


    mapAttributesToHtml(attributes) {
        // From attribute type determine class string for attribute value selector buttons
        const getClassListModifier = (attribute, attrItem) => {
            const hexColor = attrItem.value;
            let classListModifier = "attribute-item";

            // Differentiate between swatch and text items
            if (attribute.type === "swatch") {
                classListModifier += " swatch";
            }
            else {
                classListModifier += " text";
            }

            // Check if value of item matches the one stored in state for parent attribute
            if (attrItem.value === this.state[attribute.id]) {
                classListModifier += " selected";
            }

            // If background is dark, set a bright foreground color using a CSS class
            if (getBrightness(hexColor) < 100) {
                classListModifier += " invert-color";
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

        // Iterate through each attribute and create appropriate attribute items 
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
                if (!this.state) return "";

                return (
                    <div key={itemIndex} style={getInlineStyleModifier(attribute.type, item)}
                        className={getClassListModifier(attribute, item)} aria-label={item.displayValue}
                        onClick={() => this.selectAttributeItem(attribute, item)}>
                        {item.displayValue}
                    </div>
                )
            });

            //TODO: attribute item html to own component
            //TODO:  comments and documentation

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
                <h1 className="product-name">
                    {product.name}
                </h1>
                <h2 className="product-stock">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </h2>
                <div>
                    {this.mapAttributesToHtml(product.attributes)}
                </div>
                <p className="product-price-label">
                    Price:
                </p>
                <p className="product-price">
                    {getPriceInSelectedCurrency(product, this.props.currencies.selected)}
                </p>
                <Button text="Add to cart" onClick={() => this.addToCart(product.id)} />
                <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    }
}

const mapDispatchToProps = () => {
    return {
        dispatchAddToCart: actions.cartAdd
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductActions);
