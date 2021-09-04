import React, { PureComponent } from 'react';
import Minicart from '../Minicart';
import CurrencySelector from '../CurrencySelector/CurrencySelector.component';
import './HeaderActions.style.scss';

export default class HeaderActions extends PureComponent {
    render() {
        return (
            <div className="header-actions-wrapper">
                <CurrencySelector />
                <Minicart />
            </div>
        )
    }
}
