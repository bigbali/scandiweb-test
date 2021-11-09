import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as status from '../../globals/statuscodes';
import devlog from '../../util/devlog';
import './ErrorOverlay.style.scss';

class ErrorOverlay extends PureComponent {
    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this);
    }

    getContent() {
        let message;
        let description;

        switch (this.props.status) {
            case status.STATUS_API_OFFLINE:
                message = "We are deeply sorry, but we couldn't fetch data.";
                description = "This means our data source is probably offline. Please, try again later!";
                break
            case status.STATUS_DATA_EMPTY:
                message = "We are deeply sorry, but we got empty data.";
                description = "This means that for some reason our data source sent us empty data.";
                break
            case status.STATUS_DATA_CORRUPTED:
                message = "We are deeply sorry, but our data appears to be corrupted.";
                description = "This means our data is unusable, therefore we can't process it.";
                break
            case status.STATUS_FAILED_TO_FETCH_CATEGORIES:
                message = "NO CATEGORIES";
                description = "";
                break
            case status.STATUS_FAILED_TO_FETCH_PRODUCTS:
                message = "NO PRODUCTS";
                description = "";
                break
            case status.STATUS_FAILED_TO_FETCH_CURRENCIES:
                message = "NO CURRENCIES";
                description = "";
                break
            default:
                // In theory, this should never get triggered,
                // therefore it can only be my fault if it does
                message = "Everything is fine.";
                description = "This is not an error. If you see this, it's the developer's fault!";
                break
        }

        return {
            message,
            description
        }
    }

    render() {
        const content = this.getContent();

        return (
            <div className={`error-overlay
                ${this.props.status !== status.STATUS_OK
                    ? "expanded"
                    : ""}`}>
                <div>
                    <h1>
                        {content.message}
                    </h1>
                    <p>
                        {content.description}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }
}

export default connect(mapStateToProps, null)(ErrorOverlay)
