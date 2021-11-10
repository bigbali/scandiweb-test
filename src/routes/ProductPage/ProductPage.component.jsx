import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GallerySelector from '../../components/GallerySelector';
import ProductActions from '../../components/ProductActions';
import { fetchProduct } from '../../queries';
import actions from '../../redux/actions';
import devlog from '../../util/devlog';
import getProductById from '../../util/getProductById';
import MissingPage from '../MissingPage';
import './ProductPage.style.scss';

class ProductPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            product: null
        }
    }

    fetchProduct = async () => {
        fetchProduct(this.props.match.params.product)
            .then(response => {
                if (response) {
                    this.setState({
                        product: response.data.product
                    })
                }
            });
    }

    componentDidMount() {
        this.fetchProduct();
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
                    <GallerySelector gallery={this.state.product.gallery} />
                    <ProductActions product={this.state.product} />
                </main>
            )
        }

        return <MissingPage />
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = () => {
    return {
        selectCategory: actions.selectCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(ProductPage);
