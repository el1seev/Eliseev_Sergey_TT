import React from "react";
import { connect } from "react-redux";

import { createJSX, getNodes } from "../../api/convertToJSX";
import "./description.css";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.descriptionHeight = React.createRef();
    this.state = {
      descriptionHeight: 0,
      fullDescription: false,
    };
    this.setDescriptionHeight = this.setDescriptionHeight.bind(this);
    this.setFullDescription = this.setFullDescription.bind(this);
  }
  setDescriptionHeight = (value) => {
    this.setState({ descriptionHeight: value });
  };

  setFullDescription = (value) => {
    this.setState({ fullDescription: value });
  };

  componentDidMount(){
    this.setDescriptionHeight(this.descriptionHeight.current.offsetHeight);
  }
  
  render() {
    const { description } = this.props;
    const { descriptionHeight, fullDescription} = this.state;

    return (
      <div className="description">
        <div ref={this.descriptionHeight}
          className={descriptionHeight >= 150 && !fullDescription ?
            "description-data-more"
            :
            "description-data-less"}>
          {
            createJSX(Array.from(getNodes(description)))
          }
        </div>
        {
          descriptionHeight >= 150 ?
            fullDescription ?
              <button className="show-more-button" onClick={() => this.setFullDescription(false)}>SHOW LESS</button>
              :
              <button className="show-more-button" onClick={() => this.setFullDescription(true)}>SHOW MORE</button>
            :
            null
        }
      </div>
    );
  }
}

export default connect()(Description);