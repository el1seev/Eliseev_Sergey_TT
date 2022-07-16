import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { EmptySad } from "../../assets/logos/sad";
import CartItem from "../../components/cart-item/cart-item";
import "../home/page.css";
import "./cart.css";
import { URLS } from "../../api/constans";
import { clearCart } from "../../redux/actions/productsActions";
import PropTypes from "prop-types";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.setShowPurchaseModal = this.setShowPurchaseModal.bind(this);
    }
    setShowPurchaseModal = () => {
        this.props.setPurchaseModal(true);
        this.props.clearCart();
    }

    render() {
        const { cartItems, currentCurrency, cartInfo } = this.props;
        const { qty, price, tax} = cartInfo;

        return (
            <div className="cart">
                <h1 className="page-name">CART</h1>
                {
                    !!cartItems.length ?
                        <>
                            <div className="gallery">
                                {cartItems.map((cartItem => (
                                    <CartItem item={cartItem} />
                                )))}
                            </div>
                            <div className="wrap-of-cart-info">
                                <div className="cart-p-figure">
                                    <p className="cart-p">Tax 21%: </p>
                                    <p className="cart-figure"> {currentCurrency}{tax}</p>
                                </div>
                                <div className="cart-p-figure">
                                    <p className="cart-p">Quantity: </p>
                                    <p className="cart-figure"> {qty}</p>
                                </div>
                                <div className="cart-p-figure">
                                    <p className="cart-p">Total: </p>
                                    <p className="cart-figure"> {currentCurrency}{price}</p>
                                </div>
                                <button className="order-button" onClick={() => this.setShowPurchaseModal()}>ORDER</button>
                            </div>
                        </>
                        :
                        <div className="empty-cart-content">
                            <div className="logo-with-p">
                                <EmptySad /><p className="empty-cart-p">Your cart is empty!</p>
                            </div>

                            <button className="link-button">
                                <Link to={`${URLS.ALL_PAGE}`} className="shopping-link">Shopping ahead</Link>
                            </button>
                        </div>
                }
            </div>
        )
    }
}

Cart.propTypes = {
    cartItems: PropTypes.array,
    currentCurrency: PropTypes.string,
    cartInfo: PropTypes.object,
    qty: PropTypes.number,
    price: PropTypes.number,
    tax: PropTypes.number,
    clearCart: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);