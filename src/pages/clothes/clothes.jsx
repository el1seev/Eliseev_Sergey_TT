import React from "react";
import { connect } from "react-redux";
import "../home/page.css";

import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterCategory } from "../../api";
import { FILTER_PARAMS } from "../../api/constans";
import PropTypes from "prop-types";

class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.setLoading = this.setLoading.bind(this);
    }

    setLoading = (value) => {
        this.setState({ loading: value });
    }

    componentDidMount() {
        this.setLoading(this.props.loading);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading !== this.props.loading){
            this.setLoading(this.props.loading);
        }
    }

    render() {
        const { clothes, categories } = this.props;
        const { loading } = this.state;

        return (
            <div className="page-content">
                <h1 className="page-name">{filterCategory(categories, FILTER_PARAMS.CLOTHES)}</h1>
                <div className="gallery">
                    {
                        loading ?
                            <p>Loading...</p>
                            :
                            (clothes.map((item) => (
                                item.inStock ?
                                    <ItemInStock key={item.id} item={item} />
                                    :
                                    <ItemOutOfStock key={item.id} item={item} />
                            )))
                    }
                </div>
            </div>
        )
    }
}

Clothes.propTypes = {
    clothes: PropTypes.array,
    categories: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        clothes: state.products.clothes,
        categories: state.otherData.categories,
        loading: state.otherData.loading,
    }
}


export default connect(mapStateToProps)(Clothes);
