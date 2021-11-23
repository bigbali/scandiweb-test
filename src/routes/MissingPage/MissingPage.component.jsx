import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import './MissingPage.style.scss';

class MissingPage extends Component {
    componentDidMount() {
        // If user navigates to a nonexistent page,
        // there is no category. Therefore, we select none.
        this.props.selectCategory(null);
    }

    render() {
        return (
            <main className="missing-page">
                <div>
                    <h1>
                        It appears this path leads nowhere.
                    </h1>
                    <p>
                        We are sorry, but this page doesn't exist.
                    </p>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }
}

const mapDispatchToProps = () => {
    return {
        selectCategory: actions.selectCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
    (MissingPage)
