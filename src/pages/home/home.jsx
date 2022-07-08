import React from 'react';
import { connect } from 'react-redux';
import "./page.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterCategory } from '../../api';


class Home extends React.Component {
    render(){
        return(
            <div className='page-content'>
                
                <h1 className='page-name'>{filterCategory(this.props.categories, "all")}</h1>
                <div className='gallery'>
                {   this.props.all !== undefined ? 
                    ( this.props.all.map(( item) => (
                        item.inStock === true ?
                        <ItemInStock key={item.id} item={item}/>
                        :
                        <ItemOutOfStock key={item.id} item={item}/>
                    )
                    ))
                    :
                    null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        all: state.products.all,
        categories: state.otherData.categories,
    }
}



export default connect(mapStateToProps)(Home);