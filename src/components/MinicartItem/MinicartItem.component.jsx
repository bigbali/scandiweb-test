import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import devlog from '../../util/devlog';
import getBrightness from '../../util/getBrightness';
import actions from '../../redux/actions';
import Button from '../Button';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import './MinicartItem.style.scss';
import getVariationQuantity from '../../util/getVariationQuantity';
import { getInlineStyleModifier, appendValueIfMissing, getAttributeDisplayValue } from '../../util/mapVariationsHelper';

class MinicartItem extends PureComponent {
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
                <div key={rowIndex} className="minicart-item-row">
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
            <div className="minicart-item">
                <div className="minicart-item-main">
                    <div className="left">
                        <p className="minicart-item-name">
                            {product.name}
                        </p>
                        <p className="medium">
                            {getPriceInSelectedCurrency(product)}
                        </p>
                        {this.mapVariationsToProduct()}
                    </div>
                    <div className="minicart-item-column">
                        <Button className="small variation-action" onClick={() => {
                            this.props.incrementItemCount(product.id, this.state.selectedAttributes)
                        }}>
                            <img src={PlusSymbol} alt="Increment" />
                        </Button>
                        <span className="semibold">
                            {getVariationQuantity(product.id, this.state.selectedAttributes)}
                        </span>
                        <Button className="small variation-action" onClick={() => {
                            this.props.decrementItemCount(product.id, this.state.selectedAttributes)
                        }}>
                            <img src={MinusSymbol} alt="Decrement" />
                        </Button>
                    </div>
                </div>
                <img className="minicart-item-image" src={product.gallery[0]} alt={product.name} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
        cart: state.cart
    }
}

const mapDispatchToProps = () => {
    return {
        incrementItemCount: actions.cartIncrement,
        decrementItemCount: actions.cartDecrement
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(MinicartItem);
