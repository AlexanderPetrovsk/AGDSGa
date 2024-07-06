import { Component } from "react";
import data from "../data.json";
import Sizes from "./components/sizes";
import Colors from "./components/colors";
import { toKebabCase } from "../services/common";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: data.data.products.find(item => item.id === window.location.href.split('/')[4]),
            currentPhoto: 0,
            selectedAttributes: []
        }

        this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }
    
    handleSelectPhoto(id) {
        this.setState({
            currentPhoto: id
        });
    }

    handleNextPhotoClick = (event) => {
        if (this.state.currentPhoto >= this.state.product.gallery.length - 1) {
            this.setState({
                currentPhoto: 0
            });

            return;
        }

        this.setState((state) => ({
            currentPhoto: state.currentPhoto + 1
        }));
    }

    handlePrevPhotoClick = (event) => {
        if (this.state.currentPhoto <= 0) {
            this.setState((state) => ({
                currentPhoto:  state.product.gallery.length - 1
            }));

            return;
        }

        this.setState((state) => ({
            currentPhoto: state.currentPhoto - 1
        }));
    }

    renderAttributes(id, items) {
        switch(id) {
            case 'Capacity':
            case 'Size':
                return <Sizes
                    sizes={items}
                    attributeId={id}
                    usedIn="details"
                    onHandleAttributeChange={this.handleChangeAttribute}
                />
            case 'Color':
                return <Colors
                    sizes={items}
                    attributeId={id}
                    usedIn="details"
                    onHandleAttributeChange={this.handleChangeAttribute}
                />
            default:
                break;
        }
    }

    getGalleryImageClasses(index) {
        return `product-gallery-image ${index === this.state.currentPhoto ? 'active-image' : ''}`;
    }

    descriptionParser() {
        document.querySelector('.product-details-description').innerHTML = this.state.product.description;
    }

    handleAddToCart() {
        document.getElementsByTagName('dialog')[0].showModal();
        this.props.onAddToCart(this.state.product, this.state.selectedAttributes);
    }

    handleChangeAttribute(attributeId, value) {
        const selectedAttributes = [...this.state.selectedAttributes];
        const existingAttribute = selectedAttributes.findIndex(attribute => attribute.id === attributeId);

        if (existingAttribute >= 0) {
            selectedAttributes.splice(existingAttribute, 1);
        }

        selectedAttributes.push({
            id: attributeId,
            value
        });

        this.setState({
            selectedAttributes
        });
    }

    componentDidMount() {
        this.descriptionParser();
    }
    render() {
        return (
            <div className="product-details-container">
                <div className="product-gallery-list" data-testid='product-gallery'>
                    {this.state.product.gallery.map((image, index) => {
                        return (
                            <div key={index}>
                                <img
                                    className={this.getGalleryImageClasses(index)}
                                    src={image}
                                    onClick={() => this.handleSelectPhoto(index)}
                                    alt=""
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="product-details-card-container">
                    <div className="product-details-image-container">
                        <div className="prev-arrow-back">
                            <img src={leftArrow} alt="" onClick={this.handlePrevPhotoClick} />
                        </div>
                        <img className="product-details-image" src={this.state.product.gallery[this.state.currentPhoto]} alt="" />
                        <div className="next-arrow-back">
                            <img src={rightArrow} alt="" onClick={this.handleNextPhotoClick} />
                        </div>
                    </div>
                    <div className="product-details-choices">
                        <h2>{ this.state.product.name }</h2>
                        <div className="product-details-attributes">
                            {this.state.product.attributes.map((attribute, index) => {
                                return (
                                    <div
                                        className="product-details-attribute"
                                        key={index}
                                        data-testid={`product-attribute-${toKebabCase(attribute.id)}`}
                                    >
                                        <div className="attribute-title">{ attribute.id.toUpperCase() }:</div>
                                        {this.renderAttributes(attribute.id, attribute.items)}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="product-details-prices-container">
                            <div className="attribute-title">PRICE:</div>
                            <div className="product-details-price">
                                { this.state.product.prices[0].currency.symbol }{ this.state.product.prices[0].amount }
                            </div>
                        </div>
                        <button
                            className="product-details-add-button"
                            data-testid='add-to-cart'
                            onClick={() => this.handleAddToCart() }
                            disabled={!this.state.product.inStock && this.state.selectedAttributes.length !== this.state.product.attributes.length}
                        >
                            ADD TO CART
                        </button>
                        <div className="product-details-description" data-testid='product-description'>
                            { this.state.product.description }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;