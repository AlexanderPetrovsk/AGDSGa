import { Component } from "react";
import { Link } from "react-router-dom";

class ProductsList extends Component {

    getProductImage(product) {
        if (typeof product.gallery == 'string') {
            return JSON.parse(product.gallery)[0];
        }

        return product.gallery[0];
    }

    render() {
        return (
            <div className="product-list-container">
                <h1>{ this.props.selectedCategory.charAt(0).toUpperCase() + this.props.selectedCategory.slice(1) }</h1>
                <div className="product-cards-container">
                    {this.props.products.map(product => {
                        return (
                            <Link to={'products/' + product.id}  key={product.id}>
                                <div className="product-card-container" data-testid={`product-${product.name}`}>
                                    <img className="product-image" src={this.getProductImage(product)} alt="" />
                                    <div className="product-name">
                                        { product.name }
                                    </div>
                                    <div className="product-price">
                                        { product.prices[0].currency.symbol }{ product.prices[0].amount }
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ProductsList;