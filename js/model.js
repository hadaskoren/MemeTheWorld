'use strict';

// GLOBAL MODEL
var gImages = [];

///////// *** Create the images' global model
function createImages() {
    for (var i = 0; i < 8; i++) {
        gImages.push({id: 'img'+(i+1), url:"", keywords: []});
    }
    // Renders the images created
    renderImages(gImages);
} // *** End of renderImages


