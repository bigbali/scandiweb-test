import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GallerySelector from '../../components/GallerySelector';
import ProductActions from '../../components/ProductActions';
import actions from '../../redux/actions';
import devlog from '../../util/devlog';
import getProductById from '../../util/getProductById';
import './ProductPage.style.scss';

class ProductPage extends PureComponent {

    componentDidMount() {
        const product = getProductById(this.props.products.selected);

        // This is in order to stop funny stuff from happening when you select a product,
        // then reload, then select another category (we would have a selected category,
        // and a different 'keep-alive' category ('keep-alive': see 'CategorySelector')).
        this.props.selectCategory(product.category);

        devlog(`Loaded product [${product.name}] with ID: ${product.id}`)
    }

    render() {
        const product = getProductById(this.props.products.selected);

        return (
            <main className="product-page">
                <GallerySelector gallery={product.gallery} />
                <ProductActions product={product} />
            </main>
        )
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
