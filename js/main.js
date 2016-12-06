'use strict';
console.log('Hello Meme');

'use strict';

function loaded() {
    createImages();
}

var gElements = {
    elSearchMemes : document.querySelector('.search-memes'),
    elMemesGallery : document.querySelector('.memes-gallery'),
    elGalleryEditor : document.querySelector('.gallery-editor')
}

function memeEditor() {
    gElements.elSearchMemes.style.display = 'none';
    gElements.elMemesGallery.style.display = 'none';
    gElements.elGalleryEditor.style.display = 'block';
}

function backToGallery() {
    gElements.elSearchMemes.style.display = 'block';
    gElements.elMemesGallery.style.display = 'block';
    gElements.elGalleryEditor.style.display = 'none';
}