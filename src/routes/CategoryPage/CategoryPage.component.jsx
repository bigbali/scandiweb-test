import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorPage from '../ErrorPage';
import ProductCard from '../../components/ProductCard';
import * as status from '../../globals/statuscodes';
import './CategoryPage.style.scss';
import { fetchProducts } from '../../queries/queries';
import devlog from '../../util/devlog';
import { setErrorStatus } from '../../util/dataProcessor';
import * as actionsTypes from '../../redux/actions/types';

class CategoryPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            category: null
        };

        this.category = this.props.match.params.category;
    }

    fetchData = async () => {
        const products = await fetchProducts(this.category)
            .catch(error => {
                setErrorStatus(actionsTypes.STATUS_API_OFFLINE)
                devlog("haloalo")
            })

        return products
    }

    getProductCards = (category) => {
        return category.products.map(product => {
            return (
                <ProductCard key={product.id}
                    product={product}
                    className="product-card"
                />
            )
        })
    }


    componentDidMount() {
        this.fetchData().then(response => {
            this.setState({
                category: response.data.category
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        this.category = this.props.match.params.category;

        // Check if selected category has changed, 
        // and if so, fetch new data.
        if (
            prevProps.match.params.category
            !== this.category
        ) {
            this.fetchData().then(response => {
                this.setState({
                    category: response.data.category
                });
            });
        }
    }

    render() {
        const categoryData = this.state.category;

        if (categoryData && this.props.status === "OK") {
            return (
                <main className="category-page">
                    <h1>
                        {this.category}
                    </h1>
                    <div className="product-area">
                        {this.getProductCards(categoryData)}
                    </div>
                </main>
            )
        }
        else if (this.props.status !== "OK") {
            return <ErrorPage />
        }
        else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        status: state.status
    }
}

export default connect(mapStateToProps, null)(withRouter(CategoryPage))