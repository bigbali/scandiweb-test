import React, { Component } from 'react';
import './ErrorPage.style.scss';

export default class ErrorPage extends Component {
    render() {
        return (
            <main className="error-page">
                <div>
                    <h1>{this.props.message}</h1>
                    <h3>Status code: <br /> {this.props.statusCode}</h3>
                    <p>{this.props.children}</p>
                </div>
            </main>
        )
    }
}
