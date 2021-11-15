import React, { Component } from 'react';
import './Button.style.scss';

export default class Button extends Component {
    render() {
        return (
            <button
                className={`button 
                    ${this.props.className
                        ? this.props.className
                        : ""
                    }`}
                style={this.props.style}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        )
    }
}
