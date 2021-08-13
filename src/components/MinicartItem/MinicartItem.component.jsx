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
            attributeRows: [],
            selected: {}
        }

        this.mapVariationsToProduct = this.mapVariationsToProduct.bind(this);
        this.selectMinicartItemAttributeValue = this.selectMinicartItemAttributeValue.bind(this);
    }

    selectMinicartItemAttributeValue(value, attributeName) {
        devlog(`Selected ${attributeName}: ${value.displayValue}`)
        // this.setState({
        //     ...this.state,
        //     selected: {
        //         [attributeName]: value
        //     }
        // })
    }

    mapVariationsToProduct() {
        const getClassListModifier = (attributeType, value) => {
            let classListModifier = "variation-action small mr-5";

            // Differentiate between swatch and text items
            if (attributeType === "swatch") {
                classListModifier += " swatch";

                if (getBrightness(value.value) < 100) {
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

        let attributeRows = []
        const indexableAttributeTypes = Object.entries(attributeTypes)
        const rows = indexableAttributeTypes.map(attribute => {
            const attributeName = attribute[0];
            const attributeData = attribute[1];
            const attributeValues = attributeData.values;
            const attributeType = attributeData.type;

            attributeRows.push({
                [attributeName]: attributeData
            });

            const attributes = attributeValues.map((value, index) => {
                let isAttributeAlreadySelected = false;

                Object.entries(this.state.selected).forEach(item => {

                })
                if (index === 0 && JSON.stringify(value) === JSON.stringify(this.state.selected[attributeName])) {

                }

                return (
                    <Button key={value.value} className={getClassListModifier(attributeType, value)}
                        style={getInlineStyleModifier(attributeType, value.value)} onClick={() => {
                            this.selectMinicartItemAttributeValue(value, attributeName)
                        }}>
                        {getAttributeDisplayValue(value.displayValue, attributeType)}
                    </Button>
                )
            })

            return (
                <div className="minicart-item-row">
                    {attributes}
                </div>
            )
        })

        // Push to state only once per item
        if (!this.state.attributeRows.length > 0) {
            this.setState({
                attributeRows
            });
        }

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

const mapDispatchToProps = () => {

}

export default connect(mapStateToProps, null)(MinicartItem);
