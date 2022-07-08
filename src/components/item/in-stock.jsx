import React from "react";
import { connect} from "react-redux";
import { Link } from "react-router-dom";
import { compareTo } from "../../api";
import CartButton from "../../assets/logos/cartButton";
import { setCurrentItem, pushToCartPLP } from "../../redux/actions/productsActions";


import "./item.css";

class ItemInStock extends React.Component {

    render()
        {
        return(
                <div className='item-component'>
                    <Link to={`/singleitem/${this.props.item.id}`} className="link-image"> 
                            <button className="load-current-button" onClick={() => this.props.setCurrentItem(this.props.item)}>
                                <img src={this.props.item.gallery[0]} className="showcase"/>
                            </button>
                    </Link>

                    <div className="item-info">
                        <div className="wrap-of-p-item">
                            <div className="wrap-of-brand-name">
                                <p className="brand-name-item">{this.props.item.brand} {this.props.item.name}</p>
                            </div>
                            { 
                                (
                                    <p className="price-item">{compareTo(this.props.item, this.props.currentCurrency)}</p>
                                )
                            }
                    </div>

                        <button className="item-add-to-cart" onClick={() => this.props.pushToCart(this.props.item)}>
                        <CartButton/>
                    </button>

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
        pushToCart: (item) => dispatch(pushToCartPLP(item)),
        setCurrentItem: (item) => dispatch(setCurrentItem(item)),
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(ItemInStock);