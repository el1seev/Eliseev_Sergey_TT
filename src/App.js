import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ErrorPage from "./pages/error/error";
import Home from "./pages/home/home";
import NaviBar from "./components/navibar/navibar";
import Cart from "./pages/cart/cart";
import SingleItem from "./pages/single-item/single-item";
import { getCartInfo, getOtherData } from "./redux/actions/other-actions";
import ModalCart from "./components/modal-cart/modal-cart";
import CurrencySwither from "./components/currency-switcher/currency-swither";
import { URLS } from "./api/constans";
import PurchaseModal from "./components/purchase-modal/purchase-modal";
import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showCurrencyModal: false,
      showPurchaseModal: false,
    };
    this.setShowModal = this.setShowModal.bind(this);
    this.setCurrencyModal = this.setCurrencyModal.bind(this);
    this.setPurchaseModal = this.setPurchaseModal.bind(this);
  }

  setShowModal = (value) => {
    this.setState({ showModal: value });
  };

  setCurrencyModal = (value) => {
    this.setState({ showCurrencyModal: value });
  };

  setPurchaseModal = (value) => {
    this.setState({ showPurchaseModal: value });
  };

  componentDidMount() {
    this.props.getOtherData();
    this.props.getCartInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems || prevProps.currentCurrency !== this.props.currentCurrency) {
      this.props.getCartInfo();
    }
  }


  render() {
    const { showModal, showCurrencyModal, showPurchaseModal } = this.state;

    return (
      <div className={showModal || showPurchaseModal ? "App-modal-true" : "App-modal-false"}>
        <>
          <PurchaseModal setPurchaseModal={this.setPurchaseModal} showPurchaseModal={showPurchaseModal} />
          <CurrencySwither setCurrencyModal={this.setCurrencyModal} showCurrencyModal={showCurrencyModal} />
          <header>
            <NaviBar setShowModal={this.setShowModal} showModal={showModal} setCurrencyModal={this.setCurrencyModal}
              showCurrencyModal={showCurrencyModal} />
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/home/:name" component={Home}/>
              <Route path={`${URLS.CART_PAGE}`}>
                <Cart setPurchaseModal={this.setPurchaseModal}/>
              </Route>
              <Route path="/item/:id" component={SingleItem}/>
              <Route path="*" component={ErrorPage}/>
            </Switch>
          </main>

          <ModalCart setPurchaseModal={this.setPurchaseModal} setShowModal={this.setShowModal} showModal={showModal} />
        </>
      </div>
    );
  }
}

App.propTypes = {
  cartItems: PropTypes.array,
  currentCurrency: PropTypes.string,
  getOtherData: PropTypes.func,
  getCartInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.products.cartItems,
    currentCurrency: state.otherData.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOtherData: () => dispatch(getOtherData()),
    getCartInfo: () => dispatch(getCartInfo()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
