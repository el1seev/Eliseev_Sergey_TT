import React from "react";
import { connect } from "react-redux";
import { setCurrentCurrency } from "../../redux/actions/other-actions";
import "./currency-switcher.css";
import PropTypes from "prop-types";

class CurrencySwitcher extends React.Component {
    render() {
        const { currencies, showCurrencyModal, setCurrencyModal, setCurrentCurrency } = this.props;

        return (
            <>
                <div className={showCurrencyModal ? "currency-modal" : "currency-modal-hidden"}
                    onClick={() => setCurrencyModal(false)}>
                </div>

                <ul className={showCurrencyModal ? "currency-ul" : "currency-ul-hidden"}
                    onClick={() => setCurrencyModal(false)}>
                    {currencies.map(value => (
                        <li className="currency-li">
                            <button className="currency-li-button" onClick={() => setCurrentCurrency(value.symbol)}>
                                {value.symbol}   {value.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

CurrencySwitcher.propTypes = {
    currencies: PropTypes.array,
    setCurrentCurrency: PropTypes.func,
    showCurrencyModal: PropTypes.bool,
    setCurrencyModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        currencies: state.otherData.currencies,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);