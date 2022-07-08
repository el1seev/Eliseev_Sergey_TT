import React from "react";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import WrapOfTextButtons from '../../components/wraps-of-buttons/wrap-text-buttons';
import WrapOfColorButtons from '../../components/wraps-of-buttons/wrap-color-buttons';


import "./modal-item.css";
import { connect } from "react-redux";
import { decreaseItemQty, increaseItemQty, removeFromCart } from "../../redux/actions/productsActions";

class ModalItem extends React.Component {

    render(){
        return(
        <div className="modal-cart-item-component">
            <div className="modal-cart-item-info">
                <h1 className="modal-brand">{this.props.cartItem.brand}</h1>
                <h2 className="modal-name">{this.props.cartItem.name}</h2>

                <p className="modal-price">{compareTo(this.props.cartItem, this.props.currentCurrency)}</p>
                {
                    (this.props.cartItem.attributes.map(item => (
                        item.length !== 0 ?
                            (
                            item.type === 'text' ?
                                <WrapOfTextButtons item={item} cartButtons={true}/> 
                                :
                                <WrapOfColorButtons item={item} cartButtons={true}/>
                            )
                            :
                            <></>
                    )))
                }
            </div>

            <div className="modal-counter-showcase-wrap"> 
                <div className="modal-counter-buttons">
                    <button className="modal-crease">
                        <img className="modal-count-button" src={Increase} onClick={() => this.props.increase(this.props.cartItem)}/>
                    </button>
                    <p className="modal-count">{this.props.cartItem.qty}</p>
                    {
                    this.props.cartItem.qty >= 2 ?
                        <button className="modal-crease">
                            <img className="modal-count-button" src={Decrease} onClick={() => this.props.decrease(this.props.cartItem)}/>
                        </button>
                        :
                        <button className="modal-crease">
                            <img className="modal-count-button" src={Decrease} onClick={() => this.props.remove(this.props.cartItem)}/>
                        </button>
                    }
                </div>

                <div className="modal-cart-item-gallery">
                    <img src={this.props.cartItem.gallery[0]} className="modal-cart-item-showcase"/>
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