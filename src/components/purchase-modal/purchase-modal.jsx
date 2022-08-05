import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./purchase-modal.css";

class PurchaseModal extends React.Component {
  render() {
    const { showPurchaseModal, setPurchaseModal } = this.props;
        
    return (
      <div className={showPurchaseModal ? "purchase-modal" : "purchase-modal-hidden"}
        onClick={() => setPurchaseModal(false)}>
        <div className="purchase-content" onClick={(e) => e.stopPropagation()}>
          <p>Thanks for buying!</p>
          <button className="link-button" onClick={() => setPurchaseModal(false)}>
            <Link to={"/"} className="shopping-link" >Shopping ahead</Link>
          </button>
        </div>
      </div>
    );
  }
}

PurchaseModal.propTypes = {
  showPurchaseModal: PropTypes.bool,
  setPurchaseModal: PropTypes.func,
};

export default PurchaseModal; 