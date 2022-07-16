import React from "react";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import TextButtons from "../buttons/text-buttons";
import ColorButtons from "../buttons/color-buttons";
import "./modal-item.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { decreaseItemQty, increaseItemQty, removeFromCart } from "../../redux/actions/productsActions";

class ModalItem extends React.Component {
    render() {
        const { cartItem, currentCurrency, increase, decrease, remove } = this.props;
        const { brand, name, gallery, qty } = cartItem;

        return (
            <div className="modal-cart-item-component">
                <div className="modal-cart-item-info">
                    <h1 className="modal-brand">{brand}</h1>
                    <h2 className="modal-name">{name}</h2>

                    <p className="modal-price">{compareTo(cartItem, currentCurrency)}</p>
                    {
                        (cartItem.attributes.map(property => (
                            property.length !== 0 ?
                                (
                                    property.type === "text" ?
                                        <TextButtons property={property} cartButtons={true} />
                                        :
                                        <ColorButtons property={property} cartButtons={true} />
                                )
                                :
                                <></>
                        )))
                    }
                </div>

                <div className="modal-counter-showcase-wrap">
                    <div className="modal-counter-buttons">
                        <button className="modal-crease">
                            <img className="modal-count-button" src={Increase} onClick={() => increase(cartItem)} />
                        </button>
                        <p className="modal-count">{qty}</p>
                        {
                            qty >= 2 ?
                                <button className="modal-crease">
                                    <img className="modal-count-button" src={Decrease} onClick={() => decrease(cartItem)} />
                                </button>
                                :
                                <button className="modal-crease">
                                    <img className="modal-count-button" src={Decrease} onClick={() => remove(cartItem)} />
                                </button>
                        }
                    </div>

                    <div className="modal-cart-item-gallery">
                        <img src={gallery[0]} className="modal-cart-item-showcase" alt={name} />
                    </div>
                </div>
            </div>
        );
    }
}

ModalItem.propTypes = {
    cartItem: PropTypes.object,
    brand: PropTypes.string,
    name: PropTypes.string,
    gallery: PropTypes.array,
    qty: PropTypes.number,
    currentCurrency: PropTypes.string,
    increase: PropTypes.func,
    decrease: PropTypes.func,
    remove: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        currentCurrency: state.otherData.currentCurrency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increase: (good) => dispatch(increaseItemQty(good)),
        decrease: (good) => dispatch(decreaseItemQty(good)),
        remove: (good) => dispatch(removeFromCart(good)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalItem);