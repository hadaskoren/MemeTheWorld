'use strict';

var gImages = [];

function createImages() {
    for (var i = 0; i < 4; i++) {
        gImages.push({id: 'img'+(i+1), url:"", keywords: []});
    }
    console.log('renderImages',gImages);
    renderImages(gImages);
}

