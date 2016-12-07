'use strict';

///////// *** Initiates the meme generator on window load
function initApp() {
    // Assign globals elements
    gElements.elSearchMemes = document.querySelector('.search-memes'),
    gElements.elMemesGallery = document.querySelector('.memes-gallery'),
    gElements.elGalleryEditor = document.querySelector('.gallery-editor')
    createImages();
} // *** End of initApp

///////// *** Opens the meme editor
function memeEditor(imgId) {
    // Hide gallery
    gElements.elSearchMemes.style.display = 'none';
    gElements.elMemesGallery.style.display = 'none';
    // Show editor
    gElements.elGalleryEditor.style.display = 'block';
    // When opens the editor - intiate the canvas with the imageId that was clicked
    var imgSrc = imgIdToUrl(imgId);
    console.log('imgSrc', imgSrc);
    initCanvas(imgSrc);
} // *** End of memeEditor

///////// *** Initiates the meme generator
function backToGallery() {
    // Show gallery
    gElements.elSearchMemes.style.display = 'flex';
    gElements.elMemesGallery.style.display = 'flex';
    // Hide editor
    gElements.elGalleryEditor.style.display = 'none';
} // *** End of backToGallery

