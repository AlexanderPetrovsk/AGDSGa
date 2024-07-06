import { Component } from "react";

class Colors extends Component {
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

    componentDidMount() {
        if (this.props.selectedAttribute) {
            this.setState({
                selectedAttribute: this.props.sizes.findIndex(size => size.value === this.props.selectedAttribute.value)
            });
        }
    }

    getColorWrapperClasses(index) {
        return `color-option-wrapper ${index === this.state.selectedAttribute ? 'active-color' : ''}`;
    }

    render() {
        return (
            <div className="color-options-container">
                {this.props.sizes.map((item, index) => {
                    return (
                        <div className={this.getColorWrapperClasses(index)} key={index}>
                            <div
                                className="color-option"
                                style={{ backgroundColor: item.value }}
                                onClick={() => this.handleSelectAttribute(this.props.attributeId, item.value, index)}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Colors;