import { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../../media/svg/sync-solid.svg';
import './LoadingSpinner.style.scss'

class LoadingSpinner extends Component {
    render() {
        return (
            <div className={`spinner-wrapper ${this.props.isLoading ? "spinner-active" : ""}`}>
                <div className="spinner">
                    <img src={Spinner} alt="Please wait..." />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, null)(LoadingSpinner);

