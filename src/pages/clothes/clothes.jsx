import React from 'react';
import { connect } from 'react-redux';
import "../home/page.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterCategory } from '../../api';

class Clothes extends React.Component {
    render(){
        return(
            <div className='page-content'>
                <h1 className='page-name'>{filterCategory(this.props.categories, "clothes")}</h1>
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


export default connect(mapStateToProps)(Clothes);
