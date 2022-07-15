import React from "react";
import Increase from "../../assets/img/increase.png";
import Decrease from "../../assets/img/decrease.png";
import { compareTo } from "../../api";
import TextButtons from "../buttons/text-buttons";
import ColorButtons from "../buttons/color-buttons";
import Next from "../../assets/img/next.png";
import Prev from "../../assets/img/prev.png";


import "./cart-item.css";
import { connect } from "react-redux";
import { decreaseItemQty, increaseItemQty, removeFromCart } from "../../redux/actions/productsActions";

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            currentImg: null,
        }
        this.setNextImg = this.setNextImg.bind(this);
        this.setPrevImg = this.setPrevImg.bind(this);
    }

    setNextImg = () => {
        if (this.state.currentCount >= this.props.item.gallery.length - 1) {
            this.setState({ currentImg: this.props.item.gallery[0] });
            this.setState({ currentCount: 0 });
        } else {
            this.setState({ currentImg: this.props.item.gallery[this.state.currentCount + 1] });
            this.setState({ currentCount: this.state.currentCount + 1 });
        }
    };

    setPrevImg = () => {
        if (this.state.currentCount - 1 < 0) {
            this.setState({ currentImg: this.props.item.gallery[this.props.item.gallery.length - 1] });
            this.setState({ currentCount: this.props.item.gallery.length - 1 });
        } else {
            this.setState({ currentImg: this.props.item.gallery[this.state.currentCount - 1] });
            this.setState({ currentCount: this.state.currentCount - 1 });
        }
    };

    componentDidMount() {
        this.setState({ currentImg: this.props.item.gallery[0] });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item) {
            this.setState({ currentImg: this.props.item.gallery[0] });
        }
    }

    render() {
        const { item } = this.props;
        const props = {
            item: {
                brand: item.brand,
                name: item.name,
                gallery: item.gallery,
                attributes: item.attributes,
                qty: item.qty,
            }
        }
        let { item: { brand, name, gallery, attributes, qty} } = props;
        return (
            <div className="cart-item-component">
                <div className="cart-item-info">
                    <h1 className="brand">{brand}</h1>
                    <h2 className="name">{name}</h2>

                    <p className="price">{compareTo(item, this.props.currentCurrency)}</p>
                    {
                        (attributes.map(property => (
                            property.length !== 0 ?
                                (
                                    property.type === 'text' ?
                                        <TextButtons property={property} cartButtons={true} />
                                        :
                                        <ColorButtons property={property} cartButtons={true} />
                                )
                                :
                                <></>
                        )))
                    }
                </div>

                <div className="counter-showcase-wrap">
                    <div className="counter-buttons">
                        <button className="crease">
                            <img className="count-button" src={Increase} onClick={() => this.props.increase(item)} />
                        </button>
                        <p className="count">{qty}</p>
                        {
                            qty >= 2 ?
                                <button className="crease">
                                    <img className="count-button" src={Decrease} onClick={() => this.props.decrease(item)} />
                                </button>
                                :
                                <button className="crease">
                                    <img className="count-button" src={Decrease} onClick={() => this.props.remove(item)} />
                                </button>
                        }
                    </div>

                    <div className="cart-item-gallery">
                        <img src={this.state.currentImg} className="cart-item-showcase" />
                        {
                            gallery.length !== 1 ?
                                <div className="wrap-of-gallery-buttons">
                                    <button className="previous-button-gallery" onClick={() => this.setPrevImg()}>
                                        <img className="previous-img" src={Prev} />
                                    </button>
                                    <button className="next-button-gallery" onClick={() => this.setNextImg()}>
                                        <img className="next-img" src={Next} />
                                    </button>
                                </div>
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
        currentCurrency: state.otherData.currentCurrency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increase: (good) => dispatch(increaseItemQty(good)),
        decrease: (good) => dispatch(decreaseItemQty(good)),
        remove: (good) => dispatch(removeFromCart(good)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);