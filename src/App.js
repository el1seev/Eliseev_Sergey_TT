import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ErrorPage from "./pages/error/error";
import Home from "./pages/home/home";
import NaviBar from "./components/navibar/navibar";
import "./App.css";
import Tech from "./pages/tech/tech";
import Clothes from "./pages/clothes/clothes";
import Cart from "./pages/cart/cart";
import SingleItem from "./pages/single-item/single-item";
import { getAllProducts } from "./redux/actions/productsActions";
import { getCartInfo, getOtherData } from "./redux/actions/other-actions";
import { connect } from "react-redux";
import ModalCart from "./components/modal-cart/modal-cart";
import CurrencySwither from "./components/currency-switcher/currency-swither";
import { URLS } from "./api/constans";
import PurchaseModal from "./components/purchase-modal/purchase-modal";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showCurrencyModal: false,
      showPurchaseModal: false,
    }
    this.setShowModal = this.setShowModal.bind(this);
    this.setCurrencyModal = this.setCurrencyModal.bind(this);
    this.setPurchaseModal = this.setPurchaseModal.bind(this);
  }

  setShowModal = (value) => {
    this.setState({ showModal: value });
  }

  setCurrencyModal = (value) => {
    this.setState({ showCurrencyModal: value });
  }

  setPurchaseModal = (value) => {
    this.setState({ showPurchaseModal: value });
  }

  componentDidMount() {
    this.props.getAllProducts();
    this.props.getOtherData();
    this.props.getCartInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems || prevProps.currentCurrency !== this.props.currentCurrency) {
      this.props.getCartInfo();
    }
  }


  render() {
    const { currentItem } = this.props;
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
            <Routes>
              <Route path={`${URLS.HOME_PAGE}`} element={<Home />} />
              <Route path={`${URLS.ALL_PAGE}`} element={<Home />} />
              <Route path={`${URLS.CLOTHES_PAGE}`} element={<Clothes />} />
              <Route path={`${URLS.TECH_PAGE}`} element={<Tech />} />
              <Route path={`${URLS.CART_PAGE}`} element={<Cart setPurchaseModal={this.setPurchaseModal} />} />
              <Route path={`${URLS.SINGLE_ITEM_PAGE}:id`}
                element={currentItem !== null ?
                  <SingleItem />
                  :
                  <Navigate to={`${URLS.HOME_PAGE}`} />} />
              <Route path={`${URLS.ERROR_PAGE}`} element={<ErrorPage />} />
            </Routes>
          </main>

          <ModalCart setPurchaseModal={this.setPurchaseModal} setShowModal={this.setShowModal} showModal={showModal} />
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.products.currentItem,
    cartItems: state.products.cartItems,
    currentCurrency: state.otherData.currentCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    getOtherData: () => dispatch(getOtherData()),
    getCartInfo: () => dispatch(getCartInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
