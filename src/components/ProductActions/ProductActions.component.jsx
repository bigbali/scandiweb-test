import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getPriceInSelectedCurrency } from '../../util/dataProcessor';
import Button from '../Button/Button.component';
import actions from '../../redux/actions';
import Attributes from '../Attributes';
import './ProductActions.style.scss';
import getPrice from '../../util/getPrice';

// class Attributes extends PureComponent {
//     render() {
//         return (
//             <div className="attributes">
//                 {   // Return a row for each attribute type,
//                     // each containing an array of buttons
//                     this.props.product.attributes.map((attribute, index) => {
//                         const selected = this.props.attributes[index].selected;

//                         const buttons = attribute.items.map(item => {
//                             return (
//                                 <Button
//                                     key={item.id}
//                                     attributeItem={item}
//                                     aria-label={item.displayValue}
//                                     style={
//                                         attribute.type === "swatch"
//                                             ? { backgroundColor: item.value }
//                                             : null
//                                     }
//                                     className={`
//                                         ${selected === item
//                                             ? "selected"
//                                             : ""}
//                                         ${attribute.type}`}
//                                     onClick={() => {
//                                         this.props.selectItem(item, attribute);
//                                     }}
//                                 >
//                                     {attribute.type === "text"
//                                         && item.displayValue}
//                                 </Button>
//                             )
//                         })

//                         return (
//                             <div
//                                 key={attribute.name}
//                                 className="attribute-row"
//                             >
//                                 <div className="name">
//                                     {attribute.name}:
//                                 </div>
//                                 <div className="buttons">
//                                     {buttons}
//                                 </div>
//                             </div>
//                         )
//                     })}
//             </div>
//         )
//     }
// }

class ProductActions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            attributes: null
        }

        this.selectItem = this.selectItem.bind(this);
    }

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
            <div className={`product-actions 
                ${!product.inStock
                    ? "out-of-stock"
                    : ""}`}>
                <div className="title">
                    <h1 className="brand">
                        {product.brand}
                    </h1>
                    <h2 className="name">
                        {product.name}
                    </h2>
                </div>
                <Attributes
                    product={product}
                    attributes={this.state.attributes}
                    selectItem={this.selectItem}
                    isProductAction
                />
                <div className="price-wrapper">
                    <div className="label">
                        Price:
                    </div>
                    <div className="price">
                        {getPrice(product.prices)}
                    </div>
                </div>
                <div
                    className="add-to-cart"
                    onClick={() => {
                        const x = this.state.attributes.map(x => {
                            return {
                                ...x,
                                selected: { ...x.selected }
                            }
                        })

                        if (product.inStock) {
                            this.props.addToCart(
                                product,
                                x)
                        }
                    }}
                >
                    {
                        product.inStock
                            ? "ADD TO CART"
                            : "OUT OF STOCK"
                    }
                </div>
                <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: product.description }}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
    }
}

const mapDispatchToProps = () => {
    return {
        addToCart: actions.cartAdd
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductActions);
