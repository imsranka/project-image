import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
//import InputURL from './components/InputURL/InputURL';
import InputFile from './components/InputFile/InputFile';
//import logo from './logo.svg';
import './App.css';

// const initialState = {
//   uploadType:'',
//   input:''
// };

class App extends Component {

  constructor() {
    super();
    this.state = {
      src : null,
      imageRef : React.createRef(),
      croppedImgUrl:'',
      isImgValidSize : false,
      crop :{
        unit : 'px',
        aspect : 1/1
      }
    }
  }

  checkSize = () => {
    var myImg = document.createElement("img");
    myImg.src = this.state.src;
    myImg.addEventListener('load', () => {
      var imgHeight = myImg.naturalHeight;
      var imgWidth = myImg.naturalWidth;

      if(imgHeight === 1024 && imgWidth === 1024){
        console.log('success size');
        this.setState({ isImgValidSize : true });
      } 
      else {
        alert('enter 1024*1024 image');
      }
    })
  }

  checkExt = (imgUrl) => {
    var extArr = ['jpg','svg','png'];
    var ext =imgUrl.split('.').pop();
    console.log(ext);
    if(extArr.includes(ext)) {
      console.log('success');
      this.checkSize();
    }
    else {
      alert('Unable to retrieve image');
    }
  }

  handleInput = (e) => {

     this.setState({input: e.target.value});
    
    //this.setState({input: e.clipboardData.getData('text')});
    console.log(this.state.input);
    var imgUrl = document.querySelector("#img").value;
    //this.state.input;
    this.checkExt(imgUrl);

  }

  onFileSelect = (e) =>{
    var file = e.target.files;
    if( file && file.length > 0 ){
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
        this.checkSize();        //console.log(this.state.src);
      });
    }
  }

  

  onSubmit = () => {

  }

  render() {
    const { isImgValidSize, src, crop, croppedImgUrl } = this.state;
    return(
      <div className="App">
      {/*
        <InputURL 
        handleInput={this.handleInput}
        onSubmit={this.onSubmit}  
        />
      */}
        <InputFile
          onFileSelect={ this.onFileSelect }
        />
        { 
          isImgValidSize  &&
          <div>
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </div>
        }

      </div>
    )
  }
}

export default App;