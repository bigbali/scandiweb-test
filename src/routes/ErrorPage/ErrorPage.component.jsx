import React, { Component } from 'react';
import * as status from '../../globals/statuscodes';
import './ErrorPage.style.scss';

let errorMessage;
let errorDescription;

export default class ErrorPage extends Component {
    constructor(props) {
        super(props);

        this.mapStatusToContent = this.mapStatusToContent.bind(this);
    }

    mapStatusToContent() {
        switch (this.props.status) {
            case status.STATUS_API_OFFLINE:
                errorMessage = "We couldn't get data necessary to populate this page.";
                errorDescription = "This probably means our API endpoint is offline. We are deeply sorry!";
                break;
            case status.STATUS_DATA_EMPTY:
                errorMessage = "The data necessary to operate this page is empty.";
                errorDescription = "This means our API endpoint responded with empty data. We are deeply sorry!";
                break;
            case status.STATUS_DATA_CORRUPTED:
                errorMessage = "We couldn't extract data necessary to populate this page.";
                errorDescription = "This means there's something wrong with our data. We are deeply sorry!";
                break;
            case status.STATUS_NOT_FOUND:
                errorMessage = "The page you are looking for does not exist.";
                errorDescription = "Perhaps try looking elsewhere, eh?";
                break;
            default:
                // In theory, this should never get triggered
                errorMessage = "Everything is fine.";
                errorDescription = "This is not an error. It's your imagination (probably).";
                break;
        }
    }

    componentDidMount() {
        this.mapStatusToContent();
    }

    render() {
        return (
            <main className="error-page">
                <div>
                    <h1>
                        {errorMessage}
                    </h1>
                    <h4>
                        {errorDescription}
                    </h4>
                </div>
            </main>
        )
    }
}
