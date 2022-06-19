import { connect } from 'react-redux';
import React from 'react';
import "../home/home.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterTechCategory } from '../../api';


class Tech extends React.Component {
    render(){
        return(
            <div className='home'>
                <h1 className='h1-cart'>{filterTechCategory(this.props.categories)}</h1>
                <div className='gallery'>
                {
                    ( this.props.tech.map(( item) => (
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
        tech: state.products.tech,
        categories: state.otherData.categories,
    }
}

export default connect(mapStateToProps)(Tech)