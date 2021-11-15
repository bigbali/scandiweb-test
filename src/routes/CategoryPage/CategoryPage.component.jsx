import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../queries';
import actions from '../../redux/actions';
import ProductCard from '../../components/ProductCard';
import MissingPage from '../MissingPage';
import './CategoryPage.style.scss';

class CategoryPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            products: null
        };
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
        const category = this.props.match.params.category;
        this.props.selectCategory(category);

        fetchProducts(category).then(response => {
            if (response) {
                this.setState({
                    products: response.data.category
                })
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const category = this.props.match.params.category;

        // If props have changed, refetch
        // but only if requested category has changed (to prevent double fetching)
        if (category !== prevProps.match.params.category) {
            this.props.selectCategory(category);
            fetchProducts(category).then(response => {
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