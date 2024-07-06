import { Component } from "react";
import { Link } from "react-router-dom";
import addToCart from "../assets/add-to-cart.svg";

class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCartButton: false,
            currentProduct: null,
        }

        this.handleCardHover = this.handleCardHover.bind(this);
    }

    getProductImage(product) {
        if (typeof product.gallery == 'string') {
            return JSON.parse(product.gallery)[0];
        }

        return product.gallery[0];
    }

    handleCardHover(showCartButton, index) {
        this.setState({
            showCartButton,
            currentProduct: index
        });
    }

    getCartButton(product, index) {
        if (
            this.state.showCartButton
            && this.state.currentProduct === index
            && parseInt(product.inStock)
        ) {
            return (
                <img
                    className="add-to-cart-btn"
                    src={addToCart}
                    alt=""
                    onClick={(e) => { this.handleCartButtonClick(product, e) }}
                />
            );
        }
    }

    handleCartButtonClick(product, e) {
        e.preventDefault();
        this.props.onCartButtonClick(product);
    }

    render() {
        return (
            <div className="product-list-container">
                <h1>{ this.props.selectedCategory.charAt(0).toUpperCase() + this.props.selectedCategory.slice(1) }</h1>
                <div className="product-cards-container">
                    {this.props.products.map((product, index) => {
                        return (
                            <Link to={'products/' + product.id}  key={product.id}>
                                <div
                                    className="product-card-container"
                                    data-testid={`product-${product.name}`}
                                    onMouseEnter={() => this.handleCardHover(true, index)}
                                    onMouseLeave={() => this.handleCardHover(false, index)}
                                >
                                    <img className={`product-image ${!parseInt(product.inStock) ? 'out-of-stock' : ''}`} src={this.getProductImage(product)} alt="" />
                                    { !parseInt(product.inStock) ? <div className="centered">OUT OF STOCK</div> : ''}
                                    { this.getCartButton(product, index) }
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