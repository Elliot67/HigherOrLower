console.log('Je suis le background script');

let timer;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "startBackground") {
            console.log('On commence');
            console.group();
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
        }
    }
);
