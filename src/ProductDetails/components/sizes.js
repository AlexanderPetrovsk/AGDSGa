import { Component } from "react";

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

    render() {
        return (
            <div className="size-options-container">
                {this.props.sizes.map((item, index) => {
                    return (
                        <div
                            className={this.getSizeOptionClasses(index)}
                            onClick={() => this.handleSelectAttribute(this.props.attributeId, item.value, index)}
                            key={index}
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