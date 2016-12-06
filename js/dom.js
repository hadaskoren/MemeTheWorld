'use strict';

function renderImages(images) {
    var memesGallery = document.querySelector('.memes-gallery');
    images.forEach(function(image){
            var url = '/assets/img/images/' + image.id + '.jpg';
        if(image.url !== "") {
            url = image.url;
        }
        memesGallery.innerHTML += '<div class="hexagon memes-gallery-image" style="background-image: url(' + url + ');"><div class="hexTop"></div><div class="hexBottom"></div></div>';
        console.log('memesGallery',memesGallery); 
    });
}