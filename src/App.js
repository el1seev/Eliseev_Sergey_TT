import React from 'react';

import {
  Routes,
  Route,
  BrowserRouter,
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
import { getAllProducts } from './redux/actions/productsActions';
import { getOtherData } from './redux/actions/other-actions';
import { connect } from 'react-redux';


class App extends React.Component {
  componentDidMount(){
    this.props.getAllProducts();
    this.props.getOtherData()
  }

  render(){
    return (

      <div className="App">
        <header>
          <NaviBar/>
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
