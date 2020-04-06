import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import swal from 'sweetalert'
//import InputURL from './components/InputURL/InputURL';
import InputFile from './components/InputFile/InputFile';
import {base64StringtoBlob} from './ReusableUtils'
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      src : '',
      imageRef : React.createRef(),
      croppedImgUrl:'',
      isImgValidSize : '',
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
        swal("OOPS!!",
         "Select 1024*1024 Image", 
         "error",
         {closeOnClickOutside: true}
         );
      }
    })
  }

  /* Getting selected file from filelist */
  onFileSelect = (e) =>{
    var file = e.target.files;
    if( file && file.length > 0 ){
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
        this.checkSize();
      });
      if( !this.state.isImgValidSize ) {
        this.setState({ src: null })
      }        //console.log(this.state.src);
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
    var base64String;
    if (this.imageRef && crop.width && crop.height) {
      const croppedImgUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImgUrl });
      var fimg = new FileReader();
      fimg.readAsDataURL(this.state.blob);
      fimg.onloadend = ()=> {
        base64String = fimg.result;
        console.log(base64String);
        this.setState({base64Str:base64String});
      };

    }
   
    console.log('crop url'+ this.state.croppedImgUrl);
    //console.log(this.state.blobImg);
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
 

  handleUploadClick = () => {
    var blobImg = base64StringtoBlob(this.state.base64Str);
    blobImg.name='hello';
    console.log(blobImg);
    const formBlob=new FormData();
    formBlob.append("image",blobImg);
    console.log(formBlob.get("image"));

    fetch('http://localhost:3000/upload',
    {
      method : 'POST',
      body : formBlob,
      
    })
    .then(res=>res.json())
    .then(response=> {
        var url = document.createElement('a');
        url.href = response.data.imageurl;
        url.target = "_blank";
        url.innerText = "Check your file"
        swal(response.message,{
          content: url
        })
      }
    )
    .catch(err=>console.log(err))
    
  }


  render() {
    const { isImgValidSize, src, crop, croppedImgUrl} = this.state;
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
        {isImgValidSize ? (
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
        )
        :null
        }
        {croppedImgUrl && (
          <div className="CropImg">
            <div>
              <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImgUrl} />
            </div>
            <div>
              <button className='btnUpload' onClick={  this.handleUploadClick }>Upload</button>
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default App;