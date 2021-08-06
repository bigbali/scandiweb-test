import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import devlog from '../../util/devlog';
import getBrightness from '../../util/getBrightness';
import Button from '../Button';
import PlusSymbol from '../../media/svg/plus-symbol.svg';
import MinusSymbol from '../../media/svg/minus-symbol.svg';
import './MinicartItem.style.scss';

class MinicartItem extends Component {
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
        const getClassListModifier = (attribute) => {
            const value = attribute.value;
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
            // if (stateAttributeEntry) {
            //     if (value === stateAttributeEntry.value) {
            //         classListModifier += " selected";
            //     }
            // }

            return classListModifier
        }

        // This sets background color to attribute item value, if attribute type is swatch
        const getInlineStyleModifier = (attribute) => {
            const color = attribute.value;
            let inlineStyleModifier;

            if (attribute.type === "swatch") {
                inlineStyleModifier = {
                    backgroundColor: color
                }
            }

            return inlineStyleModifier
        }

        const getUpdatedValues = (newValue, oldValues) => {
            let newValues = [];

            oldValues.forEach((oldValue) => {
                // devlog("old", "warn")
                // devlog(JSON.stringify(oldValue), "warn")
                // devlog("new")
                // devlog(JSON.stringify(newValue))

                newValues.push(oldValue);

                //devlog(JSON.stringify(newValue))
                if (!JSON.stringify(newValue) === JSON.stringify(oldValue)) {
                    newValues.push(newValue);
                }
            })

            //devlog(JSON.stringify(oldValues))

            return newValues
        }

        const getValueIfNotAlreadyPresent = (attributeTypes, attributeName, attributeData) => {
            const attributeTypeValues = attributeTypes[attributeName].values;
            let valueIsAlreadyPresent = false;

            // Remove type property so we can compare
            let { type, ...attributeDataWithoutType } = { ...attributeData }

            // Compare type values against the one already in 'attributeTypes'
            attributeTypeValues.forEach(typeValue => {
                if (JSON.stringify(typeValue) === JSON.stringify(attributeDataWithoutType)) {
                    valueIsAlreadyPresent = true;
                }
            })

            if (!valueIsAlreadyPresent) {
                return {
                    value: attributeData.value,
                    displayValue: attributeData.displayValue,
                }
            }

            // if (!attributeTypeValues.includes(attributeDataWithoutType)) {
            //     devlog(`> ${JSON.stringify(attributeTypeValues)} < does not include ${JSON.stringify(attributeDataWithoutType)} `)
            //     return {
            //         value: attributeData.value,
            //         displayValue: attributeData.displayValue,
            //     }
            // }
            // return { anyad: "anyad" }
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
                        }
                    ]
                }]
                ...
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
                        attributeTypes = {
                            ...attributeTypes,
                            [attributeName]: {
                                values: [
                                    ...attributeTypes[attributeName].values,
                                    getValueIfNotAlreadyPresent(attributeTypes, attributeName, attributeData)
                                ],
                                type: attributeData.type
                            }
                        }
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
            devlog(JSON.stringify(attributeTypes))

        })

        // For each type of attribute ('color', 'size'...) we'll have a row
        // const rows = attributeTypes.map(type => {
        //     //devlog("==== [TYPE] ====", "warn")
        //     //devlog(JSON.stringify(type))
        //     const attributes = type.values.map(value => {
        //         return (
        //             <button key={value.value} className={getClassListModifier(value)} style={getInlineStyleModifier(value)} onClick={() => {
        //                 this.selectMinicartItemAttribute(type)
        //             }}>
        //                 {value.displayValue}
        //             </button>
        //         )
        //     })

        //     return (
        //         <div className="minicart-item-row">
        //             {attributes}
        //         </div>
        //     )
        // })

        // return rows
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
