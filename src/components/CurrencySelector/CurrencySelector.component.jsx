import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getSymbol, pairWithSymbol } from './../../util/dataProcessor';
import actions from '../../redux/actions';
import devlog from '../../util/devlog';
import DropdownIcon from '../../media/svg/dropdown.svg';
import './CurrencySelector.style.scss';

class CurrencySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        this.setSelectedCurrency = this.setSelectedCurrency.bind(this);
        this.mapCurrenciesToHtml = this.mapCurrenciesToHtml.bind(this);
    }

    toggleExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    setExpanded(isExpanded) {
        this.setState({
            isExpanded: isExpanded
        });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setExpanded(false);
        }
    }

    // When clicked on, set selected currency to whichever currency we clicked on
    setSelectedCurrency(currency) {
        this.props.selectCurrency(currency);
        devlog(`Selected currency: ${currency}.`);
    }

    // Generate HTML list containing currencies paired with their respective symbols
    mapCurrenciesToHtml() {
        const list = this.props.currencies.all.map((currency, index) => {
            return (
                <li key={currency}
                    className={`
                        ${this.props.currencies.selected === currency
                            ? "selected"
                            : ""}
                        `}
                    onClick={() => this.setSelectedCurrency(currency)}>
                    {pairWithSymbol(currency)}
                </li>
            )
        })
        return list;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        return (
            <div ref={this.setWrapperRef}
                onClick={this.toggleExpanded}
                className={`currency-selector-wrapper
                    ${this.state.isExpanded
                        ? "expanded"
                        : ""}`}>
                <div className="currency-sign">
                    {getSymbol(this.props.currencies.selected)}
                </div>
                <div className="currency-dropdown-toggle">
                    <img src={DropdownIcon} alt="Expand" />
                </div>
                <div className="currency-list">
                    <ul>
                        {this.mapCurrenciesToHtml()}
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

export default connect(mapStateToProps, mapDispatchToProps())
    (CurrencySelector);
