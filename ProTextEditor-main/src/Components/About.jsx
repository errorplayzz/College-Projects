import React, { useState } from 'react';

export default function Alert(props) {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });
    };

    return (
        <div>
            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.msg}
                    <button type="button" className="close" onClick={() => setAlert(null)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
}
