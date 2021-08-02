import React, { Component } from 'react';
import './Button.style.scss';

export default class Button extends Component {
    render() {
        return (
            <button className={`button ${this.props.appendToclassName}`} onClick={this.props.onClick} disabled={this.props.disabled}>
                {this.props.text}
            </button>
        )
    }
}
