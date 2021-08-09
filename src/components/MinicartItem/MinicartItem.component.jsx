import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import devlog from '../../util/devlog';
import getBrightness from '../../util/getBrightness';
import Button from '../Button';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import './MinicartItem.style.scss';

class MinicartItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            attributeTypes: []
        }

        this.mapVariationsToProduct = this.mapVariationsToProduct.bind(this);
        this.selectMinicartItemAttribute = this.selectMinicartItemAttribute.bind(this);
    }

    selectMinicartItemAttribute(attrType) {
        devlog(JSON.stringify(attrType), "warn")
    }

    mapVariationsToProduct() {
        const getClassListModifier = (attributeType, value) => {
            let classListModifier = "variation-action small mr-5";

            // Differentiate between swatch and text items
            if (attributeType === "swatch") {
                classListModifier += " swatch";

                if (getBrightness(value) < 100) {
                    classListModifier += " invert-color";
                }
            }
            else {
                classListModifier += " text dynamic-width";
            }
            return classListModifier
        }

        // This sets background color to attribute item value, if attribute type is swatch
        const getInlineStyleModifier = (attributeType, value) => {
            const color = value;
            let inlineStyleModifier;


            if (attributeType === "swatch") {
                inlineStyleModifier = {
                    backgroundColor: color
                }
            }

            return inlineStyleModifier
        }

        const appendValueIfMissing = (attributeTypes, attributeName, attributeData) => {
            const attributeTypeValues = attributeTypes[attributeName].values;
            let newAttributeTypeValues = attributeTypeValues;

            let isValueAlreadyPresent = false;

            // Remove type property so we can compare
            let { type, ...attributeDataWithoutType } = { ...attributeData }

            // Compare type values against the one already in 'attributeTypes'
            attributeTypeValues.forEach(typeValue => {
                if (JSON.stringify(typeValue) === JSON.stringify(attributeDataWithoutType)) {
                    isValueAlreadyPresent = true;
                }
            })

            if (!isValueAlreadyPresent) {
                newAttributeTypeValues.push({
                    value: attributeData.value,
                    displayValue: attributeData.displayValue,
                })
            }

            // We can change value of object which is passed by reference like this
            attributeTypes[attributeName].values = newAttributeTypeValues;
        }

        // Shorten to one character if swatch
        const getAttributeDisplayValue = (displayValue, attributeType) => {
            if (attributeType === "swatch") {
                return displayValue.slice(0, 1)
            }

            return displayValue
        }

        const product = this.props.product;
        const variations = this.props.variations;
        let actualVariations;
        let attributeTypes = {};

        /* 'attributeTypes': {    <--- this is what it will look like
                ['color': {
                    values: [
                        {
                            value: '#ffffff', displayValue: 'white'
                        },
                        {...}
                    ]
                }, ...]
            }
        */

        // devlog(product.name, "error")

        variations.forEach(variation => {
            const quantity = variation._quantity;
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
            // devlog(JSON.stringify(attributeTypes))

        })

        // For each type of attribute ('color', 'size'...) we'll have a row

        const indexableAttributeTypes = Object.entries(attributeTypes)
        const rows = indexableAttributeTypes.map(attributeType => {
            const attributeName = attributeType[0];
            const attributeValues = attributeType[1].values;

            //devlog("==== [TYPE] ====", "warn")
            //devlog(JSON.stringify(attributeValues))
            const attributes = attributeValues.map(value => {
                const type = attributeType[1].type;

                return (
                    <Button key={value.value} className={getClassListModifier(type, value.value)}
                        style={getInlineStyleModifier(type, value.value)} onClick={() => {
                            this.selectMinicartItemAttribute(value)
                        }}>
                        {getAttributeDisplayValue(value.displayValue, type)}
                    </Button>
                )
            })

            return (
                <div className="minicart-item-row">
                    {attributes}
                </div>
            )
        })

        return rows
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
                        {/*
                        <div className="minicart-item-row">
                            <button className="attribute-selector horizontal">S</button>
                            <button className="attribute-selector horizontal">M</button>
                            {this.mapVariationsToProduct()}
                        </div>
                        */}
                        {this.mapVariationsToProduct()}
                    </div>
                    <div className="minicart-item-column">
                        <Button className="small variation-action" >
                            <img src={PlusSymbol} alt="Increment" />
                        </Button>
                        <span className="semibold">
                            1
                        </span>
                        <Button className="small variation-action" >
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
        currencies: state.currencies
    }
}

export default connect(mapStateToProps, null)(MinicartItem);
