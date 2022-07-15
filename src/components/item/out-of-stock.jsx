import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compareTo } from "../../api";
import { URLS } from "../../api/constans";
import { setCurrentItem } from "../../redux/actions/productsActions";

import "./item.css";

class ItemOutOfStock extends React.Component {
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
            <div className="out-hover">
                <div className='item-component-out'>
                    <Link to={`${URLS.SINGLE_ITEM_PAGE}${id}`} className="link-image">
                        <button className="load-current-button" onClick={() => this.props.setCurrentItem(item)}>
                            <img src={gallery[0]} className="showcase" alt='out of stock item' />
                            <p className="out-of-stock">OUT OF STOCK</p>
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

                    </div>
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
        setCurrentItem: (item) => dispatch(setCurrentItem(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemOutOfStock);