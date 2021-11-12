import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import { getInlineStyleModifier } from '../../util/mapVariationsHelper';
import Button from '../Button/Button.component';
import actions from '../../redux/actions'
import getTitle from '../../util/getTitle';
import getSubtitle from '../../util/getSubtitle';
import './ProductActions.style.scss';

class AttributeButton extends PureComponent {
    render() {
        const item = this.props.attributeItem;
        return (
            <div
                className="attribute-button"
                //key={this.props.attributeItem.id}
                // style={getInlineStyleModifier(attribute.type, item.value)}
                // className={getClassListModifier(attribute, item)}
                // aria-label={item.displayValue}
                onClick={this.props.selectItem}
            >
                {item.displayValue}
            </div>
        )
    }
}

class AttributeRows extends PureComponent {
    render() {
        return (
            // Return a row for each attribute type,
            // all of which contain an array of buttons
            this.props.product.attributes.map(attribute => {
                const buttons = attribute.items.map(item => {
                    return (
                        <AttributeButton
                            key={item.id}
                            attributeItem={item}
                            selectItem={() => {
                                this.props.selectItem(item, attribute);
                            }}
                        />
                    )
                })

                return (
                    <div className="attribute-row">
                        <div className="title">
                            {attribute.name}
                        </div>
                        <div className="buttons">
                            {buttons}
                        </div>
                    </div>
                )
            })
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

    // mapAttributesToHtml(attributes) {
    //     // Determine class string for attribute value selector buttons
    //     const getClassListModifier = (attribute, attrItem) => {
    //         const value = attrItem.value;
    //         const stateAttributeEntry = this.state.attributes[attribute.id.toLowerCase()];
    //         let classListModifier = "attribute-item";

    //         // Differentiate between swatch and text items
    //         if (attribute.type === "swatch") {
    //             classListModifier += " swatch";

    //             if (getBrightness(value) < 100) {
    //                 classListModifier += " invert-color";
    //             }
    //         }
    //         else {
    //             classListModifier += " text";
    //         }

    //         // Check if value of this attribute is already added to state, 
    //         // and if so, mark as selected.
    //         // Must check if there is 'stateAttributeEntry' because on initial render it won't be set,
    //         // and I wouldn't want to greet users with an error because I tried to access a property of 'undefined'.
    //         if (stateAttributeEntry) {
    //             if (value === stateAttributeEntry.value) {
    //                 classListModifier += " selected";
    //             }
    //         }

    //         return classListModifier
    //     }

    //     // Iterate through each attribute and create appropriate attribute item buttons
    //     // (for example, shoe size selector buttons)
    //     const mappedAttributes = attributes.map((attribute, attrIndex) => {

    //         // Map the items inside the attribute
    //         const attributeItems = attribute.items.map((item, itemIndex) => {

    //             // Add first items to 'initialSelection'
    //             if (itemIndex === 0) {
    //                 this.addToInitialSelection(attribute, item, attrIndex);
    //             }

    //             // We want to stop here if we don't yet have state set
    //             // (so we don't try to access unset state)
    //             if (!this.state) return null;

    //             return (
    //                 <div
    //                     key={itemIndex}
    //                     style={getInlineStyleModifier(attribute.type, item.value)}
    //                     className={getClassListModifier(attribute, item)}
    //                     aria-label={item.displayValue}
    //                     onClick={() => this.selectAttributeItem(attribute, item)}>
    //                     {item.displayValue}
    //                 </div>
    //             )
    //         });

    //         return (
    //             <div key={attrIndex} className="attribute-wrapper">
    //                 <p className="attribute-name">
    //                     {attribute.name}:
    //                 </p>
    //                 <div className="attribute-items-wrapper">
    //                     {attributeItems}
    //                 </div>
    //             </div>
    //         )
    //         /*
    //         */
    //     })

    //     return (
    //         <div className="attributes-wrapper">
    //             {mappedAttributes}
    //         </div>
    //     )
    // }

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
            <div>
                <h1 className="product-title semibold font-size-30">
                    {getTitle(product.name)}
                </h1>
                <h2 className="product-subtitle regular font-size-30">
                    {getSubtitle(product.name)}
                </h2>
                <div>
                    <AttributeRows
                        product={product}
                        selectItem={this.selectItem}
                    />
                </div>
                <p className="product-price-label">
                    Price:
                </p>
                <p className="product-price">
                    {getPriceInSelectedCurrency(product)}
                </p>
                <Button className="fill"
                // onClick={() => this.addToCart(product.id)}
                // disabled={this.isVariationAlreadyInCart()}
                >
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
        // cart: state.cart,
    }
}

const mapDispatchToProps = () => {
    return {
        dispatchAddToCart: actions.cartAdd
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductActions);
