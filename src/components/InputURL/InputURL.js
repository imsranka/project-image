import React from 'react';

const InputURL = ({ handleInput, onSubmit }) => {

    handleInput = (e) => {
        this.setState({input: e.target.value});
        console.log(this.state.input);
        var imgUrl = document.querySelector("#img").value;
        this.checkExt(imgUrl);
      }

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