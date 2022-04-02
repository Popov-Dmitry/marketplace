import React from 'react';
import {Alert} from "react-bootstrap";

const ErrorAlert = ({text}) => {
    return (
        <Alert variant="danger" className="error-alert">
            {text}
        </Alert>
    );
};

export default ErrorAlert;