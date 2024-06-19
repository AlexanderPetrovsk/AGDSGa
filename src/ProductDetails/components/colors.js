import { Component } from "react";

class Colors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttribute: 0
        }

    }
    
    handleSelectAttribute(id) {
        this.setState({
            selectedAttribute: id
        });
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
                                onClick={() => this.handleSelectAttribute(index)}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Colors;