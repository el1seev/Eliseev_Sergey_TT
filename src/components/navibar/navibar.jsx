import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BagLogo from "../../assets/logos/bagLogo";
import CartLogo from "../../assets/logos/cartLogo";
import "./navibar.css";
import { setCurrentCurrency } from "../../redux/actions/other-actions";
import Arrow from "../../assets/logos/currencyArrow";

class NaviBar extends React.Component {
    constructor(){
        super();
        this.state = {
            show: false
        };

    }
    render(){
        return(
            <nav className="navigation">
                <ul className="navMenu">
                    {
                        this.props.categories.map( (links) => (
                            <li><Link to={`/${links.name}`} className="link">{links.name}</Link></li>
                        ))
                    }
                </ul>

                <div className="home-logo">
                    <BagLogo />
                </div>

                <div className="wrapOfCartAndCurrency">

                    <div className="currency-switcher">

                        <div className="currency-active">
                            <button className="currency-button">{this.props.currentCurrency}</button>
                            <Arrow className="arrow"/>
                        </div>

                        <ul className="currency-ul">
                            { this.props.currencies.map( value => (
                                <li className="currency-li"><button className="currency-li-button" onClick={() => this.props.setCurrentCurrency(value.symbol)}>{value.symbol}   {value.label}</button></li>
                            ))}

                        </ul>
                    </div>
                    
                    <Link to="/cart" className="link">
                        <CartLogo/>
                        <div className="counter-logo">
                            <p className="p-counter-logo">0</p>
                        </div>
                    </Link>
                    
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.otherData.categories,
        currencies: state.otherData.currencies,
        currentCurrency: state.otherData.currentCurrency,
    }
}
const mapDispatchToProps = ( dispatch) => {
    return {
        setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
