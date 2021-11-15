import React, { PureComponent } from 'react';
import FallbackImage from '../../media/jpg/no-image.jpg';
import './ProductGallery.style.scss';

class GalleryImages extends PureComponent {
    render() {
        return (
            this.props.gallery.map((galleryItem, index) => {
                return (
                    <img
                        key={index}
                        src={galleryItem}
                        alt={`Gallery Item ${index}`}
                        className="gallery-item"
                        onClick={() => this.props.selectThumbnail(galleryItem)}
                        onError={(e) => { // When image fails to load, show fallback
                            e.target.src = FallbackImage;
                            e.target.classList.add("fallback");
                        }}
                    />
                )
            })
        )
    }
}

export default class ProductGallery extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            thumbnail: this.props.gallery[0]
        }

        this.selectThumbnail = this.selectThumbnail.bind(this);
    }

    selectThumbnail(url) {
        this.setState({
            thumbnail: url
        })
    }

    render() {
        return (
            <section className="product-gallery">
                <div className="gallery-selector">
                    <GalleryImages
                        gallery={this.props.gallery}
                        selectThumbnail={this.selectThumbnail}
                    />
                </div>
                <div className="thumbnail">
                    <img
                        src={this.state.thumbnail}
                        alt="Product Thumbnail"
                        onError={(e) => {
                            e.target.src = FallbackImage;
                        }}
                    />
                </div>
            </section>
        )
    }
}