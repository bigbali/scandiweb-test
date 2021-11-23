import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../queries';
import actions from '../../redux/actions';
import ProductGallery from '../../components/ProductGallery';
import ProductActions from '../../components/ProductActions';
import MissingPage from '../MissingPage';
import './ProductPage.style.scss';

class ProductPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            product: null
        }
    }

    componentDidMount() {
        fetchProduct(this.props.match.params.product).then(response => {
            if (response) {
                this.setState({
                    product: response.data.product
                })
            }
        });;
    }

    componentDidUpdate() {
        /*  
            When product page has product data, set category to that of product.
            This prevents having wrong category highlighted
            when user navigates products through url, for example.
        */
        if (this.state.product) {
            this.props.selectCategory(this.state.product.category);
        }
    }

    render() {
        if (this.state.product) {
            return (
                <main className="product-page">
                    <ProductGallery
                        gallery={this.state.product.gallery}
                        inStock={this.state.product.inStock} />
                    <ProductActions product={this.state.product} />
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

export default connect(null, mapDispatchToProps())(ProductPage);
