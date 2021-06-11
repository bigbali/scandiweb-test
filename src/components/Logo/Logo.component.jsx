import React, { Component } from 'react'
import logo from '../../media/svg/logo.svg';

import './Logo.style.scss';

export default class Logo extends Component {
    render() {
        return (
            <div className="logo-wrapper">
                <img className="logo" src={logo} alt="Logo" />
            </div>
        )
    }
}
