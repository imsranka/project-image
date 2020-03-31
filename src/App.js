import React, { Component } from 'react';
import InputURL from './components/InputURL/InputURL';
//import InputFile from './components/InputFile/InputFile';
//import logo from './logo.svg';
import './App.css';

const initialState = {
  uploadType:'',
  input:''
};

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  checkSize = () => {
    var myImg = document.createElement("img");
    myImg.src = this.state.input;
    myImg.addEventListener('load', function() {
      var imgHeight=myImg.height;
      var imgWidth=myImg.width;

      if(imgHeight === 1024 && imgWidth === 1024){
        console.log('success size');
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

  

  onSubmit = () => {

  }

  render() {
    return(
      <div className="App">
      
        <InputURL 
        handleInput={this.handleInput}
        onSubmit={this.onSubmit}  
        />
        <p>{this.state.input}</p>
      </div>
    )
  }
}

export default App;