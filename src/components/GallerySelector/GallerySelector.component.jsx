import React, { PureComponent } from 'react';
import FallbackImage from '../../media/jpg/no-image.jpg';
import './GallerySelector.style.scss';

export default class GallerySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            thumbnail: this.props.gallery[0]
        }

        this.getGalleryItems = this.getGalleryItems.bind(this);
        this.changeThumbnail = this.changeThumbnail.bind(this);
    }

    changeThumbnail(url) {
        this.setState({
            thumbnail: url
        })
    }

    getGalleryItems(gallery) {
        return (
            gallery.map((galleryItem, index) => {
                return (
                    <img
                        key={index}
                        src={galleryItem}
                        alt={`Gallery Item ${index}`}
                        className="gallery-item"
                        onClick={() => this.changeThumbnail(galleryItem)}
                        onError={(e) => { // When image fails to load, show fallback
                            e.target.src = FallbackImage;
                            e.target.classList.add("fallback");
                        }}
                    />
                )
            })
        )
    }

    render() {
        return (
            <section className="gallery-wrapper">
                <div className="gallery-selector">
                    {this.getGalleryItems(this.props.gallery)}
                </div>
                <div className="thumbnail-wrapper">
                    <img
                        src={this.state.thumbnail}
                        alt="Product Thumbnail"
                        className="thumbnail"
                        onError={(e) => {
                            e.target.src = FallbackImage;
                        }}
                    />
                </div>
            </section>
        )
    }
}