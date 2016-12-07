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



///////// *** Initiates the meme generator on window load
function initApp() {
    var contactUsers = [];
    localStorage['users'] = JSON.stringify(contactUsers);
    // Assign global elements
    gAllElements.elSearchMemes = document.querySelector('.search-memes');
    gAllElements.elMemesGallery = document.querySelector('.memes-gallery');
    gAllElements.elGalleryEditor = document.querySelector('.gallery-editor');

    renderImages(gImages);
}

///////// *** Opens the meme editor
function memeEditor(imgId) {
    // Hide gallery
    gAllElements.elSearchMemes.style.display = 'none';
    gAllElements.elMemesGallery.style.display = 'none';
    // Show editor
    gAllElements.elGalleryEditor.style.display = 'block';
    // When opens the editor - intiate the canvas with the imageId that was clicked
    var imgSrc = imgIdToUrl(imgId);
    initCanvas(imgSrc);
    if (gPrevSearchKeyword) {
        updateKeywordsObj(gPrevSearchKeyword);
    }
}

///////// *** Initiates the meme generator
function backToGallery() {
    // Show gallery
    gAllElements.elSearchMemes.style.display = 'flex';
    gAllElements.elMemesGallery.style.display = 'flex';
    // Hide editor
    gAllElements.elGalleryEditor.style.display = 'none';
}

///////// *** Update an object with the keywords that were searched
function updateKeywordsObj(searchedWord) {
    if (!gSearchedKeywordsObj[searchedWord]) {
        gSearchedKeywordsObj[searchedWord] = 1;
    } else {
        gSearchedKeywordsObj[searchedWord] += 1;
    }
    console.log('gSearchedKeywordsObj', gSearchedKeywordsObj);
}

///////// *** Opens popular keywords modal
// Renders tag cloud into DOM from object of keywords
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
///////// *** Renders images into DOM from array of images objects
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

///////// *** Init the canvas when image in gallery was clicked or recieved url from user in input
function initCanvas(imgSrc) {
    var elMemeCanvas = document.querySelector('#memeCanvas');
    var ctx = elMemeCanvas.getContext('2d');

    var img = new Image();
    img.src = imgSrc;

    // Draw on canvas after the image is loaded from server or from url
    img.onload = function () {
        elMemeCanvas.width = this.naturalWidth;
        elMemeCanvas.height = this.naturalHeight;
        drawOnCanvas(ctx, img);
    };
}

///////// *** Draw on canvas the received image
function drawOnCanvas(ctx, img) {
    ctx.drawImage(img, 0, 0);
    ctx.font = "60px 'Segoe UI'";
    ctx.fillText("print on Canvas", 50, 300);
}

///////// *** Save the contact information from the DOM
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

///////// *** Update the gallery by the keyword typed
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

///////// *** Clear the gallery
function clearGallery() {
    gAllElements.elMemesGallery.innerHTML = '';
}


// TODO
// function downloadImg(elLink) {
//     elLink.href = canvas.toDataURL();
//     elLink.download = 'perfectMeme.jpg';
// }


gImages = [
    {
        id: 'img1',
        url: "",
        keywords: ['lord', 'rings', 'mordor', 'boromir',
            'lord of the rings', 'one does not simply']
    },
    {
        id: 'img2',
        url: "",
        keywords: ['toy', 'story', 'buzz', 'toy story', 'lightyears', 'everywhere']
    },
    {
        id: 'img3',
        url: "",
        keywords: ['fry', 'futurama', 'shut up and take my money']
    },
    {
        id: 'img4',
        url: "",
        keywords: ['sweet brown', "ain't", "ain't nobody got time for that"]
    },
    // {
    //     id: 'img5',
    //     url: "",
    //     keywords: ['cat', 'singing', 'funny', 'animals', 'aww']
    // },
    // {
    //     id: 'img6',
    //     url: "",
    //     keywords: ['animals', 'dog', 'surprised', 'shocked']
    // },
    // {
    //     id: 'img7',
    //     url: "",
    //     keywords: ['star', 'wars', 'star wars', 'chewbacca',
    //         'princess leia', 'kissing', 'love']
    // },
    {
        id: 'img8',
        url: "",
        keywords: ['animals', 'panda', 'kong fu',
            'kong-fu', 'excited', 'aww', 'happy']
    }
];

// gCloudSettings = {
//     "size": {
//         "grid": 8,
//         "factor": 20,
//         "normalize": true
//     },
//     "color": {
//         "background": "rgba(255,255,255,0)",
//         "start": "#323232", // color of the smallest font, if options.color = "gradient""
//         "end": "#00ffbf" // color of the largest font, if options.color = "gradient"
//     },
//     "options": {
//         "color": "gradient",
//         "rotationRatio": 0.3, // 0 is all horizontal, 1 is all vertical
//         "printMultiplier": 3,
//         "sort": "random"
//     },
//     "font": "LatoRegular", //  the CSS font-family string
//     "shape": "square" // circle, square, star or a theta function describing a shape
// };


