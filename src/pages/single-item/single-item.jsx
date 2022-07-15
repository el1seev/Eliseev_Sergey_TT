import React from "react";
import { connect } from "react-redux";
import { createMarkup, compareTo, lengthOfShipped } from "../../api";
import TextButtons from "../../components/buttons/text-buttons";
import ColorButtons from "../../components/buttons/color-buttons";

import "./single-item.css";
import { pushToCart } from "../../redux/actions/productsActions";


class SingleItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.descriptionHeight = React.createRef();
        this.state = {
            images: null,
            currentAttLength: null,
            activeValue: null,
            descriptionHeight: 0,
            fullDescription: false,
        }
        this.setMainView = this.setMainView.bind(this);
        this.setCurrentAttLength = this.setCurrentAttLength.bind(this);
        this.setDescriptionHeight = this.setDescriptionHeight.bind(this);
        this.setFullDescription = this.setFullDescription.bind(this);
    }

    setMainView = (img) => {
        this.setState({ images: img });
    };

    setCurrentAttLength = (length) => {
        this.setState({ currentAttLength: length });
    };

    setActiveValue = (value) => {
        this.setState({ activeValue: value });
    };

    setDescriptionHeight = (value) => {
        this.setState({ descriptionHeight: value });
    };

    setFullDescription = (value) => {
        this.setState({ fullDescription: value });
    };

    componentDidMount() {
        this.setDescriptionHeight(this.descriptionHeight.current.offsetHeight);
        this.setMainView(this.props.currentItem.gallery[0]);
        if (this.props.currentItem.attributes === undefined) {
            this.setCurrentAttLength(undefined);
        } else {
            this.setCurrentAttLength(0);
        }
    }

    componentDidUpdate(prevState) {
        if (prevState.activeValue !== this.state.activeValue) {
            this.setCurrentAttLength(lengthOfShipped(this.props.currentItem));
        }
    }

    render() {
        const { currentItem } = this.props;
        const props = {
            currentItem: {
                brand: currentItem.brand,
                name: currentItem.name,
                gallery: currentItem.gallery,
                inStock: currentItem.inStock,
                description: currentItem.description,
                attributes: currentItem.attributes,
            }
        }
        let { currentItem: { brand, name, gallery, inStock, description, attributes } } = props;
        return (
            <div className="single-item-component">

                <div className="wrap-of-small-img">
                    {
                        (gallery.map((images) => (
                            <button className="switch-image" onClick={() => this.setMainView(images)}>
                                <img src={images} className="small-single-item-showcase" alt={name} />
                            </button>
                        )))
                    }
                </div>

                <img src={this.state.images} className="single-item-showcase" alt={name} />

                <div className="single-item-info">
                    <h1 className="brand">{brand}</h1>
                    <h2 className="name">{name}</h2>
                    {
                        inStock ?
                            null
                            :
                            <p className="out-of-stock-alert">OUT OF STOCK</p>
                    }

                    {
                        (attributes.map(property => (
                            property.length !== 0 ?
                                (
                                    property.type === 'text' ?
                                        <TextButtons property={property} setActiveValue={this.setActiveValue} />
                                        :
                                        <ColorButtons property={property} setActiveValue={this.setActiveValue} />
                                )
                                :
                                <></>
                        )))
                    }

                    <div className="wrap-of-price">
                        <p className="p-price">PRICE:</p>
                        {
                            (
                                <p className="price">{compareTo(currentItem, this.props.currentCurrency)}</p>
                            )
                        }
                    </div>
                    {
                        inStock && attributes.length === this.state.currentAttLength ?
                            <button className="add-from-single" 
                            onClick={() => this.props.pushToCart(currentItem)}>ADD TO CART</button>
                            :
                            <button className="add-from-single-blocked">ADD TO CART</button>
                    }
                    <div className="description">
                        <div ref={this.descriptionHeight}
                            className={this.state.descriptionHeight >= 150 && !this.state.fullDescription ?
                                "description-data-more"
                                :
                                "description-data-less"}
                            dangerouslySetInnerHTML={createMarkup(description)} />
                        {
                            this.state.descriptionHeight >= 150 ?
                                this.state.fullDescription ?
                                    <button className="show-more-button" onClick={() => this.setFullDescription(false)}>SHOW LESS</button>
                                    :
                                    <button className="show-more-button" onClick={() => this.setFullDescription(true)}>SHOW MORE</button>
                                :
                                null
                        }
                    </div>
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
        pushToCart: (good) => dispatch(pushToCart(good)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);