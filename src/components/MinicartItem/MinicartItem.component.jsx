import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import devlog from '../../util/devlog';
import getBrightness from '../../util/getBrightness';
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

    selectMinicartItemAttribute() {

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

        const product = this.props.product;
        const variations = this.props.variations;
        let actualVariations;
        let attributeTypes;

        // 'attributeTypes' will have an entry for each possible attribute a specific product can have.
        // Example: ["color", "size"]. Each type will have values which are of that type. This is used in order to have different attributes in different
        // rows for each minicart item.
        //devlog(product.name, "warn")
        //
        variations.forEach(variation => {
            const quantity = variation._quantity;
            const indexableVariationAttributes = Object.entries(variation.attributes);

            //devlog(JSON.stringify(indexableVariationAttributes))

            // variation.attributes.forEach(attribute => {
            //     const name = attribute.name;
            //     devlog(name)
            //devlog("iter")
            // attrName
            // const name = actualVariation[0];
            // // attrValue
            // const value = actualVariation[1];

            // // TODO: check if swatch or text

            // //devlog(name)
            // // devlog(JSON.stringify(value))

            // if (!attributeTypes) {
            //     //devlog("Created attrTypes")
            //     attributeTypes = [
            //         {
            //             name: name,
            //             values: [
            //                 value
            //             ]
            //         }
            //     ]
            // }
            // else {
            //     //devlog("Iterating attrTypes")
            //     attributeTypes.forEach((attributeType, index) => {
            //         let isAttributeTypeAlreadyInAttributeTypes = false;
            //         let indexOfAttributeType = null;

            //         if (attributeType.name === name) {
            //             isAttributeTypeAlreadyInAttributeTypes = true;
            //             indexOfAttributeType = index;
            //         }


            //         //devlog(index + 1, "warn")
            //         //devlog(JSON.stringify(attributeType.name))
            //         // if (attributeType.name === name) {
            //         //     devlog(`${attributeType.name} = ${name}`)
            //         //     attributeTypes[index] = {
            //         //         name: name,
            //         //         values: getUpdatedValues(value, attributeType.values)
            //         //     }

            //         //     //devlog(JSON.stringify(attributeTypes[index]))
            //         //     //devlog(name, "error")
            //         // }
            //         // else {
            //         //     devlog(`${attributeType.name} != ${name}`)
            //         //     attributeTypes = [
            //         //         ...attributeTypes,
            //         //         {
            //         //             name: name,
            //         //             values: [
            //         //                 value
            //         //             ]
            //         //         }]
            //         // }
            //     })
            // }
            //devlog(JSON.stringify(attributeTypes))

        })

        // For each type of attribute ('color', 'size'...) we'll have a row
        // const rows = attributeTypes.map(type => {
        //     //devlog("==== [TYPE] ====", "warn")
        //     //devlog(JSON.stringify(type))
        //     const attributes = type.values.map(value => {
        //         return (
        //             <button key={value.value} className={getClassListModifier(value)} style={getInlineStyleModifier(value)} onClick={() => {
        //                 this.selectMinicartItemAttribute(value)
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
                            {getPriceInSelectedCurrency(product, this.props.currencies.selected)}
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
                        <button className="attribute-selector" >+</button>
                        <span>1</span>
                        <button className="attribute-selector">-</button>
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
