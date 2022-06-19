import React from 'react';
import { connect } from 'react-redux';
import "../home/home.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterClothesCategory } from '../../api';

class Clothes extends React.Component {
    render(){
        return(
            <div className='home'>
                <h1 className='h1-cart'>{filterClothesCategory(this.props.categories)}</h1>
                <div className='gallery'>
                {
                    ( this.props.clothes.map(( item) => (
                        item.inStock === true ?
                        <ItemInStock key={item.id} item={item}/>
                        :
                        <ItemOutOfStock key={item.id} item={item}/>
                    )
                    ))
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clothes: state.products.clothes,
        categories: state.otherData.categories,
    }
}


export default connect(mapStateToProps)(Clothes)
