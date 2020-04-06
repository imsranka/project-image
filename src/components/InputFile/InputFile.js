import React, { useRef } from 'react';
import './InputFile.css'

const InputFile = ({ onFileSelect }) => {
    var fileInput = useRef();
    return(
        <div className='container'>
            <input 
            style={{display:'none'}}
            className='file' 
            id='imgfile' 
            type='file' 
            accept='image/*'  
            onChange={onFileSelect} 
            ref={fileIn => fileInput = fileIn}
            />
            <button className ='refbtn' onClick={() => { fileInput.click() }}>Select File</button>
        </div>
    )
}

export default InputFile;