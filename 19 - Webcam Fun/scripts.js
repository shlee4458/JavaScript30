const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Ask user authorization and get the video from the device
function getVideo() {

    // get the media devices that is connected to the device, get the video, not the audio
    // this will return a promise
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream; // set the srcObject of the video as the localMediaStream
            video.play();
        })
        .catch(err => { // if errors, conosole log ...
            console.log(`OH NO!!`, err);
        })   
}

// put that retrieved video on the canvas
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width; // width and height of the canvas has to match the width and height of the video
    canvas.height= height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height); // from top left to bottom right(of size width and height)

        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);

        // mess with them
        pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        // put them back
        ctx.putImageData(pixels, 0, 0); 
    }, 16)
}

// Taking photo (when the take button clicks)
function takePhoto() {

    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas 
    const data = canvas.toDataURL('image/jpeg') // transform image/jpeg to a dataURL
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome');
    link.textContent = 'Download Image';
    link.innerHTML = `<img src=${data} alt="Handsome Man">`
    strip.insertBefore(link, strip.firstChild); // added to the strip, like a queue
}

// filter 1
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

// filter 2
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 100] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5; // Blue
      }
      return pixels;    
}

// filter 3
function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }


getVideo(); // ask for authorization
video.addEventListener('canplay', paintToCanvas); // if authorized -> play, then paintToCanvas