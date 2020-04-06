/* Convert base64 string to blob */
export const base64StringtoBlob = (base64Str) => {
    var arr, mime, n, bstr;
    arr = base64Str.split(",");
    mime = arr[0].match(/:(.*?);/)[1];
    bstr = atob(arr[1]);
    n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
   return new Blob([u8arr], { type: mime });
   //this.setState({blobImg:blobImgData});
  };

    /* Check extension for url input*/
 const checkExt = (imgUrl) => {
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
    