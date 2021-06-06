import React, { PureComponent } from 'react'
import { useParams, withRouter } from 'react-router-dom';
import { STATUS_404 } from './../../globals/statuscodes';


import ErrorPage from '../ErrorPage';
import './CategoryPage.style.scss';

class CategoryPage extends PureComponent {
    render() {
        const { category } = this.props.match.params;
        if (!this.props.categories.includes(category)) {
            return <ErrorPage message="Category not found." statusCode={STATUS_404}>We couldn't find the requested category.</ErrorPage>
        }
        return (
            <main>
                CategoryPage
                {category}
            </main>
        )
    }
}
export default withRouter(CategoryPage);
