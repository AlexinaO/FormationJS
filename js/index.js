/*Fichier principal de l'application*/

function loadingDOM(){
	let jsnotif = document.querySelector('#js-notification');
	jsnotif.style.backgroundColor = 'green';
	// document.querySelector('#js-notification').style.backgroundColor = 'green';
	// document.querySelector('#js-notification').innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>'
	jsnotif.innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>'
}

// loadingDOM();

document.addEventListener('DOMContentLoaded', loadingDOM);





