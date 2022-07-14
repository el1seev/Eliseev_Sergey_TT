import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { URLS } from '../../api/constans';
import "./purchase-modal.css";

class PurchaseModal extends React.Component {

    render() {
        return (
            <div className={this.props.showPurchaseModal ? "purchase-modal" : "purchase-modal-hidden"}
            onClick={() => this.props.setPurchaseModal(false)}>
                <div className="purchase-content" onClick={(e) => e.stopPropagation()}>
                    <p>Thanks for buying!</p>
                    <button className='link-button' onClick={() => this.props.setPurchaseModal(false)}>
                        <Link to={`${URLS.ALL_PAGE}`} className='shopping-link' >Shopping ahead</Link>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentCurrency: state.otherData.currentCurrency,
    }
}

export default connect(mapStateToProps)(PurchaseModal); 