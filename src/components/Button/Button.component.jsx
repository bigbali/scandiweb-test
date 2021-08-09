import React, { Component } from 'react';
import './Button.style.scss';

export default class Button extends Component {
    render() {
        const classAppendage = this.props.className;

        return (
            <button className={`button ${classAppendage ? classAppendage : ""}`} style={this.props.style}
                onClick={this.props.onClick} disabled={this.props.disabled}>
                {this.props.children}
            </button>
        )
    }
}
