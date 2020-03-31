import React from 'react';

const InputURL = ({ handleInput, onSubmit }) => {
    return(
        <div>
            <input className='image' id='img' type='text' autoFocus onInput={handleInput}/>
            <button onClick={onSubmit}>
                Upload
            </button>
        </div>

    )
}

export default InputURL;