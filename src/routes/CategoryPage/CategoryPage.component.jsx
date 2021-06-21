import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom';
import { STATUS_404 } from './../../globals/statuscodes';


import ErrorPage from '../ErrorPage';
import './CategoryPage.style.scss';
import devlog from '../../util/devlog';
import ProductCard from '../../components/ProductCard';
//import { DataContext } from './../../contexts/DataContext';
import { connect, useSelector } from 'react-redux';
import actions from '../../redux/actions';


class CategoryPage extends PureComponent {
    //static contextType = DataContext;

    constructor(props) {
        super(props);

        this.state = {
            isolatedProducts: [],
            isolateFunction: this.isolateByCategory.bind(this)
        }

        this.isolateByCategory = this.isolateByCategory.bind(this);
        this.getProductCards = this.getProductCards.bind(this);
    }


    // If product category matches URL category parameter, store it separately
    // so we only display products of selected category
    isolateByCategory(props) {
        let isolatedProducts = [];

        props.products.all.forEach(product => {
            if (product.category === props.match.params.category) {
                isolatedProducts.push(product);
            }
        })

        return isolatedProducts;
    }

    // this.props.match.params.category wouldn't update on first category change
    // (when I select new category, URL updates, but props don't change until I click it again)
    // I don't get why that happens, but getDerivedStateFromProps gets props properly

    getProductCards() {
        return this.state.isolatedProducts.map((product, index) => {
            return (
                <ProductCard key={index} product={product} className="product-card" />
            )
        })
    }

    componentDidMount() {
        console.log("setCategories");
        this.props.setCategories("anyád picsája");
    }

    // On initial render, we have no products
    // So we set state when we get new props
    static getDerivedStateFromProps(props, state) {
        devlog("CategoryPage received new props.");
        return { isolatedProducts: state.isolateFunction(props) };
    }

    render() {
        // Check if category is in categories list, and if not, return an error page.
        // Else, continue.
        const categoryName = this.props.match.params.category;

        if (!this.props.categories.all.includes(categoryName)) {
            return <ErrorPage message="Category not found." statusCode={STATUS_404}>We couldn't find the requested category.</ErrorPage>
        }

        return (
            <main className="category-page">
                <h1>
                    {categoryName}
                </h1>
                <div className="product-area">
                    {this.getProductCards()}
                    {console.log(this.context)}
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = () => {
    return { ...actions }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(CategoryPage));