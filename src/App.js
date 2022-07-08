import React from 'react';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import ErrorPage from './pages/error/error';
import Home from './pages/home/home';
import NaviBar from './components/navibar/navibar';
import './App.css'
import Tech from './pages/tech/tech';
import Clothes from './pages/clothes/clothes';
import Cart from './pages/cart/cart';
import SingleItem from './pages/single-item/single-item';
import { getAllProducts} from './redux/actions/productsActions';
import { getOtherData } from './redux/actions/other-actions';
import { connect } from 'react-redux';
import ModalCart from './components/modal-cart/modal-cart';
import CurrencySwither from './components/currency-switcher/currency-swither';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      showCurrencyModal: false,
    }
    this.setShowModal = this.setShowModal.bind(this);
    this.setCurrencyModal = this.setCurrencyModal.bind(this);
  }

  setShowModal = (value) => {
    this.setState({showModal: value});
  }

  setCurrencyModal = (value) => {
    this.setState({showCurrencyModal: value});
  }

  componentDidMount(){
    this.props.getAllProducts();
    this.props.getOtherData();
  }


  render(){
    return (

      <div className={this.state.showModal  ? "App-modal-true" : "App-modal-false"}>
        <>
        <CurrencySwither setCurrencyModal={this.setCurrencyModal} showCurrencyModal={this.state.showCurrencyModal}/>
        <header>
          <NaviBar setShowModal={this.setShowModal} showModal={this.state.showModal} setCurrencyModal={this.setCurrencyModal} showCurrencyModal={this.state.showCurrencyModal}/>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/all' element={<Home/>}/>
            <Route path='/clothes' element={<Clothes/>}/>
            <Route path='/tech' element={<Tech/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/singleitem/:id' element={ this.props.current !== null ? <SingleItem/> : <Navigate to="/" />}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </main>
        <ModalCart setShowModal={this.setShowModal} showModal={this.state.showModal}/>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    current: state.products.currentItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getAllProducts: () => dispatch(getAllProducts()),
      getOtherData: () => dispatch(getOtherData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
