import React, { Component } from 'react';
import './ProductCard.style.scss';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.getPriceInSelectedCurrency = this.getPriceInSelectedCurrency.bind(this);
    }

    getPriceInSelectedCurrency() {

    }
    render() {
        return (
            <div className="product-card">
                <div className="product-card-image" style={{ backgroundImage: `url(${this.props.product.gallery[0]})` }}>
                </div>
                {/* I checked what Bootstrap uses here, because I had no idea what element is appropriate */}
                <h5 className="product-card-title">
                    {this.props.product.name}
                </h5>
                <h5 className="product-card-price">
                    {this.getPriceInSelectedCurrency()}
                </h5>
            </div >
        )
    }
}
