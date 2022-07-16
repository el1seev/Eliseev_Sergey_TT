import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import BagLogo from "../../assets/logos/bagLogo";
import CartLogo from "../../assets/logos/cartLogo";
import "./navibar.css";
import { setCurrentCurrency } from "../../redux/actions/other-actions";
import Arrow from "../../assets/logos/currencyArrow";
import PropTypes from "prop-types";

class NaviBar extends React.Component {
    render() {
        const { categories, setCurrencyModal, showCurrencyModal, setShowModal,
            showModal, cartInfo, currentCurrency } = this.props;
        const { qty } = cartInfo;
        const activeLink = {
            color: "rgb(64, 169, 48)",
            borderBottom: "2px solid rgb(64, 169, 48)",
        }

        return (
            <nav className="navigation" ref={this.navigationWidth} >
                <ul className="navMenu">
                    {
                        categories.map((link) => (
                            <li>
                                <NavLink to={`/${link.name}`} className="link"
                                    style={({ isActive }) => { if (isActive) { return activeLink } }}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                <div className="app-logo" >
                    <BagLogo />
                </div>

                <div className="wrapOfCartAndCurrency">

                    <div className="currency-switcher">
                        <div className="currency-icon">
                            <button className="currency-button"
                                onClick={() => setCurrencyModal(!showCurrencyModal)}>
                                {currentCurrency}
                            </button>
                            <Arrow rotate={showCurrencyModal} />
                        </div>
                    </div>

                    <button className="cart-modal-button" onClick={() => setShowModal(!showModal)}>
                        <CartLogo />
                        <div className="counter-logo" style={!!qty ? {} : { visibility: "hidden" }}>
                            <p className="counter-logo-value">{qty}</p>
                        </div>
                    </button>

                </div>
            </nav>
        );
    }
}

NaviBar.propTypes = {
    categories: PropTypes.array,
    currentCurrency: PropTypes.string,
    cartInfo: PropTypes.object,
    cartItems: PropTypes.array,
    setCurrentCurrency: PropTypes.func,
    setCurrencyModal: PropTypes.func,
    showCurrencyModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    showModal: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        categories: state.otherData.categories,
        currentCurrency: state.otherData.currentCurrency,
        cartInfo: state.otherData.cartInfo,
        cartItems: state.products.cartItems,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
