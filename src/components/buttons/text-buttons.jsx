import { connect } from "react-redux";
import React from "react";
import { setCurrentAttribute } from "../../redux/actions/productsActions";
import PropTypes from "prop-types";

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
    };


    render() {
        const { property, cartButtons } = this.props;
        const { name, selected, items} = property;
        
        return (
            <>
                {
                    (<div className="wrap-of-text">
                        <p className="text">{name}:</p>
                        <div className="wrap-of-text-buttons">
                            {(items.map((element) => (
                                selected !== undefined && selected === element.value
                                    ?
                                    <button className="text-button-active">{element.value}</button>
                                    :
                                    cartButtons ?
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

TextButtons.propTypes = {
    property: PropTypes.object,
    name: PropTypes.string,
    selected: PropTypes.string,
    items: PropTypes.array,
    setSelectedAttribute: PropTypes.func,
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