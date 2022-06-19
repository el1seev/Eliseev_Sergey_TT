import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../../components/cart-item/cart-item';
import "../home/home.css";
import "./cart.css"

class Cart extends React.Component {
    render(){
        return(
            <div className='cart'>
                <h1 className='h1-cart'>CART</h1>
                <div className='gallery'>
                    {
                        this.props.cartItems.map (( cartItem => (
                            <CartItem  cartItem={cartItem}/>
                        )))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.products.cartItems
    }
}

export default connect(mapStateToProps)(Cart)