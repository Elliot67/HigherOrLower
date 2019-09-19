console.log('Je suis popup.js');


let boutonStart = document.getElementById('start');
let boutonStop = document.getElementById('stop');
let boutonCheck = document.getElementById('check');

boutonStart.addEventListener('click', () => {
    if (!boutonStart.classList.contains('impossible')) {
        boutonStart.classList.add('impossible');
        boutonStop.classList.remove('impossible');
        chrome.runtime.sendMessage({ msg: "startBackground" });
        console.log('Start Background');
    }
});

boutonStop.addEventListener('click', () => {
    if (!boutonStop.classList.contains('impossible')) {
        boutonStop.classList.add('impossible');
        boutonStart.classList.remove('impossible');
        chrome.runtime.sendMessage({ msg: "stopBackground" });
        console.log('Stop Background');
    }
});

boutonCheck.addEventListener('click', () => {
    chrome.runtime.sendMessage({ msg: "check" });
    console.log('Check BDD');
});