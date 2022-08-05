import React from "react";

import "./error.css";

class ErrorPage extends React.Component {
  render() {
    const { descriptionError } = this.props;
    return (
      <div className="error_page">
        {
          descriptionError !== undefined ?
            <p className="error_info">ERROR<br />{descriptionError}</p>
            :
            <p className="error_info">ERROR<br />Incorrect path...</p>
        }
      </div>
    );
  }
}

export default ErrorPage;
