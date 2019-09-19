console.log('Je suis content.js');

let table;

chrome.runtime.onMessage.addListener(() => {
	console.log('je fais mon travail');
	if (document.getElementsByClassName('term-keyword__keyword')[0]) { // On est sur la bonne page
		new Promise((resolve, reject) => {
			chrome.storage.local.get(['bdd'], function (result) {
				console.log('je cherche la BDD');
				table = result.bdd;
				resolve();
			});
		}).then(() => run())

	} else{
		startGame();
	}
});


function setBDD(titre, valeur){
	console.log('Ajout dans la BDD');
	let data = titre + '.' + valeur + '-';
	table += data;
	chrome.storage.local.set({ bdd: table }, () => { console.log("BDD mise à jour"); });
}

function rechercheDansBDD(titre, valeur){
	var mot = '-' + titre + '.';
	var emplacement = table.indexOf(mot);

	if(emplacement != -1){
		let valeurChercher = table.substring(emplacement + 1, emplacement + 50);
		valeurChercher = valeurChercher.match(/^[A-Za-z0-9-(+{}_<>)^`%£*$µ@#| ~&'"\[\]\/]+\.[0-9,]+/g); // Filtrage des données, on a alors le nom et le nombre
		valeurChercher = valeurChercher[0].match(/\.[0-9,]+/g); // Deuxième filtrage, on a uniquement le nombre
		valeurChercher = valeurChercher[0].replace(/,/gi, ''); // Supprimer les ',' si il y en a
		valeur = valeurChercher.substring(1, valeurChercher.length);
		return valeur;
	}
	else if(emplacement == -1 && valeur != "") { // Pas dans la BDD
		setBDD(titre, valeur);
	}
	else{
		choixAleatoire();
		console.log("J'enregistre tout");
		setTimeout(function () {
			let valeur = parseInt(document.getElementsByClassName('term-volume__volume')[1].innerText.replace(/,/g, ''));
			setBDD(titre, valeur);
		}, 1400);
	}
}

function choix(premier, deuxieme){
	console.log('Je sais: ' + premier + ' VS ' + deuxieme);
	if (premier >= deuxieme) {
		document.getElementsByClassName('game-button term-actions__button term-actions__button--lower')[0].click();
	}
	else {
		document.getElementsByClassName('game-button term-actions__button term-actions__button--higher')[0].click();
	}
}

function choixAleatoire(){
	console.log('Choix aléatoire');
	if (parseInt(Math.random() * 2)) {
		document.getElementsByClassName('game-button term-actions__button term-actions__button--higher')[0].click();
	}
	else {
		document.getElementsByClassName('game-button term-actions__button term-actions__button--lower')[0].click();
	}
}


function run(){

	// Trouver la première valeur
	let titre1 = document.getElementsByClassName('term-keyword__keyword')[0].innerText.replace(/[“ ”]/g, '');
	let valeur1 = parseInt(document.getElementsByClassName('term-volume__volume')[0].innerText.replace(/,/g, ''));

	// Trouver la deuxieme valeur
	let titre2 = document.getElementsByClassName('term-keyword__keyword')[1].innerText.replace(/[“ ”]/g, '');

	rechercheDansBDD(titre1, valeur1);
	let valeur2 = rechercheDansBDD(titre2, '');
	if(valeur2 != ""){
		choix(valeur1, valeur2);
	}
}

function startGame(){
	console.log('Je lance le jeu');
	if (document.getElementById('game-over-btn')) {
		console.log('_____________DEFAITE_____________');
		document.getElementById('game-over-btn').click();
	}
	else {
		console.log('Le jeu n\'est pas encore lancé');
	}
}