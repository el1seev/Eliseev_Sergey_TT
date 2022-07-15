import { connect } from "react-redux";
import React from "react";
import { setCurrentAttribute } from "../../redux/actions/productsActions";

class TextButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
        }
        this.setActive = this.setActive.bind(this);
    }

    setActive = (name, value) => {
        this.setState({ active: value });
        this.props.setSelectedAttribute({ name: name, value: value });
        this.props.setActiveValue(value);
    };


    render() {
        const { property } = this.props;
        const props = {
            property: {
                name: property.name,
                selected: property.selected,
            }
        }
        let { property: { name, selected } } = props;
        return (
            <>
                {
                    (<div className="wrap-of-text">
                        <p className="text">{name}:</p>
                        <div className="wrap-of-text-buttons">
                            {(property.items.map((element) => (
                                selected !== undefined && selected === element.value
                                    ?
                                    <button className="text-button-active">{element.value}</button>
                                    :
                                    this.props.cartButtons ?
                                        <button className="text-button">{element.value}</button>
                                        :
                                        <button className="text-button" onClick={() => this.setActive(name, element.value)} >{element.value}</button>
                            )))
                            }
                        </div>
                    </div>)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: state.products.currentItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedAttribute: (attribute) => dispatch(setCurrentAttribute(attribute)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextButtons);