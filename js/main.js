'use strict';

// GLOBAL elements object
var gAllElements = {};
// GLOBAL MODEL
var gImages = [];
// GLOBAL toggleKeywords
var gIsKeywordsPanelOpen = false;

///////// *** Initiates the meme generator on window load
function initApp() {
    var contactUsers = [];
    localStorage['users'] = JSON.stringify(contactUsers);
    // Assign global elements
    gAllElements.elSearchMemes = document.querySelector('.search-memes');
    gAllElements.elMemesGallery = document.querySelector('.memes-gallery');
    gAllElements.elGalleryEditor = document.querySelector('.gallery-editor');

    createImages();
} // *** End of initApp

///////// *** Opens the meme editor
function memeEditor(imgId) {
    // Hide gallery
    gAllElements.elSearchMemes.style.display = 'none';
    gAllElements.elMemesGallery.style.display = 'none';
    // Show editor
    gAllElements.elGalleryEditor.style.display = 'block';
    // When opens the editor - intiate the canvas with the imageId that was clicked
    var imgSrc = imgIdToUrl(imgId);
    console.log('imgSrc', imgSrc);
    initCanvas(imgSrc);
} // *** End of memeEditor

///////// *** Initiates the meme generator
function backToGallery() {
    // Show gallery
    gAllElements.elSearchMemes.style.display = 'flex';
    gAllElements.elMemesGallery.style.display = 'flex';
    // Hide editor
    gAllElements.elGalleryEditor.style.display = 'none';
} // *** End of backToGallery

///////// *** Renders images into DOM from array of images objects
function renderImages(images) {
    var elMemesGallery = document.querySelector('.memes-gallery');
    images.forEach(function(image){
        // Ask Yaron about URL
        // if(image.url !== "") {
        //     url = image.url;
        // }

        // Add to DOM the HTML tags image after image
        elMemesGallery.innerHTML += '<div class="hexagon memes-gallery-image "' +
            'style="background-image: url(' + imgIdToUrl(image.id) + ');" ' +
            'onclick="memeEditor(\'' + image.id + '\')">' +
            '<div class="hexTop"></div><div class="hexBottom"></div></div>';
    });
} // *** End of renderImages

///////// *** Init the canvas when image in gallery was clicked or recieved url from user in input
function initCanvas(imgSrc) {
    var elMemeCanvas = document.querySelector('#memeCanvas');
    var ctx = elMemeCanvas.getContext('2d');
    
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

///////// *** Save the contact information from the DOM
function saveContact() {
    
    var elName = document.querySelector('#name');
    var elEmail = document.querySelector('#email');
    var elSubject = document.querySelector('#subject');
    var elMsg = document.querySelector('#msg');
    var users = JSON.parse(localStorage.getItem('users'));
    users.push({userName: elName.value, userEmail: elEmail.value, emailSubject: elSubject.value, emailMessage: elMsg.value});
    var usersAsStr = JSON.stringify(users);
    localStorage['users'] = usersAsStr;
}

///////// *** Create the images' global model
function createImages() {
    for (var i = 0; i < 6; i++) {
        gImages.push({id: 'img'+(i+1), url:"", keywords: []});
    }
    // Renders the images created
    renderImages(gImages);
} // *** End of creatImages

function togglePopularKeywords() {
    gIsKeywordsPanelOpen = !gIsKeywordsPanelOpen;
    var elKeywordsPanel = document.querySelector('.popularKeywords');
    if (gIsKeywordsPanelOpen) {
        elKeywordsPanel.style.display = 'none';
    } else {
        elKeywordsPanel.style.display = 'block';
    }
}