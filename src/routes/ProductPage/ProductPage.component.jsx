import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GallerySelector from '../../components/GallerySelector';
import ProductActions from '../../components/ProductActions';
import devlog from '../../util/devlog';
import './ProductPage.style.scss';

let product;

class ProductPage extends PureComponent {
    constructor(props) {
        super(props);

        this.getProductById = this.getProductById.bind(this);
        this.mapGalleryToHtml = this.mapGalleryToHtml.bind(this);
        this.changeThumbnail = this.changeThumbnail.bind(this);
    }

    // TODO: make thumbnail and selector separate component with state

    getProductById() {
        const products = this.props.products;
        let identifiedProduct;

        products.all.forEach(product => {
            if (product.id === products.selected) {
                identifiedProduct = product;
            }
        })

        devlog(`Selected product with ID: ${products.selected}`)
        return identifiedProduct;
    }

    changeThumbnail(url) {
        document.querySelector(".product-image").src = url;
    }

    mapGalleryToHtml() {
        let gallery = product.gallery.map((galleryItem, index) => {
            return (
                <img src={galleryItem} key={index} alt={`Gallery Item ${index}`}
                    className="gallery-item" onClick={() => this.changeThumbnail(galleryItem)} />
            )
        })

        return gallery;
    }

    render() {
        // I was setting this in 'componentDidMount()' and was wondering why it's undefined :| (I know why, no worries)
        product = this.getProductById();

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

export default connect(mapStateToProps, null)(ProductPage);
