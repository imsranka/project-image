import React from 'react';

const InputFile = ({ onFileSelect }) => {
    return(
        <div>
            <input className='file' id='imgfile' type='file' accept='image/*'  onChange={onFileSelect} />
        </div>
    )
}

export default InputFile;