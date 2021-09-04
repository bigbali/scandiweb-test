import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GallerySelector from '../../components/GallerySelector';
import ProductActions from '../../components/ProductActions';
import actions from '../../redux/actions';
import devlog from '../../util/devlog';
import getProductById from '../../util/getProductById';
import './ProductPage.style.scss';

class ProductPage extends PureComponent {
    product = null;

    /*
        This 'selectCategory()' stuff doesn't let 404 pages through.
        Would take long to fix it, plus I'm barely keeping my eyes open as of writing.
        If you read this, that means it hasn't been fixed.
    */

    componentDidMount() {
        // This is in order to stop funny stuff from happening when you select a product,
        // then reload, then select another category (we would have a selected category,
        // and a different 'keep-alive' category ('keep-alive': see 'CategorySelector' component)).
        this.props.selectCategory(this.product.category);

        devlog(`Loaded product [${this.product.name}] with ID: ${this.product.id}`)
    }

    render() {
        // It is done this way so 'componentDidMount' can use this as well
        this.product = getProductById(this.props.products.selected);

        return (
            <main className="product-page">
                <GallerySelector gallery={this.product.gallery} />
                <ProductActions product={this.product} />
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
