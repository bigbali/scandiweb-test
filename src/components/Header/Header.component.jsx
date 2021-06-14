import React, { Component } from 'react'
import CategorySelector from '../CategorySelector';
import HeaderActions from '../HeaderActions';
import Logo from '../Logo/Logo.component';

import './Header.style.scss';
import devlog from './../../util/devlog';

export default class Header extends Component {
    render() {
        return (
            <header>
                <CategorySelector categories={this.props.categories} />
                <Logo />
                <HeaderActions currencies={this.props.currencies} />
            </header>
        )
    }
}
