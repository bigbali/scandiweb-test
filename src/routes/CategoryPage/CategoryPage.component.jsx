import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import ErrorPage from '../MissingPage';
import ProductCard from '../../components/ProductCard';
import * as status from '../../globals/statuscodes';
import './CategoryPage.style.scss';
import { fetchProducts } from '../../queries/queries';
import devlog from '../../util/devlog';
import { setErrorStatus } from '../../util/dataProcessor';
import * as actionsTypes from '../../redux/actions/types';
import MissingPage from '../MissingPage';
import store from '../../redux/store';
import actions from '../../redux/actions';

class CategoryPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            products: null
        };
    }

    fetchData = async () => {
        return await fetchProducts(this.props.match.params.category);
    }

    getProductCards = (category) => {
        return category.products.map(product => {
            return (
                <ProductCard
                    key={product.id}
                    product={product}
                    className="product-card"
                />
            )
        })
    }

    componentDidMount() {
        // Select category on initial load, because it makes life easier
        // for CategorySelector component
        this.props.selectCategory(this.props.match.params.category);
        this.fetchData().then(response => {
            if (response) {
                this.setState({
                    products: response.data.category
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // If props have changed, refetch
        // but only if requested category has changed (to prevent double fetching)
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.fetchData().then(response => {
                if (response) {
                    this.setState({
                        products: response.data.category
                    })
                }
            })
        }
    }

    render() {
        if (this.state.products) {
            return (
                <main className="category-page">
                    <h1>
                        {this.props.match.params.category}
                    </h1>
                    <div className="product-area">
                        {this.getProductCards(this.state.products)}
                    </div>
                </main>
            )
        }

        return <MissingPage />
    }
}

const mapDispatchToProps = () => {
    return {
        selectCategory: actions.selectCategory
    }
}

export default connect(null, mapDispatchToProps())(withRouter(CategoryPage))