import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { getCurrentCategoryProducts } from "../../redux/actions/products-actions";
import ErrorPage from "../error/error";
import "./page.css";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: null,
    };
    this.setProducts = this.setProducts.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading = (value) => {
    this.setState({ loading: value });
  };

  setProducts = (response) => {
    this.setState({ products: response});
  };

  componentDidMount(){
    if( this.props.match.params.name !== undefined){
      this.props.getCurrentCategoryProducts(this.props.match.params.name);
    } else {
      this.props.getCurrentCategoryProducts("all");
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.name !== this.props.match.params.name){
      if( this.props.match.params.name !== undefined ){
        this.props.getCurrentCategoryProducts(this.props.match.params.name);
      } else {
        this.props.getCurrentCategoryProducts("all");
      }
    }
  }

  render() {
    
    const { currentCategoryProducts, categoryLoader, match} = this.props;
    const { params } = match;
    const { name } = params;

    return (
      <>
        {
          categoryLoader !== false ?
            <p>Loading...</p>
            :
            currentCategoryProducts.error !== true ?
              <div className="page-content">
                <h1 className="page-name">{name !== undefined ? name : "all"} </h1>
                <div className="gallery">
                  {
                    (currentCategoryProducts.map((item) => (
                      item.inStock ?
                        <ItemInStock key={item.id} item={item} />
                        :
                        <ItemOutOfStock key={item.id} item={item} />
                    )))
                  }
                </div>
              </div>
              :
              <ErrorPage descriptionError={currentCategoryProducts.descriptionError}/>
        }
      </>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object,
  currentCategoryProducts: PropTypes.array || PropTypes.string,
  categoryLoader: PropTypes.bool,
  getCurrentCategoryProducts: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentCategoryProducts: state.products.currentCategoryProducts,
    categoryLoader: state.loadersInfo.categoryLoader,
    categories: state.otherData.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentCategoryProducts: (categoryName) => dispatch(getCurrentCategoryProducts(categoryName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));