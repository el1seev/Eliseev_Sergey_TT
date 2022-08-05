import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { compareTo } from "../../api";
import "./item.css";

class ItemOutOfStock extends React.Component {
  render() {
    const { item, currentCurrency } = this.props;
    const { id, brand, name, gallery } = item;

    return (
      <div className="out-hover">
        <div className="item-component-out">
          <Link to={`/item/${id}`} className="link-image">
            <div className="image-wrap">
              <img src={gallery[0]} className="showcase" alt={`out of stock" ${name}`} />
              <p className="out-of-stock-text">OUT OF STOCK</p>
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
          </div>
        </div>
      </div>
    );
  }
}

ItemOutOfStock.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
  brand: PropTypes.string,
  name: PropTypes.string,
  gallery: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.otherData.currentCurrency,
  };
};


export default connect(mapStateToProps)(ItemOutOfStock);