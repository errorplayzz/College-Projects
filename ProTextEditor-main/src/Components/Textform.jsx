import React, { useState } from 'react'

export default function textform(props) {
    const [text, setText] = useState('Enter text here');

    const handelUpper = () => {
        let newText = text.toUpperCase();
        setText(newText)
    }
    const handelLower = () => {
        let newText = text.toLowerCase();
        setText(newText)
    }
    const handelCapitalize = () => {
        const capitalizedText = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        setText(capitalizedText)
    }
    const handelOnChange = () => {
        setText(event.target.value)
    }

    const [btnText, setBtnText] = useState("Dark Mode")





    return (
        <div className='mainForm'>
            <form>
                <div >
                    <label htmlFor="exampleFormControlTextarea1" style={{textAlign:'center'}}> Text Here </label>
                    <textarea value={text} onChange={handelOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>
            </form>
            <div className="buttons">
            <button onClick={handelUpper}>Upper case</button>
            <button onClick={handelLower}>Lower Case</button>
            <button onClick={handelCapitalize}>Capitalize</button>


            </div>
           

            <div className='continer'>
                <h2>Your text summary </h2>
                <p>Number of text: {text.length} . </p>
                <p>Number of Character: {text.split("/\s+/").length} . </p>
                <p>Time to read: {0.008 * text.split(" ").length}Minutes </p>
                <h2>Preview</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}
