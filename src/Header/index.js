import { Component } from "react";
import Sizes from "../ProductDetails/components/sizes";
import { Link } from "react-router-dom";
import Colors from "../ProductDetails/components/colors";
import mainLogo from "../assets/main-logo.svg";
import cartLogo from "../assets/cart-logo.svg";

class Header extends Component {
    handleCartClick() {
        document.getElementsByTagName('dialog')[0].showModal();
    }

    handleCategoryClick(categoryName) {
       this.props.onCategoryClick(categoryName);
    }

    getCategoryItemClasses(categoryName) {
        return `header-category-item ${this.props.selectedCategory === categoryName ? 'active' : ''}`;
    }

    getNmItemsText() {
        let text = `${this.props.selectedProducts.length} item`;

        if (this.props.selectedProducts.length > 1) {
            text += 's';
        }

        return text;
    }

    handleChangeAttribute(id, value, productIndex) {
        this.props.onChangeAttribute(id, value, productIndex);
    }

    renderAttributes(id, items, productIndex, selectedAttributes) {
        const selectedAttribute = selectedAttributes.find(attribute => attribute.id === id);

        switch(id) {
            case 'Capacity':
            case 'Size':
                return <Sizes sizes={items} attributeId={id} selectedAttribute={selectedAttribute} onHandleAttributeChange={ (id, value) => this.handleChangeAttribute(id, value, productIndex) } />
            case 'Color':
                return <Colors sizes={items} attributeId={id} selectedAttribute={selectedAttribute} onHandleAttributeChange={ (id, value) => this.handleChangeAttribute(id, value, productIndex) } />
            default:
                break;
        }
    }

    getProductImage(product) {
        if (typeof product.gallery == 'string') {
            return JSON.parse(product.gallery)[0];
        }

        return product.gallery[0];
    }

    handleQuantityClick(index, action) {
        this.props.onQuantityClick(index, action);
    }

    render() {
        return (
            <div className="header-container">
                <div className="header-categories">
                    <ul className="header-categories-list">
                        {this.props.categories.map(category => {
                            return (
                                <li
                                    className={this.getCategoryItemClasses(category.name)}
                                    onClick={(e) => this.handleCategoryClick(category.name, e)}
                                    key={category.name}
                                >
                                    { category.name.toUpperCase() }
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="main-logo-container">
                    <Link to="/">
                        <img
                            className="main-logo"
                            src={mainLogo}
                            alt=""
                        />
                    </Link>
                </div>
                <div
                    className="cart-logo-container"
                    onClick={this.handleCartClick}
                    data-testid='cart-btn'
                >
                    <img
                        className="cart-logo"
                        src={cartLogo}
                        alt=""
                    />
                </div>
                
                <dialog>
                    My bag {this.getNmItemsText()}
                    {this.props.selectedProducts.map((product, index) => {
                        return (
                            <div className="selected-item-container" key={index}>
                                <div className="selected-item-details">
                                    <div className="selected-item-name">
                                        {product.name}
                                    </div>
                                    <div className="selected-item-price">
                                        { product.prices[0].currency.symbol }{ product.prices[0].amount }
                                    </div>
                                    <div className="selected-item-attributes">
                                        {product.attributes.map((attribute, index) => {
                                            return (
                                                <div
                                                    className="product-details-attribute"
                                                    key={index}
                                                    data-testid={`product-attribute-${attribute.id}`}
                                                >
                                                    <div className="attribute-title">{ attribute.id.toUpperCase() }:</div>
                                                    {this.renderAttributes(attribute.id, attribute.items, index, product.selectedAttributes)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="quantity-container">
                                    <div className="quantity-option" onClick={ () => this.handleQuantityClick(index, 'add') }>
                                        +
                                    </div>
                                        { product.quantity }
                                    <div className="quantity-option" onClick={ () => this.handleQuantityClick(index, 'remove') }>
                                        -
                                    </div>
                                </div>
                                <img className="selected-item-image" src={this.getProductImage(product)} alt="" />
                            </div>
                        )
                    })}
                    <div className="place-order-btn">Place Order</div>
                </dialog>
            </div>
        )
    }
}

export default Header;