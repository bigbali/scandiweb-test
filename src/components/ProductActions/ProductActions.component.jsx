import React, { PureComponent } from 'react';
import devlog from '../../util/devlog';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import './ProductActions.style.scss';
import { connect } from 'react-redux';

class ProductActions extends PureComponent {
    constructor(props) {
        super(props);

        this.mapAttributesToHtml = this.mapAttributesToHtml.bind(this);
        this.getAttributeModifier = this.getAttributeModifier.bind(this);
    }

    getAttributeModifier(item, type) {
        let attributeModifier = {};

        if (type === "swatch") {
            const color = item.value;
            attributeModifier = { backgroundColor: color };

            // HEX color value without '#'
            const pureColor = color.replace("#", "");

            // Break HEX value down to red, green and blue channels
            const r = pureColor.slice(0, 2);
            const g = pureColor.slice(2, 4);
            const b = pureColor.slice(4, 6);

            // Convert HEX color value to number
            const rBase10 = parseInt(Number(`0x${r}`), 10);
            const gBase10 = parseInt(Number(`0x${g}`), 10);
            const bBase10 = parseInt(Number(`0x${b}`), 10);

            // Calculate brightness (this isn't a proper way, but good enough)
            const brightness = (rBase10 + gBase10 + bBase10) / 3;

            /*
                Normally, this would get deleted, but I thought maybe dear code reviewers would want to
                see how it works. In order to do that, just uncomment the 'devlog()' function calls below.
            */

            // devlog(`${rBase10}, ${gBase10}, ${bBase10}`)
            // devlog(`${brightness}`)

            // In this case, we will consider anything below 100 dark
            if (brightness < 100) {
                attributeModifier = {
                    ...attributeModifier,
                    color: "white"
                }
                // devlog(`[${item.displayValue}] is dark.`)
            }
            else {
                // devlog(`[${item.displayValue}] is bright.`)
            }
        }

        return attributeModifier
    }

    mapAttributesToHtml(attributes) {
        /* 
            attribute:
                'type': ["swatch", "text"]     
        */

        const mappedAttributes = attributes.map((attribute, index) => {
            const attributeItems = attribute.items.map((item, index) => {
                return (
                    <div key={index} style={this.getAttributeModifier(item, attribute.type)}
                        className="attribute-item" aria-label={item.displayValue}>
                        {item.displayValue}
                    </div>
                )
            });

            return (
                <div key={index} className="attribute-wrapper">
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

    render() {
        const product = this.props.product;

        return (
            <div>
                <h1 className="product-name">{product.name}</h1>
                <h2 className="product-stock">{product.inStock ? "In Stock" : "Out of Stock"}</h2>
                <div>{this.mapAttributesToHtml(product.attributes)}</div>
                <p className="product-price-label">
                    Price:
                </p>
                <p className="product-price">
                    {getPriceInSelectedCurrency(product, this.props.currencies.selected)}
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    }
}

export default connect(mapStateToProps, null)(ProductActions);
