console.log('Je suis popup.js');

document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ msg: "startBackground" });
    console.log('Start Background');
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ msg: "stopBackground" });
    console.log('Stop Background');
});

document.getElementById('check').addEventListener('click', () => {
    chrome.runtime.sendMessage({ msg: "check" });
    console.log('Check BDD');
});

/*
Que doit faire la popup ?

- Lancer le cheat
- Arrêter le cheat
- Accéder à la BDD

*/