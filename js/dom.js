'use strict';

// GLOBAL Elements' object
var gElements = {};

///////// *** Renders images into DOM from array of images objects
function renderImages(images) {
    var memesGallery = document.querySelector('.memes-gallery');
    images.forEach(function(image){
        // Ask Yaron about URL
        // if(image.url !== "") {
        //     url = image.url;
        // }

        // Add to DOM the HTML tags image after image
        memesGallery.innerHTML += '<div class="hexagon memes-gallery-image "' +
                                  'style="background-image: url(' + imgIdToUrl(image.id) + ');" ' +
                                  'onclick="memeEditor(\'' + image.id + '\')">' +
                                  '<div class="hexTop"></div><div class="hexBottom"></div></div>';
                                  console.log('imageID',image.id);
    });
} // *** End of renderImages

///////// *** Init the canvas when image in gallery was clicked or recieved url from user in input
function initCanvas(imgSrc) {
    var memeCanvas = document.querySelector('#memeCanvas');
    var ctx = memeCanvas.getContext('2d');
    
    var img = new Image();
    img.src = imgSrc;

    // Draw on canvas after the image is loaded from server or from url
    img.onload = function () {
        drawOnCanvas(ctx, img);
    };  
}  // *** End of initCanvas

///////// *** Draw on canvas the received image
function drawOnCanvas(ctx, img) {

        ctx.drawImage(img, 0, 0, 500, 500);
        ctx.font = "60px 'Segoe UI'";
        ctx.fillText("print on Canvas", 50, 300);
}  // *** End of drawOnCanvas