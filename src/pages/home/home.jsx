import React from "react";
import { connect } from "react-redux";
import "./page.css";
import ItemInStock from "../../components/item/in-stock";
import ItemOutOfStock from "../../components/item/out-of-stock";
import { filterCategory } from "../../api";
import { FILTER_PARAMS } from "../../api/constans";
import PropTypes from "prop-types";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.setLoading = this.setLoading.bind(this);
    }

    setLoading = (value) => {
        this.setState({ loading: value })
    }

    componentDidMount() {
        this.setLoading(this.props.loading);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading !== this.props.loading)
            this.setLoading(this.props.loading);
    }

    render() {
        const { all, categories } = this.props;
        const { loading } = this.state;

        return (
            <div className="page-content">
                <h1 className="page-name">{filterCategory(categories, FILTER_PARAMS.ALL)}</h1>
                <div className="gallery">
                    {
                        loading ?
                            <p>Loading...</p>
                            :
                            (all.map((item) => (
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

Home.propTypes = {
    all: PropTypes.array,
    categories: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        all: state.products.all,
        categories: state.otherData.categories,
        loading: state.otherData.loading,
    }
}



export default connect(mapStateToProps)(Home);