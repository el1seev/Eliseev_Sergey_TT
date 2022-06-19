import React from 'react';
import "./home.css";
import { connect } from 'react-redux';

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterAllCategory } from '../../api';


class Home extends React.Component {

    render(){
        return(
            <div className='home'>
                
                <h1 className='h1-cart'>{filterAllCategory(this.props.categories)}</h1>

                <div className='gallery'>
                {   this.props.all !== undefined ? 
                    ( this.props.all.map(( item) => (
                        // <Item key={item.id} item={item}/>
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



export default connect(mapStateToProps)(Home)