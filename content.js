chrome.runtime.onMessage.addListener(action);

function action(message){
	// Pouvoir modifier la bdd
	if(document.querySelector('textarea') && document.location.href == 'http://www.higherlowergame.com/options'){
		console.log('Je ne reset pas !');
		return;
	}

if(document.getElementsByClassName('term-keyword__keyword')[0]){

	// Trouver la première valeur
	var titre1 = document.getElementsByClassName('term-keyword__keyword')[0].innerText.replace(/[“ ”]/g,'');
	var valeur1 = parseInt(document.getElementsByClassName('term-volume__volume')[0].innerText.replace(/,/g,''));

	// Définir la valeur finale à ajotuer dans la bdd
	var valeurfinal = titre1 + '.' + valeur1 + '-';
	
	// Trouver la deuxieme valeur
	var titre2 = document.getElementsByClassName('term-keyword__keyword')[1].innerText.replace(/[“ ”]/g,'');
	var valeur2;


	// Chercher la premiere valeur et la stock dans storage si elle y est pas
	var stocker;
	var modifier;
	chrome.storage.local.get(['bdd'], function(result){
		stocker = result.bdd;
		if(stocker == undefined){ // Si premiere fois de l'extension
			stocker = '';
			console.log('Première fois ici !');
		}
		modifier = stocker + valeurfinal;
		go();
	});
	// Les valeurs ont été récupérés
	function go(){
		// Chercher les correspondences entre valeur bdd et valeur1
		var rechercher = '-'+titre1+'.';
		var ajout = stocker.indexOf(rechercher);

		// Si titre1 n'est pas dans la bdd
		if(ajout == -1){
			majbdd();
			console.log('Je vais savoir ça maintenant');
		}

		// Chercher valeur2 dans la bdd
		var trouver = stocker.indexOf('-'+titre2+'.');
		// Si titre2 est dans la bdd
		if(trouver != -1){
			var trouver = stocker.substring(trouver+1,trouver+50);
			trouver = trouver.match(/^[A-Za-z0-9-(+{}_<>)^`%£*$µ@#| ~&'"\[\]\/]+\.[0-9,]+/g); // Filtrage des données, on a alors le nom et le nombre
			trouver = trouver[0].match(/\.[0-9,]+/g); // Deuxième filtrage, on a uniquement le nombre
			trouver = trouver[0].replace(/,/gi, ''); // Supprimer les ',' si il y en a
			valeur2 = trouver.substring(1,trouver.length);
			suivant(valeur1,valeur2);
		}
		// Sinon pas dans la bdd
		else{
			pif();
		}
	}

	// Mettre a jour la bdd
	function majbdd(){
		chrome.storage.local.set({bdd: modifier}, function(){
			console.log('Bloc de conaissance: '+modifier.length);
		});
	}


	// Cliquer sur un des boutons
	function suivant(premier, deuxieme){
		console.log('Je sais: '+premier+' VS '+deuxieme);
		if(document.getElementsByClassName('game-button term-actions__button term-actions__button--lower')[0]){
			if(premier >= deuxieme){
				document.getElementsByClassName('game-button term-actions__button term-actions__button--lower')[0].click();
			}
			else{
				document.getElementsByClassName('game-button term-actions__button term-actions__button--higher')[0].click();
			}
		}
	}

	// Cliquer sur un bouton au pif
	function pif(){
		console.log('Au pif');
		if(document.getElementsByClassName('game-button term-actions__button term-actions__button--higher')[0]){
			if(parseInt(Math.random() * 2)){
				document.getElementsByClassName('game-button term-actions__button term-actions__button--higher')[0].click();
			}
			else{
				document.getElementsByClassName('game-button term-actions__button term-actions__button--lower')[0].click();
			}

			// Réponse fausse, on enregistre titre2 et valeur2
			setTimeout(function(){
				var valeur2 = parseInt(document.getElementsByClassName('term-volume__volume')[1].innerText.replace(/,/g,''));
				var aenregistrer = titre2 + '.' + valeur2 + '-';

				// Ajoute le terme dans la bdd
				modifier = stocker + aenregistrer;
				majbdd();
				console.log('J\'enregistre: '+aenregistrer);
			},1400);
		}
	}
	console.log('-----   '+titre1, valeur1+' VS '+titre2+'   -----');
}
else{
	// Si on vient de perdre
	if(document.getElementById('game-over-btn')){
		console.log('_____________DEFAITE_____________')
		document.getElementById('game-over-btn').click();
	}
	else{
		console.log('Le jeu n\'est pas encore lancé');
	}

	// Changer les paramètres
	if(document.location.href == 'http://www.higherlowergame.com/options'){
		var jestock;
		chrome.storage.local.get(['bdd'], function(result){
			jestock = result.bdd;
			document.querySelector('body').innerHTML = "<textarea style='height:90vh; width:100vw;font-size: 12px'></textarea><div style='height:10vh; background-color: red'>Sauvegarder</div>";
			zone = document.querySelector('textarea');
			zone.innerText = jestock;

			// Sauvegarde ce qui est dans le textarea
			document.querySelector('div').addEventListener('click', function(){
				modifier = zone.value;
				console.log(zone.value);

				// Sauvegarde
				chrome.storage.local.set({bdd: modifier}, function(){
					console.log('Modification sauvegardé');
				});
			});
		});
	}

}

}
/*
--Doublons


*/
