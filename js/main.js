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
    initCanvas(imgId, false);
} // *** End of memeEditor

///////// *** Initiates the meme generator
function backToGallery() {
    // Show gallery
    gElements.elSearchMemes.style.display = 'block';
    gElements.elMemesGallery.style.display = 'block';
    // Hide editor
    gElements.elGalleryEditor.style.display = 'none';
} // *** End of backToGallery

