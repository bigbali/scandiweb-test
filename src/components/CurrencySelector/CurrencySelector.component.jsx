import React, { PureComponent } from 'react';
import DropdownIcon from '../../media/svg/dropdown.svg';
import './CurrencySelector.style.scss';
//import log from './../../util/log';
import { pairCurrencyWithSymbol } from './../../util/dataProcessor';
import devlog from '../../util/devlog';

/*
    How can this.props.currencies be a list of five values, and empty at the same time?
    That is a mystery.
    React Dev Tools say the values are there, yet when I log them, they are nowhere, except 
    when they sometimes magically conjure themselves. ???
*/

export default class CurrencySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            selectedCurrency: this.props.currencies[0],
            symbolizedCurrencies: [],
        }

        this.toggle = this.toggle.bind(this);
        this.setSelectedCurrency = this.setSelectedCurrency.bind(this);
        this.generateSymbolizedCurrencyList = this.generateSymbolizedCurrencyList.bind(this);
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        }, () => {
            devlog(`CurrencySelector is ${this.state.isExpanded ? "expanded" : "closed"}.`);
        });
    }

    setSelectedCurrency(currency) {
        this.setState({
            selectedCurrency: currency,
        }, () => {
            devlog(`Selected currency: ${this.state.selectedCurrency}.`);
        })
    }

    // Generate HTML list containing currencies paired with their respective symbols
    generateSymbolizedCurrencyList() {
        const list = this.props.currencies.map((currency, index) => {
            return (
                // When list tag is clicked on, set selectedCurrency to tag's own
                <li key={index} onClick={() => this.setSelectedCurrency(currency)}>
                    {pairCurrencyWithSymbol(currency)}
                </li>
            )
        })
        return list;
    }

    componentDidMount() {
        this.setState({
            symbolizedCurrencies: this.generateSymbolizedCurrencyList()
        })
    }

    render() {
        return (
            <div className={`currency-selector-wrapper ${this.state.isExpanded ? "expanded" : ""}`} onClick={this.toggle}>
                <div className="currency-sign">$</div>
                <div className="currency-dropdown-toggle">
                    <img src={DropdownIcon} alt="Expand" />
                </div>
                <div className="currency-list">
                    <ul>
                        {this.state.symbolizedCurrencies}
                    </ul>
                </div>
            </div>
        )
    }
}
