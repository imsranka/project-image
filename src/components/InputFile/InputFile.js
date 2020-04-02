import React, { useRef } from 'react';

const InputFile = ({ onFileSelect }) => {
    var fileInput = useRef();
    return(
        <div>
            <input 
            style={{display:'none'}}
            className='file' 
            id='imgfile' 
            type='file' 
            accept='image/*'  
            onChange={onFileSelect} 
            ref={fileIn => fileInput = fileIn}
            />
            <button onClick={() => { fileInput.click() }}>Select File</button>
        </div>
    )
}

export default InputFile;