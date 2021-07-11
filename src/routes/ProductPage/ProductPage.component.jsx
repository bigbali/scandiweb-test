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

    getProductById() {
        const products = this.props.products;
        let identifiedProduct;

        products.all.forEach(product => {
            if (product.id === products.selected) {
                identifiedProduct = product;
            }
        })

        devlog(`Selected product [${identifiedProduct.name}] with ID: ${identifiedProduct.id}`)
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
