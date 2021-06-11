import React, { Component } from 'react';
import Cart from '../Cart';
import CurrencySelector from '../CurrencySelector/CurrencySelector.component';

import './HeaderActions.style.scss';

export default class HeaderActions extends Component {
    render() {
        return (
            <div className="header-actions-wrapper">
                <CurrencySelector />
                <Cart />
            </div>
        )
    }
}
