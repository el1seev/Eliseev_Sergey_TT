import React from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import { decreaseItemQty, increaseItemQty, removeFromCart } from "../../redux/actions/products-actions";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import TextButtons from "../buttons/text-buttons";
import ColorButtons from "../buttons/color-buttons";
import Next from "../../assets/img/next.png";
import Prev from "../../assets/img/prev.png";
import "./cart-item.css";


class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0,
      currentImg: null,
    };
    this.setNextImg = this.setNextImg.bind(this);
    this.setPrevImg = this.setPrevImg.bind(this);
  }

  setNextImg = () => {
    if (this.state.currentCount >= this.props.item.gallery.length - 1) {
      this.setState({ currentImg: this.props.item.gallery[0] });
      this.setState({ currentCount: 0 });
    } else {
      this.setState({ currentImg: this.props.item.gallery[this.state.currentCount + 1] });
      this.setState({ currentCount: this.state.currentCount + 1 });
    }
  };

  setPrevImg = () => {
    if (this.state.currentCount - 1 < 0) {
      this.setState({ currentImg: this.props.item.gallery[this.props.item.gallery.length - 1] });
      this.setState({ currentCount: this.props.item.gallery.length - 1 });
    } else {
      this.setState({ currentImg: this.props.item.gallery[this.state.currentCount - 1] });
      this.setState({ currentCount: this.state.currentCount - 1 });
    }
  };

  componentDidMount() {
    this.setState({ currentImg: this.props.item.gallery[0] });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({ currentImg: this.props.item.gallery[0] });
    }
  }

  render() {
    const { item, currentCurrency, increase, decrease, remove } = this.props;
    const { brand, name, gallery, attributes, qty} = item;
    const { currentImg } = this.state;
        
    return (
      <div className="cart-item-component">
        <div className="cart-item-info">
          <h1 className="brand">{brand}</h1>
          <h2 className="name">{name}</h2>

          <p className="price">{compareTo(item, currentCurrency)}</p>
          {
            (attributes.map(property => (
              property.length !== 0 ?
                (
                  property.type === "text" ?
                    <TextButtons property={property} cartButtons={true} />
                    :
                    <ColorButtons property={property} cartButtons={true} />
                )
                :
                // eslint-disable-next-line react/jsx-indent
                <></>
            )))
          }
        </div>

        <div className="counter-showcase-wrap">
          <div className="counter-buttons">
            <button className="crease">
              <img className="count-button" src={Increase} onClick={() => increase(item)} alt="increase button"/>
            </button>
            <p className="count">{qty}</p>
            {
              qty >= 2 ?
                <button className="crease">
                  <img className="count-button" src={Decrease} onClick={() => decrease(item)} alt="decrease button"/>
                </button>
                :
                <button className="crease">
                  <img className="count-button" src={Decrease} onClick={() => remove(item)} alt="decrease button"/>
                </button>
            }
          </div>

          <div className="cart-item-gallery">
            <img src={currentImg} className="cart-item-showcase" alt={`${currentImg} img`}/>
            {
              gallery.length !== 1 ?
                <div className="wrap-of-gallery-buttons">
                  <button className="previous-button-gallery" onClick={() => this.setPrevImg()}>
                    <img className="previous-img" src={Prev} alt="previous img button"/>
                  </button>
                  <button className="next-button-gallery" onClick={() => this.setNextImg()}>
                    <img className="next-img" src={Next} alt="next img button"/>
                  </button>
                </div>
                :
                null
            }
          </div>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
  brand: PropTypes.string,
  qty: PropTypes.number,
  attributes: PropTypes.array,
  increase: PropTypes.func,
  decrease: PropTypes.func,
  remove: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.otherData.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increase: (good) => dispatch(increaseItemQty(good)),
    decrease: (good) => dispatch(decreaseItemQty(good)),
    remove: (good) => dispatch(removeFromCart(good)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);