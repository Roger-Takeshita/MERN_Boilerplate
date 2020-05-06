import React, { useEffect } from 'react';

function ErrorMessage({ message, doneErrorMessage }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            doneErrorMessage();
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [message, doneErrorMessage]);

    return <div className="error-message">{message}</div>;
}

export default ErrorMessage;
