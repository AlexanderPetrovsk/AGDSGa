import { Component } from "react";

class Sizes extends Component {
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

    getSizeOptionClasses(index) {
        return `size-option ${index === this.state.selectedAttribute ? 'active-attribute' : ''}`;
    }

    render() {
        return (
            <div className="size-options-container">
                {this.props.sizes.map((item, index) => {
                    return (
                        <div
                            className={this.getSizeOptionClasses(index)}
                            onClick={() => this.handleSelectAttribute(index)}
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