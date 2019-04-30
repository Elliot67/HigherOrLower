console.log('yep, c bon');

chrome.browserAction.onClicked.addListener(bouton);

function bouton(tab){
	// Pour appeler plusieurs fois
	setInterval(function(){
		chrome.tabs.sendMessage(tab.id, 'Hello');
		console.log('go');
	},4500);
}
