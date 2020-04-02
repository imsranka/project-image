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

  /* To check dimensions of image */
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

  /* Check extension */
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

  /* Getting selected file from filelist */
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

  onImageLoaded = (image) => {
    this.imageRef = image ;
    console.log('image'+ this.imageRef);
  }

  onCropComplete = (crop) => {
    this.performCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
    console.log('onCropChange'+crop);
  };

  async performCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImgUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImgUrl });
    }
    console.log('crop url'+ this.state.croppedImgUrl);
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
        this.setState({ blob:blob });
      }, "image/jpeg");
      
    });
  }

  handleUploadClick = (blob) => {
    //var blob = this.state.blob;
    fetch('http://localhost:3000/upload',
    {
      method : 'POST',
      body : blob
    })
    .then(response => response.json())
    .then(res=>console.log(res))
    .thenconsole.log('fetch done')
  }

  render() {
    const { isImgValidSize, src, crop, croppedImgUrl, blob } = this.state;
    return(
      <div className="App">
      {/*
        <InputURL 
        handleInput={this.handleInput}
        onSubmit={this.onSubmit}  
        />
      */}
        <div className="FileInput">
          <InputFile
            onFileSelect={ this.onFileSelect }
          />
        </div>
        {isImgValidSize  && (
          <div className="OrgImg">
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </div>
        )}
        {croppedImgUrl && (
          <div className="CropImg">
            <div>
              <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImgUrl} />
            </div>
            <div>
              <button onClick={ (blob)=> this.handleUploadClick(blob) }>Upload</button>
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default App;