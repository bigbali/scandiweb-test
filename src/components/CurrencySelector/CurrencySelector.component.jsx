import React, { Component } from 'react';
import DropdownIcon from '../../media/svg/dropdown.svg';
import './CurrencySelector.style.scss';

export default class CurrencySelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            currentCurrency: null,
            currencies: []
        }
    }
    render() {
        return (
            <div className="currency-selector-wrapper">
                <div className="currency-sign">$</div>
                <div className="currency-dropdown-toggle">
                    <img src={DropdownIcon} alt="Expand" />
                </div>
            </div>
        )
    }
}
