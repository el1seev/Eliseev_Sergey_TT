import { connect } from "react-redux";
import React from "react";
import { setSelectedAttribute } from "../../redux/actions/productsActions";
import PropTypes from "prop-types";

class ColorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
        }
        this.setActive = this.setActive.bind(this);
    }

    setActive = (name, value) => {
        this.setState({ active: value });
        this.props.setActiveValue({ active: value});
        this.props.setSelectedAttribute({ name: name, value: value });
    };

    render() {
        const { property, cartButtons } = this.props;
        const { name, selected, items } = property;
        
        return (
            <>
                {
                    (
                        <div className="wrap-of-color">
                            <p className="text">{name}:</p>
                            <div className="wrap-of-color-buttons">
                                {
                                    (items.map((element) => (
                                        selected !== undefined && selected === element.value
                                            ?
                                            <div className="color-div-active">
                                                <button className="color-button" onClick={() => this.setActive(name, element.value)}
                                                style={{ backgroundColor: element.value }} />
                                            </div>
                                            :
                                            cartButtons ?
                                                <div className="color-div">
                                                    <button className="color-button" style={{ backgroundColor: element.value }} />
                                                </div>
                                                :
                                                <div className="color-div">
                                                    <button className="color-button" onClick={() => this.setActive(name, element.value)}
                                                    style={{ backgroundColor: element.value }} />
                                                </div>
                                    ))
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}

ColorButtons.propTypes = {
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
        setSelectedAttribute: (attribute) => dispatch(setSelectedAttribute(attribute)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ColorButtons);