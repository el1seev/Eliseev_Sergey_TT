import React from 'react';

import './error.css';

class ErrorPage extends React.Component {
    render(){
        return (
            <div className="error_page">
                <p className='error_info'>ERROR<br/>Incorrect path...</p>
            </div>
        );
    }
}

export default ErrorPage;
