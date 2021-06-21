import React, { PureComponent } from 'react';
import DropdownIcon from '../../media/svg/dropdown.svg';
import './CurrencySelector.style.scss';
import { getSafeSymbol, pairWithSymbol } from './../../util/dataProcessor';
import devlog from '../../util/devlog';

export default class CurrencySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            selectedCurrency: null,
            selectedSymbol: null,
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

    // When currency is clicked on, we set that currency to state
    setSelectedCurrency(currency) {
        this.setState({
            selectedCurrency: currency,
            selectedSymbol: getSafeSymbol(currency),
        }, () => {
            devlog(`Selected currency: ${this.state.selectedCurrency}.`);
        })
    }

    // Generate HTML list containing currencies paired with their respective symbols
    generateSymbolizedCurrencyList() {
        const list = this.props.currencies.map((currency, index) => {
            return (
                // When list tag is clicked on, set selectedCurrency to corresponding currency
                <li key={index} onClick={() => this.setSelectedCurrency(currency)}>
                    {pairWithSymbol(currency)}
                </li>
            )
        })
        return list;
    }

    componentDidMount() {
        const initialCurrency = this.props.currencies[0];

        this.setState({
            selectedCurrency: initialCurrency,
            selectedSymbol: getSafeSymbol(initialCurrency),
            symbolizedCurrencies: this.generateSymbolizedCurrencyList()
        })
    }

    render() {
        return (
            <div className={`currency-selector-wrapper ${this.state.isExpanded ? "expanded" : ""}`} onClick={this.toggle}>
                <div className="currency-sign">
                    {this.state.selectedSymbol}
                </div>
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
