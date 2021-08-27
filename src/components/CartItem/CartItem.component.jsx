import React, { Component } from 'react';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import getSubtitle from '../../util/getSubtitle';
import getTitle from '../../util/getTitle';
import Carousel from '../Carousel';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import './CartItem.style.scss';
import Button from '../Button';
import getBrightness from '../../util/getBrightness';
import { appendValueIfMissing, getInlineStyleModifier, getAttributeDisplayValue } from '../../util/mapVariationsHelper';
import devlog from '../../util/devlog';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import getVariationQuantity from '../../util/getVariationQuantity';

class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttributes: {}
        }

        this.initialAttributeSelection = {};

        this.mapVariationsToProduct = this.mapVariationsToProduct.bind(this);
        this.selectMinicartItemAttributeValue = this.selectMinicartItemAttributeValue.bind(this);
    }

    selectMinicartItemAttributeValue(value, attributeName) {
        this.setState({
            selectedAttributes: {
                ...this.state.selectedAttributes,
                [attributeName]: value
            }
        }, () => {
            devlog(`Selected ${attributeName}: [${value.displayValue}].`)
        })
    }

    mapVariationsToProduct() {
        const getClassListModifier = (attributeType, attributeName, value) => {
            let classListModifier = "variation-action small mr-5";

            // Differentiate between swatch and text attributes
            if (attributeType === "swatch") {
                classListModifier += " swatch";

                if (getBrightness(value.value) < 100) {
                    classListModifier += " invert-color";
                }
            }
            // Swatch attributes will only have the first letter of the color displayed, so they
            // can have a fixed width, but text attributes can have multiple chars, so they need to grow
            // along with their contents
            else {
                classListModifier += " text dynamic-width";
            }

            // If state contains attribute value, mark as selected
            if (this.state.selectedAttributes) {
                if (JSON.stringify(this.state.selectedAttributes[attributeName]) === JSON.stringify(value)) {
                    classListModifier += " selected"
                }
            }

            return classListModifier
        }

        const variations = this.props.variations;
        let attributeTypes = {};

        variations.forEach(variation => {
            const indexableVariationAttributes = Object.entries(variation.attributes);

            indexableVariationAttributes.forEach((variationAttribute, iter) => {
                const attributeName = variationAttribute[0];
                const attributeData = variationAttribute[1];

                if (attributeTypes.length < 1) {
                    attributeTypes = {
                        [attributeName]: {
                            values: [
                                {
                                    value: attributeData.value,
                                    displayValue: attributeData.displayValue,
                                }
                            ],
                            type: attributeData.type
                        }
                    }
                }
                else {
                    if (attributeTypes[attributeName]) {
                        appendValueIfMissing(attributeTypes, attributeName, attributeData)
                    }
                    else {
                        attributeTypes = {
                            ...attributeTypes,
                            [attributeName]: {
                                values: [
                                    {
                                        value: attributeData.value,
                                        displayValue: attributeData.displayValue,
                                    }
                                ],
                                type: attributeData.type
                            }
                        }
                    }
                }
            })

        })

        // For each type of attribute ('color', 'size'...) we'll have a row
        const indexableAttributeTypes = Object.entries(attributeTypes)
        const rows = indexableAttributeTypes.map((attribute, rowIndex) => {
            const attributeName = attribute[0];
            const attributeData = attribute[1];
            const attributeValues = attributeData.values;
            const attributeType = attributeData.type;

            const attributes = attributeValues.map((value, attributeIndex) => {
                if (attributeIndex === 0 && !this.initialAttributeSelection[attributeName]) {
                    this.initialAttributeSelection = {
                        ...this.initialAttributeSelection,
                        [attributeName]: value
                    }
                }

                return (
                    <Button key={value.value} className={getClassListModifier(attributeType, attributeName, value)}
                        style={getInlineStyleModifier(attributeType, value.value)} onClick={() => {
                            this.selectMinicartItemAttributeValue(value, attributeName)
                        }}>
                        {getAttributeDisplayValue(value.displayValue, attributeType)}
                    </Button>
                )
            })

            return (
                <div key={rowIndex} className="cart-item-row">
                    {attributes}
                </div>
            )
        })

        return rows
    }

    // Set initial selection
    componentDidMount() {
        this.setState({
            selectedAttributes: this.initialAttributeSelection
        }, () => {
            devlog("Initial selection set.")
        })
    }

    render() {
        const product = this.props.product;

        return (
            <div className="cart-item">
                <hr />
                <div className="cart-item-flex">
                    <div className="cart-item-left">
                        <h1 className="product-title font-size-30 semibold">
                            {getTitle(product.name)}
                        </h1>
                        <h2 className="product-subtitle font-size-30 regular">
                            {getSubtitle(product.name)}
                        </h2>
                        <h3 className="product-price">
                            {getPriceInSelectedCurrency(product)}
                        </h3>
                        {this.mapVariationsToProduct()}
                    </div>
                    <div className="cart-item-right">
                        <div className="cart-item-quantity-actions">
                            <Button className="big variation-action" onClick={() => {
                                this.props.incrementItemCount(product.id, this.state.selectedAttributes)
                            }}>
                                <img src={PlusSymbol} alt="Increment" />
                            </Button>
                            <span className="semibold">
                                {getVariationQuantity(product.id, this.state.selectedAttributes)}
                            </span>
                            <Button className="big variation-action" onClick={() => {
                                this.props.decrementItemCount(product.id, this.state.selectedAttributes)
                            }}>
                                <img src={MinusSymbol} alt="Decrement" />
                            </Button>
                        </div>
                        <Carousel gallery={product.gallery} altTitle={product.name} />
                    </div>
                </div>
            </div>
        )
    }
}

// Actually, this is just to force update variation quantity on change
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

export default connect(mapStateToProps, mapDispatchToProps())(CartItem)
