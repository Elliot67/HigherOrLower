console.log('Je suis le background script');

chrome.runtime.onInstalled.addListener(function () {
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            chrome.storage.local.set({ bdd: data }, () => console.log('BDD vide, les données ont été ajoutées'));
        });
});


let timer;
let state = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "startBackground") {
            state = true;
            console.group();
            console.log('On commence');
            let tabId;
            let promise = new Promise((resolve, reject) => {
                console.log('je cherche la fenêtre active');
                chrome.tabs.query({ active: true, windowType: "normal", currentWindow: true }, (d) => {
                    tabId = d[0].id;
                    resolve(tabId);
                });
            });
            promise.then(function (tabId) {
                console.log('La fenêtre active est: ' + tabId);
                chrome.tabs.sendMessage(tabId, 'startContent');
            });

            timer = setInterval(function () {
                console.log('On est repartit');
                chrome.tabs.sendMessage(tabId, 'startContent');
            }, 4500);
        }
        else if (request.msg == "stopBackground") {
            console.log('On arrête');
            clearInterval(timer);
            console.groupEnd();
            state = false;
        }
        else if (request.msg == "running?") {
            if (state) {
                chrome.runtime.sendMessage({ msg: "running?yes" });
            } else {
                chrome.runtime.sendMessage({ msg: "running?no" });
            }
            console.log('Reponse à la question:' + state);
        }
    }
);
