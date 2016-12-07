'use strict';

// GLOBAL elements object
var gAllElements = {};
// GLOBAL MODEL
var gImages = [];

// GLOBAL vars
var gPrevSearchKeyword;
var gPrevSearchEndIndex;

// GLOBALS for popular keywords
var gIsKeywordsPanelOpen = true;
var gSearchedKeywordsObj = {};
var gCloudSettings;

var testKeywords = { aasdfasd: 2, basdfasd: 2, ccxbxb: 4, ddfdfg: 4, eertyerty: 6, ffhfjh: 6, gghjkhjk: 7, hhjklk: 9, iyuiouyio: 9, jkljjkljo: 15 };

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
}

//---------------------Renders images into DOM from array of images objects
function renderImages(images) {
    var elMemesGallery = document.querySelector('.memes-gallery');
    images.forEach(function (image) {
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
}

//---------------------Update an object with the keywords that were searched
function updateKeywordsObj(searchedWord) {
    if (!gSearchedKeywordsObj[searchedWord]) {
        gSearchedKeywordsObj[searchedWord] = 1;
    } else {
        gSearchedKeywordsObj[searchedWord] += 1;
    }
    console.log('gSearchedKeywordsObj', gSearchedKeywordsObj);
}

//---------------------Popular Keywords panel Open and close

function togglePopularKeywords() {
    gIsKeywordsPanelOpen = !gIsKeywordsPanelOpen;
    var elKeywordsPanel = document.querySelector('.popularKeywords');

    if (gIsKeywordsPanelOpen) {
        elKeywordsPanel.style.display = 'none';
    } else {

        elKeywordsPanel.style.display = 'block';
        renderPopularKeywords();
    }
}

function renderPopularKeywords() {
    var elKeyWords = document.querySelector('.keywords-cloud');
    elKeyWords.innerHTML = '';
    for (var keyword in testKeywords) {
        elKeyWords.innerHTML += '<a href="#" rel="' + testKeywords[keyword] + '" >&nbsp;' + keyword + '&nbsp; </a>';
    }
        for (var i = elKeyWords.children.length; i >= 0; i--) {
        var randIndex = Math.random() * i | 0;
        elKeyWords.appendChild(elKeyWords.children[randIndex]);
    }
    // console.log('elKeyWords', elKeyWords);
    $(".keywords-cloud a").tagcloud({
        size: { start: 24, end: 50, unit: "px" },
        color: { start: '#323232', end: '#00ffbf' }
    });
    // $('.keywords-cloud').awesomeCloud(gCloudSettings);
}

//---------------------Meme Editor
function memeEditor(imgId) {

    // Once you click on an image, an object is created with Id and array of labels that has all the text features
    gMeme = {imgId: imgId, labels: [{txt: '', color: '#456', shadow: 'no',size: 30},{txt: '', color: '#456',shadow: 'no',size: 30}]};
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

//---------------------Meme Editor Back button
function backToGallery() {
    // Show gallery
    gAllElements.elSearchMemes.style.display = 'flex';
    gAllElements.elMemesGallery.style.display = 'flex';
    // Hide editor
    gAllElements.elGalleryEditor.style.display = 'none';
}

//------------------------------Canvas-----------------------------------------//

//---------------------Edit Meme Change label
function changeLabel(elLabel,labelLocation) {
    if (labelLocation === 'top') {
        gMeme.labels[0].txt = elLabel.value;
        drawCanvas('top');
    } else {
        gMeme.labels[1].txt = elLabel.value;
        drawCanvas('bottom');
    }
}

//---------------------Init the canvas when image in gallery was clicked or recieved url from user in input
function drawCanvas(labelLocation) {
    var img = new Image();
    img.src = imgIdToUrl(gMeme.imgId);

    //Draw on canvas after the image is loaded from server or from url
    img.onload = function () {
        gElMemeCanvas.width = this.naturalWidth;
        gElMemeCanvas.height = this.naturalHeight;
        gCtx.drawImage(img, 12, 12, img.width, img.height);
        if(labelLocation === 'top') {
            // gCtx.font = '"' + gMeme.labels[0].size + " Segoe UI ";
            gCtx.font = gMeme.labels[0].size + "px Segoe UI";
            gCtx.fillText(gMeme.labels[0].txt, 50, 105);
        } else {
            gCtx.font = gMeme.labels[1].size + "px Segoe UI";
            console.log('gCtx.font',gCtx.font);
            gCtx.fillText(gMeme.labels[1].txt, 60, 220);
        }
     };
}

function clearInput(labelLocation) {
    var input;
    if (labelLocation === 'top') {
        input = document.querySelector('.meme-label-top');
        input.value = "";
        gMeme.labels[0].txt = "";
        drawCanvas('top');
    } else {
        input = document.querySelector('.meme-label-bottom');
        input.value = "";
        gMeme.labels[1].txt = "";
        drawCanvas('bottom');
    }
}

function increaseFontSize() {

}

function decreaseFontSize() {

}

function changeFontColor() {

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
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}

gImages = [
    {
        id: '1',
        url: "",
        keywords: ['lord', 'rings', 'mordor', 'boromir',
            'lord of the rings', 'one does not simply']
    },

    // {
    //     id: '2',
    //     url: "",
    //     keywords: ['toy', 'story', 'buzz', 'toy story', 'lightyears', 'everywhere']
    // },

    {
        id: '3',
        url: "",
        keywords: ['fry', 'futurama', 'shut up and take my money']
    },
    {
        id: '4',
        url: "",
        keywords: ['sweet brown', "ain't", "ain't nobody got time for that"]
    },
    // {
    //     id: '5',
    //     url: "",
    //     keywords: ['cat', 'singing', 'funny', 'animals', 'aww']
    // },
    // {
    //     id: '6',
    //     url: "",
    //     keywords: ['animals', 'dog', 'surprised', 'shocked']
    // },
    // {
    //     id: '7',
    //     url: "",
    //     keywords: ['star', 'wars', 'star wars', 'chewbacca',
    //         'princess leia', 'kissing', 'love']
    // },
    {
        id: '8',
        url: "",
        keywords: ['animals', 'panda', 'kong fu',
            'kong-fu', 'excited', 'aww', 'happy']
    }
];


