import React from "react";

export default class Arrow extends React.Component {
    render() {
        
        return (
            <>
                <svg className={this.props.rotate ? "arrow-down" : "arrow-up"}
                    width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 3.5L4 0.5L7 3.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </>
        );
    }
}