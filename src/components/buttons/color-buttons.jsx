import { connect } from "react-redux";
import React from "react";
import { setSelectedAttribute } from "../../redux/actions/productsActions";

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
                    (
                        <div className="wrap-of-color">
                            <p className="text">{name}:</p>
                            <div className="wrap-of-color-buttons">
                                {
                                    (property.items.map((element) => (
                                        selected !== undefined && selected === element.value
                                            ?
                                            <div className="color-div-active">
                                                <button className="color-button" onClick={() => this.setActive(name, element.value)}
                                                style={{ backgroundColor: element.value }} />
                                            </div>
                                            :
                                            this.props.cartButtons ?
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