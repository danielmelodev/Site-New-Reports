document.getElementById("img-input").addEventListener("change", readImage, false);

function readImage() {
    if (this.files && this.files[0]) {
   
      let size = bytesToMegaBytes(this.files[0].size)
        // O size retorna o tamanho do arquivo em (MB) o código abaixo está aceitando apenas imagens com menos de 2mb
      if (size < 2){
        var file = new FileReader();
    
        
        file.onload = function(e) {
            document.querySelector(".resultado").src = e.target.result;

        };       
        file.readAsDataURL(this.files[0]);
      }else{
        alert('Sua imagem é muito grande!')
      }
   
    }
}


//Transforma Bytes em Mb
function bytesToMegaBytes(bytes) { 
    return bytes / (1024*1024); 
  }
  

//Acesso a camêra
var theStream;
let facingMode = "environment"
grabVideo()

function grabVideo(){
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
  
    var constraints = {
      video: {
        facingMode: facingMode
        },
    };
  
    getUserMedia(constraints, function(stream) {
      var mediaControl = document.querySelector('video');
  
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        
      }
      theStream = stream;
    }, function(err) {
      alert('Error: ' + err);
    });
  };
  
  function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
}


//Capturar Imagem
document.querySelector('.take-photo').addEventListener('click', () => {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
  
    if (!theStream) {
      alert('Grab the video stream first!');
      return;
    }
   const track = theStream.getVideoTracks()[0];
   let theImageCapturer = new ImageCapture(track);
  //  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto(
       {imageHeight:20,imageWidth:16}).then(blob => {
        var theImageTag = document.querySelector(".resultado-camera");
        theImageTag.src = URL.createObjectURL(blob);
       
    
      })
      .catch(err => console.log('Error: ' + err));
  });

//Mudar câmera Frontal/traseira
document.querySelector('.change-cam').addEventListener('click' ,() =>{
  if (facingMode == "environment"){
      facingMode = "user";
  }else{
      facingMode = "environment";
  }

    theStream.getTracks().forEach((track) => {
    track.stop()
  })
  grabVideo();
});