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
        this.navigationWidth = React.createRef();
        this.state = {
            totalQty: 0,
            active: false,
        };
        this.setTotalQty = this.setTotalQty.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    setTotalQty = (qty) => {
        this.setState({totalQty: qty});
    }

    setActive = (value) => {
        this.setState({active : value});
    }

    componentDidMount(){
        let items = 0;
        this.setTotalQty(items);
    }

    
    componentDidUpdate(prevProps){
        if( prevProps.cartItems !== this.props.cartItems){
            let items = 0;

            if(this.props.cartItems !== undefined){
                this.props.cartItems.forEach(( item) => {
                    items += item.qty;
                })
            this.setTotalQty(items);
            }
        }

    }

    render(){
        const activeLink = {
            color: "rgb(64, 169, 48)",
            borderBottom: "2px solid rgb(64, 169, 48)",
        }
        return(
            <nav className="navigation" ref={this.navigationWidth} >
                <ul className="navMenu">
                    {
                        this.props.categories.map( (links) => (
                            <li><Link to={`/${links.name}`} className="link" style={this.state.active === links.name ? activeLink : {}} onClick={ () => this.setActive(links.name)}>{links.name}</Link></li>
                        ))
                    }
                </ul>

                <div className="app-logo" >
                    <BagLogo />
                </div>

                <div className="wrapOfCartAndCurrency">

                    <div className="currency-switcher">
                        <div className="currency-icon">
                            <button className="currency-button" onClick={ this.props.showCurrencyModal ? () => this.props.setCurrencyModal(false) : () => this.props.setCurrencyModal(true)}>
                                {this.props.currentCurrency}
                            </button>
                            <Arrow rotate={this.props.showCurrencyModal}/>
                        </div>
                    </div>
                    
                    <div className="link" onClick={ this.props.showModal ? () => this.props.setShowModal(false) : () => this.props.setShowModal(true)}>
                        <CartLogo/>
                        <div className="counter-logo" style={this.state.totalQty !== 0 ? {} :{visibility: 'hidden'}}>
                            <p className="p-counter-logo">{this.state.totalQty}</p>
                        </div>
                    </div>
                    
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
        cartItems: state.products.cartItems,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
