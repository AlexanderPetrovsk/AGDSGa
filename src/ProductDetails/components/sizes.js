import { Component } from "react";
import { toKebabCase } from "../../services/common";

class Sizes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttribute: 0
        }

    }
    
    handleSelectAttribute(id, value, index) {
        this.props.onHandleAttributeChange(id, value);

        this.setState({
            selectedAttribute: index
        });
    }

    getSizeOptionClasses(index) {
        return `size-option ${index === this.state.selectedAttribute ? 'active-attribute' : ''}`;
    }

    componentDidMount() {
        if (this.props.selectedAttribute) {
            this.setState({
                selectedAttribute: this.props.sizes.findIndex(size => size.value === this.props.selectedAttribute.value)
            });
        }
    }
    
    dataTestId(itemValue, index) {
        if (this.props.usedIn === 'cart') {
            return `cart-item-attribute-size-${toKebabCase(itemValue)}${index === this.state.selectedAttribute ? '-selected' : ''}`;
        }

        return `product-attribute-size-${toKebabCase(itemValue)}${index === this.state.selectedAttribute ? '-selected' : ''}`;
    }

    render() {
        return (
            <div className="size-options-container">
                {this.props.sizes.map((item, index) => {
                    return (
                        <div
                            className={this.getSizeOptionClasses(index)}
                            onClick={() => this.handleSelectAttribute(this.props.attributeId, item.value, index)}
                            key={index}
                            data-testId={this.dataTestId(item.displayValue, index)}
                        >
                            { item.value }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Sizes;