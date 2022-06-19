import { connect } from "react-redux";
import  React  from "react";
import { setSelectedAttribute , setCurrentAttribute} from "../../redux/actions/productsActions";

class WrapOfButtons extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active: null
        }
        this.setActive = this.setActive.bind(this);
    }

    setActive = (name ,value) => {
        this.setState({active: value});
        this.props.setSelectedAttribute({ name: name, value: value})
    };


    render(){
        
        return(
            <>
            {
                        (<div className="wrap-of-text">
                            <p className="text">{this.props.item.name}:</p>
                            <div className="wrap-of-text-buttons">
                            {  
                                // ADD THIS CONDITION  BUTTON === ACTIVE ? RETURN BUTTON WITHOUT CLICK EVENT : RETURN BUTTON WITH CLICK EVENT (?????)
                                    (this.props.item.items.map((element) => (
                                        this.props.item.selected !== undefined ?
                                        this.props.item.selected === element.value ? 
                                        <button className="text-button-active">{element.value}</button>
                                        :
                                        <button className="text-button" onClick={() => this.setActive(this.props.item.name, element.value)} >{element.value}</button>
                                        :
                                        <button className="text-button" onClick={() => this.setActive(this.props.item.name, element.value)} >{element.value}</button>
                                    )))
                            }
                            </div>
                        </div>)
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: state.products.currentItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedAttribute: (attribute) => dispatch(setCurrentAttribute(attribute))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapOfButtons)