import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../media/svg/logo.svg';
import './Logo.style.scss';

export default class Logo extends Component {
    render() {
        return (
            <Link to="/">
                <div className="logo-wrapper">
                    <img
                        className="logo"
                        src={logo}
                        alt="Logo"
                    />
                </div>
            </Link>
        )
    }
}
