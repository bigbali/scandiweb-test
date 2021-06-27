import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import devlog from '../../util/devlog';
import './GallerySelector.style.scss';

export default class GallerySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            thumbnail: this.props.gallery[0]
        }

        this.mapGalleryToHtml = this.mapGalleryToHtml.bind(this);
        this.changeThumbnail = this.changeThumbnail.bind(this);
    }

    changeThumbnail(url) {
        this.setState({
            thumbnail: url
        })
    }

    mapGalleryToHtml(gallery) {
        let mappedGallery = gallery.map((galleryItem, index) => {
            return (
                <img src={galleryItem} key={index} alt={`Gallery Item ${index}`}
                    className="gallery-item" onClick={() => this.changeThumbnail(galleryItem)} />
            )
        })

        return mappedGallery;
    }

    render() {
        return (
            <section className="gallery-wrapper">
                <div className="gallery-selector">
                    {this.mapGalleryToHtml(this.props.gallery)}
                </div>
                <div className="thumbnail-wrapper">
                    <img src={this.state.thumbnail} alt="Product Thumbnail" className="thumbnail" />
                </div>
            </section>
        )
    }
}