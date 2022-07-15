import React from "react";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import TextButtons from '../buttons/text-buttons';
import ColorButtons from '../buttons/color-buttons';


import "./modal-item.css";
import { connect } from "react-redux";
import { decreaseItemQty, increaseItemQty, removeFromCart } from "../../redux/actions/productsActions";

class ModalItem extends React.Component {
    render(){
        const { cartItem } = this.props;
        const props = {
            cartItem: {
                id: cartItem.id,
                brand: cartItem.brand,
                name: cartItem.name,
                gallery: cartItem.gallery,
                attributes: cartItem.attributes,
                qty: cartItem.qty,
            }
        }
        let { cartItem: { id, brand, name, gallery, attributes, qty} } = props;
        return(
        <div className="modal-cart-item-component">
            <div className="modal-cart-item-info">
                <h1 className="modal-brand">{brand}</h1>
                <h2 className="modal-name">{name}</h2>

                <p className="modal-price">{compareTo(cartItem, this.props.currentCurrency)}</p>
                {
                    (cartItem.attributes.map(property => (
                        property.length !== 0 ?
                            (
                            property.type === 'text' ?
                                <TextButtons property={property} cartButtons={true}/> 
                                :
                                <ColorButtons property={property} cartButtons={true}/>
                            )
                            :
                            <></>
                    )))
                }
            </div>

            <div className="modal-counter-showcase-wrap"> 
                <div className="modal-counter-buttons">
                    <button className="modal-crease">
                        <img className="modal-count-button" src={Increase} onClick={() => this.props.increase(cartItem)}/>
                    </button>
                    <p className="modal-count">{qty}</p>
                    {
                    qty >= 2 ?
                        <button className="modal-crease">
                            <img className="modal-count-button" src={Decrease} onClick={() => this.props.decrease(cartItem)}/>
                        </button>
                        :
                        <button className="modal-crease">
                            <img className="modal-count-button" src={Decrease} onClick={() => this.props.remove(cartItem)}/>
                        </button>
                    }
                </div>

                <div className="modal-cart-item-gallery">
                    <img src={gallery[0]} className="modal-cart-item-showcase"/>
                </div>
            </div>
        </div>
        );
    }
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