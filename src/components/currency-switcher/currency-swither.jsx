import React from "react";
import { connect } from "react-redux";
import { setCurrentCurrency } from "../../redux/actions/other-actions";
import "./currency-switcher.css";

class CurrencySwitcher extends React.Component{
    render(){
        return(
            <>
            <div className={this.props.showCurrencyModal ? "currency-modal" : "currency-modal-hidden"} onClick={() => this.props.setCurrencyModal(false)}>

            </div>
            <ul className={this.props.showCurrencyModal ? "currency-ul" : "currency-ul-hidden"} onClick={() => this.props.setCurrencyModal(false)}>
                    { this.props.currencies.map( value => (
                        <li className="currency-li"><button className="currency-li-button" onClick={() => this.props.setCurrentCurrency(value.symbol)}>{value.symbol}   {value.label}</button></li>
                        ))}
                </ul>
            </>
        )
    }
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