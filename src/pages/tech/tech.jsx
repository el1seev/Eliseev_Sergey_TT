import { connect } from 'react-redux';
import React from 'react';
import "../home/page.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterCategory } from '../../api';


class Tech extends React.Component {
    render(){
        return(
            <div className='page-content'>
                <h1 className='page-name'>{filterCategory(this.props.categories, "tech")}</h1>
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

export default connect(mapStateToProps)(Tech);