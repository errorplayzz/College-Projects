import React, { useState } from 'react'

export default function Alert(props) {
    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        return (
            <div>
                <div role="alert">
                    {props.alert.message} {props.alert.type}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

            </div>
        )
    }
}