import React, { Component } from 'react';
import './Button.style.scss';

export default class Button extends Component {
    render() {
        return (
            <button className="button" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        )
    }
}
