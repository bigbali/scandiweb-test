import React, { PureComponent } from 'react'
import CategorySelector from '../CategorySelector';
import HeaderActions from '../HeaderActions';
import Logo from '../Logo/Logo.component';
import './Header.style.scss';

export default class Header extends PureComponent {
    render() {
        return (
            <header>
                <CategorySelector />
                <Logo />
                <HeaderActions />
            </header>
        )
    }
}
