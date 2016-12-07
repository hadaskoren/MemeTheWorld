'use strict';

// GLOBAL Elements' object
var gElements = {};

///////// *** Renders images into DOM from array of images objects
function renderImages(images) {
    var memesGallery = document.querySelector('.memes-gallery');
    images.forEach(function(image){
        // OMER >>>> not sure if they are needed! ASK HADAS
        // OMER >>>> not needed since if user clicks on an image it is definately from database not from another url  
        // var url = '/assets/img/images/' + image.id + '.jpg';

        // if(image.url !== "") {
        //     url = image.url;
        // }

        // Add to DOM the HTML tags image after image
        memesGallery.innerHTML += '<div class="hexagon memes-gallery-image "' +
                                  'style="background-image: url(' + imgIdToUrl(image.id) + ');" ' +
                                  'onclick="memeEditor(\'' + image.id + '\')">' +
                                  '<div class="hexTop"></div><div class="hexBottom"></div></div>';
    });
} // *** End of renderImages

///////// *** Init the canvas when image in gallery was clicked or recieved url from user in input
function initCanvas(imgId, isUrl) {
    var memeCanvas = document.querySelector('#memeCanvas');
    var ctx = memeCanvas.getContext('2d');
    
    var img = new Image();

    // If recieved url from user -> use it as the img.src, if not -> use image from assets
    img.src = (!isUrl)? imgIdToUrl(imgId) : imgId;

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