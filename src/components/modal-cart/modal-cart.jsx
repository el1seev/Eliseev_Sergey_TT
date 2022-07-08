import React from "react";
import { connect } from "react-redux";
import { compareTo } from '../../api';
import { EmptySad } from "../../assets/logos/sad";
import { Link } from "react-router-dom";
import "./modal-cart.css";
import ModalItem from "../modal-item/modal-item";

class ModalCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalQty: 0,
            totalPrice: 0,
        }
        this.setTotalQty = this.setTotalQty.bind(this);
        this.setTotalPrice = this.setTotalPrice.bind(this);
    }

    setTotalQty = (qty) => {
        this.setState({totalQty: qty});
    }

    setTotalPrice = (price) => {
        this.setState({totalPrice: price});
    }


    componentDidMount(){

        let items = 0;
        let price = 0;

        if(this.props.cartItems !== undefined){
            this.props.cartItems.map(( item) => {
                items += item.qty;
                let itemPrice = compareTo(item, this.props.currentCurrency);
                price += item.qty * itemPrice[1];
            })
        
        let fixPrice = price.toFixed(2);
        

        this.setTotalQty(items);
        this.setTotalPrice(fixPrice);
        } else {
            this.setTotalQty(items);
            this.setTotalPrice(price);
        }
    }

    
    componentDidUpdate(prevProps){
        if( prevProps.cartItems !== this.props.cartItems){

            let items = 0;
            let price = 0;
    
            if(this.props.cartItems !== undefined){
                this.props.cartItems.map(( item) => {
                    items += item.qty;
                    let itemPrice = compareTo(item, this.props.currentCurrency);
                    price += item.qty * itemPrice[1]
                })
            
            let fixPrice = price.toFixed(2);

            this.setTotalQty(items);
            this.setTotalPrice(fixPrice);
            }
        }
    }
    render(){
        return(
            <>
            <div className={this.props.showModal ? "modal" : "modal-hidden"} onClick={this.props.showModal ? () => this.props.setShowModal(false) : () => this.props.setShowModal(true)}>
                {
                    this.props.cartItems.length === 0 ?
                <div className="modal-emty-cart" onClick={(e) => e.stopPropagation()}>
                    <EmptySad/>
                    <p className="empty-text">Cart is empty!</p>
                </div>
                :
                <div className="modal-cart" onClick={(e) => e.stopPropagation()}>
                    <div className="my-bag-header-wrap">
                        <p className="p-my-bag">My bag,</p>
                        <p className="p-modal-qty">{this.state.totalQty} items</p>
                    </div>

                    {this.props.cartItems.map((cartItem => (
                                <ModalItem cartItem={cartItem} />
                    )))}

                    <div className="modal-wrap-of-price">
                        <p className="p-total">Total: </p>
                        <p className="total-price">{this.props.currentCurrency}{this.state.totalPrice}</p>
                    </div>

                    <div className="modal-bottom-buttons-wrap">
                        <Link className="link-to-cart" to="/cart">
                        <button className="view-bag-button"  onClick={() => this.props.setShowModal(false)}>
                                <p className="view-bag-text">VIEW BAG</p>
                        </button>
                        </Link>
                        <button className="check-out-button">CHECK OUT</button>
                    </div>

                </div>
                }
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems,
        currentCurrency: state.otherData.currentCurrency,
    }
}

export default connect(mapStateToProps)(ModalCart); 