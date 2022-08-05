import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compareTo } from "../../api";
import CartButton from "../../assets/logos/cartButton";
import { pushToCartPLP } from "../../redux/actions/products-actions";
import "./item.css";

class ItemInStock extends React.Component {
  render() {
    const { item, currentCurrency } = this.props;
    const { id, brand, name, gallery } = item;
    

    return (
      <div className="item-component">
        <Link to={`/item/${id}`} className="link-image">
          <div className="image-wrap">
            <img src={gallery[0]} className="showcase" alt={`in stock" ${name}`} />
          </div>
        </Link>

        <div className="item-info">
          <div className="wrap-of-p-item">
            <div className="wrap-of-brand-name">
              <p className="brand-name-item">{brand} {name}</p>
            </div>
            {
              (
                <p className="price-item">{compareTo(item, currentCurrency)}</p>
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

ItemInStock.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
  brand: PropTypes.string,
  name: PropTypes.string,
  gallery: PropTypes.array,
  pushToCartPLP: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.otherData.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushToCart: (item) => dispatch(pushToCartPLP(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInStock);