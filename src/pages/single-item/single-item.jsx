import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import Description from "../../components/description/description";
import { compareTo, lengthOfShipped } from "../../api";
import TextButtons from "../../components/buttons/text-buttons";
import ColorButtons from "../../components/buttons/color-buttons";
import { getCurrentItem, pushToCart } from "../../redux/actions/products-actions";
import "./single-item.css";
import ErrorPage from "../error/error";




class SingleItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.descriptionHeight = React.createRef();
    this.state = {
      mainImage: null,
      currentAttLength: null,
      activeValue: null,
    };
    this.setMainView = this.setMainView.bind(this);
    this.setCurrentAttLength = this.setCurrentAttLength.bind(this);
  }

  setMainView = (img) => {
    this.setState({ mainImage: img });
  };

  setCurrentAttLength = (length) => {
    this.setState({ currentAttLength: length });
  };

  setActiveValue = (value) => {
    this.setState({ activeValue: value });
  };

  componentDidMount(){
    this.props.getCurrentItem(this.props.match.params.id);
  }
  
  componentDidUpdate(prevState, prevProps) {
    if(this.props.currentItem.error !== true && prevState.activeValue !== this.state.activeValue){
      this.setCurrentAttLength(lengthOfShipped(this.props.currentItem));
    }
    // if(this.props.currentItem.error !== true && prevProps.currentItem !== this.props.currentItem){
    //   this.setMainView(this.props.currentItem.gallery[0]);
    // }
  }


  render() {
    const { currentItem, pushToCart, currentCurrency, currentItemLoader } = this.props;
    const { mainImage, currentAttLength } = this.state;

    return (
      <>
        {
          currentItemLoader !== false ? 
            <p>Loading...</p>
            :
            currentItem.error !== true ?
              <div className="single-item-component">
                <div className="wrap-of-small-img">
                  {
                    (currentItem.gallery.map((image) => (
                      <button className="switch-image" onClick={() => this.setMainView(image)}>
                        <img src={image} className="small-single-item-showcase" alt={currentItem.name} />
                      </button>
                    )))
                  }
                </div>

                {
                  currentItem.inStock ? 
                    <img src={mainImage || currentItem.gallery[0]}
                      className="single-item-showcase" alt={currentItem.name} />
                    :
                    <div className="out-of-stock">
                      <img src={mainImage || currentItem.gallery[0]} className="single-item-showcase"
                        alt={currentItem.name} style={{opacity: 0.5}}/>
                      <p className="out-of-stock-text">OUT OF STOCK</p>
                    </div>
                }

                <div className="single-item-info">
                  <h1 className="brand">{currentItem.brand}</h1>
                  <h2 className="name">{currentItem.name}</h2>
                  {
                    currentItem.inStock ?
                      null
                      :
                      <p className="out-of-stock-alert">OUT OF STOCK</p>
                  }

                  {
                    (currentItem.attributes.map(property => (
                      property.length !== 0 ?
                        (
                          property.type === "text" ?
                            <TextButtons property={property} setActiveValue={this.setActiveValue} />
                            :
                            <ColorButtons property={property} setActiveValue={this.setActiveValue} />
                        )
                        :
                      // eslint-disable-next-line react/jsx-indent
                        <></>
                    )))
                  }

                  <div className="wrap-of-price">
                    <p className="p-price">PRICE:</p>
                    {
                      (
                        <p className="price">{compareTo(currentItem, currentCurrency)}</p>
                      )
                    }
                  </div>
                  {
                    currentItem.inStock && currentItem.attributes.length === currentAttLength ?
                      <button className="add-from-single" 
                        onClick={() => pushToCart(currentItem)}>ADD TO CART</button>
                      :
                      <button className="add-from-single-blocked">ADD TO CART</button>
                  }
                  <Description description={currentItem.description}/>
                </div>
              </div>
              :
              <ErrorPage descriptionError={currentItem.descriptionError}/>
        }
      </>
    );
  }
}

SingleItem.propTypes = {
  match: PropTypes.object,
  currentItem: PropTypes.object,
  currentCurrency: PropTypes.string,
  currentItemLoader: PropTypes.bool,
  getCurrentItem: PropTypes.func,
  pushToCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentItem: state.products.currentItem,
    currentCurrency: state.otherData.currentCurrency,
    currentItemLoader: state.loadersInfo.currentItemLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentItem: (itemId) => dispatch(getCurrentItem(itemId)),
    pushToCart: (good) => dispatch(pushToCart(good)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleItem));