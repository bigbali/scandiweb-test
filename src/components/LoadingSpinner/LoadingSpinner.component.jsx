import React, { Component } from 'react'

import Spinner from '../../media/svg/sync-solid.svg';
import './LoadingSpinner.style.scss'

export default class LoadingSpinner extends Component {
    render() {
        return (
            <div className={`spinner-wrapper ${this.props.active ? "spinner-active" : ""}`}>
                <div className="spinner">
                    <img src={Spinner} alt="Please wait..." />
                </div>
            </div>
        )
    }
}
