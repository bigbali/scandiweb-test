import React, { PureComponent } from 'react';
import Button from '../Button';

export default class Attributes extends PureComponent {
    render() {
        return (
            <div className="attributes">
                {   // Return a row for each attribute type,
                    // each containing an array of buttons
                    this.props.product.attributes.map((attribute, index) => {
                        const selected = this.props.attributes[index].selected;

                        const buttons = attribute.items.map(item => {
                            const isSelected = (selected.value === item.value);

                            return (
                                <Button
                                    key={item.id}
                                    attributeItem={item}
                                    aria-label={item.displayValue}
                                    // In cart and in ProductActions, we want different styling
                                    // and there is little support for CSS attr() solution,
                                    // so here we are. 
                                    // 33 is hexadecimal for decimal 20 => 20% opacity
                                    style={attribute.type === "swatch"
                                        ? {
                                            backgroundColor: (
                                                isSelected || this.props.isProductAction
                                                    ? item.value
                                                    : item.value + "33"
                                            )
                                        }
                                        : null
                                    }
                                    className={`
                                        ${selected.value === item.value
                                            ? "selected"
                                            : ""}
                                        ${attribute.type}`}
                                    onClick={() => {
                                        this.props.selectItem(item, attribute);
                                    }}
                                >
                                    {attribute.type === "text"
                                        && item.displayValue}
                                </Button>
                            )
                        })

                        return (
                            <div
                                key={attribute.name}
                                className="attribute-row"
                            >
                                {this.props.isProductAction
                                    || attribute.items.some(item => {
                                        return (
                                            item.value === "Yes"
                                            || item.value === "No"
                                        )
                                    })
                                    ? (
                                        <div className="name">
                                            {attribute.name}:
                                        </div>
                                    )
                                    : null
                                }
                                <div className="buttons">
                                    {buttons}
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}
