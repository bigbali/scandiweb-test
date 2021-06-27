import React, { PureComponent } from 'react';
import DropdownIcon from '../../media/svg/dropdown.svg';
import './CurrencySelector.style.scss';
import { getSafeSymbol, pairWithSymbol } from './../../util/dataProcessor';
import devlog from '../../util/devlog';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class CurrencySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
        }

        this.toggle = this.toggle.bind(this);
        this.setSelectedCurrency = this.setSelectedCurrency.bind(this);
        this.generateSymbolizedCurrencyList = this.generateSymbolizedCurrencyList.bind(this);
    }

    toggle() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        }, () => {
            //devlog(`CurrencySelector is ${this.state.isExpanded ? "expanded" : "closed"}.`);
        });
    }

    // When clicked on, set selected currency to whichever currency we clicked on
    setSelectedCurrency(currency) {
        this.props.selectCurrency(currency);
        devlog(`Selected currency: ${currency}.`);
    }

    // Generate HTML list containing currencies paired with their respective symbols
    generateSymbolizedCurrencyList() {
        const list = this.props.currencies.all.map((currency, index) => {
            return (
                <li key={index} onClick={() => this.setSelectedCurrency(currency)}>
                    {pairWithSymbol(currency)}
                </li>
            )
        })
        return list;
    }

    render() {
        return (
            <div className={`currency-selector-wrapper ${this.state.isExpanded ? "expanded" : ""}`} onClick={this.toggle}>
                <div className="currency-sign">
                    {getSafeSymbol(this.props.currencies.selected)}
                </div>
                <div className="currency-dropdown-toggle">
                    <img src={DropdownIcon} alt="Expand" />
                </div>
                <div className="currency-list">
                    <ul>
                        {this.generateSymbolizedCurrencyList()}
                    </ul>
                </div>
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
    return {
        selectCurrency: actions.selectCurrency
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(CurrencySelector);
