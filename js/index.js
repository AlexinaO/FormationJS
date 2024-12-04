/*Fichier principal de l'application*/

function loadingDOM() {
  let jsnotif = document.querySelector("#js-notification");
  jsnotif.style.backgroundColor = "green";
  // document.querySelector('#js-notification').style.backgroundColor = 'green';
  // document.querySelector('#js-notification').innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>'
  jsnotif.innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>';
  document
    .querySelector("#header > button")
    .addEventListener("click", function () {
      console.log("J'ai cliqué sur le bouton !");
    });
}

// loadingDOM();

document.addEventListener("DOMContentLoaded", loadingDOM);
