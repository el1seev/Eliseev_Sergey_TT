import React from "react";
import { connect } from "react-redux";
import {createMarkup, compareTo} from "../../api";
import WrapOfTextButtons from '../../components/wraps-of-buttons/wrap-text-buttons';
import WrapOfColorButtons from '../../components/wraps-of-buttons/wrap-color-buttons';
// import Add from "../../components/img/add-button.png";

import "./single-item.css";
import { pushToCart } from "../../redux/actions/productsActions";


class SingleItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images: null,
        }
        this.setMainView = this.setMainView.bind(this);
    }

        setMainView = (img) => {
            this.setState({ images: img})
        };


        componentDidMount(){
            this.setMainView(this.props.currentItem.gallery[0]);
        }

    render(){
        return(
            <div className="single-item-component">

                <div className="wrap-of-small-img">
                    {
                        ( this.props.currentItem.gallery.map((images) => (
                            <button className="switch-image" onClick={() => this.setMainView(images)}>
                                <img src={images} className="small-single-item-showcase" alt={this.props.currentItem.name}/>
                            </button>
                        )))
                    }
                </div>

                <img src={this.state.images} className="single-item-showcase" alt={this.props.currentItem.name}/>


            <div className="single-item-info">
                <h1 className="brand">{this.props.currentItem.brand}</h1>
                <h2 className="name">{this.props.currentItem.name}</h2>

                {
                    (this.props.currentItem.attributes.map(item => (
                        item.length !== 0 ?
                            (
                            item.type === 'text' ?
                                <WrapOfTextButtons item={item}/> 
                                :
                                <WrapOfColorButtons item={item}/>
                            )
                            :
                            <></>
                    )))
                }

                <div className="wrap-of-price">
                <p className="p-price">PRICE:</p>
                            {
                                (
                                    <p className="price">{compareTo(this.props.currentItem, this.props.currentCurrency)}</p>
                                )
                            }
                </div>
                {
                    this.props.currentItem.inStock === true ?
                    <button className="add-from-single" onClick={() => this.props.pushToCart(this.props.currentItem)}>ADD TO CART</button>
                    :
                    <button className="add-from-single-blocked">ADD TO CART</button>
                }
                <div className="description" dangerouslySetInnerHTML={createMarkup(this.props.currentItem.description)}/>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: state.products.currentItem,
        currentCurrency: state.otherData.currentCurrency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pushToCart: (good) => dispatch(pushToCart(good))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)