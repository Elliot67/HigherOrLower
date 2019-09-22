console.log('Je suis popup.js');

// Initialisation boutons
let boutonStart = document.getElementById('start');
let boutonStop = document.getElementById('stop');
let boutonCopy = document.getElementById('copy');
let gitHubLink = document.getElementById('gitHubLink');
let body = document.querySelector('body');

// Le background est-il en train de tourner ?
let state;
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) { // WORKING
        if (request.msg == "running?yes") {
            state = true;
            boutonStart.classList.add('impossible');
        }
        else if(request.msg == "running?no") { // STOPPED
            state = false;
            boutonStop.classList.add('impossible');
            body.classList.add('stopped');
        }
    }
);
chrome.runtime.sendMessage({ msg: "running?" });

// Click sur les boutons
boutonStart.addEventListener('click', () => { // WORKING
    if (!boutonStart.classList.contains('impossible')) {
        body.classList.remove('stopped');
        body.classList.add('stoppedEnd');
        setTimeout(() => body.classList.remove('stoppedEnd'), 4000);
        boutonStart.classList.add('impossible');
        boutonStop.classList.remove('impossible');
        chrome.runtime.sendMessage({ msg: "startBackground" });
        console.log('Start Background');
    }
});

boutonStop.addEventListener('click', () => { // STOPPED
    if (!boutonStop.classList.contains('impossible')) {
        body.classList.add('stopped');
        boutonStop.classList.add('impossible');
        boutonStart.classList.remove('impossible');
        chrome.runtime.sendMessage({ msg: "stopBackground" });
        console.log('Stop Background');
    }
});

gitHubLink.addEventListener('click', () =>{
    chrome.tabs.create({ url: "https://github.com/Elliot67/HigherOrLower" });
});