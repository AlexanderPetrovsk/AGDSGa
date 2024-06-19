import { Component } from "react";
import { Link } from "react-router-dom";
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
                    Hello
                </dialog>
            </div>
        )
    }
}

export default Header;