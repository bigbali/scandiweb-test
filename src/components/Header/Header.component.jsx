import React, { Component } from 'react'
import CategorySelector from './CategorySelector/CategorySelector.component';
//import { NavLink } from 'react-router-dom';

import './Header.style.scss';

export default class Header extends Component {

    render() {
        return (
            <header>
                <CategorySelector categories={this.props.categories} />
            </header>
        )
    }
}
