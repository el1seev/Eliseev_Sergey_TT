import React from "react";
import { connect} from "react-redux";
import { Link } from "react-router-dom";
import { compareTo } from "../../api";
import { URLS } from "../../api/constans";
import { setCurrentItem } from "../../redux/actions/productsActions";

import "./item.css";

class ItemOutOfStock extends React.Component {
    render(){
        return(
            <div className="out-hover">
                <div className='item-component-out'>
                    <Link to={`${URLS.SINGLE_ITEM_PAGE}${this.props.item.id}`} className="link-image">
                            <button className="load-current-button" onClick={() => this.props.setCurrentItem(this.props.item)}>
                                <img src={this.props.item.gallery[0]} className="showcase" alt='out of stock item'/>
                                <p className="out-of-stock">OUT OF STOCK</p>
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