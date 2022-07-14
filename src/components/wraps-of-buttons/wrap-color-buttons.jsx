import { connect } from "react-redux";
import React from "react";
import { setSelectedAttribute } from "../../redux/actions/productsActions";

class WrapOfColorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
        }
        this.setActive = this.setActive.bind(this);
    }

    setActive = (value) => {
        this.setState({ active: value });
        this.props.setSelectedAttribute({ name: this.props.item.name, value: value });
        this.props.setActiveValue(value);
    };

    render() {
        return (
            <>
                {
                    (
                        <div className="wrap-of-color">
                            <p className="text">{this.props.item.name}:</p>
                            <div className="wrap-of-color-buttons">
                                {
                                    (this.props.item.items.map((element) => (
                                        this.props.item.selected !== undefined && this.props.item.selected === element.value
                                            ?
                                            <div className="color-div-active">
                                                <button className="color-button" onClick={() => this.setActive(element.value)}
                                                style={{ backgroundColor: element.value }} />
                                            </div>
                                            :
                                            this.props.cartButtons ?
                                                <div className="color-div">
                                                    <button className="color-button" style={{ backgroundColor: element.value }} />
                                                </div>
                                                :
                                                <div className="color-div">
                                                    <button className="color-button" onClick={() => this.setActive(element.value)}
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


export default connect(mapStateToProps, mapDispatchToProps)(WrapOfColorButtons);