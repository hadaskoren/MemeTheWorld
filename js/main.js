'use strict';

// GLOBAL elements object
var gAllElements = {};

// GLOBAL vars
var gPrevSearchKeyword;
var gPrevSearchEndIndex;

// GLOBALS for popular keywords
var gIsKeywordsPanelOpen = true;
var gCloudSettings;

// GLOBAL meme
var gMeme = null;
var gElMemeCanvas;
var gCtx;

//---------------------Initiates the meme generator on window load
function initApp() {
    var contactUsers = [];

    localStorage['users'] = JSON.stringify(contactUsers);
    // Assign global elements
    gAllElements.elSearchMemes = document.querySelector('.search-memes');
    gAllElements.elMemesGallery = document.querySelector('.memes-gallery');
    gAllElements.elGalleryEditor = document.querySelector('.gallery-editor');
    // Canvas globals
    gElMemeCanvas = document.querySelector('.memeCanvas');
    gCtx = gElMemeCanvas.getContext('2d');

    renderImages(gImages);
    renderPopularKeywords();
}

//---------------------Renders images into DOM from array of images objects
function renderImages(images) {
    var url;
    var imgSrc;
    var elMemesGallery = document.querySelector('.memes-gallery');
    images.forEach(function (image) {
        if (image.url !== "") {
            imgSrc = image.url;
        } else {
            imgSrc = imgIdToUrl(image.id);
        }

        // Add to DOM the HTML tags image after image
        elMemesGallery.innerHTML += '<div class="hexagon memes-gallery-image "' +
            'style="background-image: url(' + imgSrc + ');" ' +
            'onclick="memeEditor(\'' + imgSrc + '\')">' +
            '<div class="hexTop"></div><div class="hexBottom"></div></div>';
    });
}

//---------------------Update an object with the keywords that were searched
function updateKeywordsObj(keyword) {
    var keyFound = false;
    for (var i = 0; i < gPopularKeywords.length && !keyFound; i++) {
        if (gPopularKeywords[i].keyword === keyword) {
            gPopularKeywords[i].rating++;
            keyFound = true;
        }
    }
    if (!keyFound) {
        gPopularKeywords.push({ keyword: keyword, rating: 1 })
    }
    renderPopularKeywords();
}

function renderPopularKeywords() {
    var elKeyWords = document.querySelector('.keywords-cloud');
    elKeyWords.innerHTML = '';

    gPopularKeywords.sort(function (a, b) {
        return b.rating - a.rating;
    });
    for (var i = 0; i < gPopularKeywords.length && i < 15; i++) {
        elKeyWords.innerHTML += '<span onclick="searchByKeyword(this.innerText)" rel="' +
            gPopularKeywords[i].rating + '" class="flex justify-center flex-wrap align-center">' +
            gPopularKeywords[i].keyword + '</span>';
    }
    $(".keywords-cloud span").tagcloud({
        size: { start: 12, end: 32, unit: "px" },
        color: { start: '#323232', end: '#323232' }
    });
}

function searchByKeyword(keyword) {
    gAllElements.elSearchMemes.querySelector('.search-by-keyword').value = keyword;
    updateKeywordsObj(keyword);
    updateGallery(keyword);
}

//---------------------Meme Editor
function memeEditor(elImgSrc) {
    // Once you click on an image, an object is created with Id and array of labels that has all the text features
    if (gMeme === null) {
        gMeme = {
            imgSrc: elImgSrc,
            labels: [
                {
                    txt: '',
                    color: '#ffffff',
                    shadow: 'no',
                    size: 68
                },
                {
                    txt: '',
                    color: '#ffffff',
                    shadow: 'no',
                    size: 68
                }
            ]
        };
    }
    gMeme.imgSrc = elImgSrc;
    // When opens the editor - intiate the canvas with the imageId that was clicked
    drawCanvas();
    // Hide gallery
    gAllElements.elSearchMemes.style.display = 'none';
    gAllElements.elMemesGallery.style.display = 'none';
    // Show editor
    gAllElements.elGalleryEditor.style.display = 'block';

    if (gPrevSearchKeyword) {
        updateKeywordsObj(gPrevSearchKeyword);
    }
}

function imgFromUrl() {
    var imgUrl = document.querySelector('#image-from-url').value;
    memeEditor(imgUrl);
}
//---------------------Meme Editor Back button
function backToGallery() {
    // Show gallery
    gAllElements.elSearchMemes.style.display = 'flex';
    gAllElements.elMemesGallery.style.display = 'flex';
    // Hide editor
    gAllElements.elGalleryEditor.style.display = 'none';
}

//------------------------------Canvas-----------------------------------------//

//---------------------Init the canvas when image in gallery was clicked or recieved url from user in input
function drawCanvas() {
    var img = new Image();
    img.src = gMeme.imgSrc;

    //Draw on canvas after the image is loaded from server or from url
    img.onload = function () {
        gElMemeCanvas.width = this.naturalWidth;
        gElMemeCanvas.height = this.naturalHeight;
        gCtx.drawImage(img, 12, 12, img.width, img.height);
        gCtx.font = gMeme.labels[0].size + "px Segoe UI";
        gCtx.fillStyle = gMeme.labels[0].color;
        gCtx.fillText(gMeme.labels[0].txt, 45, 105);
        gCtx.font = gMeme.labels[1].size + "px Segoe UI";
        gCtx.fillStyle = gMeme.labels[1].color;
        gCtx.fillText(gMeme.labels[1].txt, 45, 270);
    }
}

//---------------------Edit Meme Change label
function changeLabel(elLabel, labelLocation) {
    var labelIndex = +labelLocation;
        if (gMeme.labels[labelIndex].txt.length < gElMemeCanvas.width / gMeme.labels[labelIndex].size * 1.4) {
            gMeme.labels[labelIndex].txt = elLabel.value.toUpperCase();
            drawCanvas();
        } else {
            var maxLengthValue = elLabel.value.slice(0, -1);
            elLabel.value = maxLengthValue;
            gMeme.labels[labelIndex].txt = elLabel.value.toUpperCase();
        }
}

function clearInput(labelLocation) {
    var input;
    var labelIndex = +labelLocation;
    if (labelIndex === 0) {
        input = document.querySelector('.meme-label-top');
    } else {
        input = document.querySelector('.meme-label-bottom');
    }
        input.value = "";
        gMeme.labels[labelIndex].txt = "";
        drawCanvas();
}

function increaseFontSize(labelLocation) {
    var labelIndex = +labelLocation;
    gMeme.labels[labelIndex].size += 5;
    drawCanvas();
}

function decreaseFontSize(labelLocation) {
    var labelIndex = +labelLocation;
    gMeme.labels[labelIndex].size -= 5;
    drawCanvas();
}

function changeFontColor(elColorPicker, labelLocation) {
    var labelIndex = +labelLocation;
    console.log('I work');
    var currval = elColorPicker.value;
    console.log('currval', currval);
    gMeme.labels[labelIndex].color = currval;

    drawCanvas();
}

function changeFontShadow() {

}

function alignFontRight() {

}

function alignFontCenter() {

}

function alignFontLeft() {

}
//------------------------------End of Canvas-----------------------------------------//

//---------------------Save the contact information from the DOM
function saveContact() {

    var elName = document.querySelector('#name');
    var elEmail = document.querySelector('#email');
    var elSubject = document.querySelector('#subject');
    var elMsg = document.querySelector('#msg');
    var users = JSON.parse(localStorage.getItem('users'));
    users.push({ userName: elName.value, userEmail: elEmail.value, emailSubject: elSubject.value, emailMessage: elMsg.value });
    var usersAsStr = JSON.stringify(users);
    localStorage['users'] = usersAsStr;
}

//---------------------Update the gallery by the keyword typed
function updateGallery(keyword) {
    var currSearchEndIndex = gImages.length - 1;

    // Clear the gallery every new update
    clearGallery();
    // if new search is the same as last search + one character ->
    //      end the curent search where to last image was found in the last search
    if (gPrevSearchKeyword && (keyword.slice(0, -1) === gPrevSearchKeyword)) {
        currSearchEndIndex = gPrevSearchEndIndex;
    }
    gPrevSearchKeyword = keyword;
    var matchingImages = [];

    // Iterate through gImages.keywords and find images with matching keyword
    for (var i = 0; i <= currSearchEndIndex; i++) {
        // Make current image.keywords into a string
        var keywordsAsStr = gImages[i].keywords.join('');

        // Check if the search keyword is inside the new image.keywords string 
        if (keywordsAsStr.indexOf(keyword) !== -1) {
            matchingImages.push(gImages[i]);
            gPrevSearchEndIndex = i;
        }
    }
    // Render the gallery with the matching images
    renderImages(matchingImages);
}

//---------------------Clear the gallery
function clearGallery() {
    gAllElements.elMemesGallery.innerHTML = '';
}

function saveImg(elLink) {
    elLink.href = gElMemeCanvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}
