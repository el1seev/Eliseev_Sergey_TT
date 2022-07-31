import React from "react";
import { connect } from "react-redux";
import { EmptySad } from "../../assets/logos/sad";
import { Link } from "react-router-dom";
import "./modal-cart.css";
import ModalItem from "../modal-item/modal-item";
import { URLS } from "../../api/constans";
import { clearCart } from "../../redux/actions/productsActions";
import PropTypes from "prop-types";

class ModalCart extends React.Component {
    constructor(props) {
        super(props);
        this.setShowPurchaseModal = this.setShowPurchaseModal.bind(this);
    } 
    setShowPurchaseModal = () => {
        this.props.setShowModal(false);
        this.props.setPurchaseModal(true);
        this.props.clearCart();
    }
    render() {
        const {showModal, setShowModal, cartItems, cartInfo, currentCurrency } = this.props;
        const { qty, price } = cartInfo;
        
        return (
            <>
                <div className={showModal ? "modal" : "modal-hidden"} onClick={() => setShowModal(false)}>
                    {
                        cartItems.length === 0 ?
                            <div className="modal-emty-cart" onClick={(e) => e.stopPropagation()}>
                                <EmptySad />
                                <p className="empty-text">Cart is empty!</p>
                            </div>
                            :
                            <div className="modal-cart" onClick={(e) => e.stopPropagation()}>
                                <div className="my-bag-header-wrap">
                                    <p className="p-my-bag">My bag,</p>
                                    <p className="p-modal-qty">{qty} items</p>
                                </div>

                                {cartItems.map((cartItem => (
                                    <ModalItem cartItem={cartItem} />
                                )))}

                                <div className="modal-wrap-of-price">
                                    <p className="p-total">Total: </p>
                                    <p className="total-price">{currentCurrency}{price.toFixed(2)}</p>
                                </div>

                                <div className="modal-bottom-buttons-wrap">
                                    <Link className="link-to-cart" to={`${URLS.CART_PAGE}`}>
                                        <button className="view-bag-button" onClick={() => setShowModal(false)}>
                                            <p className="view-bag-text">VIEW BAG</p>
                                        </button>
                                    </Link>
                                    <button className="check-out-button" onClick={() => this.setShowPurchaseModal()}>CHECK OUT</button>
                                </div>
                            </div>
                    }
                </div>
            </>
        )
    }
}

ModalCart.propTypes = {
    showModal: PropTypes.bool,
    cartItems: PropTypes.array,
    cartInfo: PropTypes.object,
    qty: PropTypes.number,
    price: PropTypes.number,
    setShowModal: PropTypes.func,
    setPurchaseModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems,
        currentCurrency: state.otherData.currentCurrency,
        cartInfo: state.otherData.cartInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(clearCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart); 