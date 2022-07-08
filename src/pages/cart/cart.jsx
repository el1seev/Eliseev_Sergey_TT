import React from 'react';
import { connect } from 'react-redux';
import { compareTo } from '../../api';
import { Link } from "react-router-dom";
import { EmptySad } from '../../assets/logos/sad';
import CartItem from '../../components/cart-item/cart-item';
import "../home/page.css";
import "./cart.css";

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalQty: 0,
            totalPrice: 0,
            totalTax: 0,
        }
        this.setTotalQty = this.setTotalQty.bind(this);
        this.setTotalPrice = this.setTotalPrice.bind(this);
        this.setTotalTax = this.setTotalTax.bind(this);
    }

    setTotalQty = (qty) => {
        this.setState({totalQty: qty});
    }

    setTotalPrice = (price) => {
        this.setState({totalPrice: price});
    }

    setTotalTax = (tax) => {
        this.setState({totalTax: tax});
    }

    componentDidMount(){

        let items = 0;
        let price = 0;
        let tax = 0;

        if(this.props.cartItems !== undefined){
            this.props.cartItems.map(( item) => {
                items += item.qty;
                let itemPrice = compareTo(item, this.props.currentCurrency);
                price += item.qty * itemPrice[1];
            })
        
        let fixPrice = price.toFixed(2);
        tax = fixPrice*0.21;
        let fixTax = tax.toFixed(2);
        

        this.setTotalQty(items);
        this.setTotalPrice(fixPrice);
        this.setTotalTax(fixTax);
        } else {
            this.setTotalQty(items);
            this.setTotalPrice(price);
            this.setTotalTax(tax);
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
                    price += item.qty * itemPrice[1];
                })
            
            let fixPrice = price.toFixed(2);
            let tax = fixPrice*0.21;
            let fixTax = tax.toFixed(2);

            this.setTotalQty(items);
            this.setTotalPrice(fixPrice);
            this.setTotalTax(fixTax);
            }
        }
    }
    render(){
        return(
            <div className='cart'>
                <h1 className='page-name'>CART</h1>
                {
                    this.props.cartItems.length !== 0 ?
                        <>  
                            <div className='gallery'>
                            {this.props.cartItems.map((cartItem => (
                                <CartItem item={cartItem} />
                            )))}
                            </div>
                                <div className='wrap-of-cart-info'>
                                    <div className='cart-p-figure'>
                                        <p className='cart-p'>Tax 21%: </p><p className='cart-figure'> {this.props.currentCurrency}{this.state.totalTax}</p>
                                    </div>
                                    <div className='cart-p-figure'>
                                        <p className='cart-p'>Quantity: </p><p className='cart-figure'> {this.state.totalQty}</p>
                                    </div>
                                    <div className='cart-p-figure'>
                                        <p className='cart-p'>Total: </p><p className='cart-figure'> {this.props.currentCurrency}{this.state.totalPrice}</p>
                                    </div>
                                    <button className='order-button'>ORDER</button>
                                </div>
                        </>
                    :
                    <div className='empty-cart-content'>
                        <div className='logo-with-p'>
                            <EmptySad/><p className='empty-cart-p'>Your cart is empty!</p>
                        </div>
                        
                        <button className='link-button'>
                            <Link to='/all' className='shopping-link'>Shopping ahead</Link>
                        </button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems,
        currentCurrency: state.otherData.currentCurrency,
    }
}

export default connect(mapStateToProps)(Cart);