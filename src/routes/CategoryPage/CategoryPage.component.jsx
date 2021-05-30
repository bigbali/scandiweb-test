import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './CategoryPage.style.scss';

export default class CategoryPage extends PureComponent {
    static propTypes = {
        prop: PropTypes,
        category: PropTypes.string.isRequired
    }

    render() {
        return (
            <main>
                CategoryPage
            </main>
        )
    }
}
