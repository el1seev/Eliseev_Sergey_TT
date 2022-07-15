import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compareTo } from "../../api";
import { URLS } from "../../api/constans";
import CartButton from "../../assets/logos/cartButton";
import { setCurrentItem, pushToCartPLP } from "../../redux/actions/productsActions";


import "./item.css";

class ItemInStock extends React.Component {
    render() {
        const { item } = this.props;
        const props = {
            item: {
                id: item.id,
                brand: item.brand,
                name: item.name,
                gallery: item.gallery,
            }
        }
        let { item: { id, brand, name, gallery, } } = props;
        return (
            <div className='item-component'>
                <Link to={`${URLS.SINGLE_ITEM_PAGE}${id}`} className="link-image">
                    <button className="load-current-button" onClick={() => this.props.setCurrentItem(item)}>
                        <img src={gallery[0]} className="showcase" alt='in stock item' />
                    </button>
                </Link>

                <div className="item-info">
                    <div className="wrap-of-p-item">
                        <div className="wrap-of-brand-name">
                            <p className="brand-name-item">{brand} {name}</p>
                        </div>
                        {
                            (
                                <p className="price-item">{compareTo(item, this.props.currentCurrency)}</p>
                            )
                        }
                    </div>

                    <button className="item-add-to-cart" onClick={() => this.props.pushToCart(item)}>
                        <CartButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemInStock);