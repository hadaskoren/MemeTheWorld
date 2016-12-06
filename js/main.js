'use strict';
console.log('Hello Meme');

'use strict';

function renderImages() {
    // // Create a clone from the template
    // var elClonedImageTemplate = document.querySelector('.imageTemplate').cloneNode(true);
  
    // var elMemesGallery = document.querySelector('.memes-gallery');
    // elMemesGallery.appendChild(elClonedImageTemplate);
    
}

//------TODO: This doesn't work except for the log'
function memeEditor() {
    console.log('EDITOR!');
    var editor = document.querySelector('.gallery-editor');
    var gallery = document.querySelector('.gallery');
    gallery.display = 'none';
    editor.display = 'block';
}