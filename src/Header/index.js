import { Component } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/main-logo.svg";
import cartLogo from "../assets/cart-logo.svg";
import Sizes from "../ProductDetails/components/sizes";
import Colors from "../ProductDetails/components/colors";
import { toKebabCase } from "../services/common";

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

        if (this.props.selectedProducts.length !== 1) {
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
                return <Sizes
                    sizes={items}
                    attributeId={id}
                    selectedAttribute={selectedAttribute}
                    usedIn="cart"
                    onHandleAttributeChange={ (id, value) => this.handleChangeAttribute(id, value, productIndex) }
                />
            case 'Color':
                return <Colors
                    sizes={items}
                    attributeId={id}
                    selectedAttribute={selectedAttribute}
                    usedIn="cart"
                    onHandleAttributeChange={ (id, value) => this.handleChangeAttribute(id, value, productIndex) }
                />
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

    cartTotal() {
        let total = 0;

        this.props.selectedProducts.forEach(product => {
            total = parseFloat(total) + parseFloat(product.prices[0].amount);
        });

        return total.toFixed(2);
    }

    componentDidMount() {
        const dialog = document.getElementsByTagName('dialog')[0];
        const parent = document.getElementById('my-div');
        
        dialog.addEventListener('click', (event) => {
            if (!parent.contains(event.target)) {
                dialog.close();
            }
        });
    }
    render() {
        return (
            <div className="header-container">
                <div className="header-categories">
                    <ul className="header-categories-list">
                        {['all', 'tech', 'clothes'].map(category => {
                            return (
                                <Link to={category}
                                    className={this.getCategoryItemClasses(category)}
                                    onClick={(e) => this.handleCategoryClick(category, e)}
                                    key={category}
                                    data-testid={`${this.props.selectedCategory === category ? 'active-' : ''}category-link`}
                                >
                                    { category.toUpperCase() }
                                </Link>
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
                    {this.props.selectedProducts.length > 0 ? <span className="bubble-count" data-testid="cart-count-bubble">{this.props.selectedProducts.length}</span> : ''}
                </div>
                
                <dialog >
                    <div className="cart-overlay" data-testid='cart-overlay' id="my-div">
                        My bag {this.getNmItemsText()}
                        {this.props.selectedProducts.map((product, index) => {
                            return (
                                <div className="selected-item-container" key={index}>
                                    <div className="selected-item-details">
                                        <div className="selected-item-name">
                                            {product.name}
                                        </div>
                                        <div className="selected-item-price">
                                            { product.prices[0].currency.symbol } { product.prices[0].amount }
                                        </div>
                                        <div className="selected-item-attributes">
                                            {product.attributes.map((attribute, index) => {
                                                return (
                                                    <div
                                                        className="product-details-attribute"
                                                        key={index}
                                                        data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}`}
                                                    >
                                                        <div className="attribute-title">{ attribute.id.toUpperCase() }:</div>
                                                        {this.renderAttributes(attribute.id, attribute.items, index, product.selectedAttributes)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="quantity-container">
                                        <div className="quantity-option" onClick={ () => this.handleQuantityClick(index, 'add') } data-testid='cart-item-amount-increase'>
                                            +
                                        </div>
                                        <div className="cart-item-amount" data-testid='cart-item-amount'>
                                            { product.quantity }
                                        </div>
                                        <div className="quantity-option" onClick={ () => this.handleQuantityClick(index, 'remove') } data-testid='cart-item-amount-decrease'>
                                            -
                                        </div>
                                    </div>
                                    <img className="selected-item-image" src={this.getProductImage(product)} alt="" />
                                </div>
                            )
                        })}
                        <div className="cart-total" data-testid="cart-total">{this.cartTotal()}</div>
                        <div className="place-order-btn" data-testid="place-order-btn">Place Order</div>
                    </div>
                </dialog>
            </div>
        )
    }
}

export default Header;