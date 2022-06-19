import React from "react";
import HardCoded from "../../assets/img/coming-soon.png";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import WrapOfTextButtons from '../../components/wraps-of-buttons/wrap-text-buttons';
import WrapOfColorButtons from '../../components/wraps-of-buttons/wrap-color-buttons';
// import Add from "../../components/img/add-button.png";
// import Minus from "../../components/img/minus.png";

import "./cart-item.css";
import { connect } from "react-redux";

class CartItem extends React.Component {
    render(){
        return(
            <div className="cart-item-component">
            <div className="cart-item-info">
                <h1 className="brand">{this.props.cartItem.brand}</h1>
                <h2 className="name">{this.props.cartItem.name}</h2>


                <p className="price">{compareTo(this.props.cartItem, this.props.currentCurrency)}</p>


                {
                    (this.props.cartItem.attributes.map(item => (
                        item.length !== 0 ?
                            (
                            item.type === 'text' ?
                                <WrapOfTextButtons item={item}/> 
                                :
                                <WrapOfColorButtons item={item}/>
                            )
                            :
                            <></>
                    )))
                }
            </div>

            <div className="wrong-wrap">
            <div className="counter-buttons">
                <button className="crease">
                    <img className="count-button" src={Increase}/>
                </button>
                <p className="count">{this.props.cartItem.qty}</p>
                <button className="crease">
                    <img className="count-button" src={Decrease}/>
                </button>
            </div>
            <img src={this.props.cartItem.gallery[0]} className="cart-item-showcase"/>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)